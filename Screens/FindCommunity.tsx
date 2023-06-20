import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useContext, useEffect, useState } from "react";
import AddComToUser from "../Utils/AddComToUser";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colours from "../constants/colours";
import { MyContext } from "../Context";
import AddRoleToUser from "../Utils/AddRoleToUser";

// NEED TO TRY FIX TYPSCRIPT ISSUE WITH PREDEFINED TYPE FOR COMMUNITY IN MAP
// type ExampleObject = {
//   name: string;
//   location: string;
//   description: string;
// };

export default function FindCommunity({ navigation }: any) {
  const [communityList, setCommunityList] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredArr, setFilteredArr] = useState([{}]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [communityClicked, setCommunityClicked] = useState("");
  const { userContext, setUserContext } = useContext(MyContext);

  useEffect(() => {
    const q = query(collection(db, "CommunityList"), orderBy("name"));

    const communityQuery = onSnapshot(q, (querySnapshot) => {
      let communityArr: Array<Object> = [];

      querySnapshot.forEach((doc) => {
        communityArr.push({ ...doc.data(), id: doc.id });
      });
      setCommunityList(communityArr);
      setIsLoading(false);
    });

    return () => communityQuery();
  }, []);

  const handleClick = () => {
    setFilteredArr(
      communityList.filter((community: any) => {
        console.log(searchInput);
        if (community.name.includes(searchInput)) {
          return community;
        }
      })
    );
    setSearchClicked(true);
  };

  const handleYesClick = () => {
    AddComToUser(auth.currentUser?.email, communityClicked.name);
    AddRoleToUser(auth.currentUser?.email, "resident");
    setUserContext({
      ...userContext,
      communityName: communityClicked.name,
      role: "resident",
    });

    navigation.navigate("HomepageScreen");
  };

  return isLoading ? (
    <Text>Loading...</Text>
  ) : communityClicked.length === 0 ? (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Find your Community</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="community/building name..."
            value={searchInput}
            onChangeText={setSearchInput}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleClick}>
            <Text style={styles.buttonText}>Search Communities</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerList}>
          {searchClicked ? (
            filteredArr[0] === undefined ? (
              <Text>No Results Found</Text>
            ) : (
              filteredArr.map((community: any, index) => {
                return (
                  // NEED TO ADD ONCLICK HERE TO NAVIGATE
                  <TouchableOpacity
                    key={index}
                    style={styles.itemContainer}
                    onPress={() => {
                      setCommunityClicked(community);
                    }}
                  >
                    <Text>{community.name}</Text>
                  </TouchableOpacity>
                );
              })
            )
          ) : (
            communityList.map((community: any, index) => {
              return (
                // NEED TO ADD ONCLICK HERE TO NAVIGATE
                <TouchableOpacity
                  key={index}
                  style={styles.itemContainer}
                  onPress={() => {
                    setCommunityClicked(community);
                  }}
                >
                  <Text style={styles.communityName}>{community.name}</Text>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.container}>
      <Text>{communityClicked.name}</Text>
      <Text>{communityClicked.description}</Text>
      <Text>{communityClicked.postcode}</Text>
      <Text>Would you like to join this community?</Text>
      <TouchableOpacity style={styles.searchButton} onPress={handleYesClick}>
        <Text>Yes!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          setCommunityClicked("");
        }}
      >
        <Text>No!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  itemContainer: {
    height: 100,
    width: "85%",
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: colours.secondary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    alignItems: "center",
    gap: 10,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: "white",
    width: 300,
    borderWidth: 1,
    borderColor: "#1B73E7",
    padding: 10,
    borderRadius: 6,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  searchButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#1B73E7",
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 15,
    borderColor: "#1B73E7",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    paddingRight: 20,
    paddingLeft: 20,
  },
  communityName: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
});

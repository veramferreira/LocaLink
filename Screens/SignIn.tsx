import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SignIn from "../comp/singInComp";
import LogOutComp from "../comp/logOutComp";
import { auth, db } from "../config/firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { MyContext } from "../Context";

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "#F57C01",

    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#F57C01",
  },
});

const SignInPage: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [usersList, setUsersList] = useState([{}]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "Users"), orderBy("email"));

    const UserQuery = onSnapshot(q, (querySnapshot) => {
      let userArr: Array<Object> = [];

      querySnapshot.forEach((doc) => {
        userArr.push({ ...doc.data(), id: doc.id });
      });
      setUsersList(userArr);
    });

    return () => UserQuery();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        {user ? (
          <LogOutComp onLogout={handleLogout} />
        ) : (
          <SignIn
            userList={usersList}
            onSignIn={() => setUser(auth.currentUser)}
          />
        )}
      </View>
    </View>
  );
};

export default SignInPage;

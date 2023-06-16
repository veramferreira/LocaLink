import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import SignIn from "../comp/singInComp";
import LogOutComp from "../comp/logOutComp";
import { auth, db } from "../config/firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F57C01',
    flexDirection: "row",
    padding: 16,
  },
});

const SignInPage: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [userContext, setUserContext] = useContext(uth.currentUser);
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
      {user ? (
        <LogOutComp onLogout={handleLogout} />
      ) : (
        <SignIn
          userList={usersList}
          onSignIn={() => setUser(auth.currentUser)}
        />
      )}
    </View>
  );
};

export default SignInPage;

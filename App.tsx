import { StyleSheet, Text, View } from "react-native";
import SignIn from "./Screens/SignIn";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./Screens/SignUp";
import { HomepageScreen } from "./Screens/HomepageScreen";
import About from "./Screens/About";
import Calendar from "./Screens/Calendar";
import LostFound from "./Screens/LostFound";
import ManagementAnnouncements from "./Screens/ManagementAnnouncements";
import Marketplace from "./Screens/Marketplace";
import Recommendations from "./Screens/Recommendations";
import ReportIssue from "./Screens/ReportIssue";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Create your account" }}
        />
        <Stack.Screen
          name="HomepageScreen"
          component={HomepageScreen}
          options={{ title: "Create your account" }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ title: "Create your account" }}
        />
        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{ title: "Create your account" }}
        />
        <Stack.Screen
          name="LostFound"
          component={LostFound}
          options={{ title: "Create your account" }}
        />
        <Stack.Screen
          name="ManagementAnnouncements"
          component={ManagementAnnouncements}
          options={{ title: "Create your account" }}
        />
        <Stack.Screen
          name="Marketplace"
          component={Marketplace}
          options={{ title: "Create your account" }}
        />
        <Stack.Screen
          name="Recommendations"
          component={Recommendations}
          options={{ title: "Create your account" }}
        />
        <Stack.Screen
          name="ReportIssue"
          component={ReportIssue}
          options={{ title: "Create your account" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

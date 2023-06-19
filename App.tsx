import "react-native-gesture-handler";
import { Button, StyleSheet, Text, View } from "react-native";
import SignInPage from "./Screens/SignIn";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import SignUp from "./Screens/SignUp";
import { HomepageScreen } from "./Screens/HomepageScreen";
import About from "./Screens/About";
import CalendarScreen from "./Screens/Calendar";
import LostFound from "./Screens/LostFound";
import ManagementAnnouncements from "./Screens/ManagementAnnouncements";
import Marketplace from "./Screens/Marketplace";
import Recommendations from "./Screens/Recommendations";
import ReportIssue from "./Screens/ReportIssue";
import FindCommunity from "./Screens/FindCommunity";
import CreateCommunity from "./Screens/CreateCommunity";
import PostAnnouncement from "./Screens/PostAnnouncement";
import { Communities } from "./Screens/Communities";
import AddEvent from "./Screens/AddEvent";
import { QueryClient, QueryClientProvider } from "react-query";
import ProfileSetup from "./Screens/ProfileSetup";
import Header from "./comp/Header";
import HeaderRight from "./comp/HeaderRight";
import Chat from "./Screens/Chat";
import { FindCreate } from "./Screens/FindCreate";

import { MyContext } from "./Context";

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

import colours from "./constants/colours";
import { useState } from "react";

const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  const [userContext, setUserContext] = useState({});

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <MyContext.Provider value={{ userContext, setUserContext }}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="HomepageScreen"
            screenOptions={{
              headerTitle: () => <Header />,
              headerRight: () => <HeaderRight />,
              headerStyle: {
                backgroundColor: colours.primary,
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              drawerLabelStyle: {
                fontFamily: "Poppins_400Regular",
              },
            }}
          >
            {/* <Drawer.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Create your account" }}
        /> */}
            {!userContext?.userName ? (
              <Drawer.Screen
                name="SignIn"
                component={SignInPage}
                options={{ title: "Welcome" }}
              />
            ) : (
              <>
                <Drawer.Screen
                  name="HomepageScreen"
                  component={HomepageScreen}
                  options={{ title: "Dashboard" }}
                />
                <Drawer.Screen
                  name="ProfileSetup"
                  component={ProfileSetup}
                  options={{ title: "ProfileSetup" }}
                />
                <Drawer.Screen
                  name="About"
                  component={About}
                  options={{ title: "About" }}
                />
                <Drawer.Screen
                  name="Calendar"
                  component={CalendarScreen}
                  options={{ title: "Calendar" }}
                />
                <Drawer.Screen
                  name="LostFound"
                  component={LostFound}
                  options={{ title: "Lost & Found" }}
                />
                <Drawer.Screen
                  name="ManagementAnnouncements"
                  component={ManagementAnnouncements}
                  options={{ title: "Management Announcements" }}
                />
                <Drawer.Screen
                  name="Marketplace"
                  component={Marketplace}
                  options={{ title: "Marketplace" }}
                />
                <Drawer.Screen
                  name="Recommendations"
                  component={Recommendations}
                  options={{ title: "Recommendations" }}
                />
                <Drawer.Screen
                  name="ReportIssue"
                  component={ReportIssue}
                  options={{ title: "Report an Issue" }}
                />
                <Drawer.Screen
                  name="FindCommunity"
                  component={FindCommunity}
                  options={{ title: "Find Community" }}
                />
                <Drawer.Screen
                  name="Chat"
                  component={Chat}
                  options={{ title: "Chat" }}
                />
                <Drawer.Screen
                  name="CreateCommunity"
                  component={CreateCommunity}
                  options={{ title: "Create a Community" }}
                />
                <Drawer.Screen
                  name="FindCreate"
                  component={FindCreate}
                  options={{ title: "FindCreate" }}
                />
                <Drawer.Screen
                  name="PostAnnouncement"
                  component={PostAnnouncement}
                  options={{ title: "Post an Announcement" }}
                />
                <Drawer.Screen
                  name="AddEvent"
                  component={AddEvent}
                  options={{ title: "AddEvent" }}
                />
              </>
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    </QueryClientProvider>
  );
}

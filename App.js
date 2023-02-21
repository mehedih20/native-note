import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AllNotes from "./screens/AllNotes";
import AddNotes from "./screens/AddNotes";
import SingleNote from "./screens/SingleNote";
import { AppProvider } from "./context/context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const NotesHome = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#222831" },
        headerTintColor: "#EEEEEE",
        tabBarStyle: { backgroundColor: "#222831" },
        tabBarActiveTintColor: "#EEEEEE",
        tabBarInactiveTintColor: "#635985",
        headerTitleStyle: { fontFamily: "font-mynerve", fontSize: 24 },
      }}
    >
      <BottomTabs.Screen
        name="AllNotes"
        component={AllNotes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="notebook" color={color} size={size} />
          ),
          title: "All Notes",
        }}
      />
      <BottomTabs.Screen
        name="AddNotes"
        component={AddNotes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="note" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "font-ceveat": require("./assets/fonts/Caveat-VariableFont_wght.ttf"),
    "font-monst": require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
    "font-mynerve": require("./assets/fonts/Mynerve-Regular.ttf"),
    "font-satisfy": require("./assets/fonts/Satisfy-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <AppProvider>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#222831" },
              headerTintColor: "#EEEEEE",
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen
              name="NotesHome"
              component={NotesHome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="SingleNote" component={SingleNote} />
          </Stack.Navigator>
        </AppProvider>
      </NavigationContainer>
    </>
  );
}

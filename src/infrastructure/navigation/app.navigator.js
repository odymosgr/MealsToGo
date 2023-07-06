import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { RestaurantsContextProvider } from "../../services/restaurant/restaurant.context.js";
import { LocationContextProvider } from "../../services/location/location.context.js";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context.js";
import { SettingsNavigator } from "./settings.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "restaurant",
  Map: "compass",
  Settings: "settings",
};

const tabBarIcon =
  (iconName) =>
  ({ size, color }) =>
    <Ionicons name={iconName} size={size} color={color} />;
const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: tabBarIcon(iconName),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  };
};

export const AppNavigator = () => {
  return (
    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
              options={{ headerShown: false }}
              name="Restaurants"
              component={RestaurantsNavigator}
            />
            <Tab.Screen
              options={{ headerShown: false }}
              name="Map"
              component={MapScreen}
            />
            <Tab.Screen
              options={{ headerShown: false }}
              name="Settings"
              component={SettingsNavigator}
            />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
};

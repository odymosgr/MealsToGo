import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Main"
        component={() => {
          return (
            <View>
              <Text>Hi! from main component</Text>
            </View>
          );
        }}
      />
      <Stack.Screen
        name="Login"
        component={() => {
          return (
            <View>
              <Text>Hi! from login component</Text>
            </View>
          );
        }}
      />
    </Stack.Navigator>
  );
};

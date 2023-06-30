import React, { useContext } from "react";
import { AppNavigator } from "./app.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { AccountNavigator } from "./account.navigator.js";
import { NavigationContainer } from "@react-navigation/native";

export const Navigation = () => {
  const { isAutthenticated } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      {isAutthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

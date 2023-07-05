import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme/index.js";
import { Navigation } from "./src/infrastructure/navigation/index.js";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAp2SIgcvqFBJN2sjK9c0fHnabttdrNUYY",
  authDomain: "mealstogo-c3611.firebaseapp.com",
  projectId: "mealstogo-c3611",
  storageBucket: "mealstogo-c3611.appspot.com",
  messagingSenderId: "226485718954",
  appId: "1:226485718954:web:fbbc314d7b0ffe48ec25d3",
};

let auth;
if (getApps().length < 1) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}

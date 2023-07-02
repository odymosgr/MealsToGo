import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme/index.js";
import { RestaurantsContextProvider } from "./src/services/restaurant/restaurant.context.js";
import { LocationContextProvider } from "./src/services/location/location.context.js";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context.js";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      signInWithEmailAndPassword(auth, "mo@binni.io", "test123")
        .then((user) => {
          setIsAuthenticated(true);
        })
        .catch((e) => {
          console.error(e);
        });
    }, 100);
  }, []);

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  if (!isAuthenticated) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <FavouritesContextProvider>
            <LocationContextProvider>
              <RestaurantsContextProvider>
                <Navigation />
              </RestaurantsContextProvider>
            </LocationContextProvider>
          </FavouritesContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}

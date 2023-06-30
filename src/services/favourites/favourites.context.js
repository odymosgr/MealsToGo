import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const saveFavourites = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@favourites", jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("@favourites");
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  const addFavourite = (restaurant) => {
    favourites.forEach((r) => {
      if (r.placeId === restaurant.placeId) {
        console.log("exiting early from addFavourite, this shouldn't happen");
        return;
      }
    });
    setFavourites([...favourites, restaurant]);
  };

  const removeFilterFun = (rToRemove) => {
    return (r) => {
      return r.placeId !== rToRemove.placeId;
    };
  };

  const removeFavourite = (restaurant) => {
    const newFavourites = favourites.filter(removeFilterFun(restaurant));
    setFavourites(newFavourites);
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

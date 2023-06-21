import React, { createContext, useState } from "react";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

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

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

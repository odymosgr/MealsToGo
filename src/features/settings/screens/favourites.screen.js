import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../../src/components/utility/safe-area.component";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { RestaurantList } from "../../restaurants/components/restaurant-list.styles";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const FavouritesScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <SafeArea>
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text center>No Favourite Yet</Text>
    </NoFavouritesArea>
  );
};

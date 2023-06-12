import React, { useContext } from "react";
import { FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurant/restaurant.context";

const SearchContainer = styled.View`
  padding-right: ${(props) => props.theme.space[4]};
  padding-left: ${(props) => props.theme.space[4]};
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

const RestaurantListContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const RestaurantSearchBar = styled(Searchbar).attrs({
  elevation: 3,
  placeholder: "Search",
})`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;

export const RestaurantsScreen = () => {
  const restaurantsContext = useContext(RestaurantsContext);
  return (
    <SafeArea>
      <SearchContainer>
        <RestaurantSearchBar />
      </SearchContainer>
      <RestaurantListContainer>
        <RestaurantList
          data={restaurantsContext.restaurants}
          renderItem={() => <RestaurantInfoCard />}
          keyExtractor={(item) => item.name}
        />
      </RestaurantListContainer>
    </SafeArea>
  );
};

import React, { useContext } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurant/restaurant.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Search } from "../components/search.component";

const RestaurantListContainer = styled(View)`
  flex: 1;
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  marginleft: -25px;
`;

const LoadingContainer = styled(View)`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-25px, -25px);
  z-index: 1;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, error, restaurants } = useContext(RestaurantsContext);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={"red"} />
        </LoadingContainer>
      )}
      <Search />
      <RestaurantListContainer>
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("RestaurantDetail")}
              >
                <Spacer position="bottom" size="large">
                  <RestaurantInfoCard restaurant={item} />
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </RestaurantListContainer>
    </SafeArea>
  );
};

import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import { RestaurantsContext } from "../../../services/restaurant/restaurant.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Search } from "../components/search.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
// import { isAnimatedValue } from "react-native-paper/lib/typescript/src/styles/overlay";
import { RestaurantList } from "../components/restaurant-list.styles";

const RestaurantListContainer = styled.View`
  flex: 1;
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;

const Loading = styled(ActivityIndicator)`
  marginleft: -25px;
`;

const LoadingContainer = styled.View`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-25px, -25px);
  z-index: 1;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(true);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={"red"} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <RestaurantListContainer>
        <RestaurantList
          data={restaurants}
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
                  <FadeInView>
                    <RestaurantInfoCard restaurant={item} />
                  </FadeInView>
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

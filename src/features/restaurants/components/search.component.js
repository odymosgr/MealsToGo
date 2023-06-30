import React, { useContext, useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
  background-color: ${(props) => props.theme.colors.ui.tertiery};
  padding-right: ${(props) => props.theme.space[4]};
  padding-left: ${(props) => props.theme.space[4]};
  padding-top: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
  border-bottom-color: ${(props) => props.theme.colors.ui.secondary};
  border-bottom-width: 3px;
`;

export const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  // const RestaurantSearchBar = styled(Searchbar).attrs({
  //   elevation: 3,
  //   icon: isFavouritesToggled ? "heart" : "heart-outline",
  //   onIconPress: () => {
  //     onFavouritesToggle;
  //   },
  //   placeholder: "Search for a location",
  //   value: searchKeyword,
  //   onSubmitEditing: () => {
  //     search(searchKeyword);
  //   },
  //   onChangeText: (text) => {
  //     setSearchKeyword(text);
  //   },
  // })`
  //   background-color: ${(props) => props.theme.colors.ui.tertiary};
  // `;

  const onChangeSearch = (text) => setSearchKeyword(text);

  return (
    <SearchContainer>
      <Searchbar
        icon={isFavouritesToggled ? "heart" : "heart-outline"}
        onIconPress={onFavouritesToggle}
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={onChangeSearch}
      />
    </SearchContainer>
  );
};

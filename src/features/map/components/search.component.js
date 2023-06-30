import React, { useContext, useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { View } from "react-native";

import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled(View)`
  position: absolute;
  z-index: 999;
  top: 40px;
  width: 100%;
  padding-right: ${(props) => props.theme.space[4]};
  padding-left: ${(props) => props.theme.space[4]};
  padding-top: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
`;

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  const onChangeSearch = (text) => setSearchKeyword(text);

  // const RestaurantSearchBar = styled(Searchbar).attrs({
  //   elevation: 3,
  //   placeholder: "Search for a location",
  //   icon: "map",
  //   value: searchKeyword,
  //   onSubmitEditing: () => {
  //     search(searchKeyword);
  //   },
  //   onChangeText: onChangeSearch,
  // })`
  //   background-color: ${(props) => props.theme.colors.ui.tertiary};
  // `;

  return (
    <SearchContainer>
      <Searchbar
        elevation={3}
        icon="map"
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

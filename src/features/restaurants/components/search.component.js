import React, { useContext, useState } from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { View } from "react-native";

import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.ui.secondary};
  padding-right: ${(props) => props.theme.space[4]};
  padding-left: ${(props) => props.theme.space[4]};
  padding-top: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
`;

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  const RestaurantSearchBar = styled(Searchbar).attrs({
    elevation: 3,
    placeholder: "Search for a location",
    value: searchKeyword,
    onSubmitEditing: () => {
      search(searchKeyword);
    },
    onChangeText: (text) => {
      setSearchKeyword(text);
    },
  })`
    background-color: ${(props) => props.theme.colors.ui.tertiary};
  `;

  return (
    <SearchContainer>
      <RestaurantSearchBar />
    </SearchContainer>
  );
};

import React from "react";
import { Text } from "../typography/text.component";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebView = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = ({ restaurant, isMap }) => {
  const CustomImage = isAndroid && isMap ? CompactWebView : CompactImage;
  return (
    <Item>
      <CustomImage source={{ uri: restaurant.photos[0] }}></CustomImage>
      <Text center variant="caption" numberOfLines={3}>
        {restaurant.name}
      </Text>
    </Item>
  );
};

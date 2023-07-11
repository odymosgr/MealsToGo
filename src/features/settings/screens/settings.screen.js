import React, { useContext, useState, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../../src/components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

const AvatarIcon = styled(Avatar.Icon)`
  background-color: #2182bd;
`;

const ListDoorIcon = (props) => {
  return <List.Icon {...props} color="black" icon="door" />;
};

const ListHeartIcon = (props) => {
  return <List.Icon {...props} color="black" icon="heart" />;
};

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
      // eslint-disable-next-line prettier/prettier
    }, [user]),
  );

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {!photo && <AvatarIcon size={180} icon="human" />}
          {photo && <Avatar.Image size={180} source={{ uri: photo }} />}
        </TouchableOpacity>
        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favourites"
          left={ListHeartIcon}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem title="Logout" left={ListDoorIcon} onPress={onLogout} />
      </List.Section>
    </SafeArea>
  );
};

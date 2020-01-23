import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Container, Content, Item, Input, Header } from "native-base";

const RegisterScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header>
          <Text>REGISTER FORM</Text>
        </Header>
        <Content>
          <Item rounded>
            <Input placeholder="Rounded Textbox" />
          </Item>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default RegisterScreen;

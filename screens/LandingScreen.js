import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Container, Text } from "native-base";

const LandingScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("RegisterScreen");
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={styles.container}>
        <Text>Landing Page</Text>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#40bfc1",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LandingScreen;

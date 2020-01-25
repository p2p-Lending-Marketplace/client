import React from "react";
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Container, Header, View, Text } from "native-base";
import colors from "../assets/colors";

const MemberScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header style={styles.container}></Header>
        <View style={styles.underHeader}>
          <Text>tes</Text>
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.contentTop}>
            <Text>TOP</Text>
          </View>
          <View style={styles.contentMid}>
            <Text>MID</Text>
          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBackground,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  underHeader: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    flexDirection: "row",
    justifyContent: "center"
  },
  contentWrapper: {
    flex: 4,
    backgroundColor: colors.whiteBackground,
    alignItems: "center"
  },
  contentTop: {
    width: "90%",
    height: "30%",
    position: "absolute",
    top: "-6%",
    borderRadius: 15,
    backgroundColor: "white",
    flexDirection: "row"
  },
  contentMid: {
    width: "90%",
    height: "20%",
    position: "absolute",
    top: "30%",
    borderRadius: 15,
    backgroundColor: "white",
    flexDirection: "row"
  }
});

export default MemberScreen;

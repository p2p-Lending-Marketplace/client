import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Container, Header, View, Text } from "native-base";
import colors from "../assets/colors";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header style={styles.container}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate("Setting")}
          >
            <Image
              source={{
                uri:
                  "https://cdn3.iconfinder.com/data/icons/ui-essentials-v2/1250/settings-tools-setting-phone-android-app-tool-512.png"
              }}
              style={{ width: "60%", height: "60%" }}
            />
          </TouchableOpacity>
        </Header>
        <View style={styles.underHeader}>
          <View style={{ width: "30%", alignItems: "center" }}>
            <Image
              source={require("../assets/images/man.png")}
              style={styles.imageUnderHeader}
            ></Image>
          </View>
          <View style={{ width: "60%", paddingTop: "2%" }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Fintech Friend
            </Text>
            <Text style={{ color: "white", fontSize: 12 }}>+628*****3207</Text>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.contentTop}>
            <TouchableOpacity
              onPress={() => navigation.navigate("History")}
              style={styles.cardWrapper}
            >
              <Image
                source={require("../assets/images/history.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text
                style={{ fontSize: 15, marginTop: "10%", color: "#758184" }}
              >
                History
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Help Center")}
              style={styles.cardWrapper}
            >
              <Image
                source={require("../assets/images/helpcenter.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text
                style={{ fontSize: 15, marginTop: "10%", color: "#758184" }}
              >
                Help Center
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Upload Data")}
              style={styles.cardWrapper}
            >
              <Image
                source={require("../assets/images/information.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text
                style={{ fontSize: 15, marginTop: "10%", color: "#758184" }}
              >
                Information
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentMid}>
            <View style={styles.cardWrapperMid}>
              <View style={{ flex: 3 }}>
                <View style={{ flexDirection: "row", paddingHorizontal: 30 }}>
                  <Text>Reward up to</Text>
                  <Text style={{ color: "#12cad6" }}> 1 juta</Text>
                </View>
                <View style={{ paddingHorizontal: 30 }}>
                  <Text style={{ color: "#758184", fontSize: 14 }}>
                    Refer friends to get it
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../assets/images/wallet.png")}
                  style={{ width: "60%", height: "60%" }}
                />
              </View>
            </View>
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
  header: {
    width: "12%",
    justifyContent: "center",
    alignItems: "center"
  },
  underHeader: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    flexDirection: "row",
    justifyContent: "center"
  },
  imageUnderHeader: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "white"
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
  cardWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentMid: {
    width: "90%",
    height: "20%",
    position: "absolute",
    top: "30%",
    borderRadius: 15,
    backgroundColor: "white",
    flexDirection: "row"
  },
  cardWrapperMid: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});

export default ProfileScreen;

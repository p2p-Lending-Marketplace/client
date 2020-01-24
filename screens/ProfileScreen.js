import React from "react";
import { Image, SafeAreaView } from "react-native";
import { Container, Header, View, Text } from "native-base";
import colors from "../assets/colors";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header
          style={{
            backgroundColor: colors.mainBackground,
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <View
            style={{
              width: "12%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={{
                uri:
                  "https://cdn3.iconfinder.com/data/icons/ui-essentials-v2/1250/settings-tools-setting-phone-android-app-tool-512.png"
              }}
              style={{ width: "60%", height: "60%" }}
            />
          </View>
        </Header>
        <View
          style={{
            flex: 1,
            backgroundColor: "#12cad6",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <View style={{ width: "30%", alignItems: "center" }}>
            <Image
              source={require("../assets/images/man.png")}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                backgroundColor: "white"
              }}
            ></Image>
          </View>
          <View style={{ width: "60%", paddingTop: "2%" }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Fintech Friend
            </Text>
            <Text style={{ color: "white", fontSize: 12 }}>+628*****3207</Text>
          </View>
        </View>
        <View
          style={{
            flex: 4,
            backgroundColor: "#f1f9f9",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: "90%",
              height: "30%",
              position: "absolute",
              top: "-6%",
              borderRadius: 15,
              backgroundColor: "white",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
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
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
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
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
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
            </View>
          </View>
          <View
            style={{
              width: "90%",
              height: "20%",
              position: "absolute",
              top: "30%",
              borderRadius: 15,
              backgroundColor: "white",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
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

export default ProfileScreen;

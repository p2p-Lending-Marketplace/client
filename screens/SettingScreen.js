import React from "react";
import { View, Text, SafeAreaView, Image, AsyncStorage } from "react-native";
import colors from "../assets/colors";
import { APP_NAME } from "../assets/variables"
import { TouchableOpacity } from "react-native-gesture-handler";

const SettingScreen = ({navigation}) => {
  const handleSignOut = async () => {
    console.log(await AsyncStorage.getAllKeys())
    await AsyncStorage.removeItem(APP_NAME + ":phoneNumber")
    await AsyncStorage.removeItem(APP_NAME + ':user')
    navigation.navigate("LandingScreen")
  }
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", paddingVertical: "5%", backgroundColor: colors.whiteBackground }}
    >
      <View style={{ width: "90%" }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 13
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "90%",
                  fontSize: 15,
                  color: "#1b262c"
                }}
              >
                Version
              </Text>
              {/* <Image
                source={require("../assets/images/rightArrow.png")}
                style={{ width: 15, height: 15 }}
              /> */}
              <Text
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "90%",
                  fontSize: 15,
                  color: "#1b262c"
                }}
              >
                Beta
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ width: "90%", marginVertical: "4%" }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 13
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <TouchableOpacity style={{flexDirection: "row"}} onPress={() => {
                handleSignOut()
              }} >
                <Text
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "90%",
                    fontSize: 15,
                    color: "#1b262c",
                  }}
                >
                  Sign Out
                </Text>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Image
                    source={require("../assets/images/rightArrow.png")}
                    style={{ width: 15, height: 15}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

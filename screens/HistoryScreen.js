import React, { useState } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import colors from "../assets/colors";

const HistoryScreen = () => {
  const [data, setData] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {data ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 10
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "80%",
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              paddingVertical: 16,
              marginVertical: 15
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Image
                source={{
                  uri:
                    "https://2.bp.blogspot.com/-zWLAAe6Anjg/V4M5xhr5KkI/AAAAAAAAGAA/8EbH6tExtMMaO-hqg436mHyF2iaFAi7zwCLcB/s1600/unnamed.png"
                }}
                style={{ height: 70, width: 70 }}
              />
            </View>
            <View>
              <Text>02/02/2020</Text>
              <Text>Akulaku</Text>
              <Text>Descision: Accepted</Text>
              <Text>Nominal: Rp 5 Juta</Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              width: "80%",
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              paddingVertical: 16,
              marginVertical: 15
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Image
                source={{
                  uri:
                    "https://dayair.org/wp-content/uploads/2019/01/Refinance-Icon.png"
                }}
                style={{ height: 70, width: 70 }}
              />
            </View>
            <View>
              <Text>02/02/2020</Text>
              <Text>Akulaku</Text>
              <Text>Descision: Accepted</Text>
              <Text>Nominal: Rp 5 Juta</Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              width: "80%",
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              paddingVertical: 16,
              marginVertical: 15
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Image
                source={{
                  uri: "https://www.trueskycu.org/uploads/WebpageLogo.jpg"
                }}
                style={{ height: 70, width: 70 }}
              />
            </View>
            <View>
              <Text>02/02/2020</Text>
              <Text>Akulaku</Text>
              <Text>Descision: Accepted</Text>
              <Text>Nominal: Rp 5 Juta</Text>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Image
            source={require("../assets/images/nulldocument.png")}
            style={{ width: 150, height: 150 }}
          />
          <Text style={{ color: colors.textColor, marginTop: 25 }}>
            You don't have any history yet
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HistoryScreen;

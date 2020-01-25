import React from "react";
import { View, Text, Image } from "react-native";
import colors from "../assets/colors";

const QuestionComponent = ({ data }) => {
  console.log(data);
  return (
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
          {data.title}
        </Text>
        <Image
          source={require("../assets/images/rightArrow.png")}
          style={{ width: 15, height: 15 }}
        />
      </View>
      <View
        style={{
          width: "90%",
          borderTopColor: colors.textColor,
          borderTopWidth: 0.2,
          marginVertical: 10
        }}
      ></View>
    </View>
  );
};

export default QuestionComponent;

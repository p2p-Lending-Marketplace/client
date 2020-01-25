import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { QuestionComponent } from "../components";
import colors from "../assets/colors";

const HelpCenterScreen = ({ navigation }) => {
  const listQuestion = [
    {
      title: "How do i apply for my first join a member in This App?",
      answer: "tesa sadasdas dasdas",
      point: "apply"
    },
    {
      title: "What are the requirements for a fontech application?",
      answer: "dasdasdsadas dasdsa",
      point: "requirements"
    }
  ];

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ flex: 1, width: "90%" }}>
        <Text
          style={{
            color: colors.textColor,
            fontSize: 13,
            marginLeft: 10,
            marginVertical: 5
          }}
        >
          Top Question
        </Text>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 13
          }}
        >
          {listQuestion.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("Answer")}
                // onPress={() => alert("tes")}
              >
                <QuestionComponent data={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HelpCenterScreen;

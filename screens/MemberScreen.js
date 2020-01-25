import React from "react";
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { Container, Header, View, Text } from "native-base";
import colors from "../assets/colors";
import Constants from 'expo-constants';

const MemberScreen = ({navigation}) => {
  // Variables
  const dummiesData = ['','','','','','','','']

  // Function
  const goToDetailMember = (data) => {
    console.log("hello")
    navigation.navigate("Detail Fintech")
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ backgroundColor: colors.whiteBackground }}>
        <Header
          style={{
            backgroundColor: colors.mainBackground,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Constants.statusBarHeight
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#FFF' }}>
            Fintech Member
          </Text>
        </Header>
        <ScrollView style={{ flex: 1, marginHorizontal: 10, paddingTop: 10 }} showsVerticalScrollIndicator={false}>
          {
            dummiesData.map((data, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => {
                  goToDetailMember()
                }}>
                  <View style={styles.content}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        source={{
                          uri:
                            'https://www.logoisus.com/wp-content/uploads/2018/04/blue_triangle_finance.jpg'
                        }}
                        style={{ width: 80, height: 80 }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 3,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Text style={{ fontSize: 20, fontWeight: '700' }}>Fintech Member Name</Text>
                      <Text>7% interest per year</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
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
  content: {
    flexDirection: "row",
    margin: 10,
    borderRadius: 7,
    height: 100,
    backgroundColor: "#FFF",
    padding: 10
  }
});

export default MemberScreen;

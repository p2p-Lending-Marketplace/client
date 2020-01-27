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
import { useQuery } from "@apollo/react-hooks"
import { FETCH_FINTECH_MEMBER } from "../API/graphQuery"

const MemberScreen = ({navigation}) => {
  // Variables
  // Function
  const goToDetailMember = (id) => {
    navigation.navigate("Detail Fintech", { id })
  }

  const { loading, error, data } = useQuery(FETCH_FINTECH_MEMBER)

  if(loading){
    return (
      <Text>Loading...</Text>
    )
  }
  if(data){
    const members = data.getAllFinteches
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container style={{ backgroundColor: colors.whiteBackground }}>
          <ScrollView style={{ flex: 1, marginHorizontal: 10, paddingTop: 10 }} showsVerticalScrollIndicator={false}>
            {
              members.map((member, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => {
                    goToDetailMember(member._id)
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
                            uri: member.logoURL
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
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>{member.company_name}</Text>
                        <Text>Interest: {member.min_interest} - {member.max_interest}% p.a.</Text>
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
}
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
    padding: 10,
    elevation: 5
  }
});

export default MemberScreen;

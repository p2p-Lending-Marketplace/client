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
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      goToDetailMember(member._id)
                    }}
                  >
                    <View style={styles.content}>
                      <View
                        style={{
                          flex: 1,
                          marginTop: 5, 
                        }}
                      >
                        <Image
                          source={{
                            uri: member.logoURL,
                          }}
                          style={{ width: 30, height: 30 }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 7,
                          flexDirection: 'row',
                        }}
                      >
                        <View style={{ flex: 1}}>
                          <Text style={{ fontSize: 15, fontWeight: '700' }}>
                            {member.company_name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '700',
                              color: 'grey',
                            }}
                          >
                            Interest:
                          </Text>
                          <Text style={{ fontSize: 13, marginBottom: 5 }}>
                            {member.min_interest} - {member.max_interest}% p.a.
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '700',
                              color: 'grey',
                            }}
                          >
                            Total Applications:
                          </Text>
                          <Text style={{ fontSize: 13 }}>15.230</Text>
                        </View>
                        <View style={{flex: 1}}>
                          <Text style={{ fontSize: 15, fontWeight: '700' }}>
                            
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '700',
                              color: 'grey',
                            }}
                          >
                            % Acceptance:
                          </Text>
                          <Text style={{ fontSize: 13, marginBottom: 5 }}>
                            30%
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '700',
                              color: 'grey',
                            }}
                          >
                            Average Credit Score:
                          </Text>
                          <Text style={{ fontSize: 13 }}>A</Text>
                        </View>
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  content: {
    borderLeftColor: '#4AE54A',
    borderLeftWidth: 4,
    flexDirection: 'row',
    margin: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#FFF',
    padding: 10,
    elevation: 5,
  },
})

export default MemberScreen;

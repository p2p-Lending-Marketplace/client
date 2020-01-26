import React from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import colors from "../assets/colors"
import Divider from "react-native-divider"
import { useQuery } from "@apollo/react-hooks"
import { FETCH_FINTECH_BY_ID } from "../API/graphQuery"

const DetailScreen = ({ navigation }) => {
  // Variables
  const id = navigation.getParam("id")
  const { loading, error, data } = useQuery(FETCH_FINTECH_BY_ID, {
    variables: {
      id
    }
  })

  // Functions


  if(loading){
    return(
      <Text>
        Loading
      </Text>
    )
  }
  if(data){
    const company = data.getFintechById
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.whiteBackground }}
      >
        <ScrollView style={{ flex: 1, paddingTop: 10, marginHorizontal: 20 }}>
          {/* Title */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '700', color: colors.mainBackground }}>
              {company.company_name}
            </Text>
          </View>
          {/* Image and Button Apply */}
          <View style={{ flexDirection: "row"}}>
                <View style={{flex: 1}}>
                    <Image
                    source={{
                        uri: company.logoURL
                    }}
                    style={{ width: 150, height: 150 }}
                    />
                </View>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                  <Text>Interest: {company.min_interest} - {company.max_interest}% p.a.</Text>
                    {/* <View style={{}}>
                        <Image source={require("../assets/icons/rp-symbol.png")} />
                        <Text>
                            7 % Interest per year
                        </Text>
                    </View> */}
                </View>
              </View>
          {/* Description */}
          <View style={{ marginVertical: 10 }}>
            <Divider borderColor={colors.mainBackground} orientation="left">
                <Text style={{fontWeight: '700', color: colors.mainBackground}}>
                    Description
                </Text>
            </Divider>
          </View>
          <View>
            <Text style={{textAlign: "justify", color: colors.mainBackground}}>
              {company.description}
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity style={{width: 150, backgroundColor: colors.mainBackground, borderRadius: 7, marginHorizontal: 5, marginVertical: 30}}>
                    <Text style={{textAlign: "center", paddingVertical: 5, fontSize: 15, color: "#FFF", fontWeight: '700'}}>
                        Apply Now
                    </Text>
                </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default DetailScreen

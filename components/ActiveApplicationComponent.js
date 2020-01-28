import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import colors from '../assets/colors'
import Divider from 'react-native-divider'
import { format } from 'date-fns'
import rupiah from 'rupiah-format'


const ActiveApplicationComponent = ({data}) => {
    // Variables
    const applications = data.applications
    return (
      <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
        <View
          style={{
            width: '90%',
          }}
        >
          <Divider borderColor={colors.mainBackground} orientation="left">
            <Text
              style={{
                fontWeight: '700',
                color: colors.mainBackground,
              }}
            >
              Active Application
            </Text>
          </Divider>
          {applications.map((application, index) => {
            return (
              <TouchableOpacity key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    borderRadius: 7,
                    backgroundColor: '#FFF',
                    padding: 10,
                    elevation: 5,
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      source={{
                        uri: application.logoURL,
                      }}
                      style={{ width: 80, height: 80 }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 4,
                      justifyContent: 'center',
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={{ fontWeight: 'bold' }}>Application Date: </Text>
                    <Text>
                      {format(new Date(application.createdAt), 'do MMMM YYY')}
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>Fintech Company: </Text>
                    <Text>{application.company_name}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Amount: </Text>
                    <Text>{rupiah.convert(application.amount)}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Loan Term: </Text>
                    <Text>{application.loan_term}</Text>
                  </View>
                  <View style={{ alignItems: 'center', flex: 2 }}>
                    <Text>{application.decision}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
}

export default ActiveApplicationComponent

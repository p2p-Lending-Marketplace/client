import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import colors from '../assets/colors'
import Divider from 'react-native-divider'
import { format } from 'date-fns'
import rupiah from 'rupiah-format'

const ActiveApplicationComponent = ({ data }) => {
  // Variables
  const applications = data.applications
  const handleSelect = data.handleSelect
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      }}
    >
      <View
        style={{
          width: '90%',
        }}
      >
        {applications.map((application, index) => {
          return (
            <TouchableOpacity key={index}>
              <View
                style={{
                  borderLeftColor: '#4AE54A',
                  borderLeftWidth: 4,
                  flexDirection: 'row',
                  margin: 10,
                  borderBottomRightRadius: 5,
                  borderTopRightRadius: 5,
                  backgroundColor: '#FFF',
                  padding: 10,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '81%',
                    top: '5%',
                  }}
                >
                  <View
                    style={{
                      width: 100,
                      padding: 3,
                      paddingLeft: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#4AE54A',
                      // height: ,
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3,
                      borderBottomLeftRadius: 3,
                    }}
                  >
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>
                      {application.decision.toUpperCase()}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 0,
                      height: 0,
                      left: '80%',
                      backgroundColor: 'transparent',
                      borderStyle: 'solid',
                      borderRightWidth: 20,
                      borderTopWidth: 20,
                      borderRightColor: 'transparent',
                      borderTopColor: '#0F9200',
                      transform: [{ rotateX: '0deg' }],
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: 5,
                  }}
                >
                  <Image
                    source={{
                      uri: application.fintech_id.logoURL,
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
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>
                      {application.fintech_id.company_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '700',
                        color: 'grey',
                      }}
                    >
                      Application Date:
                    </Text>
                    <Text style={{ fontSize: 13, marginBottom: 5 }}>
                      {format(new Date(application.createdAt), 'do MMMM YYY')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '700',
                        color: 'grey',
                      }}
                    >
                      Loan Term:
                    </Text>
                    <Text style={{ fontSize: 13 }}>
                      {application.loan_term} Months
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700' }}></Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '700',
                        color: 'grey',
                      }}
                    >
                      Amount:
                    </Text>
                    <Text style={{ fontSize: 13, marginBottom: 5 }}>
                      {rupiah.convert(application.amount).split(',')[0]}
                    </Text>
                    {application.decision === 'accepted' &&
                      application.status === 'pending' && (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              marginVertical: 10,
                              backgroundColor: colors.mainBackground,
                              width: 80,
                              borderRadius: 5,
                            }}
                            onPress={() => {
                              handleSelect(application._id)
                            }}
                          >
                            <Text
                              style={{
                                textAlign: 'center',
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                color: '#FFF',
                              }}
                            >
                              Select
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    {/* <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '700',
                          color: 'grey',
                        }}
                      >
                        Amount:
                      </Text>
                      <Text style={{ fontSize: 13, marginBottom: 5 }}>
                        {rupiah.convert(application.amount).split(',')[0]}
                      </Text> */}
                  </View>
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

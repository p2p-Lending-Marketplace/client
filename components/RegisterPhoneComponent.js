import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Item, Input, Form } from 'native-base'
import { phone } from '../assets/icons'
import colors from '../assets/colors'
const registerPhoneComponent = ({data}) => {
    // Variables
    const phoneNumber = data.phoneNumber
    const handleSubmitNumber = data.handleSubmitNumber
    const handleOnChangePhone = data.handleOnChangePhone

    // Function

    return (
        <View style={styles.container}>
            <Form style={styles.formRegister}>
                <View style={styles.labelContainer}>
                    <Image
                        source={{ uri: phone }}
                        style={styles.icon}
                    />
                    <Text style={styles.textRegion}>
                        +62
                    </Text>
                    <Item style={{ width: '60%' }} underline={false}>
                        <Input
                        keyboardType={'number-pad'}
                        style={styles.textInput}
                        value={phoneNumber}
                        placeholder="8123..."
                        placeholderTextColor="#FFF"
                        onChangeText={phoneNumber => {
                            handleOnChangePhone(phoneNumber)
                        }}
                        />
                    </Item>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmitNumber}
                    >
                        <Text style={styles.textButton}>
                        START
                        </Text>
                    </TouchableOpacity>
                </View>
            </Form>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: colors.secondBackground,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 10,
    },
    formRegister: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
    },
    containerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: '#FFF',
        width: '40%',
        padding: 10,
        borderRadius: 7,
    },
    textButton: {
        color: colors.secondBackground,
        textAlign: 'center',
        fontWeight: '700',
    },
    textInput: {
        fontSize: 15,
        color: '#FFF',
    },
    textRegion: {
        fontSize: 15,
        paddingLeft: 5,
        fontWeight: '700',
        color: '#FFF',
    },
    icon: {
        width: 30,
        height: 30,
    },
    labelContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
})

export default registerPhoneComponent

import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'

class IntroScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myText: "I'm ready to get swiped!",
      gestureName: 'none',
      backgroundColor: '#fff',
      currentPosition: "first"
    }
    this.onSwipeLeft = this.onSwipeLeft.bind(this)
    this.onSwipeRight = this.onSwipeRight.bind(this)
    this.onSwipe = this.onSwipe.bind(this)
  }
  

  onSwipeRight(gestureState) {
    if (this.state.currentPosition === 'second') {
      this.setState({ currentPosition: 'first' })
    } else if (this.state.currentPosition === 'third') {
      this.setState({ currentPosition: 'second' })
    }
  }

  onSwipeLeft(gestureState) {
      if (this.state.currentPosition === 'first') {
        this.setState({ currentPosition: 'second' })
      } else if (this.state.currentPosition === 'second') {
        this.setState({ currentPosition: 'third' })
      } else if (this.state.currentPosition === 'third') {
        const confirmed = this.props.navigation.getParam('confirmed')
        if (confirmed) {
          this.props.navigation.navigate('LoginScreen', { from: 'landing' })
        } else {
          this.props.navigation.navigate('tabNavigator')
        }
      }
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections
    this.setState({ gestureName: gestureName })
    switch (gestureName) {
      case SWIPE_RIGHT:
        if (this.state.currentPosition === 'second') {
          this.setState({ currentPosition: 'first' })
        } else if (this.state.currentPosition === 'third') {
          this.setState({ currentPosition: 'second' })
        }
        break
      case SWIPE_LEFT:
        if(this.state.currentPosition === "first"){
        this.setState({currentPosition: "second"})
        } else if(this.state.currentPosition === "second"){
        this.setState({ currentPosition: 'third' })
        } else if(this.state.currentPosition === "third"){
          const confirmed = this.props.navigation.getParam("confirmed")
          if(confirmed){
            this.props.navigation.navigate("LoginScreen", {from: "landing"})
          } else {
            this.props.navigation.navigate('tabNavigator')
          }
        }
        break
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    }

    return (
      <GestureRecognizer
        onSwipe={this.onSwipe}
        onSwipeLeft={this.onSwipeLeft}
        onSwipeRight={this.onSwipeRight}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor,
        }}
      >
        <View style={{ position: "absolute", top: '20%', width: '100%', justifyContent: "center", alignItems: "center"}}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{ width: 190, height: 64 }}
          />
        </View>
        {this.state.currentPosition === 'first' && (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
              }}
            >
              <Image
                source={require('../assets/images/second.jpg')}
                style={{ width: 150, height: 150 }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  fontSize: 20,
                }}
              >
                Get all fintech list, complete your data at once, get your
                credit score
              </Text>
            </View>
          </View>
        )}
        {this.state.currentPosition === 'second' && (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
              }}
            >
              <Image
                source={require('../assets/images/start.jpg')}
                style={{ width: 150, height: 150 }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  fontSize: 20,
                }}
              >
                Reimburse your accepted loan,
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                }}
              >
                All in One Platform.
              </Text>
            </View>
          </View>
        )}
        {/* <Text style={{marginVertical: 200, marginHorizontal: 100}}>{this.state.currentPosition}</Text> */}
      </GestureRecognizer>
    )
  }
}

export default IntroScreen

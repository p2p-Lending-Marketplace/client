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

  onSwipeLeft(gestureState) {
    if (this.state.currentPosition === 'second') {
      this.setState({ currentPosition: 'first' })
    } else if (this.state.currentPosition === 'third') {
      this.setState({ currentPosition: 'second' })
    }
  }

  onSwipeRight(gestureState) {
      if (this.state.currentPosition === 'first') {
        this.setState({ currentPosition: 'second' })
      } else if (this.state.currentPosition === 'second') {
        this.setState({ currentPosition: 'third' })
      } else if (this.state.currentPosition === 'third') {
        this.props.navigation.navigate('tabNavigator')
      }
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections
    this.setState({ gestureName: gestureName })
    switch (gestureName) {
      case SWIPE_LEFT:
        if (this.state.currentPosition === 'second') {
          this.setState({ currentPosition: 'first' })
        } else if (this.state.currentPosition === 'third') {
          this.setState({ currentPosition: 'second' })
        }
        break
      case SWIPE_RIGHT:
        if(this.state.currentPosition === "first"){
        this.setState({currentPosition: "second"})
        } else if(this.state.currentPosition === "second"){
        this.setState({ currentPosition: 'third' })
        } else if(this.state.currentPosition === "third"){
        this.props.navigation.navigate('tabNavigator')
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
          {
              this.state.currentPosition === 'first' && (
                  <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                      <Image source={require("../assets/images/start.jpg")} style={{width: 150, height: 150}} />
                      <Text>First</Text>
                  </View>
              )
          }
        {/* <Text style={{marginVertical: 200, marginHorizontal: 100}}>{this.state.currentPosition}</Text> */}
      </GestureRecognizer>
    )
  }
}

export default IntroScreen

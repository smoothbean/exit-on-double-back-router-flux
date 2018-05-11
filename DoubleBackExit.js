import React, { Component } from 'React';
import { ToastAndroid, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class DoubleBackExit extends Component {
  constructor() {
    super();
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.timer = {
      ref: null,
      isTimerRunning: false
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    clearTimeout(this.timer.ref);
    this.timer = {
      ref: null,
      isTimerRunning: false
    };
  }

  handleBackPress() {
    if (this.props.exitableRoutes.includes(Actions.currentScene)) {
      return this.handleExit();
    } else {
      Actions.pop();
      return true;
    }
  }

  handleExit() {
    if (!this.timer.isTimerRunning) {
      this.timer.isTimerRunning = true;
      const backInterval = this.props.doubleBackInterval;
      clearTimeout(this.timer.ref);
      this.timer.ref = setTimeout(() => this.timer.isTimerRunning = false, 2000);
      ToastAndroid.showWithGravityAndOffset(
        "press back again to exit the app...",
        2500,
        ToastAndroid.BOTTOM,
        25,
        300
      );
      return true;
    }
    BackHandler.exitApp();
  }

  render() {
    return this.props.children;
  }
}

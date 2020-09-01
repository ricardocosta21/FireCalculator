import React from 'react';
import styles from '../style';

import {ImageBackground, Image, View} from 'react-native';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require('../asset/angryimg.png')}
        style={styles.imageContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={{width: 250, height: 250}}
            source={require('../asset/flamev7.png')}
          />
        </View>
      </ImageBackground>
    );
  }
}

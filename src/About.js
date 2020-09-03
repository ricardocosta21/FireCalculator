import React, {Component} from 'react';
import {View, Text, StatusBar, ImageBackground} from 'react-native';

import styles from '../style';

import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Button,
} from 'native-base';

// 3rd party libraries
import {Icon} from 'react-native-elements';

const LIGHT_GREEN = '#ddfff6';
const MEDIUM_GREEN = '#96ffe3';
const HARD_GREEN = '#53d1af';
const LIGHT_GRAY = '#ECECEC';
const WHITE = '#FFFFFF';
const TRANSPARENT = 'rgba(52, 52, 52, alpha)';

const appVersion = '1.3';

export default class About extends Component {
  render() {
    const viewStyles = [styles.splashContainer, {backgroundColor: 'white'}];
    const textStyles = {
      color: '#53d1af',
      fontSize: 40,
      fontWeight: 'bold',
    };

    return (
      <ImageBackground
        source={require('../asset/angryimg.png')}
        style={styles.imageContainer}>
        <View style={styles.container}>
          <Header style={styles.headerContainer}>
            <StatusBar
              translucent={false}
              animated={false}
              hidden={false}
              barStyle="dark-content"
              backgroundColor={WHITE}
            />
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" color="#000000" />
              </Button>
            </Left>

            <Body>
              <Title style={styles.h2}>About</Title>
            </Body>

            <Right>
              {/* <Icon
                name="save"
                type="font-awesome"
                color="#000000"
                reverseColor="false"
                iconStyle={styles.headerIcon}
                onPress={() => this.saveData()}
              /> */}
            </Right>
          </Header>
          <View style={styles.settingsTextCenter}>
            <Title style={{color: 'black'}}>Version {appVersion}</Title>
          </View>
          <View style={styles.aboutEmail}>
            <Title style={{color: 'black', fontSize: 16}}>
              firecalculatorapp@gmail.com
            </Title>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

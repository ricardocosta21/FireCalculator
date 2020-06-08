import React, {Component} from 'react';
import CardView from 'react-native-cardview';
import styles from '../style';
//import Contacts from '../components/Contacts';

import Settings from './Settings';
import About from './About';
import SplashScreenComponent from './SplashScreen';

const Realm = require('realm');

import Slider from 'react-native-slider';

import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

import {
  useNavigation,
  NavigationContainer,
  useFocusEffect,
  NavigationEvents,
} from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {
  Platform,
  Image,
  ScrollView,
  ToolbarAndroid,
  ImageBackground,
  Text,
  Alert,
  View,
  TextInput,
  FlatList,
  Dimensions,
  ToastAndroid,
  YellowBox,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  Container,
  Header,
  Button,
  Title,
  Content,
  Left,
  Right,
  Body,
} from 'native-base';

import {Icon} from 'react-native-elements';

const LIGHT_GREEN = '#ddfff6';
const MEDIUM_GREEN = '#96ffe3';
const HARD_GREEN = '#53d1af';
const LIGHT_GRAY = '#ECECEC';
const WHITE = '#FFFFFF';
const TRANSPARENT = 'rgba(52, 52, 52, alpha)';
const SEMITRANS = '#20111111';
const ANDROIDTRANS = '#FF000000';

let deviceWidth = Dimensions.get('window').width;

const testSetTransparent = () => {
  changeNavigationBarColor('transparent', true);
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{
          backgroundColor: '#efffef',
          width: 180,
        }}
        drawerContent={props => CustomDrawerContent(props)}>
        <Drawer.Screen name="Main" component={Main} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '12',
      name: 'kad',
      newName: '',
      contacts: [],
    };
  }

  handleIdChange = textValue => {
    this.setState({id: textValue});
  };

  handleNameChange = textValue => {
    this.setState({name: textValue});
  };

  handleNewNameChange = textValue => {
    this.setState({newName: textValue});
  };

  Item(id, name) {
    this.id = id;
    this.name = name;
  }

  // GET Message
  handleGetAll = e => {
    fetch(
      'http://ec2-18-222-140-190.us-east-2.compute.amazonaws.com:8888/api/categories',
    )
      .then(res => res.json())
      .then(data => {
        this.setState({contacts: data});
      })
      .catch(console.log);
    // added debug message
    e.preventDefault();
  };

  // POST Message
  handlePost(e) {
    alert('Value changed Post!' + this.state.name);
    fetch(
      'http://ec2-18-222-140-190.us-east-2.compute.amazonaws.com:8888/api/categories',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.id,
          name: this.state.name,
        }),
      },
    );

    e.preventDefault();
  }

  // Put Message
  handlePut(e) {
    alert('Value changed Put!' + this.state.newName);
    fetch(
      'http://ec2-18-222-140-190.us-east-2.compute.amazonaws.com:8888/api/categories?newName=' +
        this.state.newName,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.id,
          name: this.state.name,
        }),
      },
    );

    e.preventDefault();
  }

  // Delete Message
  handleDelete(e) {
    fetch(
      'http://ec2-18-222-140-190.us-east-2.compute.amazonaws.com:8888/api/categories?id=' +
        this.state.id,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    e.preventDefault();
  }

  handleClearList = () => {
    this.setState({contacts: []});
  };

  async componentDidMount() {
    this.handleGetAll();
  }

  render() {
    const {isFocused} = this.state;
    let colors = [WHITE, LIGHT_GRAY];

    let {id, name} = this.state;

    // Loads splash screen
    if (this.state.isLoading) {
      return <SplashScreenComponent />;
    }

    return (
      <ImageBackground
        source={require('../asset/angryimg.png')}
        style={styles.imageContainer}>
        <View style={styles.container}>
          <Header style={styles.headerContainer}>
            <StatusBar
              translucent={true}
              animated={false}
              hidden={false}
              barStyle="dark-content"
              backgroundColor={ANDROIDTRANS}
            />
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" color="#000000" />
              </Button>
            </Left>
            {/* <Body>
              <Title style={styles.h2}>FIRE CALCULATOR</Title>
            </Body> */}
            <Right>
              <Icon
                name="save"
                type="font-awesome"
                color="#000000"
                reverseColor="false"
                iconStyle={styles.headerIcon}
                onPress={() => this.saveData()}
              />
            </Right>
          </Header>

          <ScrollView>
            <View style={styles.MoneyRowText}>
              <CardView style={styles.cardContainer}>
                <Title style={styles.h2}>Insert item ID</Title>
                <TextInput
                  style={styles.textInput}
                  selectionColor={LIGHT_GREEN}
                  value={this.state.id}
                  onChangeText={this.handleIdChange}
                />
              </CardView>

              <CardView style={styles.cardContainer}>
                <Title style={styles.h2}>Insert item name</Title>
                <TextInput
                  style={styles.textInput}
                  selectionColor={LIGHT_GREEN}
                  value={this.state.name}
                  onChangeText={this.handleNameChange}
                />
              </CardView>

              <CardView style={styles.cardContainer}>
                <Title style={styles.h2}>Insert newName</Title>
                <TextInput
                  style={styles.textInput}
                  selectionColor={LIGHT_GREEN}
                  value={this.state.newName}
                  onChangeText={this.handleNewNameChange}
                />
              </CardView>
            </View>

            <CardView style={styles.cardContainer}>
              <Text style={styles.text}>{this.state.id}</Text>

              <Text style={styles.text}>Get</Text>
              <Button
                title="Get"
                style={styles.buttonStyle}
                onPress={this.handleGetAll}
              />
            </CardView>

            <CardView style={styles.cardContainer}>
              <Text style={styles.text}>Post</Text>
              <Button
                style={styles.buttonStyle}
                title="Post"
                onPress={this.handlePost.bind(this)}
              />
            </CardView>

            <CardView style={styles.cardContainer}>
              <Text style={styles.text}>Put</Text>
              <Button
                title="Put"
                style={styles.buttonStyle}
                onPress={this.handlePut.bind(this)}
              />
            </CardView>

            <CardView style={styles.cardContainer}>
              <Text style={styles.text}>Delete</Text>
              <Button
                title="Delete"
                style={styles.buttonStyle}
                onPress={this.handleDelete.bind(this)}
              />
            </CardView>

            <CardView style={styles.cardContainer}>
              <Text style={styles.text}>ClearList</Text>
              <Button
                style={styles.buttonStyle}
                onPress={this.handleClearList}
              />
            </CardView>

            <View style={styles.itemContainerHeader}>
              <Text style={styles.flatListHeaderCenter}>Contact List</Text>
            </View>

            <View style={styles.itemContainer}>
              {
                <FlatList
                  style={styles.flatList}
                  data={this.state.contacts}
                  keyExtractor={(item, index) => 'key' + index}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingTop: 15,
                        paddingBottom: 15,
                        //backgroundColor: colors[index % colors.length],
                      }}>
                      <Text style={styles.flatListItemLeft}>{item.id}</Text>
                      <Text style={styles.flatListItemCenter}>{item.name}</Text>
                    </View>
                  )}
                />
              }
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

function CustomDrawerContent(props) {
  return (
    <View style={[styles.drawerContainer]}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        label="Main"
        onPress={() => {
          props.navigation.navigate('Main', {refresh: this.callback});
        }}
      />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('Settings')}
      />
      <DrawerItem
        label="About"
        onPress={() => {
          props.navigation.navigate('About');
        }}
      />
    </View>
  );
}

/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import 'react-native-gesture-handler';
import React, {Component} from 'react';
import CardView from 'react-native-cardview';
import styles from '../style';

import Settings from './Settings';
import About from './About';

import SplashScreenComponent from './SplashScreen';

const Realm = require('realm');

//import Slider from '@react-native-community/slider';

import Slider from 'react-native-slider';
//var Slider = require('react-native-slider');

import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
//import { Slider } from 'react-native-elements';

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
  // Icon
} from 'native-base';

// 3rd party libraries
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

let maxInvestmentsValue = 500000;

let maxIncomeValue = 250000;

let maxRetSpendValue = 150000;

let savedData = 0;

let newSavingsValue = 0;

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps']);

YellowBox.ignoreWarnings(['Warning: componentWillMount']);

const testSetTransparent = () => {
  changeNavigationBarColor('transparent', true);
};

const DataSchema = {
  name: 'Data',
  properties: {
    age: {type: 'string', default: 12},
    wrRate: {type: 'string', default: 2},
    incGrowth: {type: 'string', default: 2},
    invReturns: {type: 'string', default: 2},
    investment: {type: 'int', default: 12222},
    income: {type: 'int', default: 13333},
    spending: {type: 'int', default: 3333},
    retSpending: {type: 'int', default: 16666},
    currencySymbol: {type: 'string', default: 'USD'},
  },
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
      age: '27',
      investment: 12000,
      income: 70000,
      spending: 35000,
      savingsNumber: '',
      savings: 123,
      savingsPercentage: 3,
      incGrowth: '3',
      retSpending: 40000,
      wrRate: '4',
      invReturns: '8',
      fireNumber: '',
      fireDisplayNumber: '',
      isFocused: false,
      currencySymbol: 'GBP',
      percentageSymbol: '%',

      fireDataArray: [],

      isLoading: true,
    };
  }

  // componentWillUnmount() {
  //   //Close the realm if there is one open.
  //   // const {realm} = this.state;
  //   // if (realm !== null) {
  //   //   realm.close();
  //   // }
  // }

  saveData = () => {
    Realm.open({schema: [DataSchema]}).then(realm => {
      realm.write(() => {
        savedData = realm.create('Data', {
          age: this.state.age,
          wrRate: this.state.wrRate,
          incGrowth: this.state.incGrowth,
          invReturns: this.state.invReturns,
          investment: this.state.investment,
          income: this.state.income,
          spending: this.state.spending,
          retSpending: this.state.retSpending,
          currencySymbol: global.MyVar,
        });
      });
    });
    if (Platform.OS == 'ios') {
      alert('Config Saved!');
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Config Saved!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };

  onFireReady = () => {
    this.state.fireDataArray = [];

    const incomeFieldAux = this.state.income;

    const spendingFieldAux = this.state.spending;

    const investmentFieldAux = this.state.investment;

    const retSpendingFieldAux = this.state.retSpending;

    this.state.savingsNumber = incomeFieldAux - spendingFieldAux;

    this.state.savingsPercentage = (
      100 -
      (spendingFieldAux * 100) / incomeFieldAux
    ).toFixed(1);

    if (this.state.wrRate <= 0) {
      return;
    }

    // Calculate FireNumber
    this.state.fireNumber = (
      (retSpendingFieldAux / this.state.wrRate) *
      100
    ).toFixed(0);

    this.compound(
      investmentFieldAux,
      this.state.invReturns / 100 + 1,
      this.state.age,
      incomeFieldAux,
      spendingFieldAux,
      this.state.savingsNumber,
      this.state.fireNumber,
    );
  };

  increaseIncome(income) {
    return (income *= this.state.incGrowth / 100 + 1);
  }

  increaseSavings(income, spending) {
    return (newSavingsValue =
      income * (this.state.incGrowth / 100 + 1) - spending);
  }

  callback() {
    // this.state.currencySymbol = global.MyVar;
  }


  formatNumber(number) {
    if (Platform.OS === 'android') {
      // only android needs polyfill
      require('intl'); // import intl object
      require('intl/locale-data/jsonp/ja-JP'); // load the required locale details
      return new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: global.MyVar,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(number);
    }

    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: global.MyVar,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

  callAlertIncome() {
    if (Platform.OS == 'ios') {
      alert('Income cannot be lower than Spending');
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Income cannot be lower than Spending',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }

  callAlertSpending() {
    if (Platform.OS == 'ios') {
      alert('Spending cannot exceed Income');
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Spending cannot exceed Income',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }

  compound(investment, interest, age, income, spending, savings, fireNumber) {
    var accumulated = parseInt(investment);

    for (var i = parseInt(age) + 1, j = 1; accumulated < fireNumber; i++, j++) {
      accumulated = parseInt((accumulated + savings) * interest.toFixed(2));

      savings = this.increaseSavings(income, spending);

      income = this.increaseIncome(income);

      var objToPush = {
        index: j,
        age: i,
        value: accumulated.toFixed(0),
      };

      if (accumulated < 0) {
        this.state.savings = 0;

        this.state.savingsPercentage = 0;

        var newStateArray = this.state.slice();

        newStateArray.push();

        this.setState({fireDataArray: newStateArray});

        this.state.fireDataArray = newStateArray;

        return;
      }

      this.state.savings = savings;

      var newStateArray = this.state.fireDataArray.slice();

      newStateArray.push(objToPush);

      this.state.fireDataArray = newStateArray;

      this.setState({fireDataArray: newStateArray});
    }
  }

  performTimeConsumingTask = async () => {
    return new Promise(
      resolve =>
        setTimeout(() => {
          resolve('result');
        }, 1000),

      Realm.open({schema: [DataSchema]})
        .then(realm => {
          let dataSet = realm.objects('Data');
          for (let p of dataSet) {
            this.state.age = p.age;
            this.state.wrRate = p.wrRate;
            this.state.incGrowth = p.incGrowth;
            this.state.invReturns = p.invReturns;
            this.state.investment = p.investment;
            this.state.income = p.income;
            this.state.spending = p.spending;
            this.state.retSpending = p.retSpending;
            this.state.currencySymbol = p.currencySymbol;
          }

          realm.close();

          global.MyVar = this.state.currencySymbol;

          this.onFireReady();
        })
        .catch(error => {
          console.log(error);
        }),
    );
  };

  async componentDidMount() {
    StatusBar.setBarStyle('dark-content');

    if (Platform.OS === 'android') {
      changeNavigationBarColor('transparent');
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(false);
    }

    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({isLoading: false});
    }

    //global.MyVar = this.state.currencySymbol;
  }

  //  GoToButton({ screenName }) {
  //   const navigation = useNavigation();

  //   return (
  //     <Button
  //       title={`Go to ${screenName}`}
  //       onPress={() => navigation.navigate(screenName)}
  //     />
  //   );
  // }

  render() {
    const {isFocused} = this.state;
    let colors = [WHITE, LIGHT_GRAY];

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
                <Text style={styles.text}>Age</Text>
                <TextInput
                  maxLength={2}
                  keyboardType="numeric"
                  style={styles.textInput}
                  selectionColor={LIGHT_GREEN}
                  onChangeText={age => this.setState({age})}
                  onSelectionChange={() => this.onFireReady()}
                  value={this.state.age}
                />
              </CardView>

              <CardView style={styles.cardContainer}>
                <Text style={styles.text}>WR Rate</Text>
                <View style={styles.textPercentageReturns}>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={2}
                    style={styles.textInput}
                    selectionColor={LIGHT_GREEN}
                    onChangeText={wrRate => this.setState({wrRate})}
                    onSelectionChange={() => this.onFireReady()}
                    value={this.state.wrRate}
                  />
                  <Text style={styles.text}>{this.state.percentageSymbol}</Text>
                </View>
              </CardView>

              <CardView style={styles.cardContainer}>
                <Text style={styles.text}>Inc. Growth</Text>
                <View style={styles.textPercentageReturns}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.textInput}
                    selectionColor={LIGHT_GREEN}
                    onChangeText={incGrowth => this.setState({incGrowth})}
                    onSelectionChange={() => this.onFireReady()}
                    value={this.state.incGrowth}
                  />
                  <Text style={styles.text}>{this.state.percentageSymbol}</Text>
                </View>
              </CardView>

              <CardView style={styles.cardContainer}>
                <Text style={styles.text}>Returns</Text>
                <View style={styles.textPercentageReturns}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.textInput}
                    selectionColor={LIGHT_GREEN}
                    onChangeText={invReturns => this.setState({invReturns})}
                    onSelectionChange={() => this.onFireReady()}
                    value={this.state.invReturns}
                  />
                  <Text style={styles.text}>{this.state.percentageSymbol}</Text>
                </View>
              </CardView>
            </View>

            {/*//////////////////////////////////////////  Investments   //////////////////////////////////////////////////////*/}

            <CardView style={styles.cardContainer}>
              <Text style={styles.text}>Investments</Text>
              <Text>{this.formatNumber(this.state.investment)}</Text>
              <Slider
                style={{width: deviceWidth - 70, height: 40}}
                minimumValue={0}
                maximumValue={maxInvestmentsValue}
                minimumTrackTintColor="#444444"
                maximumTrackTintColor="#ffffff"
                thumbTintColor="#000000"
                step={500}
                value={this.state.investment}
                onValueChange={investment => {
                  this.setState({investment});
                }}
                onSlidingComplete={() => {
                  this.onFireReady();
                }}
              />
            </CardView>

            {/*//////////////////////////////////////////  Income   //////////////////////////////////////////////////////*/}

            <CardView style={styles.cardContainer}>
              <Text style={styles.text}>Income(-Tax)</Text>
              <Text>{this.formatNumber(this.state.income)}</Text>
              <Slider
                style={{width: deviceWidth - 70, height: 40}}
                minimumValue={0}
                maximumValue={maxIncomeValue}
                minimumTrackTintColor="#444444"
                maximumTrackTintColor="#ffffff"
                thumbTintColor="#000000"
                step={500}
                value={this.state.income}
                onValueChange={income => {
                  this.setState({income});
                }}
                onSlidingComplete={() => {
                  if (this.state.income < this.state.spending) {
                    this.state.income = this.state.spending;
                    this.callAlertIncome();
                  }
                  this.onFireReady();
                }}
              />
            </CardView>

            {/*//////////////////////////////////////////  Spending   //////////////////////////////////////////////////////*/}

            <CardView style={styles.cardContainer}>
              <Text style={styles.text}>Spending</Text>
              <Text>{this.formatNumber(this.state.spending)}</Text>
              <Slider
                style={{width: deviceWidth - 70, height: 40}}
                minimumValue={0}
                maximumValue={maxIncomeValue}
                minimumTrackTintColor="#444444"
                maximumTrackTintColor="#ffffff"
                thumbTintColor="#000000"
                step={500}
                value={this.state.spending}
                onValueChange={spending => {
                  this.setState({spending});
                }}
                onSlidingComplete={() => {
                  if (this.state.spending > this.state.income) {
                    this.state.spending = this.state.income;
                    this.callAlertSpending();
                  }
                  this.onFireReady();
                }}
              />
            </CardView>

            {/*//////////////////////////////////////////  ret spending   //////////////////////////////////////////////////////*/}

            <CardView style={styles.cardContainer}>
              <Text style={styles.text}>Ret. Spending</Text>
              <Text>{this.formatNumber(this.state.retSpending)}</Text>
              <Slider
                style={{width: deviceWidth - 70, height: 40}}
                minimumValue={0}
                maximumValue={maxRetSpendValue}
                minimumTrackTintColor="#444444"
                maximumTrackTintColor="#ffffff"
                thumbTintColor="#000000"
                step={500}
                value={this.state.retSpending}
                onValueChange={retSpending => {
                  this.setState({retSpending});
                }}
                onSlidingComplete={() => this.onFireReady()}
              />
            </CardView>

            <View style={styles.MoneyRowText}>
              <CardView style={styles.cardContainer}>
                <Text style={styles.text}>Savings</Text>
                <Text style={styles.textInput}>
                  {this.formatNumber(this.state.savingsNumber)}{' '}
                  <Text style={styles.textPercentage}>
                    ({this.state.savingsPercentage}
                    {this.state.percentageSymbol})
                  </Text>
                </Text>
              </CardView>

              <CardView style={styles.cardContainer}>
                <Text style={styles.text}> FIRE # </Text>
                <Text style={styles.textInput}>
                  {this.formatNumber(this.state.fireNumber)}
                </Text>
              </CardView>
            </View>

            <View style={styles.itemContainerHeader}>
              <Text style={styles.flatListHeaderLeft}>#</Text>
              <Text style={styles.flatListHeaderCenter}>Age</Text>
              <Text style={styles.flatListHeaderRight}>Balance</Text>
            </View>

            <View style={styles.itemContainer}>
              {
                <FlatList
                  style={styles.flatList}
                  data={this.state.fireDataArray}
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
                      <Text style={styles.flatListItemLeft}>{item.index}</Text>
                      <Text style={styles.flatListItemCenter}>{item.age}</Text>
                      <Text style={styles.flatListItemRight}>
                        {this.formatNumber(item.value)}
                      </Text>
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

// function Feed({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed Screen</Text>
//       <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
//       <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
//     </View>
//   );
// }

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

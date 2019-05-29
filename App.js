/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import styles from './style'
import {Platform,Image, ScrollView, ImageBackground,ToolbarAndroid, Text, View, TextInput, FlatList, Dimensions} from 'react-native';

// 3rd party libraries
import { Card, ListItem, Button, Icon } from 'react-native-elements'

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";
const WHITE = "#FFFFFF";

export default class App extends Component {


handleFocus = event => {
  this.setState({ isFocused: true });
  if (this.props.onFocus) {
    this.props.onFocus(event);
  }
};

handleBlur = event => {
  this.setState({ isFocused: false });
  if (this.props.onBlur) {
    this.props.onBlur(event);
  }
};

onActionSelected(position) {
}

handleTextChanged(text) {
  console.warn('text changed !');
  this.setState({ text });
}


state = {
  isFocused: false,
  age: '25',
  investment: '1000',
  income: '50000',
  spending: '40000',
  savings: '',
  incGrowth: '3',
  retSpending: '30000',
  wrRate: '4',
  invReturns: '7',
  fireNumber: '',
  currencySymbol:'£',
  percentageSymbol:'%',
  fireData:[] 
};



onFireReady = () => { 
  console.log("---------1---------");
  
  this.state.fireData = [];
  this.state.savings = this.state.income - this.state.spending;

  console.log("---------2---------");
  console.log("----> Age: " + this.state.age);
  console.log(this.state.investment);

  this.compound(this.state.investment, (this.state.invReturns/100) + 1, this.state.age, this.state.savings);
 

  console.log("---------3---------");
  console.log(" ");
  console.log(" ");
}

compound( investment, interest, age, savings) {
  var accumulated = parseInt(investment);  

	for ( i=age, j=0; j < age; i++, j++ ) {    
    accumulated += savings;
    console.log(accumulated);
    accumulated *= interest.toFixed(2);
    console.log(accumulated);


    var objToPush = {
      age: i,
      value: accumulated.toFixed(0)
    };

    console.log(objToPush);

    var newStateArray = this.state.fireData.slice();

    newStateArray.push(objToPush);

    this.setState({fireData: newStateArray});

    this.state.fireData = newStateArray;    
  }
  
  console.log(investment + ' to ' + accumulated + ' at ' + interest +  ' over ' + age + ' years' )
}


componentDidMount(){
  this.onFireReady()
}


  render() {

    const { isFocused } = this.state;
    return (
    
      <View style={styles.container}>

      <ToolbarAndroid
        style={styles.toolbar}
        title="FireCalc"
        onActionSelected={this.onActionSelected}
        titleColor= "#FFFFFF"        
        actions = {[
          {title: "Log out", show: "never"}
        ]}
      />

      <ScrollView>
     
      <View style={styles.MoneyRowText}>       
        <View style={styles.h2}>
          <Text style={styles.text}>Age</Text>
          <TextInput
            maxLength={2}    
            keyboardType = "numeric"
            selectionColor={BLUE}
            underlineColorAndroid={
              isFocused ? BLUE : LIGHT_GRAY
            }
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            style={styles.textInput}           
            onChangeText={(age) => (this.setState({age}))}    
            onEndEditing={() => this.onFireReady()} 
            onSelectionChange={() => this.onFireReady()}          
            value={this.state.age}             
          />
        </View>
        <View style={styles.h2}>
          <Text style={styles.text}>Investments</Text>
          <TextInput
            keyboardType = "numeric"
            selectionColor={BLUE}
            underlineColorAndroid={
              isFocused ? BLUE : LIGHT_GRAY
            }
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            style={styles.textInput}
            onChangeText={(investment) => this.setState({investment})}
            onEndEditing={() => this.onFireReady()} 
            onSelectionChange={() => this.onFireReady()} 
            value={this.state.investment}
          />
        </View>
      </View>

      <View style={styles.MoneyRowText}>
        <View style={styles.h2}>
            <Text style={styles.text}>Income(-Tax)</Text>
            <TextInput
              keyboardType = "numeric"
              selectionColor={BLUE}
              underlineColorAndroid={
                isFocused ? BLUE : LIGHT_GRAY
              }
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={styles.textInput}
              onChangeText={(income) => this.setState({income})}
              onEndEditing={() => this.onFireReady()} 
              onSelectionChange={() => this.onFireReady()} 
              value={this.state.income}
            />
        </View>
        <View style={styles.h2}>
            <Text style={styles.text}>Spending</Text>
            <TextInput  
              keyboardType = "numeric"
              selectionColor={BLUE}
              underlineColorAndroid={
                isFocused ? BLUE : LIGHT_GRAY
              }
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={styles.textInput}
              onChangeText={(spending) => this.setState({spending})}
              onEndEditing={() => this.onFireReady()} 
              onSelectionChange={() => this.onFireReady()} 
              value={this.state.spending}
            />
        </View>
        <View style={styles.h2}>
            <Text style={styles.text}>Savings</Text>
            <Text style={styles.textInput}> {'\u00A3'} {this.state.income - this.state.spending } 
            {' '}({((this.state.spending * 100) / this.state.income).toFixed(2)}{this.state.percentageSymbol}) </Text>
            
          </View>
        </View>

        <View style={styles.MoneyRowText}>
          <View style={styles.h2}>
            <Text style={styles.text}>Inc. Growth</Text>
            <TextInput  
              keyboardType = "numeric"
              selectionColor={BLUE}
              underlineColorAndroid={
                isFocused ? BLUE : LIGHT_GRAY
              }
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={styles.textInput}
              onChangeText={(incGrowth) => this.setState({incGrowth})}
              onEndEditing={() => this.onFireReady()} 
              onSelectionChange={() => this.onFireReady()} 
              value={this.state.incGrowth}
            />
          </View>

          <View style={styles.h2}>
            <Text style={styles.text}>Ret. Spending</Text>
            <TextInput    
              keyboardType = "numeric"
              selectionColor={BLUE}
              underlineColorAndroid={
                isFocused ? BLUE : LIGHT_GRAY
              }
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={styles.textInput}
              onChangeText={(retSpending) => this.setState({retSpending})}
              onEndEditing={() => this.onFireReady()} 
              onSelectionChange={() => this.onFireReady()}                
              value={this.state.retSpending}
            />
          </View>
          <View style={styles.h2}>
            <Text style={styles.text}>WR Rate</Text>
            <TextInput    
              keyboardType = "numeric"
              selectionColor={BLUE}
              underlineColorAndroid={
                isFocused ? BLUE : LIGHT_GRAY
              }
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={styles.textInput}
              onChangeText={(wrRate) => this.setState({wrRate})}
              onEndEditing={() => this.onFireReady()} 
              onSelectionChange={() => this.onFireReady()}               
              value={this.state.wrRate}
            />
          </View>
        </View>

        <View style={styles.MoneyRowText}>
          <View style={styles.h2}>
            <Text style={styles.text}>Inv. Returns</Text>
            <TextInput    
              keyboardType = "numeric"
              selectionColor={BLUE}
              underlineColorAndroid={
                isFocused ? BLUE : LIGHT_GRAY
              }
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={styles.textInput}
              onChangeText={(invReturns) => this.setState({invReturns})}
              onEndEditing={() => this.onFireReady()} 
              onSelectionChange={() => this.onFireReady()}  
              value={this.state.invReturns}
            />
          </View>

          <View style={styles.h2}>
            <Text style={styles.text}>FIRE #</Text>
            <Text style={styles.textInput}>{ ((this.state.retSpending / this.state.wrRate) * 100).toFixed(0) }</Text>                  
          </View>
        </View>


        {/* <Button
          onPress={this.onFireReady}
          title="Click Me"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        /> */}


        <View style={styles.itemContainer}>
        {
          <FlatList
            data={this.state.fireData}
            renderItem={({item}) => <Text style={styles.item}>{"Age:" + item.age}{"  ----> Value:" + item.value}</Text>}
            keyExtractor={(item, index) => 'key'+index}
          />
        }
        </View> 
    

      </ScrollView>

      </View>
    );
  }        
}

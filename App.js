/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import styles from './style'
import { Platform, Image, ScrollView, ToolbarAndroid, Text, View, TextInput, FlatList, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
// 3rd party libraries
import { Card } from 'react-native-elements';

const BLUE = "#428AF8";
const LIGHT_GREEN = "#ddfff6";
const MEDIUM_GREEN = "#96ffe3";
const HARD_GREEN = "#53d1af";
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
		year: '',
		isFocused: false,
		age: '26',
		investment: '140000',
		income: '54000',
		spending: '40000',
		savings: '',
		incGrowth: '3',
		retSpending: '35000',
		wrRate: '4',
		invReturns: '7',
		fireNumber: '',
		currencySymbol: '£',
		percentageSymbol: '%',
		fireData: []
	};


	onFireReady = () => {
		console.log("\n\n\n\n\n\n---------BEGIN---------");

		console.log("\nIncome:" + this.state.income);
		console.log("\nspending:" + this.state.spending);

		this.state.fireData = [];
		this.state.savings = this.state.income - this.state.spending;

		console.log("\nHERE");
	
		//console.log("\nsavings:" + this.state.savings);

		console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.state.savings));


		// Calculate FireNumber
		this.state.fireNumber = ((this.state.retSpending / this.state.wrRate) * 100).toFixed(0);

		this.compound(this.state.investment, (this.state.invReturns / 100) + 1,
			this.state.age, this.state.income, this.state.savings);

		console.log("---------END---------\n");
	}

	increaseIncome(income) {
		return income *= ((this.state.incGrowth / 100) + 1);
	}

	increaseSavings(income, spending) {
		return newSavingsValue = (income * ((this.state.incGrowth / 100) + 1)) - spending;
	}

	formatNumber(number)
	{
		console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0}).format(number));
		return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0}).format(number)													
	}



	compound(investment, interest, age, income, savings) {
		var accumulated = parseInt(investment);

		console.log("this.state.fireNumber:" + this.state.fireNumber);

		for (i = age, j = 0; accumulated < this.state.fireNumber; i++ , j++) {

			accumulated = (accumulated + savings) * interest.toFixed(2);

			savings = this.increaseSavings(income, this.state.spending);

			income = this.increaseIncome(income);

			var objToPush = {
				index: j,
				age: i,
				value: accumulated.toFixed(0)
			};


			if (accumulated < 0) {
				this.state.savings = 0;

				this.state.savingsPercentage = 0;

				var newStateArray = this.state.fireData.slice();

				newStateArray.push();

				this.setState({ fireData: newStateArray });

				this.state.fireData = newStateArray;

				return;
			}

			this.state.savings = this.state.income - this.state.spending;

			this.state.savingsPercentage = (100 - ((this.state.spending * 100) / this.state.income)).toFixed(1);

			var newStateArray = this.state.fireData.slice();

			newStateArray.push(objToPush);

			this.setState({ fireData: newStateArray });

			this.state.fireData = newStateArray;
		}

		console.log(investment + ' to ' + accumulated.toFixed(0) + ' at ' + interest + ' within ' + j + ' years')
	}

	componentDidMount() {
		this.onFireReady()
	}

	render() {

		const { isFocused } = this.state;
		return (

			<View style={styles.container}>

				<Header
					iosBarStyle='light-content'
					androidStatusBarColor={HARD_GREEN}
					style={{ backgroundColor: MEDIUM_GREEN }}
				>
					<Left>
						<Button transparent style={styles.header}>
							<Icon name='menu' />
						</Button>
					</Left>
					<Body>
						<Title style={styles.h2}>FireCalc</Title>
					</Body>
					<Right />
				</Header>


				<ScrollView>


					<View style={styles.backgroundItem1}>
						<View style={styles.MoneyRowText}>
							<View style={styles.h2}>
								<Text style={styles.text}>Age</Text>
								<TextInput
									maxLength={2}
									keyboardType="numeric"
									selectionColor={LIGHT_GREEN}
									underlineColorAndroid={
										isFocused ? LIGHT_GREEN : LIGHT_GRAY
									}
									onFocus={this.handleFocus}
									onBlur={this.handleBlur}
									style={styles.textInput}
									onChangeText={(age) => (this.setState({ age }))}
									onEndEditing={() => this.onFireReady()}
									onSelectionChange={() => this.onFireReady()}
									value={this.state.age}
								/>
							</View>
							<View style={styles.h2}>
								<Text style={styles.text}>Investments</Text>
								<TextInput
									keyboardType="numeric"
									selectionColor={LIGHT_GREEN}
									underlineColorAndroid={
										isFocused ? LIGHT_GREEN : LIGHT_GRAY
									}
									onFocus={this.handleFocus}
									onBlur={this.handleBlur}
									style={styles.textInput}
									onChangeText={(investment) => this.setState({ investment })}
									onEndEditing={() => this.onFireReady()}
									onSelectionChange={() => this.onFireReady()}
									value={this.formatNumber(this.state.investment)}								
								
								/>
							</View>
						</View>

						<View style={styles.MoneyRowText}>
							<View style={styles.h2}>
								<Text style={styles.text}>Income(-Tax)</Text>
								<TextInput
									keyboardType="numeric"
									selectionColor={LIGHT_GREEN}
									underlineColorAndroid={
										isFocused ? LIGHT_GREEN : LIGHT_GRAY
									}
									onFocus={this.handleFocus}
									onBlur={this.handleBlur}
									style={styles.textInput}
									
									onChangeText={income => { 
										this.setState({ income });
									}}



									onEndEditing={() => this.onFireReady()}
									onSelectionChange={() => this.onFireReady()}
									value={this.state.income}	
								
								/>
								{/* <Text style={{padding: 5, fontSize: 22}}>
									{this.state.income}
								</Text> */}

							</View>

							<View style={styles.h2}>
								<Text style={styles.text}>Spending</Text>
								{/* https://github.com/s-yadav/react-number-format/issues/191 */}
								<TextInput
									keyboardType="numeric"
									selectionColor={LIGHT_GREEN}
									underlineColorAndroid={
										isFocused ? LIGHT_GREEN : LIGHT_GRAY
									}
									onFocus={this.handleFocus}
									onBlur={this.handleBlur}
									style={styles.textInput}
									onChangeText={(spending) => this.setState({ spending })}
									onEndEditing={() => this.onFireReady()}
									onSelectionChange={() => this.onFireReady()}
									value={this.formatNumber(this.state.spending)}		
								/>
							</View>
							<View style={styles.h2}>
								<Text style={styles.text}>Savings</Text>
								<Text style={styles.textInput}> 
								{this.formatNumber(this.state.income - this.state.spending)}								
									{' '}({(100 - ((this.state.spending * 100) / this.state.income)).toFixed(1)}{this.state.percentageSymbol}) </Text>

							</View>
						</View>





						<View style={styles.container}>
							<View style={styles.MoneyRowText}>
								<View style={styles.h2}>
									<Text style={styles.text}>Inc. Growth</Text>
									<TextInput
										keyboardType="numeric"
										selectionColor={LIGHT_GREEN}
										underlineColorAndroid={
											isFocused ? LIGHT_GREEN : LIGHT_GRAY
										}
										onFocus={this.handleFocus}
										onBlur={this.handleBlur}
										style={styles.textInput}
										onChangeText={(incGrowth) => this.setState({ incGrowth })}
										onEndEditing={() => this.onFireReady()}
										onSelectionChange={() => this.onFireReady()}
										value={this.state.incGrowth}
									/>

								</View>

								<View style={styles.h2}>
									<Text style={styles.text}>Ret. Spending</Text>
									<TextInput
										keyboardType="numeric"
										selectionColor={LIGHT_GREEN}
										underlineColorAndroid={
											isFocused ? LIGHT_GREEN : LIGHT_GRAY
										}
										onFocus={this.handleFocus}
										onBlur={this.handleBlur}
										style={styles.textInput}
										onChangeText={(retSpending) => this.setState({ retSpending })}
										onEndEditing={() => this.onFireReady()}
										onSelectionChange={() => this.onFireReady()}
										value={this.formatNumber(this.state.retSpending)}								
								
									/>
								</View>
								<View style={styles.h2}>
									<Text style={styles.text}>WR Rate</Text>
									<TextInput
										keyboardType="numeric"
										selectionColor={LIGHT_GREEN}
										underlineColorAndroid={
											isFocused ? LIGHT_GREEN : LIGHT_GRAY
										}
										onFocus={this.handleFocus}
										onBlur={this.handleBlur}
										style={styles.textInput}
										onChangeText={(wrRate) => this.setState({ wrRate })}
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
										keyboardType="numeric"
										selectionColor={LIGHT_GREEN}
										underlineColorAndroid={
											isFocused ? LIGHT_GREEN : LIGHT_GRAY
										}
										onFocus={this.handleFocus}
										onBlur={this.handleBlur}
										style={styles.textInput}
										onChangeText={(invReturns) => this.setState({ invReturns })}
										onEndEditing={() => this.onFireReady()}
										onSelectionChange={() => this.onFireReady()}
										value={this.state.invReturns}
									/>
								</View>

								<View style={styles.h2}>
									<Text style={styles.text}>FIRE #</Text>
									<Text style={styles.textInput}>{
										this.formatNumber((this.state.retSpending / this.state.wrRate) * 100)}

								
									</Text>
								</View>
							</View>
						</View>
					</View>

					<View>
						<Text style={styles.flatListHeader}>#                Age                Balance</Text>
					</View>

					<View style={styles.itemContainer}>
						{
							<FlatList
								style={styles.flatList}
								data={this.state.fireData}
								renderItem={({item}) => <Text style={styles.item}>{item.index} {"              " + item.age}
								{"              " + this.formatNumber(item.value)}</Text>}
								keyExtractor={(item, index) => 'key' + index}
							/>
						}
					</View>


				</ScrollView>

			</View>
		);
	}
}

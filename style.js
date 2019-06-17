import { StyleSheet, Dimensions } from 'react-native';

const numColumns = 3;
const size = Dimensions.get('window').width/1;
const BLUE = "#428AF8";
const LIGHT_GREEN ="#ddfff6";
const MEDIUM_GREEN ="#96ffe3";
const HARD_GREEN ="#53d1af"
const VERY_LIGHT_GRAY = "#e6e6e6";
const LIGHT_GRAY = "#D3D3D3";
const WHITE = "#FFFFFF";
export default StyleSheet.create({

  container: {   
    backgroundColor: 'transparent'
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 0,
  },

  header: {
    borderTopColor: LIGHT_GREEN,
  },

  text: {
    alignSelf: 'center',
    margin: 10,
  },

  textInput: {
    textAlign: 'center',
    marginTop: 10,
  }, 

  h2:{
    fontSize: 15,       
  },

  MoneyRowText: {
    flex: 1,
    marginTop: 30,
    fontSize: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // toolbar: {
  //   backgroundColor: '#7ee7e4',
  //   height: 56,
  //   alignSelf: 'stretch',
  //   textAlign: 'center',
  // }, 

  cardContainer: {
    flex: 1,
    paddingTop:5,
    alignItems: 'center',    
    backgroundColor: '#7ee7e4',
  },

  backgroundItem1: {
    backgroundColor:MEDIUM_GREEN,
    flex:1,
    },

  backgroundItem2: {
    backgroundColor:HARD_GREEN,
    flex:1,
    paddingBottom:20,
    },

  itemContainer: {
    flex: 1,  
    width: size,   
    flexDirection: "row",
  },

  item: {
    flex: 1,
    margin: 0.5,
    fontSize: 16,
    paddingTop:15,
    paddingBottom:15,
    borderRadius:5,
    textAlign: 'center', 
    backgroundColor: VERY_LIGHT_GRAY,
  },

  flatListHeader: {
    flex: 1,
    fontSize: 14,
    paddingTop:6,
    paddingBottom:6,
    borderRadius:1,
    textAlign: 'center', 
    backgroundColor: LIGHT_GRAY,
  },

  flatList: {
    flexGrow: 1, 
    paddingBottom: 90
    
  },
 

});
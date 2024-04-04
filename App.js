import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import StackNavigator from './StackNavigator';

export default function App() {

  return (
    <StackNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    backgroundColor: '@DDDDDD',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  optionStyle: {
    color: 'green',
    padding: 5,
    alignSelf: 'center',
    fontSize: 18,
  },
  optionContainer: {
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 15,
  },
  questionText: {
    fontSize: 24,
  },
  resetBtnText: {
    fontSize: 18,
    paddingHorizontal: 10,
  }

});

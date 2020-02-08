/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StatusBar } from 'react-native'

import Routes from './src/routes'
import Colors from './src/styles/Colors'

function App(){

  return (
    <>
    <StatusBar barStyle='light-content' backgroundColor={Colors.darkPrimaryColor} />
    <Routes />

    </>
  )
}
export default App
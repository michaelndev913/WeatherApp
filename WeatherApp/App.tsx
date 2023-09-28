import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Main from './src/Main';


function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <Main />
    </SafeAreaView>
  );
}


export default App;

import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Drawer from './components/Drawer';

const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Drawer />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default App;

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Image
            style={styles.menuIcon}
            source={require('../assets/icons/menu-120.png')}
          />
        </TouchableOpacity>

        <Image
          style={styles.logo}
          source={require('../assets/icons/logo.png')}
        />
        <View style={styles.headerRight}>
          <Text> </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    height: '10%',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  menuIcon: {
    maxWidth: 28,
    maxHeight: 28,
    flex: 1,
  },

  logo: {
    flex: 10,
    maxWidth: 250,
    maxHeight: 30,
  },
  headerRight: {
    maxWidth: 28,
    maxHeight: 28,
    flex: 1,
  },
});

import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import WeatherPage from '../screens/WeatherPage';
import LogInPage from '../screens/LogInPage';
import SignUpPage from '../screens/SignUpPage';
import SettingsPage from '../screens/SettingsPage';
import {connect} from 'react-redux';
import {changeLoggedUser} from '../redux/actions/changeLoggedUserActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const user = props.data.user;
  const [loggedIn, setLoggedIn] = useState(user ? true : false);
  const logout = async () => {
    await AsyncStorage.removeItem('@loggedUser');
    props.data.changeLoggedUser(null);
  };
  useEffect(() => {
    setLoggedIn(user ? true : false);
  }, [user]);
  return (
    <View style={styles.drawer}>
      <DrawerContentScrollView {...props}>
        <SafeAreaView>
          <View>
            {loggedIn ? (
              <View style={styles.userArea}>
                <Text style={styles.userNameText}>
                  {user === null ? 'hata' : user.name + ' ' + user.surname}
                </Text>
                <TouchableOpacity onPress={() => logout()}>
                  <Image
                    style={styles.logoutIcon}
                    source={require('../assets/icons/log-out.png')}></Image>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.userArea}>
                <Text style={styles.userNameText}>You are not log in.</Text>
              </View>
            )}

            <DrawerItemList {...props} />
          </View>
        </SafeAreaView>
      </DrawerContentScrollView>
      <SafeAreaView>
        <Text style={styles.drawerInfo}>created by mircos</Text>
      </SafeAreaView>
    </View>
  );
};

const Drawer = ({navigation, loggedUser, changeLoggedUser}) => {
  // if dont use redux persist i need use thic codes.
  // const operationNeededForChangeReducer = async () => {
  //   if (await AsyncStorage.getItem('@loggedUser')) {
  //     changeLoggedUser(JSON.parse(await AsyncStorage.getItem('@loggedUser')));
  //   }
  // };
  // useEffect(() => {
  //   operationNeededForChangeReducer();
  // }, []);
  const [loggedIn, setLoggedIn] = useState(
    loggedUser ? (loggedUser._id ? true : false) : false,
  );
  useEffect(() => {
    setLoggedIn(loggedUser ? (loggedUser._id ? true : false) : false);
  }, [loggedUser]);

  return (
    <drawer.Navigator
      drawerContent={props => (
        <CustomDrawer
          {...props}
          data={{
            user: loggedIn ? loggedUser : null,
            changeLoggedUser: changeLoggedUser,
          }}
        />
      )}
      initialRouteName="WeatherPage"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          color: 'rgb(0,0,0)',
        },
        drawerInactiveTintColor: '#313131',
        drawerActiveTintColor: '#fff',
        drawerActiveBackgroundColor: 'rgb(161,162,187)',
      }}>
      <drawer.Screen name="Weather" component={WeatherPage} />
      {loggedIn ? (
        <drawer.Screen name="Settings" component={SettingsPage} />
      ) : (
        <drawer.Group>
          <drawer.Screen name="Log In" component={LogInPage} />
          <drawer.Screen name="Sign Up" component={SignUpPage} />
        </drawer.Group>
      )}
    </drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    height: '100%',
  },
  drawerInfo: {
    marginLeft: 20,
    fontSize: 12,
    color: '#313131',
  },
  logoutIcon: {
    width: 36,
    height: 36,
  },
  userArea: {
    height: 80,
    backgroundColor: 'rgb(161,162,187)',
    margin: 10,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userNameText: {
    fontSize: 22,
    color: '#fff',
    maxWidth: 150,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    overflow: 'scroll',
  },
});

function mapStateToProps(state) {
  return {
    loggedUser: state.changeLoggedUserReducer,
  };
}

const mapDispatchToProps = {changeLoggedUser};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);

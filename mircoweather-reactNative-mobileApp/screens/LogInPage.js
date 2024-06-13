import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import CustomInputText from '../components/CustomInputText';
import {connect} from 'react-redux';
import CustomAlert from '../components/CustomAlert';
import {mailValidate} from '../function';
import magicString from '../magicString';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {changeLoggedUser} from '../redux/actions/changeLoggedUserActions';

const LogInPage = ({loggedUser, changeLoggedUser}) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  let alertInfoNavigate =
    route.params === undefined
      ? null
      : route.params.hasOwnProperty('alertInfoNavigate')
      ? route.params.alertInfoNavigate
      : null;

  const [alertInfo, setAlertInfo] = useState(null);

  useEffect(() => {
    alertInfoNavigate !== null ? setAlertInfo(alertInfoNavigate) : null;
    route.params === undefined
      ? null
      : route.params.hasOwnProperty('alertInfoNavigate')
      ? route.params.alertInfoNavigate
      : null;
  }, [alertInfoNavigate, route.params]);

  useEffect(() => {
    if (alertInfo !== null) {
      setTimeout(() => {
        setAlertInfo(null);
      }, 10000);
    }
  }, [alertInfo]);

  const logInOperation = async () => {
    try {
      if (mailValidate(mail) && password.length > 7) {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({mail, password}),
        });
        const data = await response.json();

        if (data.code === 200) {
          // console.log(data.user);
          await AsyncStorage.setItem('@loggedUser', JSON.stringify(data.user));
          changeLoggedUser(data.user);
          navigation.navigate('Settings', {
            alertInfoNavigate: {
              alertText:
                'Your log in operation was succesfull. You can change your data.',
              alertType: 'success',
            },
          });
        } else {
          throw magicString.WRONG_PASSWORD;
        }
      } else {
        throw magicString.WRONG_INPUT_VALUE;
      }
    } catch (error) {
      const alertType = 'failed';
      let alertText = '';
      if (error === magicString.WRONG_INPUT_VALUE) {
        alertText = 'Your entered data is wrong. Please try again.';
      } else if (error === magicString.USER_DOESNT_EXISTS) {
        alertText =
          'There is no user for this mail. Please sign up. If you are alread signed up, please try again.';
      } else if (error === magicString.WRONG_PASSWORD) {
        alertText = 'Your entered password is wrong. Please try again.';
      }
      setAlertInfo({alertType: alertType, alertText: alertText});
    }
  };
  return (
    <ImageBackground
      source={require('../assets/background-photos/main.jpg')}
      style={styles.container}>
      <Header />
      <SafeAreaView style={styles.body}>
        <View style={styles.formView}>
          {alertInfo ? <CustomAlert alertInfo={alertInfo} /> : null}
          <CustomInputText
            placeholder="Mail"
            value={mail}
            setValue={setMail}
            secureTextEntry={false}
          />
          <CustomInputText
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => logInOperation()}>
            <Text style={styles.signUpText}>LOG IN</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  formView: {
    width: '90%',
    // height: 500,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 40,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 15,
  },
  signUpText: {
    color: '#fff',
    letterSpacing: 1.4,
    fontSize: 14,
    fontWeight: '300',
  },
});

function mapStateToProps(state) {
  return {
    loggedUser: state.changeLoggedUserReducer,
  };
}

const mapDispatchToProps = {changeLoggedUser};

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);

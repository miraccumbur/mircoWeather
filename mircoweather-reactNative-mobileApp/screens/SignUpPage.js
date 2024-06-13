import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Button,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import CustomInputText from '../components/CustomInputText';
import {mailValidate} from '../function';
import magicString from '../magicString';
import CustomAlert from '../components/CustomAlert';
import {useNavigation, useRoute} from '@react-navigation/native';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const navigation = useNavigation();
  // const [alertInfo, setAlertInfo] = useState({
  //   alertText: 'Bu bir deneme yazısıdır.',
  //   alertType: 'success',
  // });
  const [alertInfo, setAlertInfo] = useState(null);

  useEffect(() => {
    if (alertInfo !== null) {
      setTimeout(() => {
        setAlertInfo(null);
      }, 10000);
    }
  }, [alertInfo]);

  const signUpOperation = async () => {
    try {
      if (
        name !== '' &&
        surname !== '' &&
        mailValidate(mail) &&
        password === passwordAgain &&
        password.length > 7
      ) {
        const response = await fetch('http://localhost:3000/api/createUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, surname, mail, password}),
        });
        const data = await response.json();
        if (data.code === 200) {
          navigation.navigate('Log In', {
            alertInfoNavigate: {
              alertText:
                'Your sign up operation was succesfull. You can log in.',
              alertType: 'success',
            },
          });
        } else if (data.code === 400) {
          throw data.message;
        }
      } else {
        throw magicString.WRONG_INPUT_VALUE;
      }
    } catch (error) {
      const alertType = 'failed';
      let alertText = '';
      if (error === magicString.WRONG_INPUT_VALUE)
        alertText = 'Your entered data is wrong. Please try again.';
      else if (error === magicString.MAIL_ALREADY_EXISTS)
        alertText =
          'Your entered mail is already used. Please try again with different mail.';
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
            placeholder="Name"
            value={name}
            setValue={setName}
            secureTextEntry={false}
          />
          <CustomInputText
            placeholder="Surname"
            value={surname}
            setValue={setSurname}
            secureTextEntry={false}
          />
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
          <CustomInputText
            placeholder="Password Again"
            value={passwordAgain}
            setValue={setPasswordAgain}
            secureTextEntry={true}
          />
          <Text style={styles.passwordEightCharactersInfoText}>
            Password must be minimum eight characters.
          </Text>
          {password === passwordAgain && password.length > 7 ? (
            <View></View>
          ) : (
            <Text style={styles.passwordAreNotMatchingText}>
              Passwords are not matching.
            </Text>
          )}

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => signUpOperation()}>
            <Text style={styles.signUpText}>Sign Up</Text>
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
  passwordEightCharactersInfoText: {
    color: '#fff',
    minWidth: '85%',
    maxWidth: '85%',
    textAlign: 'center',
    letterSpacing: 1.2,
    fontSize: 12,
    marginVertical: 10,
    fontWeight: '300',
  },
  passwordAreNotMatchingText: {
    color: 'rgb(254,126,117)',
    minWidth: '85%',
    maxWidth: '85%',
    textAlign: 'center',
    letterSpacing: 1.2,
    fontSize: 12,
    marginVertical: 10,
    fontWeight: '300',
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

export default SignUpPage;

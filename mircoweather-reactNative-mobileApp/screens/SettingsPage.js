import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import CustomInputText from '../components/CustomInputText';
import SelectDropdown from 'react-native-select-dropdown';
import Geolocation from '@react-native-community/geolocation';
import {LOCATION_IQ_API_KEY} from '@env';
import {mailValidate, turkishToEnglish} from '../function';
import magicString from '../magicString';
import {connect} from 'react-redux';
import {changeLoggedUser} from '../redux/actions/changeLoggedUserActions';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';

const SettingsPage = ({loggedUser}) => {
  const [type, setType] = useState('information');
  const [notificationMail, setNotificationMail] = useState('');
  const [notificationPhoneNumber, setNotificationPhoneNumber] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
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

  const notificationTypeSelectData = ['Mail', 'SMS', 'Mail & SMS', 'None'];

  const getCurrentLocation = async () => {
    try {
      setLocation('loading...');
      const locData = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(info => {
          setLatitude(info.coords.latitude);
          setLongitude(info.coords.longitude);
          resolve({lat: info.coords.latitude, long: info.coords.longitude});
        });
      });
      const response = await fetch(
        'https://eu1.locationiq.com/v1/reverse?key=' +
          LOCATION_IQ_API_KEY +
          '&lat=' +
          locData.lat +
          '&lon=' +
          locData.long +
          '&format=json',
      );
      const data = await response.json();
      let city = data.address.province + ', ' + data.address.country;
      setLocation(city);
    } catch (error) {
      console.log(error);
    }
  };

  const changeInformation = async () => {
    try {
      if (
        mailValidate(notificationMail) &&
        notificationPhoneNumber.length > 11
      ) {
        const response = await fetch(
          'http://localhost:3000/api/changeInformation',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              notificationMail,
              notificationPhoneNumber,
              notificationType,
              user: loggedUser,
            }),
          },
        );

        const data = await response.json();

        if (data.code === 200) {
          setAlertInfo({
            alertType: 'success',
            alertText: 'Change information operation is succesfull.',
          });
        } else {
          throw data.message;
        }
      } else {
        throw magicString.WRONG_INPUT_VALUE;
      }
    } catch (error) {
      const alertType = 'failed';
      let alertText = '';
      if (error === magicString.USER_DOESNT_EXISTS) {
        alertText = 'User doesnt exist. Please try again.';
      } else if (error === magicString.WRONG_INPUT_VALUE) {
        alertText = 'Your entered data is wrong. Please try again.';
      } else {
        alertText = 'Something is wrong. Please try again.';
      }
      setAlertInfo({alertType, alertText});
    }
  };

  const changeLocation = async () => {
    try {
      if (location !== '') {
        const city = await turkishToEnglish(location.split(',')[0]);
        const response = await fetch(
          'http://localhost:3000/api/changeLocation',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              city,
              user: loggedUser,
            }),
          },
        );

        const data = await response.json();
        if (data.code === 200) {
          setAlertInfo({
            alertType: 'success',
            alertText: 'Change location operation is succesfull.',
          });
        } else {
          throw data.message;
        }
      } else {
        throw magicString.WRONG_INPUT_VALUE;
      }
    } catch (error) {
      const alertType = 'failed';
      let alertText = '';
      if (error === magicString.USER_DOESNT_EXISTS) {
        alertText = 'User doesnt exist. Please try again.';
      } else if (error === magicString.WRONG_INPUT_VALUE) {
        alertText = 'Your entered data is wrong. Please try again.';
      } else {
        alertText = 'Something is wrong. Please try again.';
      }
      setAlertInfo({alertType, alertText});
    }
  };

  const changePassword = async () => {
    try {
      if (
        currentPassword.length > 7 &&
        newPassword.length > 7 &&
        newPassword === newPasswordAgain
      ) {
        const response = await fetch(
          'http://localhost:3000/api/changePassword',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              currentPassword,
              newPassword,
              newPasswordAgain,
              user: loggedUser,
            }),
          },
        );

        const data = await response.json();
        if (data.code === 200) {
          setAlertInfo({
            alertType: 'success',
            alertText: 'Change password operation is succesfull.',
          });
        } else {
          throw data.message;
        }
      } else {
        throw magicString.WRONG_INPUT_VALUE;
      }
    } catch (error) {
      const alertType = 'failed';
      let alertText = '';
      if (error === magicString.USER_DOESNT_EXISTS) {
        alertText = 'User doesnt exist. Please try again.';
      } else if (error === magicString.WRONG_INPUT_VALUE) {
        alertText = 'Your entered data is wrong. Please try again.';
      } else if (error === magicString.WRONG_PASSWORD) {
        alertText = 'Your entered current password is wrong. Please try again.';
      } else {
        alertText = 'Something is wrong. Please try again.';
      }
      setAlertInfo({alertType, alertText});
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background-photos/main.jpg')}
      style={styles.container}>
      <Header />
      <SafeAreaView style={styles.body}>
        <View style={styles.view}>
          {alertInfo ? <CustomAlert alertInfo={alertInfo} /> : null}
          <View style={styles.buttonAreaView}>
            <TouchableOpacity
              onPress={() => {
                setType('information');
              }}>
              <Text
                style={[
                  styles.buttonAreaButtonsText,
                  type !== 'information' ? styles.nonChoosed : null,
                ]}>
                Change Information
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setType('location');
              }}>
              <Text
                style={[
                  styles.buttonAreaButtonsText,
                  type !== 'location' ? styles.nonChoosed : null,
                ]}>
                Change Location
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setType('password');
              }}>
              <Text
                style={[
                  styles.buttonAreaButtonsText,
                  type !== 'password' ? styles.nonChoosed : null,
                ]}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
          {type === 'information' ? (
            <View style={styles.formView}>
              <CustomInputText
                placeholder="Notification Mail"
                value={notificationMail}
                setValue={setNotificationMail}
                secureTextEntry="false"
                editable={true}
              />
              <CustomInputText
                placeholder="Notification Phone Number"
                value={notificationPhoneNumber}
                setValue={setNotificationPhoneNumber}
                secureTextEntry="false"
                editable={true}
              />
              <SelectDropdown
                data={notificationTypeSelectData}
                defaultButtonText="Notification Type"
                buttonStyle={styles.selectButtonStyle}
                buttonTextStyle={styles.selectButtonTextStyle}
                dropdownStyle={styles.selectDropdownStyle}
                rowStyle={styles.selectRowStyle}
                rowTextStyle={styles.selectRowTextStyle}
                onSelect={(selectedItem, index) => {
                  setNotificationType(selectedItem);
                }}
              />
              <TouchableOpacity
                style={styles.changeButton}
                onPress={() => changeInformation()}>
                <Text style={styles.changeButtonText}>Change Information</Text>
              </TouchableOpacity>
            </View>
          ) : type === 'location' ? (
            <View style={styles.formView}>
              <TouchableOpacity
                onPress={() => getCurrentLocation()}
                style={styles.getLocationButton}>
                <Text style={styles.getLocationButtonText}>Get Location</Text>
              </TouchableOpacity>
              <CustomInputText
                placeholder="Your Location"
                value={location}
                setValue={setLocation}
                secureTextEntry="false"
                editable={false}
              />
              <TouchableOpacity
                onPress={() => changeLocation()}
                style={styles.changeButton}>
                <Text style={styles.changeButtonText}>
                  Change{'\n'}Location
                </Text>
              </TouchableOpacity>
            </View>
          ) : type === 'password' ? (
            <View style={styles.formView}>
              <CustomInputText
                placeholder="Current Password"
                value={currentPassword}
                setValue={setCurrentPassword}
                secureTextEntry={'true'}
                editable={true}
              />
              <CustomInputText
                placeholder="New Password"
                value={newPassword}
                setValue={setNewPassword}
                secureTextEntry={'true'}
                editable={true}
              />
              <CustomInputText
                placeholder="New Password Again"
                value={newPasswordAgain}
                setValue={setNewPasswordAgain}
                secureTextEntry={'true'}
                editable={true}
              />
              <Text style={styles.passwordEightCharactersInfoText}>
                Password must be minimum eight characters.
              </Text>
              {newPassword === newPasswordAgain && newPassword.length > 7 ? (
                <View></View>
              ) : (
                <Text style={styles.passwordAreNotMatchingText}>
                  Passwords are not matching.
                </Text>
              )}
              <TouchableOpacity
                onPress={() => changePassword()}
                style={styles.changeButton}>
                <Text style={styles.changeButtonText}>
                  Change{'\n'}Password
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

function mapStateToProps(state) {
  return {
    loggedUser: state.changeLoggedUserReducer,
  };
}

const mapDispatchToProps = {changeLoggedUser};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  formView: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  view: {
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
  changeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 135,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginVertical: 15,
  },
  changeButtonText: {
    color: '#fff',
    letterSpacing: 1.1,
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
  },
  buttonAreaView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
  },
  buttonAreaButtonsText: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: 100,
    textAlign: 'center',
    letterSpacing: 1.1,
    fontSize: 11,
    fontWeight: '300',
    borderStyle: 'solid',
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  buttonAreaButtons: {
    borderRadius: 10,
  },
  nonChoosed: {
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  selectButtonStyle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginVertical: 15,
    borderRadius: 35,
    minWidth: '85%',
    maxWidth: '85%',
    padding: 5,
    height: 40,
  },
  selectButtonTextStyle: {
    color: 'rgba(256,256,256,0.65)',
    fontSize: 14,
    letterSpacing: 1.2,
  },
  selectDropdownStyle: {
    backgroundColor: 'rgba(1,1,1,0.75)',
    borderRadius: 20,
    marginTop: 5,
    alignItems: 'center',
  },
  selectRowStyle: {
    borderBottomColor: 'rgba(256,256,256,0.10)',
    height: 50,
    minWidth: '90%',
    borderRadius: 0,
  },
  selectRowTextStyle: {
    color: 'rgba(256,256,256,0.8)',
    fontSize: 14,
    letterSpacing: 1.3,
    fontWeight: '300',
  },
  getLocationButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 15,
  },
  getLocationButtonText: {
    color: '#fff',
    letterSpacing: 1.1,
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
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
});

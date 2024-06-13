import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const CustomAlert = props => {
  const alertType = props.alertInfo.alertType;
  return (
    <View style={[styles.alert]}>
      <Text
        style={[
          styles.text,
          alertType === 'success'
            ? {color: 'rgb(165,255,144)'}
            : {color: 'rgb(254,126,117)'},
        ]}>
        {props.alertInfo.alertText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    width: '85%',
    maxWidth: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    borderRadius: 100,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    letterSpacing: 1.2,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
  },
});

export default CustomAlert;

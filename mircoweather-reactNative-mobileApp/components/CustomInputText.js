import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';

const CustomInputText = ({
  placeholder,
  value,
  setValue,
  secureTextEntry,
  editable,
}) => {
  return (
    <View>
      <TextInput
        style={styles.inputArea}
        placeholder={placeholder}
        placeholderTextColor="rgba(256,256,256,0.75)"
        autoCapitalize="none"
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        editable={editable === null ? true : editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'rgba(256,256,256,1)',
    marginVertical: 15,
    borderRadius: 35,
    minWidth: '85%',
    maxWidth: '85%',
    minHeight: 40,
    padding: 5,
    textAlign: 'center',
    letterSpacing: 1.4,
    fontSize: 14,
    overflow: 'hidden',
    fontWeight: '300',
  },
});

export default CustomInputText;

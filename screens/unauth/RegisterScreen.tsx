import React, {useCallback, useState} from 'react';
import {View, useColorScheme, Image, Text, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {getAppColorStyles} from '@styles/colors';

import {FirebaseErrorMap} from '../../utils/firebase/ErrorTranslation';

import {AuthTextInput} from './components/AuthTextInput';
import {AuthButton} from './components/AuthButton';
import {UnAuthStyles} from './UnAuthStyles';

export const RegisterScreen = () => {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const register = useCallback(async () => {
    setErrorMessage('');
    if (repeatedPassword !== password) {
      setErrorMessage('Passwords must be identical');
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const code = e['code'];

      setErrorMessage(FirebaseErrorMap[code] ?? 'Unknown error');
    }
  }, [email, password, repeatedPassword]);

  return (
    <View style={[backgroundStyle, UnAuthStyles.wrapper]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <Image
            source={require('../../assets/register_image.jpeg')}
            style={UnAuthStyles.image}
            resizeMode="cover"
          />
          <AuthTextInput text={email} setText={setEmail} placeholder="Email" />
          <AuthTextInput
            text={password}
            setText={setPassword}
            placeholder="Password"
            obscure
          />
          <AuthTextInput
            text={repeatedPassword}
            setText={setRepeatedPassword}
            placeholder="Repeated password"
            obscure
          />
          {errorMessage.length > 0 && (
            <Text style={UnAuthStyles.errorStyle}>{errorMessage}</Text>
          )}
        </View>
      </ScrollView>
      <AuthButton onPress={register} text="Register" />
    </View>
  );
};

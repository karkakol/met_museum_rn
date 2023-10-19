import {
  View,
  useColorScheme,
  Text,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {getAppColorStyles} from '@styles/colors';
import {Layouts} from '@styles/layouts';
import {FirebaseErrorMap} from '@firebaseTranslations';

import {AuthTextInput} from './components/AuthTextInput';
import {AuthButton} from './components/AuthButton';
import {UnAuthStyles} from './UnAuthStyles';
export default function ResetPassword() {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const signIn = useCallback(async () => {
    setErrorMessage('');
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Check your email to reset password.');
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const code = e['code'];

      setErrorMessage(FirebaseErrorMap[code] ?? 'Unknown error');
    }
  }, [email]);

  return (
    <View style={[backgroundStyle, UnAuthStyles.wrapper]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <Image
            source={require('../../assets/reset_password.jpeg')}
            style={UnAuthStyles.image}
          />
          <AuthTextInput text={email} setText={setEmail} placeholder="Email" />
          {errorMessage.length > 0 ? (
            <Text style={Layouts.errorTextStyle}>{errorMessage}</Text>
          ) : null}
        </View>
      </ScrollView>

      <AuthButton onPress={signIn} text="Reset password" />
    </View>
  );
}

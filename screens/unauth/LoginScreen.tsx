import {
  View,
  useColorScheme,
  Text,
  Image,
  ScrollView,
  Button,
  StyleSheet,
} from 'react-native';
import {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {getAppColorStyles} from '@styles/colors';
import {useNavigation} from '@react-navigation/native';

import {FirebaseErrorMap} from '../../utils/firebase/ErrorTranslation';
import type {UnAuthStackNavigation} from '../../navigators/UnAuthNavigator';

import {AuthTextInput} from './components/AuthTextInput';
import {AuthButton} from './components/AuthButton';
import {UnAuthStyles} from './UnAuthStyles';
export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);
  const navigation = useNavigation<UnAuthStackNavigation>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const signIn = useCallback(async () => {
    setErrorMessage('');
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const code = e['code'];

      setErrorMessage(FirebaseErrorMap[code] ?? 'Unknown error');
    }
  }, [email, password]);

  return (
    <View style={[backgroundStyle, UnAuthStyles.wrapper]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <Image
            source={require('../../assets/login_image.webp')}
            style={UnAuthStyles.image}
          />
          <AuthTextInput text={email} setText={setEmail} placeholder="Email" />
          <AuthTextInput
            text={password}
            setText={setPassword}
            placeholder="Password"
            obscure
          />
          {errorMessage.length > 0 ? (
            <Text style={UnAuthStyles.errorStyle}>{errorMessage}</Text>
          ) : null}
          <View style={styles.resetButton}>
            <Button
              onPress={() => navigation.navigate('ResetPassword')}
              title="Reset password"
            />
          </View>
        </View>
      </ScrollView>

      <AuthButton onPress={signIn} text="Login" />
    </View>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    alignSelf: 'flex-end',
    margin: 8,
  },
});

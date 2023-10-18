import {
  View,
  StyleSheet,
  useColorScheme,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';

import {getAppColorStyles} from '../../utils/styles/colors';
import {FirebaseErrorMap} from '../../utils/firebase/ErrorTranslation';
import {KeyboardDismissable} from '../../components/KeyboardDismissable';
import {GOLDEN_RATIO} from '../../utils/constans';

import {AuthTextInput} from './components/AuthTextInput';
import {AuthButton} from './components/AuthButton';
export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppColorStyles(colorScheme);

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
    <View style={[backgroundStyle, styles.wrapper]}>
      <ScrollView>
        <KeyboardDismissable>
          <View>
            <Image
              source={require('../../assets/login_image.webp')}
              style={styles.image}
            />
            <AuthTextInput
              text={email}
              setText={setEmail}
              placeholder="Email"
            />
            <AuthTextInput
              text={password}
              setText={setPassword}
              placeholder="Password"
              obscure
            />
            {errorMessage.length > 0 ? (
              <Text style={styles.errorStyle}>{errorMessage}</Text>
            ) : null}
          </View>
        </KeyboardDismissable>
      </ScrollView>

      <AuthButton onPress={signIn} text="Login" />
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    gap: 12,
  },
  image: {
    borderRadius: 20,
    margin: 20,
    width: screenWidth - 2 * 20,
    height: (screenWidth - 2 * 20) / GOLDEN_RATIO,
  },
  errorStyle: {
    margin: 12,

    fontSize: 14,
    color: 'red',
    alignSelf: 'flex-end',
  },
});

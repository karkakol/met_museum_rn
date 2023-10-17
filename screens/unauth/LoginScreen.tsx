import {
  View,
  StyleSheet,
  useColorScheme,
  TextInput,
  TouchableHighlight,
  Text,
  Image,
  Pressable,
  Keyboard,
  Dimensions,
} from 'react-native';
import {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';

import {getAppColorStyles} from '../../utils/styles/colors';
import {Layouts} from '../../utils/styles/layouts';
import {getAppColors} from '../../utils/colors';
import {FirebaseErrorMap} from '../../utils/firebase/ErrorTranslation';
export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const {
    textInverseStyle,
    backgroundInverseStyle,
    textStyle,
    backgroundStyle,
    surfaceStyle,
  } = getAppColorStyles(colorScheme);

  const keyboard = useAnimatedKeyboard();
  const buttonStyle = useAnimatedStyle(() => {
    return {
      marginBottom: keyboard.height.value + 36,
    };
  });
  const {highlightColor, textColor} = getAppColors(colorScheme);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const signIn = useCallback(async () => {
    setErrorMessage('');
    try {
      await auth().signInWithEmailAndPassword(login, password);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const code = e['code'];

      setErrorMessage(FirebaseErrorMap[code] ?? 'Unknown error');
    }
  }, [login, password]);

  return (
    <View style={[backgroundStyle, styles.wrapper]}>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <View>
          <Image
            source={require('../../assets/museum_login_image.webp')}
            style={styles.image}
          />
          <View style={[Layouts.textInputWrapper, surfaceStyle]}>
            <TextInput
              placeholder="Email / Login"
              onChangeText={setLogin}
              value={login}
              style={[styles.inputLayout, textStyle]}
              autoCapitalize="none"
            />
          </View>
          <View style={{flex: 1}}></View>
          <View style={[Layouts.textInputWrapper, surfaceStyle]}>
            <TextInput
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              style={[styles.inputLayout, textStyle]}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableHighlight
              underlayColor={highlightColor}
              hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
              style={[styles.touchable]}
              onPress={() => setShowPassword(prevState => !prevState)}>
              <Icon
                name={showPassword ? 'eye' : 'eye-slash'}
                size={28}
                style={textStyle}
              />
            </TouchableHighlight>
          </View>
          {errorMessage.length > 0 ? (
            <Text style={styles.errorStyle}>{errorMessage}</Text>
          ) : null}
        </View>

        <Animated.View style={buttonStyle}>
          <TouchableHighlight
            underlayColor={textColor}
            hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
            style={[styles.button, backgroundInverseStyle]}
            onPress={signIn}>
            <Text style={[textInverseStyle, styles.buttonText]}>Log In</Text>
          </TouchableHighlight>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  inputLayout: {
    flex: 1,
    fontSize: 24,
    height: 40,
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    gap: 12,
  },
  touchable: {
    borderRadius: 16,
    padding: 4,
  },
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    margin: 12,
    padding: 12,
    width: screenWidth - 2 * 12,
  },
  buttonText: {fontSize: 20, alignSelf: 'center', fontWeight: 'bold'},
  image: {
    borderRadius: 20,
    margin: 20,
  },
  errorStyle: {
    margin: 12,
    fontSize: 14,
    color: 'red',
    alignSelf: 'flex-end',
  },
});

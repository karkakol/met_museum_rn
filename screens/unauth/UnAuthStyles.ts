import {Dimensions, StyleSheet} from 'react-native';
import {GOLDEN_RATIO} from '@constants';

const screenWidth = Dimensions.get('window').width;

export const UnAuthStyles = StyleSheet.create({
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
  inputLayout: {
    flex: 1,
    fontSize: 24,
    height: 40,
  },
  iconTouchable: {
    borderRadius: 16,
    padding: 4,
  },
  buttonText: {fontSize: 20, alignSelf: 'center', fontWeight: 'bold'},
  button: {
    height: 50,
    borderRadius: 20,
    margin: 12,
    padding: 12,
    width: screenWidth - 2 * 12,
    justifyContent: 'center',
  },
});

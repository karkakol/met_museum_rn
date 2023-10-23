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
  iconTouchable: {
    borderRadius: 16,
    padding: 4,
  },
});

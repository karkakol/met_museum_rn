import {
  useColorScheme,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {MOCK_IMAGE} from '../utils/constans';
import type {MainRootStackParamList} from '../App';
import {getAppStyles} from '../utils/styles';

type Props = NativeStackScreenProps<MainRootStackParamList, 'DetailedMuseum'>;

export default function DetailedMuseumScreen({route}: Props) {
  const colorScheme = useColorScheme();

  const museum = route.params.museum;
  const imageUrl =
    museum.primaryImageSmall.trim().length === 0
      ? MOCK_IMAGE
      : museum.primaryImageSmall;

  const {backgroundStyle} = getAppStyles(colorScheme);

  return (
    <View style={[styles.containerLayout, backgroundStyle]}>
      <Image source={{uri: imageUrl}} style={styles.image} resizeMode="cover" />
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  containerLayout: {
    height: '100%',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: screenWidth - 40,
    height: screenWidth - 40,
    borderRadius: 20,
  },
});

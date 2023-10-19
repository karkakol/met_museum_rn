import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  useColorScheme,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {getAppColorStyles} from '@styles/colors';
import {getAppColors} from '@colors';

import {MOCK_IMAGE} from '../utils/constants';
import useGetMuseum from '../api/useGetMuseum';
import type {AuthStackNavigation} from '../navigators/AuthNavigator';

interface MuseumTileProps {
  id: number;
  selected: boolean;
  onFavouriteTap: () => void;
}

export default function MuseumTile(props: MuseumTileProps) {
  const colorScheme = useColorScheme();

  const museumAction = useGetMuseum(props.id);
  const navigation = useNavigation<AuthStackNavigation>();

  const onTileTap = () => {
    if (!museumAction.inProgress) {
      navigation.navigate('DetailedMuseum', {museum: museumAction.data!});
    }
  };

  const {textStyle, surfaceStyle} = getAppColorStyles(colorScheme);
  const {highlightColor} = getAppColors(colorScheme);

  const url =
    (museumAction.data?.primaryImage.trim().length ?? 0) === 0
      ? MOCK_IMAGE
      : museumAction.data?.primaryImage;

  return (
    <TouchableHighlight
      onPress={onTileTap}
      underlayColor={highlightColor}
      style={styles.touchableLayout}>
      <View style={[styles.tileLayout, surfaceStyle]}>
        <Image
          source={{
            uri: url,
          }}
          style={styles.image}
          resizeMode="cover"
        />

        {museumAction.inProgress ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text style={[styles.labelLayout, textStyle]}>
            {museumAction.data?.title}
          </Text>
        )}

        <TouchableHighlight
          onPress={props.onFavouriteTap}
          underlayColor={highlightColor}
          activeOpacity={0.5}
          style={[surfaceStyle, styles.iconButton]}>
          <Icon
            name={props.selected ? 'heart' : 'heart-o'}
            size={24}
            style={[styles.icon, surfaceStyle]}
          />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  touchableLayout: {
    margin: 4,
    borderRadius: 12,
  },
  tileLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    display: 'flex',
    fontSize: 20,
    borderRadius: 12,
  },
  labelLayout: {
    flexShrink: 1,
    paddingHorizontal: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  iconButton: {
    borderRadius: 12,
  },
  icon: {
    color: 'red',
    padding: 8,
  },
});

import {
  useColorScheme,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Animated,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Chip} from '@rneui/themed';
import {useState} from 'react';
import {startCase} from 'lodash';
import {getAppColorStyles} from '@styles/colors';
import {getAppColors} from '@colors';
import {MOCK_IMAGE} from '@constants';

import type {AuthRootStackParamList} from '../../navigators/AuthNavigator';

import ScrollView = Animated.ScrollView;

type DisplayField =
  | 'country'
  | 'city'
  | 'department'
  | 'artistDisplayName'
  | 'artistBeginDate'
  | 'creditLine'
  | 'artistDisplayBio'
  | 'repository';

const fieldsToDisplay: DisplayField[] = [
  'country',
  'city',
  'department',
  'artistDisplayName',
  'artistBeginDate',
  'creditLine',
  'artistDisplayBio',
  'repository',
];

type Props = NativeStackScreenProps<AuthRootStackParamList, 'DetailedMuseum'>;

export default function DetailedMuseumScreen({route}: Props) {
  const colorScheme = useColorScheme();
  const [selectedField, setSelectedField] = useState<DisplayField>(
    fieldsToDisplay[0],
  );

  const museum = route.params.museum;
  const imageUrl =
    museum.primaryImageSmall.trim().length === 0
      ? MOCK_IMAGE
      : museum.primaryImageSmall;

  const {backgroundStyle, textStyle} = getAppColorStyles(colorScheme);
  const {textColor, textInverseColor} = getAppColors(colorScheme);

  const renderChip = (item: DisplayField) => {
    return (
      <Chip
        key={item}
        title={startCase(item)}
        type={selectedField === item ? 'solid' : 'outline'}
        onPress={() => setSelectedField(item)}
        buttonStyle={{borderColor: textColor}}
        color={textColor}
        titleStyle={{
          color: item === selectedField ? textInverseColor : textColor,
        }}
        style={[styles.chip]}
      />
    );
  };

  return (
    <View style={[styles.containerLayout, backgroundStyle]}>
      <Image source={{uri: imageUrl}} style={styles.image} resizeMode="cover" />
      <View style={styles.chipListWrapper}>
        <ScrollView
          style={styles.chipList}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {fieldsToDisplay.map(renderChip)}
        </ScrollView>
      </View>

      <Text style={[textStyle, styles.title]}>{startCase(selectedField)}</Text>
      <Text style={[textStyle, styles.description]}>
        {museum[selectedField].length
          ? 'No data available'
          : museum[selectedField]}
      </Text>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  containerLayout: {
    height: '100%',
    padding: 20,
  },
  image: {
    width: screenWidth - 40,
    height: screenWidth - 40,
    borderRadius: 20,
  },
  chipListWrapper: {
    height: 60,
  },
  chipList: {
    paddingVertical: 8,
    flexDirection: 'row',
  },
  chip: {
    padding: 4,
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});

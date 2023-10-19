import {StyleSheet} from 'react-native';

export const SettingsTilesStyle = StyleSheet.create({
  touchable: {
    borderRadius: 12,
  },
  containerLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 8,
  },
  labelLayout: {
    fontSize: 20,
  },
  icon: {
    paddingRight: 8,
  },
});

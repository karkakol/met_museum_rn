import {Dimensions, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('window').width;
export const Layouts = StyleSheet.create({
  textInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 24,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 24,
    padding: 0,
    height: 40,
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
  errorTextStyle: {
    margin: 12,
    fontSize: 14,
    color: 'red',
    alignSelf: 'flex-end',
  },
});

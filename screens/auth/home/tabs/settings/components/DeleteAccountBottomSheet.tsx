import React, {useCallback, useContext, useState} from 'react';
import {Text, useColorScheme, View, StyleSheet} from 'react-native';
import BottomSheetModal, {
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Layouts} from '@styles/layouts';
import {getAppColorStyles} from '@styles/colors';
import {FirebaseErrorMap} from '@firebaseTranslations';
import {AppButton} from '@components/AppButton';
import {UserContext} from '@providers/UserProvider';

interface DeleteAccountBottomSheetProps {
  bottomSheetController: React.RefObject<BottomSheetMethods> | undefined;
}
export const DeleteAccountBottomSheet = ({
  bottomSheetController,
}: DeleteAccountBottomSheetProps) => {
  const {deleteAccount} = useContext(UserContext);

  const colorScheme = useColorScheme();
  const {surfaceStyle, textStyle, bottomSheetBackgroundStyle} =
    getAppColorStyles(colorScheme);

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onDeletePressed = useCallback(async () => {
    setErrorMessage('');
    try {
      await deleteAccount(password);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const code = e['code'];
      console.log(e);
      setErrorMessage(FirebaseErrorMap[code] ?? 'Unknown error');
    }
  }, [password, setPassword]);

  return (
    <BottomSheetModal
      ref={bottomSheetController}
      snapPoints={[250]}
      backgroundStyle={bottomSheetBackgroundStyle}
      onClose={() => setErrorMessage('')}
      enablePanDownToClose>
      <BottomSheetView style={styles.bottomSheet}>
        <View>
          <Text style={[textStyle, styles.title]}>
            Type password to delete account
          </Text>
          <View style={[Layouts.textInputWrapper, surfaceStyle]}>
            <BottomSheetTextInput
              onChangeText={setPassword}
              style={Layouts.textInput}
              autoCapitalize="none"
            />
          </View>
          {errorMessage.length > 0 && (
            <Text style={Layouts.errorTextStyle}>{errorMessage}</Text>
          )}
        </View>
        <AppButton text="Delete Acount" onPress={onDeletePressed} />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    padding: 12,
  },
  bottomSheet: {
    justifyContent: 'space-between',
    display: 'flex',
    flex: 1,
  },
});

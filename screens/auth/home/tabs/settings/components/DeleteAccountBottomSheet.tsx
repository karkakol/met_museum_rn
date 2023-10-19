import React, {
  type Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Text, useColorScheme, View, StyleSheet} from 'react-native';
import BottomSheetModal, {
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import auth from '@react-native-firebase/auth';
import {Layouts} from '@styles/layouts';
import {getAppColorStyles} from '@styles/colors';
import {useIsFocused} from '@react-navigation/native';

import {FirebaseErrorMap} from '../../../../../../utils/firebase/ErrorTranslation';
import {UnAuthStyles} from '../../../../../unauth/UnAuthStyles';

import {DeleteBottomSheetButton} from './DeleteBottomSheetButton';

interface DeleteAccountBottomSheetProps {
  bottomSheetController: React.RefObject<BottomSheetMethods> | undefined;
}
export const DeleteAccountBottomSheet = ({
  bottomSheetController,
}: DeleteAccountBottomSheetProps) => {
  const colorScheme = useColorScheme();
  const {surfaceStyle, textStyle, bottomSheetBackgroundStyle} =
    getAppColorStyles(colorScheme);

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const user = useMemo(() => {
    return auth().currentUser;
  }, []);

  useEffect(() => {
    setErrorMessage('');
  }, []);

  const deleteAccount = useCallback(async () => {
    setErrorMessage('');
    try {
      await auth().signInWithEmailAndPassword(user?.email ?? '', password);
      await auth().currentUser?.delete();
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
      snapPoints={[0.1, 250]}
      animateOnMount={false}
      enablePanDownToClose
      backgroundStyle={bottomSheetBackgroundStyle}>
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
            <Text style={UnAuthStyles.errorStyle}>{errorMessage}</Text>
          )}
        </View>
        <DeleteBottomSheetButton text="Delete Acount" onPress={deleteAccount} />
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

import React, {type ReactNode} from 'react';
import {Pressable, StyleSheet, Keyboard} from 'react-native';

interface KeyboardDismissableProps {
  children: ReactNode;
}

export const KeyboardDismissable: React.FC<KeyboardDismissableProps> = ({
  children,
}) => {
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

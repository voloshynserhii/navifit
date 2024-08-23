import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, SafeAreaView, useColorScheme } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import NavBar from '@/components/NavBar';
import LinearBackground from '@/components/LinearBackground';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  children: ReactElement;
}>;

export default function AppView({ children }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearBackground />
      <NavBar />
        {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

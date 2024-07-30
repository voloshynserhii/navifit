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
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
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
  // header: {
  //   height: 250,
  //   overflow: 'hidden',
  // },
  // content: {
  //   flex: 1,
  //   padding: 32,
  //   gap: 16,
  //   overflow: 'hidden',
  // },
});

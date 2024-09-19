import type { PropsWithChildren, ReactElement } from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Heading } from 'native-base';

type Props = PropsWithChildren<{
  title: string;
  children: ReactElement;
}>;

export default function AppUserView({ title = '', children }: Props) {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {title && <Heading style={styles.header}>{title}</Heading>}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16
  },
  header: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 24,
    lineHeight: 36,
    marginBottom: 20
  }
});

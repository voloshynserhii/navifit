import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { NativeBaseProvider, extendTheme } from "native-base";
import '@/firebase/config';
import { AppStoreProvider } from '@/store';

import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

const newColorTheme = {
  primary: {
    main: 'rgba(51, 0, 255, 1)',
    grey: 'rgba(238, 238, 238, 1)',
    contrastText: 'rgba(28, 34, 39, 1)',
    lightGrey: 'rgba(189, 189, 189, 1)',
    error: 'rgba(255, 23, 68, 1)',
    bodyGrey: 'rgba(117, 117, 117, 1)',
    grey2: 'rgba(66, 66, 66, 1)',
    redLighten1: 'rgba(239, 83, 80, 1)',
    greenLighten1: 'rgba(102, 187, 106, 1)',
    blueAccent: 'rgba(41, 98, 255, 1)',
  },
  secondary: {
    main: '#EF9A9A',
    contrastText: 'rgba(25, 118, 210, 1)',
    light: 'rgba(245, 245, 247, 1)',
    lightGrey: 'rgba(114, 114, 114, 1)',
    gray: 'rgba(239, 241, 244, 1)',
    brandBlack: 'rgba(28, 28, 30, 1)',
    brandGreen: 'rgba(204, 255, 51, 1)',
    greyDarken1: 'rgba(117, 117, 117, 1)',
    greyLighten2:'rgba(224, 224, 224, 1)',
    greyLighten4:'rgba(245, 245, 245, 1)',
    greyLighten5:'rgba(250, 250, 250, 1)',
    red: 'rgba(244, 67, 54, 1)',
    greyDarken2: 'rgba(97, 97, 97, 1)',
    greenDarken1: 'rgba(67, 160, 71, 1)'
  },
  fontConfig: {
    Poppins: {
      100: {
        normal: 'Poppins_100Thin',
        italic: 'Poppins_100Thin_Italic',
      },
      200: {
        normal: 'Poppins_200ExtraLight',
        italic: 'Poppins_200ExtraLight_Italic',
      },
      300: {
        normal: 'Poppins_300Light',
        italic: 'Poppins_300Light_Italic',
      },
      400: {
        normal: 'Poppins_400Regular',
        italic: 'Poppins_400Regular_Italic',
      },
      500: {
        normal: "Poppins_500Medium",
        italic: "Poppins_500Medium_Italic"
      },
      600: {
        normal: "Poppins_600SemiBold",
        italic: "Poppins_600SemiBold_Italic",
      },
      700: {
        normal: 'Poppins_700Bold',
        italic: "Poppins_700Bold_Italic",
      },
      800: {
        normal: 'Poppins_800ExtraBold',
        italic: 'Poppins_800ExtraBold_Italic',
      },
      900: {
        normal: 'Poppins_900Black',
        italic: 'Poppins_900Black_Italic',
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Poppins.600",
    body: "Poppins.400.normal",
    mono: "Poppins",
  },
};
const theme = extendTheme({ colors: newColorTheme });

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
  // });
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <AppStoreProvider>
        <Stack>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="shop" options={{ headerShown: false }} />
          <Stack.Screen name="about" options={{ headerShown: false }} />
          <Stack.Screen name="contact" options={{ headerShown: false }} />
          <Stack.Screen name="regulations" options={{ headerShown: false }} />
          <Stack.Screen name="privacy" options={{ headerShown: false }} />
          <Stack.Screen name="cookies" options={{ headerShown: false }} />
          <Stack.Screen name="returns" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </AppStoreProvider>
    </NativeBaseProvider>
  );
}

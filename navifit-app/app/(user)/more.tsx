import { useState } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Actionsheet, Avatar, Box, Center, Divider, HStack, Pressable, Text, Spacer, VStack } from 'native-base';
import { useAppStore } from '@/store'
import AppUserView from '@/components/AppUserView';
import PressableCard from '@/components/PressableCard';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import PreferencesIcon from '@/assets/icons/preferences.svg';
import SubscriptionIcon from '@/assets/icons/subscription.svg';
import StoreIcon from '@/assets/icons/store.svg';
import LegalIcon from '@/assets/icons/legal.svg';

export default function MoreScreen() {
  const [state, dispatch] = useAppStore()
  const [open, setOpen] = useState(false);
  const { currentUser = {} } = state;

  const logOutHandler = async () => {
    setOpen(false);
    await AsyncStorage.setItem('loggedUser', '');
    dispatch({ type: 'LOG_OUT' })
    router.push('/(app)')
}

  return (
    <AppUserView title='More'>
      <Center>
        <PressableCard 
          uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
          title={currentUser.email} 
          text='My Profile'
          textColor='primary.bodyGrey'
          onPress={() => setOpen(true)}
        />
        
        <Box style={{...styles.card, marginTop: 32 }}>
          <HStack justifyContent='space-between' alignItems='center' paddingBottom={18}>
            <HStack space={5} alignItems='center'>
              <PreferencesIcon />
              <Text style={styles.menuText}>
                Personal Preferences
              </Text>
            </HStack>
            <Pressable onPress={() => setOpen(true)}>
              <ChevronRightIcon />
            </Pressable>
          </HStack>
          
          <Divider/>
          
          <HStack justifyContent='space-between' alignItems='center' paddingVertical={18}>
            <HStack space={5} alignItems='center'>
              <SubscriptionIcon />
              <Text style={styles.menuText}>
                Subscription
              </Text>
            </HStack>
            <Pressable onPress={() => setOpen(true)}>
              <ChevronRightIcon />
            </Pressable>
          </HStack>
          
          <Divider/>
          
          <HStack justifyContent='space-between' alignItems='center' paddingVertical={18}>
            <HStack space={5} alignItems='center'>
              <StoreIcon />
              <Text style={styles.menuText}>
                Store
              </Text>
            </HStack>
            <Pressable onPress={() => setOpen(true)}>
              <ChevronRightIcon />
            </Pressable>
          </HStack>
          
          <Divider/>
          
          <HStack justifyContent='space-between' alignItems='center' paddingTop={18}>
            <HStack space={5} alignItems='center'>
              <LegalIcon />
              <Text style={styles.menuText}>
                Legal & Privacy
              </Text>
            </HStack>
            <Pressable onPress={() => setOpen(true)}>
              <ChevronRightIcon />
            </Pressable>
          </HStack>
        </Box>

      <Actionsheet isOpen={open} onClose={() => setOpen(false)}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text fontSize="16" color="gray.500" _dark={{
            color: "gray.300"
          }}>
              Albums
            </Text>
          </Box>
          <Actionsheet.Item onPress={logOutHandler}>Log Out</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
    </AppUserView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 16
  },
  userName: {
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 16, 
    lineHeight: 24
  },
  userText: {
    fontFamily: 'Poppins_400Regular', 
    fontSize: 14, 
    lineHeight: 21
  },
  menuText: {
    fontFamily: 'Poppins_500Medium', 
    fontSize: 16, 
    lineHeight: 24
  }
});
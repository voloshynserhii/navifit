import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Actionsheet, Avatar, Box, Center, HStack, Pressable, Text, Spacer, VStack } from 'native-base';
import AppUserView from '@/components/AppUserView';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';

export default function MoreScreen() {
  const [open, setOpen] = useState(false);

  return (
    <AppUserView title='More'>
      <Center>
        <Box w="100%" bg='white' p="18" rounded="16">
          <HStack alignItems="center">
            <HStack alignItems="center" space={5}>
              <Avatar bg="green.500" size="lg" source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              }}>
              AJ
              </Avatar>
              <VStack>
                <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, lineHeight: 24 }}>Diane</Text>
                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 21 }} color='primary.bodyGrey'>My Profile</Text>
              </VStack>
            </HStack>
            <Spacer />
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
          {/* <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item> */}
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
    </AppUserView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Poppins_500Medium',
  }
});
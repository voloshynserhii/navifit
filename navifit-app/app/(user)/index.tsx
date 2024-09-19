import { StyleSheet } from 'react-native';
import moment from 'moment';
import { Actionsheet, Avatar, Box, Center, Divider, Image, Heading, HStack, Pressable, Text, Spacer, VStack } from 'native-base';
import PressableCard from '@/components/PressableCard';
import { useAppStore } from '@/store'
import AppUserView from '@/components/AppUserView';
import PlusIcon from '@/assets/icons/plus.svg';

export default function UserScreen() {
  const [state, dispatch] = useAppStore()
  const { currentUser = {}, userData = {} } = state;
  console.log('currentUser', currentUser,  userData)
  
  return (
    <AppUserView>
      <Center>
        <HStack w='100%' alignItems='center' space={5}>
          <Avatar bg="green.500" size="lg" source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          }}>
            AJ
          </Avatar>
          <VStack space={1}>
            <Text style={styles.text}>Hello, {currentUser.email}!</Text>
            <Text style={styles.title}>{moment().format('dddd, DD MMMM')}</Text>
          </VStack>
        </HStack>
        
        <HStack w='100%' justifyContent='space-between' space={2} mt={8}>
          <Box style={{ ...styles.container, width: '48%' }}>
            <HStack justifyContent='space-between'>
              <VStack space={1}>
                <Text style={styles.title}>15 days</Text>
                <Text style={styles.text} color='primary.bodyGrey'>Your streak</Text>
              </VStack>
              <Text>🔥</Text>
            </HStack>
          </Box>
          <Box style={{ ...styles.container, width: '48%' }}>
            <HStack justifyContent='space-between'>
              <VStack space={1}>
                <Text style={styles.title}>2 Workouts</Text>
                <Text style={styles.text} color='primary.bodyGrey'>This week</Text>
              </VStack>
              <Text>💪</Text>
            </HStack>
          </Box>
        </HStack>
        
        <Box w='100%'>
          <Heading style={styles.header}>Nutrition</Heading>
          
          <PressableCard 
            style={{ marginBottom: 16 }}
            icon={<Image source={require('@/assets/images/meal.png')} alt="Meal" size="md"/>}
            title='Log calories' 
            counter={{
              number: 0,
              total: 1580,
              unit: 'kcal'
            }}
            textColor='primary.bodyGrey'
            onPress={() => {}}
          >
            <Box w='100%' mt={2}>
              <Text style={styles.text} color='primary.bodyGrey'>
                Next meal
              </Text>
              <Box style={{ width: '100%', borderRadius: 12, backgroundColor: '#ECEFF1', paddingVertical: 8, paddingHorizontal: 12, marginTop: 8 }}>
                <HStack alignItems="center" justifyContent='space-between'>
                  <HStack alignItems="center" space={5}>
                    <Image source={require('@/assets/images/dinner.png')} alt="Dinner" size="xs"/>
                    <Text style={styles.title}>Dinner</Text>
                  </HStack>
                  <PlusIcon />
                </HStack>
              </Box>
            </Box>
          </PressableCard>
          
          <PressableCard 
            icon={<Image source={require('@/assets/images/glass.png')} alt="Alternate Text" size="md"/>}
            title='Drink water' 
            counter={{
              number: 0,
              total: 2000,
              unit: 'ml'
            }}
            onPress={() => {}}
          />
        </Box>
        
        <Box w='100%'>
          <Heading style={styles.header}>Workout</Heading>
          
          <PressableCard 
            icon={<Image source={require('@/assets/images/workout.png')} alt="Alternate Text" size="md"/>}
            title='Chest&Back' 
            text='30 min'
            textColor='primary.bodyGrey'
            onPress={() => {}}
          />
        </Box>
        
        <Box w='100%'>
          <Heading style={styles.header}>Challenges</Heading>
        </Box>
        
        <Box w='100%'>
          <Heading style={styles.header}>Helpful resources</Heading>
        </Box>

      </Center>
    </AppUserView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  text: {
    fontFamily: 'Poppins_400Regular', 
    fontSize: 14, 
    lineHeight: 21
  },
  title: {
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 16, 
    lineHeight: 24
  },
  header: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 24,
    lineHeight: 36,
    marginBottom: 16,
    marginTop: 32,
    width: '100%'
  }
});

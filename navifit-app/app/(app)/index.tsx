import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppView from '@/components/AppView';
import Steps from '@/components/Steps';
import { useAppStore } from '@/store'

export default function HomeScreen() {
  const router = useRouter()
  const [_, dispatch] = useAppStore()
  
  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('loggedUser');
      
      if (user) {
        dispatch({ type: 'LOG_IN' })
        dispatch({
          type: 'CURRENT_USER',
          payload: JSON.parse(user),
        });
        router.push('/(user)');
      }
    } catch (e) {
      console.log('ERROR_GET_USER_FROM_ASYNC_STORAGE', e)
    }
  };

  useEffect(() => {
    getData();
  }, [])
  
  return (
    <AppView>
      <Steps />
    </AppView>
  );
}

import { Text, StyleSheet } from 'react-native';
import { useAppStore } from '@/store'
import AppUserView from '@/components/AppUserView';

export default function UserScreen() {
  const [state, dispatch] = useAppStore()
  console.log('currentUser', state.currentUser,  state.userData)
  return (
    <AppUserView title='Diary'>
      <Text></Text>
    </AppUserView>
  );
}

const styles = StyleSheet.create({

});

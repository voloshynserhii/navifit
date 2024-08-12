import { useState, useRef, useEffect } from 'react';
import moment from 'moment'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Button, Text, Modal } from 'native-base';
import CalendarIcon from '@/assets/icons/calendar.svg'

import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ selectedValue, onGetDateValue }) {
  const [date, setDate] = useState(selectedValue ? moment(selectedValue) : moment(Date.now()));
  const [open, setOpen] = useState(false)
  const myRef = useRef({});

  useEffect(() => {
    const styleObj = {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#BDBDBD'
    };

    myRef.current.setNativeProps({
      style: styleObj
    });
  }, [myRef]);

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
    onGetDateValue(selectedDate)
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        variant='outline'
        _text={{ color: '#1C2227' }}
        ref={myRef}
        onPress={() => setOpen(prev => !prev)}
      >
        <View style={styles.inputContainer}>
          <Text>{moment(date).format('DD/MM/YY')}</Text>
          <CalendarIcon style={{ marginRight: 10 }} />
        </View>

      </Button>

      {open && (
        <Modal isOpen={open} avoidKeyboard onClose={() => setOpen(false)}>
          <Modal.Content maxWidth="400px" style={{ padding: 10 }}>
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(date)}
              mode={'date'}
              is24Hour={false}
              display="inline"
              onChange={onChange}
            />
          </Modal.Content>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 20
  },
  input: {
    width: '100%',
    height: 50,
    textAlign: 'start',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    marginLeft: 5,
    color: '#1C2227'
  },
  inputContainer: {
    width: '100%', 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  iconContainer: {
    paddingRight: 20,
  },
});
import { useState } from 'react'
import { StyleSheet } from 'react-native';
import { VStack, Box, Text, Menu } from 'native-base'

const MenuButton = ({ type, title = '', text = '', mainColor, textColor, onPress, ...props }) => {
  const [buttonPressed, setButtonPressed] = useState(false)

  return (
    <Menu.Item backgroundColor='secondary.light' style={styles({ type, pressed: buttonPressed }).container} onPress={() => { setButtonPressed(true); onPress(); }}>
      <VStack space={25} w='100%' justifyContent='space-between' style={{ paddingLeft: 0 }}>
        <Text color={!buttonPressed ? mainColor : type === 'login' ? 'white' : mainColor} style={styles({}).text}>
          {text}
        </Text>
        <Box
          _text={styles({ type, pressed: buttonPressed, textColor }).buttonTitle}
          style={styles({ pressed: buttonPressed, mainColor }).button}
          onPress={() => setButtonPressed(true)}
          {...props}
        >
          {title}
        </Box>
      </VStack>
    </Menu.Item>
  )
}

const styles = ({ type, pressed, textColor, mainColor }) => StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 24,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: !pressed ? '#F5F5F7' : type === 'login' ? '#3300FF' : '#CCFF33',
    paddingLeft: 0,
    paddingRight: 0
  },
  text: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 23,
    backgroundColor: !pressed ? mainColor : '#F5F5F7'
  },
  buttonTitle: {
    color: !pressed ? textColor : type === 'login' ? '#3300FF' : '#1C1C1E',
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    lineHeight: 21,
    borderRadius: 32,
    textAlign: 'center',
  }
})

export default MenuButton
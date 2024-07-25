import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

const LinearGradientBackground = () => <LinearGradient
  colors={["#FFFFFF", "#D9E6FF"]}
  style={styles.linearGradient}
/>

export default function LinearBackground() {
  return <LinearGradientBackground/>
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1200,
    zIndex: 0
  },
});
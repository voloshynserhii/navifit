import { useEffect, useRef } from 'react';
import { Box, HStack, Text } from 'native-base'
import { StyleSheet, Animated, Easing, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const countPointerPosition = (BMI) => {
    const max = 97
    const multiplier = 2.1

    const position = 1 * multiplier * BMI
    return position > max ? max : position
}

export default function BMI({ BMI }) {
    const position = countPointerPosition(BMI) || 60
    const adjustedPosition = position * (Dimensions.get('screen').width / (position < 20 ? 80 : 120))
    
    const animationRef = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        const easingFunction = Easing.out(Easing.ease);

        Animated.timing(animationRef, {
            toValue: adjustedPosition,
            duration: 700,
            easing: easingFunction,
            useNativeDriver: true,
        }).start();
    }, [animationRef]);

    return (
        <SafeAreaView>
            <LinearGradient
                colors={["#2DB7FF", "#9EF931", "#FFE44F", "#FF634B"]}
                start={[0, 0]}
                end={[1, 1]}
                locations={[0, 0.5, 0.7, 1]}
                borderColor='secondary.gray'
                style={styles().gradient}
            />
            <Animated.View style={{ transform: [{ translateX: animationRef }] }}>
                <Box
                    style={styles({ position }).pointer}
                    borderColor='secondary.gray'
                // left={`${position}%`}
                >
                    <Box style={styles({ position }).bmiInfo} background='secondary.gray' position={BMI}>
                        <Text style={styles({ position }).bmiText}>Twój - {BMI}</Text>
                    </Box>
                    <Box style={styles().connector} backgroundColor='secondary.gray' />
                </Box>
            </Animated.View>
            <HStack justifyContent='space-between' style={styles().info}>
                <Text color={BMI < 18.5 ? 'primary.contrastText' : 'primary.lightGrey'}>Niedowaga</Text>
                <Text color={BMI >= 18.5 && BMI <= 25 ? 'primary.contrastText' : 'primary.lightGrey'}>Normalna</Text>
                <Text color={BMI > 25 && BMI < 32 ? 'primary.contrastText' : 'primary.lightGrey'}>Nadwaga</Text>
                <Text color={BMI >= 32 ? 'primary.contrastText' : 'primary.lightGrey'}>Otyłość</Text>
            </HStack>
        </SafeAreaView>
    )
}

const styles = (props = {}) => StyleSheet.create({
    gradient: {
        height: 14,
        borderRadius: 70,
        width: '100%'
    },
    pointer: {
        position: 'absolute',
        top: -18,
        height: 22,
        width: 22,
        borderRadius: 70,
        borderWidth: 3,
        boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.25)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    bmiInfo: {
        width: 82,
        height: 32,
        paddingVertical: 6,
        paddingHorizontal: 12,
        top: -50,
        right: 38,
        transform: [{ translateX: props.position > 90 ? -25 : props.position < 5 ? 25 : 0 }],
        borderRadius: 6
    },
    info: {
        width: '100%',
        height: 25,
        top: 15
    },
    connector: {
        width: 2,
        height: 20,
        transform: 'translate(7px, -52px)'
    },
    text: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
    }
});
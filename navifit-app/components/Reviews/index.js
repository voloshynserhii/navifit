import { useEffect } from 'react';
import { View, Animated, Easing, StyleSheet, Dimensions } from 'react-native'
import { Avatar, Box, Center, HStack, VStack, Text } from 'native-base'
import { Rating } from 'react-native-ratings';

const reviews = [
    {
        avatar: undefined,
        fullName: 'Monika Kurzętkowska',
        rating: 5,
        lastRating: '1 week ago',
        text: 'Polecam. Dania są proste do przygotowania, zakupy w każdym sklepie. Polecam!'
    },
    {
        avatar: undefined,
        fullName: 'Maria Bartosz',
        rating: 4,
        lastRating: '1 month ago',
        text: 'Świetnie zbilansowane posiłki, proste w przygotowaniu i na pewno nie nudne! Duża oszczędność czasu i pieniędzy, duży plus za to, że wszystko kupuję w jednym sklepie.'
    },
    {
        avatar: undefined,
        fullName: 'Agata Szimanska',
        rating: 4.5,
        lastRating: '2 weeks ago',
        text: 'Ten jadłospis jest idealny! Posiłki są super smaczne i przede wszystkim SZYBKIE. Przy ograniczaniu spożycia mięsa świetnie urozmaica wege posiłki bez biegania po sklepach w poszukiwaniu cudownych składników. Na prawdę polecam z całego serca, jest warty każdej złotówki.'
    },
]

const Review = ({ className, review, visible, style }) => {
    const { fullName, rating, lastRating, text } = review || {}

    return (
        <Box style={!visible ? style : {}}>
            {visible && (
                <VStack space={2}>
                    <HStack space={4}>
                        <Box>
                            <Avatar source={{
                                uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            }}>{fullName}</Avatar>
                        </Box>
                        <VStack space={1}>
                            <Text style={styles.name}>{fullName}</Text>
                            <HStack space={2}>
                                <Rating
                                    startingValue={rating}
                                    count={5}
                                    showRating={false}
                                    imageSize={20}
                                    readonly
                                    type='custom'
                                />
                                <Text style={styles.rating} color='rgba(0, 0, 0, 0.58)'>{lastRating}</Text>
                            </HStack>
                        </VStack>
                    </HStack>
                    <HStack style={{ width: '100%', flexShrink: 1 }}>
                        <Text style={styles.text}>{text}</Text>
                    </HStack>

                </VStack>
            )}

        </Box>
    )
}

const Reviews = () => {
    const animatedYPosition = new Animated.Value(0);
    const animatedFade = new Animated.Value(1);
    const animatedWidth = new Animated.Value(1.1);
    const animatedZIndex = new Animated.Value(3);
    const duration = 3000;

    //animation 1
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                // Animated.delay(1500),
                Animated.parallel([
                    Animated.timing(animatedYPosition, {
                        toValue: -50,
                        duration: 5000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedFade, {
                        toValue: 0,
                        duration: 5000,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(animatedYPosition, {
                        toValue: 25,
                        duration: duration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedWidth, {
                        toValue: 0.8,
                        duration: duration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedZIndex, {
                        toValue: 3,
                        duration: duration,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(animatedWidth, {
                        toValue: 1.1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedFade, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedYPosition, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]),
            ]),
        ).start();
    }, []);

    const animatedYPosition2 = new Animated.Value(50);
    const animatedFade2 = new Animated.Value(0);
    const animatedWidth2 = new Animated.Value(0.9);
    const animatedZIndex2 = new Animated.Value(3);

    //animation 2
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(animatedYPosition2, {
                        toValue: 20,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedZIndex2, {
                        toValue: 0,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(animatedYPosition2, {
                        toValue: 20,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(animatedZIndex2, {
                        toValue: 4,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(animatedWidth2, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedFade2, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedYPosition2, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(animatedYPosition2, {
                        toValue: -50,
                        duration: 5000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedFade2, {
                        toValue: 0,
                        duration: 5000,
                        useNativeDriver: true,
                    }),
                ]),
            ]),
        ).start();
    }, []);

    return (
        <Center w='100%' h={200}>
            <Animated.View style={[styles.container, { height: 130, position: 'absolute', zIndex: animatedZIndex, transform: [{ translateY: animatedYPosition }, { scaleX: animatedWidth }], opacity: animatedFade }]}>
                <Review review={reviews[0]} visible />
            </Animated.View>
            <Animated.View style={[styles.container, { height: 130, overflow: 'hidden', position: 'absolute', zIndex: animatedZIndex2, transform: [{ translateY: animatedYPosition2 }, { scaleX: animatedWidth2 }], opacity: animatedFade2 }]}>
                <Review review={reviews[1]} visible />
            </Animated.View>
            <View style={[styles.container, { position: 'absolute', zIndex: 2, transform: [{ translateY: 65 }, { scaleX: 0.85 }], opacity: 1, backgroundColor: '#EEEEEE' }]}>
                <Review visible={false} style={{ minWidth: Dimensions.get('window').width - 50 }} />
            </View>
            <View style={[styles.container, { position: 'absolute', zIndex: 1, transform: [{ translateY: 75 }], opacity: 0.3, backgroundColor: 'grey' }]}>
                <Review visible={false} style={{ minWidth: Dimensions.get('window').width - 150 }} />
            </View>
        </Center>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        marginTop: 40,    
    },
    text: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 21,
        // flexShrink: 1,
        // flex: 1, 
        // flexWrap: 'wrap'
    },
    name: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        lineHeight: 21,

    },
    rating: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 18
    }
})

export default Reviews;
import { useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native'
import { Avatar, Box, HStack, VStack, Text } from 'native-base'
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
        text: 'Świetnie zbilansowane posiłki, proste w przygotowaniu i na pewno nie nudne! Duża oszczędność czasu i pieniędzy, duży plus za to, że wszystko kupuję w jednym sklepie. Przygotowywanie posiłków i zdrowe jedzenie przestało być męką, a naprawdę stało się przyjemnością!'
    },
    {
        avatar: undefined,
        fullName: 'Agata Szimanska',
        rating: 4.5,
        lastRating: '2 weeks ago',
        text: 'Ten jadłospis jest idealny! Posiłki są super smaczne i przede wszystkim SZYBKIE. Przy ograniczaniu spożycia mięsa świetnie urozmaica wege posiłki bez biegania po sklepach w poszukiwaniu cudownych składników. Na prawdę polecam z całego serca, jest warty każdej złotówki.'
    },
]

const Review = ({ className, review, visible }) => {
    const { fullName, rating, lastRating, text } = review || {}

    return (
        <Box>
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
                    <Text style={styles.text}>{text}</Text>
                </VStack>
            )}

        </Box>
    )
}

const Reviews = () => {
    const animated = new Animated.Value(0);
    const duration = 5000;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animated, {
                    toValue: 25,
                    duration: duration,
                    useNativeDriver: true,
                }),
                Animated.timing(animated, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: animated }] }]}>
            <Review review={reviews[0]} visible />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16
    },
    text: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 21
    },
    name: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        lineHeight: 21
    },
    rating: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 18
    }
})

export default Reviews;
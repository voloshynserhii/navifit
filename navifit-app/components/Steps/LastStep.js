import moment from 'moment'
import { Box, Stack, VStack, Text } from 'native-base'
import { StyleSheet } from 'react-native';

import Graphic from './Graphic'

const countEndMonth = ({ weight, desiredWeight }) => {
    const diff = Math.abs(weight - desiredWeight)

    return diff / 2 < 12 ? diff / 2 : 12
}

export default function LastStep({ answers = {} }) {
    const { weight = 87, desiredWeight = 76, desiredDate } = answers ?? {}
    const diff = countEndMonth({ weight, desiredWeight })
    const startDate = moment()
    const endDate = moment().add(diff, 'M')
    
    return (
        <Box style={styles.container}>
            <VStack justifyContent='center' alignItems='center' space={2}>
                <Text style={styles.title} color='primary.contrastText'>Przewidujemy, że będziesz </Text>
                <Text style={styles.title} color='primary.contrastText'>
                    <Text style={styles.coloredTitle} color='primary.main'>{desiredWeight} kg</Text> do 
                    <Text style={styles.coloredTitle} color='primary.main'> {endDate.format('DD MMMM YYYY')}</Text>
                </Text>
                <Stack backgroundColor='secondary.greyLighten4' style={styles.badge}>
                    <Text color='black' style={styles.title}>
                        <Text color='black' style={styles.badgeBoldText}> ~{Math.abs(weight - desiredWeight)} Kg</Text> do wydarzenia
                    </Text>
                </Stack>
            </VStack>
            <Box style={{ minHeight: 200, padding: '20px 0' }}>
                <Graphic startWeight={weight} endWeight={desiredWeight} desiredDate={desiredDate} startDate={startDate} endDate={endDate} />
            </Box>
            <Stack>
                <Text style={styles.helpText} color='secondary.greyDarken1'>*Na podstawie danych użytkowników rejestrujących swoje postępy w aplikacji. Najpierw skonsultuj się z lekarzem. Wykres nie jest ilustracją dostosowaną do indywidualnych potrzeb i wyniki mogą się różnić</Text>
            </Stack>
        </Box>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingHorizontal: 15,
        paddingBottom: 25
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 24
    },
    coloredTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_500Medium',
        lineHeight: 30
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 6
    },
    badgeBoldText: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        fontWeight: 500,
        lineHeight: 21
    },
    helpText: {
        fontSize: 10,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 15
    }
});




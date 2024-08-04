import { StyleSheet } from 'react-native';
import { Stack, Text } from 'native-base'
import FireGrey from '@/assets/icons/fireGrey.svg'
import Arrows from '@/assets/icons/arrows.svg'
import BodyType from '@/assets/icons/bodyType.svg'

const getIcon = (name) => {
    switch (name) {
        case 'bodyType':
            return <FireGrey />
        case 'training':
            return <Arrows />
        case 'weight':
            return <BodyType />
        case 'height':
            return <Arrows />
        default:
            break;
    }
}

export default function AnswerInfo({ item = {} }) {
    const { name, title, value } = item;

    return (
        <Stack space={1} style={styles.container} bgColor='secondary.light'>
            <Stack direction='row' justifyContent='space-between'>
                <Stack space={2}>
                    <Text style={styles.title} color='#0A0A0A'>{value}</Text>
                    <Text style={styles.text} color='secondary.lightGrey'>{title}</Text>
                </Stack>
                {getIcon(name)}
            </Stack>
        </Stack>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 14,
        borderRadius: 16,
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold'
    },
    text: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular'
    }
});
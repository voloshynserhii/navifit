import { StyleSheet, Dimensions } from 'react-native';
import { View } from 'react-native';

export function DemoPaper({ style, ...otherProps }) {
    return <View style={[styles.paper, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
    paper: {
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginLeft: 8,
        marginRight: 8,
        padding: 12,
        maxHeight: Dimensions.get('window').height - 150,
        overflow: 'hidden'
    },
});
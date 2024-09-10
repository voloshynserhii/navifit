import { useState, useEffect } from 'react'
import moment from 'moment'
import { View, Dimensions } from 'react-native'
import { Box, Stack, Text } from 'native-base'
import Up from '@/assets/graphics/up.svg'
import Down from '@/assets/graphics/down.svg'

const Row = ({ children }) => <Stack direction='row' alignItems='center' gap={2} style={{ padding: { xs: 0, md: '2px 0', lg: '3px 0' } }}>{children}</Stack>

const getHorizontalLine = ({ startYear, endYear, startMonth, endMonth }) => {
    const months = [moment(startMonth, 'M').format('MMMM')]
    const sameYear = startYear === endYear

    if (sameYear) {
        const step = Math.abs((endMonth - startMonth) / 3)

        months[1] = moment(startMonth + step, 'M').format('MMMM')
        months[2] = moment(startMonth + step * 2, 'M').format('MMMM')
        months[3] = moment(endMonth, 'M').format('MMMM')
    } else {
        const step = ((endYear - startYear) * 12) / 3
        const month2 = startMonth + step > 12 ? (startMonth + step) - 12 : startMonth + step
        const month3 = startMonth + step * 2 > 12 ? (startMonth + step * 2) - 12 : startMonth + step * 2

        months[1] = moment(month2, 'M').format('MMMM')
        months[2] = moment(month3, 'M').format('MMMM')
        months[3] = moment(endMonth, 'M').format('MMMM')
    }
    return months
}

const getFixed = (number) => Number(number).toFixed(0)

const getVerticalLine = ({ startWeight, endWeight }) => {
    const start = startWeight / 10 * 10
    const end = endWeight / 10 * 10
    const diff = Math.abs(start - end)
    const step = diff / 5

    const verticalNumbers = start > end ? [getFixed(start), getFixed(end + step * 4), getFixed(end + step * 3), getFixed(end + step * 2), getFixed(end + step), getFixed(end)] : [getFixed(end), getFixed(start + step * 4), getFixed(start + step * 3), getFixed(start + step * 2), getFixed(start + step), getFixed(start)]

    return verticalNumbers
}

const getWeightOnDesiredDate = ({ startMonth, endMonth, desiredDate, startWeight }) => {
    const desiredMonth = moment(desiredDate).month() + 1
    const diff = desiredMonth < startMonth ? (12 - startMonth) + desiredMonth : desiredMonth - startMonth
    const position = diff > 0 ? diff * 10 : 10
    const desiredWeight = startWeight - (diff * 1.5)

    return { desiredWeight, position }
}

export default function Graphic({ startWeight, endWeight, desiredDate, startDate, endDate }) {
    const startYear = startDate.year()
    const endYear = endDate.year()
    const startMonth = startDate.month() + 1
    const endMonth = moment(endDate).month() + 1

    const months = getHorizontalLine({ startYear, endYear, startMonth, endMonth })
    const verticalNumbers = getVerticalLine({ startWeight, endWeight })
    const { desiredWeight, position } = getWeightOnDesiredDate({ startMonth, endMonth, desiredDate, startWeight })

    return (
        <Box mt={10} mb={6}>
            {verticalNumbers.map((verticalNumber, i) => (
                <Row key={verticalNumber + i}>
                    <Text style={{ lineHeight: '29px' }}>{verticalNumber}   </Text>
                    <View style={{ width: '85%', borderStyle: 'dashed', borderWidth: 1, borderColor: '#E0E0E0' }} />
                </Row>
            ))}

            <Box
                style={{
                    position: 'absolute',
                    left: 30,
                    top: 20,
                    width: Dimensions.get('window').width - 140
                }}
            >
                {endWeight < startWeight
                    ? <Up />
                    : <Down />
                }

                <View style={{
                    position: 'absolute',
                    bottom: endWeight < startWeight ? 0 : '95%',
                    right: 0,
                }}>
                    <View style={{
                        position: 'absolute',
                        top: -58,
                        right: -45,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        backgroundColor: '#3300FF',
                        borderRadius: 6
                    }}>
                        <Text color='white' style={{ fontFamily: 'Poppins_500Medium' }}>Cel - {endWeight} kg</Text>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        width: 2,
                        height: 15,
                        backgroundColor: '#3300FF',
                        zIndex: -1
                    }} />
                    <View style={{
                        position: 'absolute',
                        bottom: -3,
                        left: -6,
                        width: 16,
                        height: 16,
                        backgroundColor: '#FFFFFF',
                        borderColor: '#EFF1F4',
                        borderWidth: 1,
                        borderRadius: 10,
                        shadowColor: 'black',
                        shadowOffset: { width: 2, height: 3 },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                    }} />
                </View>
            </Box>
            <Stack direction='row' justifyContent='space-between' style={{ width: '90%', paddingLeft: '10%' }}>
                {months.map((month, i) => (
                    <Text key={month + i}>{month.slice(0, 3)}</Text>
                ))}
            </Stack>
        </Box >
    )
}
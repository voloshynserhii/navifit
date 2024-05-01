import moment from 'moment'
import { Box, Stack, Typography, Divider } from '@mui/material'

const Row = ({ children }) => <Stack direction='row' alignItems='center' gap={2} sx={{ padding: '1px 0' }}>{children}</Stack>

const getHorizontalLine = ({ startYear, endYear, startMonth, endMonth }) => {
    const months = [moment(startMonth, 'M').format('MMMM')]
    const sameYear = startYear === endYear

    if (sameYear) {
        const step = Math.abs((endMonth - startMonth) / 3)

        months[1] = moment(startMonth + step, 'M').format('MMMM')
        months[2] = moment(startMonth + step * 2, 'M').format('MMMM')
        months[3] = moment(endMonth, 'M').format('MMMM')
    }
    return months
}

const getVerticalLine = ({ startWeight, endWeight }) => {
    let start = Math.round(startWeight / 10) * 10
    let end = Math.round(endWeight / 10) * 10

    if (startWeight > endWeight) {
        if (end > endWeight) end -= 5
        if (start < startWeight) start += 5
    } else {
        if (end < endWeight) end += 5
        if (start > startWeight) start -= 5
    }

    const diff = Math.abs(start - end)
    const step = diff / 5

    const verticalNumbers = start > end ? [start, end + step * 4, end + step * 3, end + step * 2, end + step, end] : [end, start + step * 4, start + step * 3, start + step * 2, start + step, start]
    
    return verticalNumbers
}

export default function Graphic({ startWeight, endWeight, desiredDate, startDate, endDate }) {
    const startYear = moment(startDate).year()
    const endYear = moment(endDate).year()
    const startMonth = moment(startDate).month()
    const endMonth = moment(endDate).month()
    
    const months = getHorizontalLine({ startYear, endYear, startMonth, endMonth })
    const verticalNumbers = getVerticalLine({ startWeight, endWeight })

    return (
        <Box>
            {verticalNumbers.map(verticalNumber => (
                <Row key={verticalNumber}>
                    <Typography>{verticalNumber}</Typography><Divider sx={{ width: '80%', borderStyle: 'dashed' }} />
                </Row>
            ))}

            <Stack direction='row' justifyContent='space-between' sx={{ width: '90%', paddingLeft: '10%' }}>
                {months.map((month, i) => (
                    <Typography key={month + i}>{month}</Typography>
                ))}
            </Stack>
        </Box>
    )
}
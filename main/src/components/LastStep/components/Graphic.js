import { Box, Stack, Typography, Divider } from '@mui/material'

const Row = ({ children }) => <Stack direction='row' alignItems='center' gap={2} sx={{ padding: '5px 0'}}>{children}</Stack>

export default function Graphic({ startWeight, endWeight, desiredDate, startDate, endDate }) {
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

    return (
        <Box>
            {verticalNumbers.map(verticalNumber => (
                <Row key={verticalNumber}>
                    <Typography>{verticalNumber}</Typography><Divider sx={{ width: '80%', borderStyle: 'dashed' }} />
                </Row>
            ))}
        </Box>
    )
}
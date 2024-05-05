import { useState, useEffect } from 'react'
import moment from 'moment'
import { Box, Stack, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import styles from './index.module.css'

const Pointer = styled(Box)(({ theme, left }) => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    border: `3px solid ${theme.palette.secondary.gray}`,
    borderRadius: '70px',
    boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.25)',
    background: 'rgba(255, 255, 255, 1)',
    animation: `myEffect 1000ms linear`,
    animationDelay: '4s',
    "@keyframes myEffect": {
        "0%": {
            width: 0,
            height: 0,
            bottom: 10,
        },
        "100%": {
            width: 22,
            height: 22,
            bottom: 0,
        }
    },
}));

const BMIInfo = styled(Box)(({ theme }) => ({
    width: 'max-content',
    background: theme.palette.primary.main,
    padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
    transform: 'translate(-43%, -50px)',
    borderRadius: 6
}));

const DesiredWeightInfo = styled(Box)(({ theme }) => ({
    width: 'max-content',
    background: theme.palette.secondary.gray,
    padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
    position: 'absolute',
    top: '30%',
    borderRadius: 6
}));

const Connector = styled(Box)(({ theme }) => ({
    width: 2,
    height: 15,
    background: theme.palette.primary.main,
    transform: 'translate(7px, -50px)'
}));

const Row = ({ children }) => <Stack direction='row' alignItems='center' gap={2} sx={{ padding: {xs: 0, md: '2px 0', lg: '3px 0' } }}>{children}</Stack>

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
    
    return { desiredWeight, position}
}

export default function Graphic({ startWeight, endWeight, desiredDate, startDate, endDate }) {
    const [style, setStyle] = useState({ width: 0, height: 0 })
    const startYear = startDate.year()
    const endYear = moment(endDate).year()
    const startMonth = moment(startDate).month() + 1
    const endMonth = moment(endDate).month() + 1

    const months = getHorizontalLine({ startYear, endYear, startMonth, endMonth })
    const verticalNumbers = getVerticalLine({ startWeight, endWeight })
    const {desiredWeight, position} = getWeightOnDesiredDate({ startMonth, endMonth, desiredDate, startWeight })
    
    useEffect(() => {
        setTimeout(
            () => {
                setStyle({ width: 22, height: 22 });

                const el = document.getElementById('graphic')
                el.className = ''
            },
            4500
        );
        return () => clearTimeout()
    }, [])

    return (
        <Box>
            {verticalNumbers.map((verticalNumber, i) => (
                <Row key={verticalNumber + i}>
                    <Typography sx={{ lineHeight: '23px' }}>{verticalNumber}</Typography><Divider sx={{ width: '80%', borderStyle: 'dashed' }} />
                </Row>
            ))}
            <DesiredWeightInfo sx={{ left: `${position}%` }}>{desiredWeight}kg
                <Divider sx={{ width: 125, borderWidth: 1, borderStyle: 'dashed', position: 'absolute', transform: 'rotate(-90deg)', top: 98, left: '-43%', borderColor: 'rgba(97, 97, 97, 1)' }} />
            </DesiredWeightInfo>
            <div className={styles.graphic} id='graphic' style={{ position: 'absolute', left: '14%', top: '35%', width: '70%' }}>
                <svg width="100%" height="100%" viewBox="0 0 337 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.87192C3 4.87192 52.0348 -7.3821 103.557 30.8206C136.926 55.5629 155.621 92.9904 191.021 112.657C229.286 133.917 334 131.952 334 131.952" stroke="url(#paint0_linear_2652_7963)" strokeWidth="6" strokeLinecap="round" />
                    <defs>
                        <linearGradient id="paint0_linear_2652_7963" x1="-15.5" y1="-16.2835" x2="368.441" y2="79.1642" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FF0000" />
                            <stop offset="0.255456" stopColor="#FFCE80" />
                            <stop offset="0.505" stopColor="#43CE21" />
                            <stop offset="1" stopColor="#13FFE3" />
                        </linearGradient>
                    </defs>
                </svg>
                <Pointer style={{ width: style.width, height: style.height }}>
                    <div style={{ display: style.width > 0 ? 'block' : 'none' }}>
                        <BMIInfo>
                            <Typography variant='medium14' color='white'>Cel - {endWeight} kg</Typography>
                        </BMIInfo>
                        <Connector />
                    </div>
                </Pointer>
            </div>
            <Stack direction='row' justifyContent='space-between' sx={{ width: '90%', paddingLeft: '10%' }}>
                {months.map((month, i) => (
                    <Typography key={month + i}>{month}</Typography>
                ))}
            </Stack>
        </Box>
    )
}
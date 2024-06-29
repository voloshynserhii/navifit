import { useState, useEffect } from 'react'
import { Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { fireGrey, arrows, bodyType } from "../../utils/icons"

const InfoContainer = styled(Stack)(({ theme }) => ({
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
    backgroundColor: theme.palette.secondary.light,
    borderRadius: theme.spacing(1),
}));

const getIcon = (name) => {
    switch (name) {
        case 'bodyType':
            return fireGrey
        case 'training':
            return arrows
        case 'weight':
            return bodyType
        case 'height':
            return arrows
        default:
            break;
    }
}

export default function AnswerInfo({ item = {}, blockNumber }) {
    const [blockHeight, setBlockHeight] = useState()
    
    const { name, title, value } = item;
    
    useEffect(() => {
        if (blockNumber === 1) {
            const block = document.querySelector('#answer-0')

            if (block) {
                setBlockHeight(block?.clientHeight)
            }
        }
    }, [blockNumber])

    return (
        <InfoContainer id={`answer-${blockNumber}`} gap={1} sx={{ height: `${blockHeight}px` || 'fit-content'}}>
            <Stack direction='row' justifyContent='space-between'>
                <Stack gap={1}>
                    <Typography variant='h3semi'>{value}</Typography>
                    <Typography variant='body14' color='secondary.lightGrey'>{title}</Typography>
                </Stack>
                <div style={{ paddingTop: 4 }}>{getIcon(name)}</div>
            </Stack>
        </InfoContainer>
    )
}
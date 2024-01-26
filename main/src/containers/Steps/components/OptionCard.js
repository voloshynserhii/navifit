import { Stack, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import { styled } from '@mui/material/styles';

const OptionContainer = styled(Paper)(({ theme }) => ({
    position: 'relative',
    padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
    margin: `${theme.spacing(1.5)} 0`,
    backgroundColor: 'rgba(var(--mainGrey-rgb))',
    borderRadius: theme.spacing(3),
    border: '1px solid rgba(var(--cardBorder-rgb))',
    cursor: 'pointer',
    '&:hover': {
        // border: '1px solid rgba(var(--mainGreen-rgb))',
    },
}));

export default function Option({ option, onChooseOption }) {

    return (
        <OptionContainer onClick={onChooseOption}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Stack>
                    <Typography variant='h5'>{option.title}</Typography>
                    <Typography variant='body2'>{option.subTitle}</Typography>
                </Stack>

                {/* <Image
                    src="/TakImage.png"
                    width={500}
                    height={343}
                    alt="Tak"
                /> */}
            </Stack>
        </OptionContainer>
    )
}
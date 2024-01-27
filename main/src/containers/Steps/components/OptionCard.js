import { Stack, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import { styled } from '@mui/material/styles';
import Checkbox from '../../Main/components/Checkbox'

const OptionContainer = styled(Paper)(({ theme, chosen }) => ({
    position: 'relative',
    padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
    margin: `${theme.spacing(1.5)} 0`,
    backgroundColor: !chosen ? 'rgba(var(--mainGrey-rgb))' : 'rgba(var(--greyText-rgb))',
    borderRadius: theme.spacing(3),
    border: '1px solid rgba(var(--cardBorder-rgb))',
    cursor: 'pointer',
    '&:hover': {
        // border: '1px solid rgba(var(--mainGreen-rgb))',
    },
}));

export default function Option({ option, prevData, onSelect, onCheck }) {
    const checked = prevData ? prevData[option.value] : false;
    
    return (
        <OptionContainer chosen={!option.checkbox && prevData && option.value === prevData} onClick={!option.checkbox ? () => onSelect(option.value) : () => { }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Stack>
                    <Stack direction='row' alignItems='center'>
                        {option.checkbox && <Checkbox checked={checked} isDarkTheme={false} onGetChecked={(checked) => onCheck(checked)} />}
                        <Typography variant='h3'>{option.title}</Typography>
                    </Stack>

                    <Typography variant='h5'>{option.subTitle}</Typography>
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
import { Stack, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import { styled } from '@mui/material/styles';
import Checkbox from '../../Main/components/Checkbox'

const OptionContainer = styled(Paper)(({ theme, selected }) => ({
    position: 'relative',
    padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
    margin: `${theme.spacing(1.5)} 0`,
    backgroundColor: !selected ? 'rgba(var(--mainGrey-rgb))' : 'rgba(var(--greyText-rgb))',
    borderRadius: theme.spacing(3),
    border: '1px solid rgba(var(--cardBorder-rgb))',
    cursor: 'pointer',
    '&:hover': {
        // border: '1px solid rgba(var(--mainGreen-rgb))',
    },
}));

export default function Option({ option, prevData, onSelect, onCheck }) {
    const checked = prevData && prevData[option.value] ? prevData[option.value] : false;
    
    return (
        <OptionContainer selected={!option.checkbox && prevData && option.value === prevData} onClick={!option.checkbox ? () => onSelect(option.value) : () => onCheck(!checked)}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Stack gap={1}>
                    <Stack direction='row' alignItems='center'>
                        {option.checkbox && <Checkbox checked={checked} isDarkTheme={false} onGetChecked={(selected) => onCheck(selected)} />}
                        <Typography variant='h3'>{option.title}</Typography>
                    </Stack>

                    <Typography variant='h5'>{option.subTitle}</Typography>
                </Stack>

                {option.src && <Image
                    src={option.src}
                    width={44}
                    height={44}
                    alt={option.title}
                />}
                {/* {option.src && <img
                    src={option.src}
                    // width={44}
                    // height={44}
                    alt={option.title}
                />} */}
            </Stack>
        </OptionContainer>
    )
}
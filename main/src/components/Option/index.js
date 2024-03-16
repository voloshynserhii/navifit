import { Stack, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

const OptionContainer = styled(Paper)(({ theme, selected, gridview }) => ({
    position: 'relative',
    padding: !gridview ? `${theme.spacing(3)} ${theme.spacing(3)}` : `${theme.spacing(2)} ${theme.spacing(2)}`,
    margin: !gridview ? `${theme.spacing(1.25)} 0` : `${theme.spacing(0.75)}`,
    backgroundColor: 'white',
    borderRadius: !gridview ? 10 : 80,
    width: !gridview ? 'auto' : 'fit-content',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: selected ? theme.palette.primary.main : theme.palette.primary.lightGrey,
    cursor: 'pointer',
    boxShadow: 'none',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
}));

export default function Option({ option, long = false, prevData, onSelect, onCheck }) {
    const checked = prevData && prevData[option.value] ? prevData[option.value] : false;

    return (
        <OptionContainer selected={prevData && option.value === prevData || checked} gridview={long ? 1 : 0} onClick={() => !long ? onSelect(option.value) : onCheck(option.value)}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Stack>
                    <Stack direction='row' alignItems='center'>
                        <Typography variant='h3'>{option.title}</Typography>
                    </Stack>

                    <Typography variant='h5'>{option.subTitle}</Typography>
                </Stack>
            </Stack>
        </OptionContainer>
    )
}
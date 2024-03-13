import { Stack, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

const OptionContainer = styled(Paper)(({ theme, selected }) => ({
    position: 'relative',
    padding: `${theme.spacing(3)} ${theme.spacing(3)}`,
    margin: `${theme.spacing(1)} 0`,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: selected ? theme.palette.primary.main : theme.palette.primary.lightGrey,
    cursor: 'pointer',
    boxShadow: 'none',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
}));

export default function Option({ option, prevData, onSelect, onCheck }) {
    const checked = prevData && prevData[option.value] ? prevData[option.value] : false;
    
    return (
        <OptionContainer selected={!option.checkbox && prevData && option.value === prevData} onClick={!option.checkbox ? () => onSelect(option.value) : () => onCheck(!checked)}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Stack>
                    <Stack direction='row' alignItems='center'>
                        {/* {option.checkbox && <Checkbox checked={checked} isDarkTheme={false} onGetChecked={(selected) => onCheck(selected)} />} */}
                        <Typography variant='h3'>{option.title}</Typography>
                    </Stack>

                    <Typography variant='h5'>{option.subTitle}</Typography>
                </Stack>
            </Stack>
        </OptionContainer>
    )
}
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

export default function AnswerInfo({ item = {} }) {
    const { name, title, value } = item;

    return (
        <InfoContainer gap={1}>
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
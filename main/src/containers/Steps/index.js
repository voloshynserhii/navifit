import { Container, Button } from '@mui/material'
import Progress from './components/Progress'

const Steps = ({ onGetBack }) => {
    return (
        <Container>
            <Button onClick={() => onGetBack()}>Powrot</Button>
            <Progress />
        </Container>
    )
}

export default Steps;
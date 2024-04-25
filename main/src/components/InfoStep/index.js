import { Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Button from '../AppButton'
import Progress from '../Progress'
import InfoMessage from '../InfoMessage'
import AnswerInfo from '../AnswerInfo'
import BMI from '../BMI'

const DemoPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.spacing(4),
    overflow: 'hidden',
    paddingBottom: 125
}));

const userInfo = {
    bodyType: {
        title: 'Budowa',
    },
    training: {
        title: 'Działalność',
    },
    weight: {
        title: 'Waga',
    },
    height: {
        title: 'Wysokość',
    },
}
const values = ['bodyType', 'dayType', 'training', 'weight', 'height']

export default function InfoStep({ answers = {}, step = 1, steps, totalSteps, showWarning, onStepBack, onStepAhead }) {
    const { bodyType = '1', dayType = '3', training = '2', weight = '72', height = '175' } = answers
    const stepsForInfo = steps.filter(step => values.includes(step.value))

    return (
        <Container>
            <DemoPaper sx={{ minHeight: { md: '60vh' }, marginBottom: 10 }}>
                <Grid container >
                    <Grid item xs={12} md={6} sx={{ padding: { xs: '12px 12px 0 12px', md: '1.5rem 60px' } }}>
                        <Progress step={step} totalSteps={totalSteps} onStepBack={onStepBack} />
                    </Grid>
                    <Stack sx={{ width: '100%' }} justifyContent='center' alignItems='center' gap={1}>
                        <Typography
                            component="h2"
                            variant='h2'
                            sx={{ margin: 'auto' }}
                        >
                            Twój profil dobrego samopoczucia
                        </Typography>
                        <Grid container width='50%'>
                            {Object.keys(userInfo).map(name => {
                                let value = 'test'

                                if (name === 'bodyType') {
                                    const optionStep = stepsForInfo.find(step => step.value === name)
                                    value = optionStep.options.find(option => option.value === bodyType)?.title
                                } else if (name === 'training') {
                                    const total = Number(dayType) + Number(training)

                                    if (total < 4) {
                                        value = 'Nizka'
                                    } else if (total > 6) {
                                        value = 'Wysoka'
                                    } else {
                                        value = 'Średnia'
                                    }
                                } else if (name === 'weight') {
                                    value = `${weight} kg`
                                } else {
                                    value = `${+height / 100} m`
                                }

                                const item = {
                                    name,
                                    title: userInfo[name].title,
                                    value
                                }

                                return (
                                    <Grid key={name} item xs={6} sx={{ padding: 1.5 }}>
                                        <AnswerInfo item={item} />
                                    </Grid>
                                )
                            })}

                            <Grid item xs={12} sx={{ padding: 1.5, marginTop: 7.5, paddingBottom: 2 }}>
                                <BMI BMI={showWarning.BMI}/>
                            </Grid>

                            <Grid item xs={12} sx={{ padding: 1.5 }}>
                                <InfoMessage showWarning={showWarning} />
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
                <Stack
                    alignItems='center'
                    justifyContent='center'
                    sx={{ position: { xs: 'fixed', md: 'absolute' }, bottom: { xs: 40, md: 32 }, right: { xs: 0, md: 60 }, width: { xs: '100%', md: 'auto' } }}
                >
                    <Button type='primary' title='Dalej' onClick={onStepAhead} />
                </Stack>
            </DemoPaper>
        </Container>
    )
}
import { Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Progress from '../Progress'
import UserPermission from '../UserPermission'
import InfoMessage from '../InfoMessage';
import styles from './index.module.css'

const DemoPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.spacing(4),
    overflow: 'hidden',
    boxShadow: 'unset !important'
}));

const getFormattedQuestion = (question) => {
    let words = question.split(' ').map(word => ` ${word} `)

    const foundWord = words.find(word => word.search('/%') > -1)
    const foundWords = words.filter(word => word.search('/%') > -1)

    if (foundWords.length > 1) {
        const expression = foundWords.map(word => word.replace('/%', '')).join(' ')

        let firstIndex, lastIndex

        foundWords.forEach(foundWord => {
            const i = words.findIndex((word) => word.search(foundWord) > -1)

            if (!firstIndex) firstIndex = i
            lastIndex = i
        })

        words.splice(firstIndex, lastIndex - firstIndex)
        words[firstIndex] = <Typography component="h2" variant='h1' className="colored-title">{expression}</Typography>
    } else if (foundWord) {
        const i = words.findIndex(word => word.search('/%') > -1)
        const newWord = <Typography component="h2" variant='h1' className="colored-title">{foundWord.replace('/%', '').trim()}</Typography>

        words[i] = newWord
    }

    return words
}

export default function StepContainer({ currentStep, step = 1, totalSteps, showWarning, children, onStepBack }) {
    const styled = currentStep.isGraphic
    const question = currentStep.title || ''
    const description = currentStep.subTitle || ''
    const icon = currentStep.icon

    return (
        <Container>
            <DemoPaper className={styles.container} sx={{ minHeight: { md: '60vh' } }}>
                <Grid container >
                    <Grid item xs={12} md={6} sx={{ padding: { xs: '12px 12px 0 12px', md: '2rem 60px' } }}>
                        <Progress step={step} totalSteps={totalSteps} onStepBack={onStepBack} />
                        
                        <Stack
                            sx={{ position: { xs: 'relative', md: 'absolute' }, top: { xs: '-24px', md: '50%' }, transform: { md: 'translateY(-50%)' }, maxWidth: { xs: '100%', md: '42%' } }}>
                            <Typography
                                component="span" sx={{ marginTop: 5 }}>
                                {getFormattedQuestion(question).map(item => (
                                    <Typography
                                        key={item}
                                        component="h2"
                                        variant='h1'
                                        sx={{ display: 'inline' }}
                                    >
                                        {item}
                                    </Typography>
                                ))}
                            </Typography>

                            {description && !styled
                                && <Typography
                                    variant="body16"
                                    color='primary.contrastText'
                                    sx={{ width: '95%', marginTop: 2.5, fontSize: { xs: 12, md: 16 }, lineHeight: { xs: '18px', md: 'inherit' } }}
                                >
                                    {description}
                                </Typography>
                            }

                            {(showWarning || (description && styled)) && <InfoMessage icon={icon} text={description} showWarning={showWarning} />}
                        </Stack>

                        {step === 1 && <Stack sx={{ display: { xs: 'none', md: 'block' }, width: { xs: '100%', md: '40%' }, position: { xs: 'relative', md: 'absolute' }, bottom: { xs: 0, md: '10%' } }}>
                            <UserPermission />
                        </Stack>}
                    </Grid>
                    {children}
                </Grid>
            </DemoPaper>
        </Container>
    )
}
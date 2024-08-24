import { useState, useEffect } from 'react'
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Box, Icon, Heading, Stack, VStack, FormControl, Input, Link, HStack, Text, ChevronLeftIcon, Pressable } from 'native-base'
import AppButton from '../AppButton'
import EmailIcon from '@/assets/icons/email.svg'
import PasswordVisibleIcon from '@/assets/icons/passwordVisible.svg'
import PasswordHiddenIcon from '@/assets/icons/passwordHidden.svg'
import OkIcon from '@/assets/icons/OK.svg'
import ChooseTypeStep from './ChooseTypeStep'
import { isEmail } from '@/utils/functions'


const CustomInput = (props) => (
    <Input
        style={styles.customInput}
        borderRadius={10}
        color='primary.contrastText'
        _input={{ backgroundColor: 'white' }}
        {...props}
    />
)

const defaultValidationValue = {
    emailError: '',
    password: {
        chars: false,
        digit: false,
        letter: false
    },
    passwordMatch: true
}

const AuthForm = ({
    title = '',
    subTitle = '',
    agreeText = '',
    signup = false,
    changePassword = false,
    currentUser = {},
    error: serverError,
    message,
    onClearError = () => { },
    onSubmit,
    onChangePassword,
    onRestorePassword,
    onGetConfirmedUser,
    onGoogleLogin
}) => {
    const router = useRouter()
    const searchParams = useGlobalSearchParams()
    const userId = searchParams.user
    const confirmed = searchParams.confirmed

    const [serverErrorMessage, setServerErrorMessage] = useState('')
    const [loginType, setLoginType] = useState()
    const [validation, setValidation] = useState(defaultValidationValue)
    const [email, setEmail] = useState(currentUser.email)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [resetPassword, setResetPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [formIsValid, setFormIsValid] = useState(false)
    
    useEffect(()=> {
        setServerErrorMessage(serverError)
    }, [serverError])
    
    let login = true
    let header = title
    let subHeader = subTitle
    let mainButtonTitle = 'Zaloguj się'
    let helperButtonsText = ['Nie masz jeszcze konta NAVIFIT?', 'Załóż konto']

    if (signup) {
        mainButtonTitle = 'Załóż konto'
        helperButtonsText = ['Masz konta NAVIFIT?', 'Zaloguj się']
        login = false
    }

    if (resetPassword) {
        header = 'Przypomnienie hasła'
        subHeader = 'Wpisz adres e-mail, na który jesteś zarejestrowana w aplikacji NAVIFIT'
        mainButtonTitle = 'Wyślij hasło'
        helperButtonsText = ['Masz pytanie?', 'Skontaktuj się z nami']
        login = false
    }

    if (changePassword) {
        mainButtonTitle = 'Zresetuj hasło'
        helperButtonsText = []
        login = false
    }

    useEffect(() => {
        if (userId && confirmed === 'true') {
            onGetConfirmedUser(userId)
        }
    }, [userId, confirmed])

    useEffect(() => {
        onClearError()
    }, [email, password, confirmPassword])

    useEffect(() => {
        const { emailError, password, passwordMatch } = validation

        if (!signup && !resetPassword && !changePassword && password && email) {
            setFormIsValid(true)
        }

        if (!emailError && password.chars && password.digit && password.letter) {
            if (signup) {
                if (passwordMatch) {
                    setFormIsValid(true)
                } else {
                    setFormIsValid(false)
                }
            } else {
                setFormIsValid(true)
            }
        } else {
            if (resetPassword && !emailError) {
                setFormIsValid(true)
            } else {
                setFormIsValid(false)
            }
        }
    }, [validation])

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const onClickMainButton = () => {
        if (resetPassword) {
            confirmRestorePasswordHandler()
        } else if (changePassword) {
            confirmChangePasswordHandler()
        } else {
            onSubmit({ email, password, confirmPassword })
        }
    }

    const confirmChangePasswordHandler = () => {
        onChangePassword(password)
    }

    const confirmRestorePasswordHandler = () => {
        setResetPassword(false)
        onRestorePassword({ email })
    }

    const validateFields = (field, val) => {
        if (field === 'password') {
            if (val) {
                if (val.length >= 8) {
                    setValidation((prev) => ({ ...prev, [field]: { ...prev[field], chars: true } }))
                } else {
                    setValidation((prev) => ({ ...prev, [field]: { ...prev[field], chars: false } }))
                }
                if (/\d/.test(val)) {
                    setValidation((prev) => ({ ...prev, [field]: { ...prev[field], digit: true } }))
                } else {
                    setValidation((prev) => ({ ...prev, [field]: { ...prev[field], digit: false } }))
                }
                if (/[a-zA-Z]/.test(val)) {
                    setValidation((prev) => ({ ...prev, [field]: { ...prev[field], letter: true } }))
                } else {
                    setValidation((prev) => ({ ...prev, [field]: { ...prev[field], letter: false } }))
                }
            } else {
                setValidation((prev) => ({ ...prev, ...defaultValidationValue[field] }))
            }

        } else if (field === 'passwordMatch') {
            if (val !== password) {
                setValidation((prev) => ({ ...prev, [field]: false }))
            } else {
                setValidation((prev) => ({ ...prev, [field]: true }))
            }

        } else {
            setValidation((prev) => ({ ...prev, [field]: val }))
        }
    }
    return (
        <Box bg='white' borderRadius={30} style={styles.demoPaper}>
            <Box>
                <VStack mb={5}>
                    {resetPassword || ((signup || login) && !!loginType) && (
                        <Pressable style={styles.backButton} onPress={() => {
                            setResetPassword(false)
                            onClearError()
                            setLoginType(undefined)
                        }}>
                            <ChevronLeftIcon size="5" />
                        </Pressable>
                    )}

                    <Heading style={styles.title}>{header}</Heading>

                    <Text style={styles.subTitle} color='secondary.greyDarken2'>
                        {subHeader}
                    </Text>
                </VStack>

                {(signup || login) && !loginType ? (
                    <ChooseTypeStep
                        login={login}
                        onGoogleLogin={onGoogleLogin}
                        onChooseEmailType={() => setLoginType(true)}
                        onChangeType={() => router.push(`${login ? '/signup' : '/login'}`)}
                    />
                ) : (
                    <VStack>
                        {message && <Stack style={styles.confirmContainer} backgroundColor='secondary.greyLighten5'>
                            <Text color='black' textAlign='center'>{message} </Text>
                        </Stack>}

                        {currentUser && currentUser.oneTimePassword && !currentUser.isConfirmed && (
                            <Stack style={styles.confirmContainer}>
                                <Text style={styles.confirmTitle}>
                                    Aby aktywować konto odbierz e-mail potwierdzający rejestrację i kliknij w link w treści wiadomości.
                                </Text>
                                <Text color='secondary.greyDarken2'>
                                    Jeżeli nie dostałeś wiadomości, sprawdź czy nie znajduje się ona w folderze spam Twojej poczty lub wyślij ponownie link aktywacyjny.
                                </Text>
                            </Stack>
                        )}

                        {userId && currentUser && currentUser.isConfirmed && !resetPassword && (
                            <VStack style={styles.confirmContainer}>
                                <HStack justifyContent='center' space={5}>
                                    <OkIcon />
                                    <Text style={styles.confirmTitle}>Twoje konto zostało aktywowane</Text>
                                </HStack>
                                <Text color='secondary.greyDarken2'>
                                    Możesz zalogować się za pomocą swojego adresu e-mail i hasła
                                </Text>
                            </VStack>
                        )}

                        <VStack space={5}>
                            {!changePassword && (
                                <FormControl
                                    isInvalid={!!serverErrorMessage || (email && !!validation.emailError)}
                                >
                                    <CustomInput
                                        value={email || ''}
                                        placeholder="Email"
                                        rightElement={<Icon
                                            style={{ position: 'absolute', right: 20 }}
                                            as={<EmailIcon />}
                                        />}
                                        onChangeText={text => setEmail(text.trim().toLowerCase())}
                                        onEndEditing={(e) => !isEmail(e.nativeEvent.text) ? validateFields('emailError', true) : validateFields('emailError', false)}
                                    />
                                    {email && validation.emailError && (
                                        <Text style={styles.helperText} color='secondary.red'>
                                            Invalid email format
                                        </Text>
                                    )}
                                </FormControl>)
                            }

                            {!resetPassword && <FormControl isInvalid={!!serverErrorMessage}>
                                <CustomInput
                                    value={password || ''}
                                    type={showPassword ? 'text' : 'password'}
                                    rightElement={<Icon
                                        style={{ position: 'absolute', right: 30 }}
                                        as={<Pressable
                                            onPress={handleClickShowPassword}>
                                            {showPassword ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
                                        </Pressable>}
                                    />}
                                    onChangeText={text => {
                                        setPassword(text.trim())
                                        validateFields('password', text?.trim())
                                    }}
                                    onEndEditing={() => confirmPassword ? validateFields('passwordMatch', confirmPassword) : () => { }}
                                    placeholder={changePassword ? "New Password" : "Password"}
                                />

                                {(signup || changePassword) && password && (
                                    <>
                                        <Text style={styles.helperText} color='primary.contrastText'>
                                            Make sure your password contains:
                                        </Text>
                                        <Text style={styles.helperText} color={!validation.password.chars ? 'secondary.greyDarken2' : 'secondary.greenDarken1'}>
                                            Minimum 8 characters
                                        </Text>
                                        <Text style={styles.helperText} color={!validation.password.digit ? 'secondary.greyDarken2' : 'secondary.greenDarken1'}>
                                            At least 1 digit
                                        </Text>
                                        <Text style={styles.helperText} color={!validation.password.letter ? 'secondary.greyDarken2' : 'secondary.greenDarken1'}>
                                            At least 1 letter
                                        </Text>
                                    </>
                                )}
                            </FormControl>}

                            {(signup || changePassword) && (
                                <FormControl>
                                    <CustomInput
                                        value={confirmPassword || ''}
                                        error={!!serverErrorMessage}
                                        type={showPassword ? 'text' : 'password'}
                                        onBlur={() => validateFields('passwordMatch', confirmPassword)}
                                        onChangeText={text => setConfirmPassword(text.trim())}
                                        rightElement={<Icon
                                            style={{ position: 'absolute', right: 30 }}
                                            as={<Pressable
                                                onPress={handleClickShowPassword}>
                                                {showPassword ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
                                            </Pressable>}
                                        />}
                                        placeholder="Confirm Password"
                                    />
                                    {confirmPassword && !validation.passwordMatch && (
                                        <Text style={styles.helperText} color='secondary.red'>
                                            Password didn’t match
                                        </Text>
                                    )}
                                </FormControl>
                            )}
                        </VStack>

                        <VStack style={{ position: 'relative', paddingHorizontal: 8, marginTop: 4 }}>
                            <HStack justifyContent='space-between' style={{ marginBottom: 12 }}>
                                <Text style={styles.helperText} color='secondary.red'>
                                    {serverErrorMessage ? serverErrorMessage : ''}
                                </Text>

                                {!resetPassword && !changePassword && !signup && (
                                    <Pressable onPress={() => {
                                        setServerErrorMessage(undefined)
                                        setResetPassword(true);
                                    }}>
                                        <Text style={styles.helperText} color='primary.blueAccent'>
                                            Zapomniales hasla?
                                        </Text>
                                    </Pressable>
                                )}
                            </HStack>

                            <AppButton
                                noIcon
                                disabled={!formIsValid}
                                title={mainButtonTitle}
                                onPress={onClickMainButton}
                            />

                        </VStack>
                    </VStack>
                )}

                {helperButtonsText?.length ? (
                    <HStack justifyContent='center' space={2} mt={8}
                    >
                        <Text color='black' style={styles.helperText}>
                            {helperButtonsText[0]}
                        </Text>
                        <Link onPress={() => router.push(`${login ? '/signup' : '/login'}`)}>
                            <Text style={styles.helperText} color='primary.blueAccent'>
                                {helperButtonsText[1]}
                            </Text>
                        </Link>

                    </HStack>
                ) : <></>}

                {!resetPassword && (
                    <Text color='secondary.greyDarken2' style={styles.agreeText}>
                        {agreeText}
                    </Text>
                )}
            </Box>
        </Box>
    )
};

const styles = StyleSheet.create({
    demoPaper: {
        paddingTop: 35,
        paddingBottom: 35,
        marginLeft: 12,
        marginRight: 12,
        paddingLeft: 12,
        paddingRight: 12
    },
    customLabel: {
        transform: 'translate(16px, 16px)',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
    },
    customInput: {
        height: 56,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    },
    title: {
        fontSize: 30,
        fontFamily: 'Poppins_600SemiBold',
        lineHeight: 45
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 24,
        marginTop: 10
    },
    backButton: {
        height: 32,
        width: 32,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    helperText: {
        fontSize: 14,
        lineHeight: 21,
        fontFamily: 'Poppins_400Regular',
        marginTop: 4
    },
    agreeText: {
        textAlign: 'center',
        marginTop: 32,
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 18
    },
    confirmContainer: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        textAlign: 'center',
        backgroundColor: '#FAFAFA',
        marginBottom: 19,
    },
    confirmTitle: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        lineHeight: 21,
        color: 'black'
    }
});

export default AuthForm;
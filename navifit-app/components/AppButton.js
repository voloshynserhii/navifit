import { Button, ChevronRightIcon } from 'native-base'

const AppButton = ({ title = '', noIcon, disabled, ...props }) => {
    return (

        <Button
            bgColor='primary.main'
            rounded="3xl"
            mt={4}
            endIcon={!noIcon && <ChevronRightIcon size="4" />}
            _text={{ fontFamily: 'Poppins_400Regular', fontSize: 16, fontWeight: 500 }}
            _stack={{ width: '50%', ml: '40%' }}
            _icon={{ position: "absolute", left: '90%' }}
            isDisabled={disabled}
            {...props}
        >
            {title}
        </Button>
    )
}

export default AppButton;
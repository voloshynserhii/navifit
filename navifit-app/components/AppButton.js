import { Button, ChevronRightIcon } from 'native-base'

const AppButton = ({ title = '', noIcon, disabled, ...props }) => {
    return (
        <Button
            bgColor={disabled ? 'secondary.greyLighten2' : 'primary.main'}
            rounded="3xl"
            mt={4}
            endIcon={!noIcon && <ChevronRightIcon size="4" />}
            _text={{ fontFamily: 'Poppins_500Medium', fontSize: 16, fontWeight: 500, color: disabled ? '#9E9E9E' : 'white' }}
            _stack={!noIcon ? { width: '50%', ml: '40%' } : {}}
            _icon={{ position: "absolute", left: '90%', color: disabled ? '#9E9E9E' : 'white' }}
            isDisabled={disabled}
            {...props}
        >
            {title}
        </Button>
    )
}

export default AppButton;
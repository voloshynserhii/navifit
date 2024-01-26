'use client'
import { useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';
import CheckboxIcon from '../../../components/Icons/Checkbox'
import { iconDarkColor } from '../../../app/utils/consts';

const CustomCheckbox = ({ onGetChecked, isDarkTheme }) => {
    const [isChecked, setIsChecked] = useState(true);

    useEffect(() => {
        onGetChecked(isChecked);
    }, [isChecked])

    const checkboxHandler = () => {
        setIsChecked(state => !state)
    }

    return (
        <div onClick={checkboxHandler}>
            <label>
                <CheckboxIcon fillColor={isDarkTheme ? iconDarkColor : 'rgba(var(--greyText-rgb))'} checked={isChecked} />
                <Checkbox
                    checked={isChecked}
                    sx={{ opacity: '0', transform: 'translateY(-30px)' }}
                />
            </label>
        </div>
    );
};
export default CustomCheckbox;
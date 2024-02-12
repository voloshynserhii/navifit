'use client'
import { useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';
import CheckboxIcon from '../../../components/Icons/Checkbox'
import { iconDarkColor } from '../../../utils/consts';

const CustomCheckbox = ({ checked = false, onGetChecked, isDarkTheme }) => {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        if (checked !== isChecked) setIsChecked(checked)
    }, [checked, isChecked])

    const checkboxHandler = () => {
        setIsChecked(state => !state)
    }

    return (
        <div style={{ height: 25 }} onClick={checkboxHandler}>
            <label>
                <CheckboxIcon fillColor={isDarkTheme ? iconDarkColor : 'rgba(var(--greyText-rgb))'} checked={isChecked} />
                <Checkbox
                    checked={isChecked}
                    sx={{ opacity: '0', transform: 'translateY(-30px)' }}
                    onChange={(e) => onGetChecked(e.target.checked)}
                />
            </label>
        </div>
    );
};

export default CustomCheckbox;
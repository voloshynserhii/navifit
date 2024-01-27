'use client'
import { useState } from 'react';
import { Checkbox } from '@mui/material';
import CheckboxIcon from '../../../components/Icons/Checkbox'
import { iconDarkColor } from '../../../app/utils/consts';

const CustomCheckbox = ({ checked = false, onGetChecked, isDarkTheme }) => {
    const [isChecked, setIsChecked] = useState(checked);

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
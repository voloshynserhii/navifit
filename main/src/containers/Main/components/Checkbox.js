'use client'
import { useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';
import CheckboxIcon from '../../../components/Icons/Checkbox'

const CustomCheckbox = ({ onGetChecked }) => {
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
                <CheckboxIcon checked={isChecked} />
                <Checkbox
                    checked={isChecked}
                    sx={{ opacity: '0', transform: 'translateY(-30px)' }}
                />
            </label>
        </div>
    );
};
export default CustomCheckbox;
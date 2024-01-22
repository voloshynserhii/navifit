'use client'
import { useState } from 'react';
import { Checkbox } from '@mui/material';
import Checked from '../../../components/Icons/Checked'

const CustomCheckbox = () => {
    const [isChecked, setIsChecked] = useState(true);

    const checkboxHandler = () => {
        setIsChecked(state => !state)
    }

    return (
        <div onClick={checkboxHandler}>
            <label>
                {isChecked ? <Checked /> : <>[  ]</>}
                <Checkbox
                    checked={isChecked}
                    sx={{ opacity: '0', transform: 'translateY(-30px)' }}
                />
            </label>
        </div>
    );
};
export default CustomCheckbox;
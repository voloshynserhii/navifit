import { Fragment, useState } from 'react';
import dayjs from 'dayjs';
import { Grid, Button, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function PromocodeForm({ item, onCancel, onUpdate, onCreate }) {
    const [promocode, setPromocode] = useState(item || {})

    const editFormHandler = (e) => {
        const { name, value } = e.target

        setPromocode((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    
    const pickDateHandler = (val) => {
        setPromocode((prev) => ({
            ...prev,
            dateDue: dayjs(val).format('YYYY-MM-DD')
        }))
    }

    const confirmHandler = () => {
        if (item && onUpdate) {
            onUpdate(promocode)
        }

        if (onCreate) onCreate(promocode)

        return undefined
    }

    return (
        <Fragment>
            <Typography variant="h2" gutterBottom>
                {item ? 'Edit Promocode' : 'Create Promocode'}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            sx={{ width: '100%' }}
                            name='type'
                            value={promocode?.type || '0'}
                            label="Type"
                            onChange={editFormHandler}
                        >
                            <MenuItem value={'0'}>Public</MenuItem>
                            <MenuItem value={'1'}>Personal</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {promocode?.type === '1' && <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        value={promocode.email || ''}
                        multiline
                        label="Email"
                        name="email"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        value={promocode.discount || ''}
                        multiline
                        label="Discount, %"
                        name="discount"
                        fullWidth
                        type="number"
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                sx={{ width: '100%' }}
                                label="Date due"
                                showDaysOutsideCurrentMonth
                                value={dayjs(promocode.dateDue) || ''}
                                onAccept={pickDateHandler}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                    <Button sx={{ marginRight: 5 }} onClick={onCancel}>Cancel</Button>
                    <Button variant='contained' onClick={confirmHandler}>Confirm</Button>
                </Grid>
            </Grid>
        </Fragment>
    );
}
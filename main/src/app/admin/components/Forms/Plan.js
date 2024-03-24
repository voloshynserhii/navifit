import { Fragment, useState } from 'react';
import { Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function PlanForm({ item, onCancel, onUpdate, onCreate }) {
    const [plan, setPlan] = useState(item || {})

    const editFormHandler = (e) => {
        const { name, value } = e.target
        setPlan((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const confirmHandler = () => {
        if (item && onUpdate) {
            onUpdate(plan)
        }
        
        if (onCreate) onCreate(plan)

        return undefined
    }

    return (
        <Fragment>
            <Typography variant="h2" gutterBottom>
                {item ? 'Edit Plan' : 'Create Plan'}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        value={plan.title || ''}
                        multiline
                        label="Title"
                        name="title"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <TextField
                        value={plan.price || ''}
                        multiline
                        label="Price, zl"
                        name="price"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <TextField
                        value={plan.promoPrice || ''}
                        multiline
                        label="Promo Price, zl"
                        name="promoPrice"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <TextField
                        value={plan.duration || ''}
                        multiline
                        label="Duration, months"
                        name="duration"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button sx={{ marginRight: 5 }} onClick={onCancel}>Cancel</Button>
                    <Button variant='contained' onClick={confirmHandler}>Confirm</Button>
                </Grid>
            </Grid>
        </Fragment>
    );
}
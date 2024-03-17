import { Fragment, useState } from 'react';
import { Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function UserForm({ item, onCancel, onUpdate, onCreate }) {
    const [user, setUser] = useState(item || {})
    const { name, email, userData = {} } = user
    const { age, weight, desiredWeight, height } = userData
    
    const editFormHandler = (e) => {
        const { name, value } = e.target
        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const confirmHandler = () => {
        if (item && onUpdate) {
            onUpdate(user)
        }

        if (onCreate) onCreate(user)

        return undefined
    }

    return (
        <Fragment>
            <Typography variant="h2" gutterBottom>
                {item ? 'Edit User' : 'Create User'}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <TextField
                        value={name || ''}
                        multiline
                        label="Name"
                        name="name"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={email || ''}
                        multiline
                        label="Email"
                        name="email"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={2} sm={1}>
                    <TextField
                        value={age || ''}
                        multiline
                        label="Age"
                        name="age"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={2} sm={1}>
                    <TextField
                        value={weight || ''}
                        multiline
                        label="Weight"
                        name="weight"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={2} sm={1}>
                    <TextField
                        value={desiredWeight || ''}
                        multiline
                        label="Desired Weight"
                        name="desiredWeight"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={2} sm={1}>
                    <TextField
                        value={height || ''}
                        multiline
                        label="Height"
                        name="height"
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
import { Fragment, useState } from 'react';
import { Grid, Button, InputLabel, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';

export default function UserForm({ item, onCancel, onUpdate, onCreate }) {
    const [user, setUser] = useState(item || {})
    const [role, setRole] = useState(0)
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

        if (onCreate) onCreate({ ...user, role })

        return undefined
    }

    return (
        <Fragment>
            <Typography variant="h2" gutterBottom>
                {item ? 'Edit User' : 'Create New User'}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            sx={{ width: '50%' }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Role"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value={1}>Admin</MenuItem>
                            <MenuItem value={0}>User</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
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
                {!role && <>
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
                </>}
                <Grid item xs={12}>
                    <Button sx={{ marginRight: 5 }} onClick={onCancel}>Cancel</Button>
                    <Button variant='contained' onClick={confirmHandler}>Confirm</Button>
                </Grid>
            </Grid>
        </Fragment>
    );
}
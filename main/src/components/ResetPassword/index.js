import { useState } from 'react';
import { Backdrop, Box, Button, Fade, Modal, FormControl, IconButton, InputLabel, InputAdornment, OutlinedInput, Stack } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function ResetPassword({ onClose }) {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                    backgroundColor: 'white'
                },
            }}
        >
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', width: 350, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'white', padding: "20px 25px 20px 10px", borderRadius: 1
            }}>
                {/* {error && <Alert sx={{ zIndex: 1301 }} variant="filled" severity="error">{error}</Alert>} */}
                <Stack sx={{ width: '100%' }}>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput
                            value={password || ''}
                            error={false}
                            // id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={e => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="New Password"
                        />
                    </FormControl>
                </Stack>
                <Button variant="contained" onClick={() => { }}>Confirm</Button>
            </Box>
        </Modal>
    );
}
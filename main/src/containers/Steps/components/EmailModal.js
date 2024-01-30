import { useState } from 'react'
import { Backdrop, Box, Fade, Modal, TextField, Typography } from '@mui/material'
import Button from './Button'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  borderRadius: '1rem',
  bgcolor: 'rgba(var(--background-rgb))',
  boxShadow: 24,
  p: 4,
}

export default function TransitionsModal({ open, onClose, onGetEmail }) {
  const [email, setEmail] = useState('')

  const sendEmailHandler = () => {
    onGetEmail(email)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h3" sx={{ mb: 2 }}>
              Wpisz swój adres e-mail, aby dowiedzieć się, jak schudnąć z Navifit
            </Typography>
            <TextField id="outlined-basic" label="E-mail" variant='filled' fullWidth sx={{ mt: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <Typography id="transition-modal-description" variant="h6" sx={{ mt: 2 }}>
              Navifit nie sprzedaje ani nie wypożycza nikomu Twoich danych osobowych. Prześlemy Ci kopię wyników, abyś miał do nich wygodny dostęp.
            </Typography>
            <Button title="Dalej" type="primary" sx={{ width: '100%', mt: 2 }} onClick={sendEmailHandler} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
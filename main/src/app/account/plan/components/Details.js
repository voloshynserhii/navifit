import { useState, useEffect } from 'react';
import { Backdrop, Box, Button, Divider, Modal, Stack, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', md: '70%', lg: '50%' },
    minHeight: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SpringModal({ selectedDish }) {
    const [open, setOpen] = useState(false)
    const { name, ingredients = [], description = '' } = selectedDish || {}

    const formattedDescription = description.split('.')

    useEffect(() => {
        if (selectedDish) setOpen(true)
    }, [selectedDish])

    const handleClose = () => setOpen(false)

    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
        >
            <Box sx={style}>
                <Stack direction='row' justifyContent='space-between'>
                    <Typography id="spring-modal-title" variant="h6" component="h2">
                        {name}
                    </Typography>
                    <Button>Edituj</Button>
                </Stack>
                <Typography component="h3" sx={{ mt: 2 }}>
                    Products
                </Typography>
                {ingredients.map(ingredient => {
                    const [item] = Object.entries(ingredient)

                    return (
                        <Typography key={item[0]}>
                            {item[1]}: {item[0]}
                        </Typography>
                    )
                })}
                <Divider sx={{ marginTop: 5, marginBottom: 5 }} />
                {formattedDescription.map(descr => (
                    <Typography key={descr}>
                        {descr}
                    </Typography>
                ))}
            </Box>
        </Modal>
    );
}
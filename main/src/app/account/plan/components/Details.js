import { useState, useEffect } from 'react'
import { Backdrop, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Modal, Stack, Typography } from '@mui/material'
import api from '../../../../utils/api'

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
    maxHeight: '90vh', 
    overflow: 'scroll'
}

export default function DetailsModal({ selectedDish, week, day, userId, onChangeUserPlan }) {
    const [open, setOpen] = useState(false)
    const [availableRecipes, setAvailableRecipes] = useState([])
    const [editPlan, setEditPlan] = useState(false)
    const { name, ingredients = [], description = '' } = selectedDish || {}

    const formattedDescription = description.split('.')

    useEffect(() => {
        if (selectedDish) setOpen(true)
    }, [selectedDish])

    const handleClose = () => {
        setOpen(false)
        setEditPlan(false)
    }

    const handleEditPlan = async () => {
        setEditPlan(true)
        
        const { _id: recipeId, calories, essentialIngredientIds } = selectedDish || {}
        const { data } = await api.recipe.getAll({ recipeId, calories, essentialIngredientIds, limit: 20 })

        if (data.length) setAvailableRecipes(data)
    }

    const handleReplaceRecipe = (newRecipeId) => {
        api.user.update({ _id: userId, newRecipeId, oldRecipeId: selectedDish._id, week, day }).then(({ currentUser }) => {
            handleClose()
            onChangeUserPlan(currentUser.currentPlan)
        })
    }

    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
        >
            {editPlan ? (
                <Box sx={style}>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography id="spring-modal-title" variant="h6" component="h2">
                            Click on recipe to replace
                        </Typography>
                        <Button onClick={() => setEditPlan(false)}>Cancel</Button>
                    </Stack>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {availableRecipes.map(({ _id, name, description, calories }) => (
                            <ListItem key={_id} alignItems="flex-start">
                                <Button onClick={() => handleReplaceRecipe(_id)}>
                                    Choose
                                </Button>
                                <ListItemText
                                    primary={name}
                                    // secondary={
                                    //     <Typography
                                    //         sx={{ display: 'inline' }}
                                    //         component="span"
                                    //         variant="body2"
                                    //         color="text.primary"
                                    //     >
                                    //         {description}
                                    //     </Typography>
                                    // }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            ) : (
                <Box sx={style}>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography id="spring-modal-title" variant="h6" component="h2">
                            {name}
                        </Typography>
                        <Button onClick={handleEditPlan}>Edituj</Button>
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
            )}

        </Modal>
    );
}
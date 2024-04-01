import { Fragment, useState } from 'react';
import { Grid, Button, TextField, Typography } from '@mui/material';
import Autocomplete from '../../../../components/Autocomplete'
import { ingredients } from '../../../../utils/Plans'

export default function RecipeForm({ item, onCancel, onUpdate, onCreate }) {
    const [recipe, setRecipe] = useState(item || {})

    const { name, description, fats, carbs, proteins, cookingTime, calories, essentialIngredientIds } = recipe
    
    const editFormHandler = (e) => {
        const { name, value } = e.target
        
        setRecipe((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    
    const selectEssentialIngredientsHandler = selected => {
        const ids = selected.map(item => item.id)
        
        setRecipe((prev) => ({
            ...prev,
            essentialIngredientIds: ids
        }))
    }

    const confirmHandler = () => {
        if (item && onUpdate) {
            onUpdate(recipe)
        }
        
        if (onCreate) onCreate(recipe)

        return undefined
    }

    const disabled = !name || !description || !fats || !carbs || !proteins || !cookingTime || !calories
    
    const preparedIngredients = [...ingredients.vegetables, ...ingredients.grains, ...ingredients.desiredProducts, ...ingredients.meat]
    
    return (
        <Fragment>
            <Typography variant="h2" gutterBottom>
                {item ? 'Edit Recipe' : 'Create Recipe'}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        value={name || ''}
                        multiline
                        label="Title"
                        name="name"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={description || ''}
                        multiline
                        maxRows={5}
                        label="Description"
                        name="description"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={2} sm={1}>
                    <TextField
                        value={fats || ''}
                        multiline
                        label="Fats"
                        name="fats"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={2} sm={1}>
                    <TextField
                        value={carbs || ''}
                        multiline
                        label="Carbs"
                        name="carbs"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={2} sm={1}>
                    <TextField
                        value={proteins || ''}
                        multiline
                        label="Proteins"
                        name="proteins"
                        fullWidth
                        variant="standard"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={3} sm={2}>
                    <TextField
                        value={cookingTime || ''}
                        label="Cooking Time"
                        name="cookingTime"
                        fullWidth
                        type="number"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={3} sm={2}>
                    <TextField
                        value={calories || ''}
                        label="Calories"
                        name="calories"
                        fullWidth
                        type="number"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Autocomplete data={preparedIngredients} selected={essentialIngredientIds || []} onSelect={selectEssentialIngredientsHandler} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    Ingredients
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{ marginRight: 5 }} onClick={onCancel}>Cancel</Button>
                    <Button variant='contained' disabled={disabled} onClick={confirmHandler}>Confirm</Button>
                </Grid>
            </Grid>
        </Fragment>
    );
}
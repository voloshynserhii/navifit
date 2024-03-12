import { Fragment, useState } from 'react';
import { Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function RecipeForm({ item = {}, onCancel, onUpdate, onCreate }) {
    const [recipe, setRecipe] = useState(item)

    const editFormHandler = (e) => {
        const { name, value } = e.target
        setRecipe((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const confirmHandler = () => {
        if (item && onUpdate) {
            onUpdate(recipe)
        }
        
        if (onCreate) onCreate(recipe)

        return undefined
    }

    return (
        <Fragment>
            <Typography variant="h2" gutterBottom>
                {item ? 'Edit Recipe' : 'Create Recipe'}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        value={recipe.name || ''}
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
                        value={recipe.description || ''}
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
                        value={recipe.fats || ''}
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
                        value={recipe.carbs || ''}
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
                        value={recipe.proteins || ''}
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
                        value={recipe.cookingTime || ''}
                        label="Cooking Time"
                        name="cookingTime"
                        fullWidth
                        type="number"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={3} sm={2}>
                    <TextField
                        value={recipe.calories || ''}
                        label="Calories"
                        name="calories"
                        fullWidth
                        type="number"
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
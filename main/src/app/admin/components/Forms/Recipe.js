import { Fragment, useState } from 'react';
import { Grid, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";
import Autocomplete from '../../../../components/Autocomplete'
import { ingredients } from '../../../../utils/Plans'
import { getTitle } from '../../helpers'

export default function RecipeForm({ item, onCancel, onUpdate, onCreate }) {
    const [recipe, setRecipe] = useState(item || {})
    const [newIngredientTitle, setNewIngredientTitle] = useState('')
    const [newIngredientWeight, setNewIngredientWeight] = useState('')

    const { name, description, fats, carbs, proteins, cookingTime, calories, essentialIngredientIds, ingredients: recipeIngredients } = recipe
    const ingredientTitles = recipeIngredients?.map(obj => Object.keys(obj))

    const editFormHandler = (e) => {
        const { name, value } = e.target

        setRecipe((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const addIngredientHandler = () => {
        setRecipe(prev => ({ ...prev, ingredients: [...prev.ingredients, { [newIngredientTitle]: newIngredientWeight }] }))

        setNewIngredientTitle('')
        setNewIngredientWeight('')
    }

    const editIngredientHandler = key => {
        const ingredient = recipeIngredients.find(ingredient => ingredient[key])

        setNewIngredientTitle(key)
        setNewIngredientWeight(ingredient[key])

        const filteredIngredients = recipeIngredients.filter(ingredient => !ingredient[key])
        setRecipe(prev => ({ ...prev, ingredients: filteredIngredients }))
    }

    const removeIngredientHandler = key => {
        const filteredIngredients = recipeIngredients.filter(ingredient => !ingredient[key])

        setRecipe(prev => ({ ...prev, ingredients: filteredIngredients }))
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

    const preparedIngredients = [...ingredients.vegetables, ...ingredients.grains, ...ingredients.desiredProducts, ...ingredients.meat].map(item => ({ ...item, title: getTitle(item.title) }))

    return (
        <Fragment>
            <Typography variant="h2" gutterBottom>
                {item ? 'Edit Recipe' : 'Create New Recipe'}
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
                <Grid item xs={4} sm={2} md={1}>
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
                <Grid item xs={4} sm={2} md={1}>
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
                <Grid item xs={4} sm={2} md={1}>
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
                <Grid item xs={6} sm={3} md={2}>
                    <TextField
                        value={cookingTime || ''}
                        label="Cooking Time"
                        name="cookingTime"
                        fullWidth
                        type="number"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                    <TextField
                        value={calories || ''}
                        label="Calories"
                        name="calories"
                        fullWidth
                        type="number"
                        onChange={editFormHandler}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Autocomplete data={preparedIngredients} selected={essentialIngredientIds || []} onSelect={selectEssentialIngredientsHandler} />
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={12} sm={9} md={6}>
                        <Typography variant='h5' sx={{ marginBottom: 2 }}>Ingredients:</Typography>
                        {ingredientTitles?.map((key, i) => (
                            <Stack key={key} direction='row' justifyContent='space-between' alignItems='center' sx={{ height: 24, width: '100%' }}>
                                <Stack direction='row' justifyContent='space-between' sx={{ width: '80%' }}>
                                    <Typography >{key}: </Typography>
                                    <Typography >{recipeIngredients[i][key]}</Typography>
                                </Stack>
                                {!newIngredientTitle && (
                                    <Stack direction='row'>
                                        <Button onClick={() => editIngredientHandler(key)}>Edit</Button>
                                        <Button onClick={() => removeIngredientHandler(key)}>Remove</Button>
                                    </Stack>

                                )}
                            </Stack>
                        ))}
                        <Stack sx={{ marginTop: 2 }}>
                            <Stack direction='row' gap={2}>
                                <TextField
                                    value={newIngredientTitle}
                                    label="Title"
                                    name="title"
                                    fullWidth
                                    onChange={(e) => setNewIngredientTitle(e.target.value)}
                                />
                                <TextField
                                    value={newIngredientWeight}
                                    label="Weight"
                                    name="weight"
                                    fullWidth
                                    onChange={(e) => setNewIngredientWeight(e.target.value)}
                                />
                                <Button onClick={addIngredientHandler}>+ Add</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={9} md={6}>
                    <Typography variant='h5' sx={{ marginBottom: 2 }}>Attached images:</Typography>
                    <IconButton component="label" sx={{ width: 250, height: 100, borderRadius: 5, border: '1px solid black' }}>
                        <Stack alignItems='center'>
                            <FileUploadOutlined />
                            <Typography>Press or drag a file</Typography>
                            <input
                                styles={{ display: "none" }}
                                type="file"
                                hidden
                                // onChange={handleUpload}
                                name="[licenseFile]"
                            />
                        </Stack>

                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{ marginRight: 5 }} onClick={onCancel}>Cancel</Button>
                    <Button variant='contained' disabled={disabled} onClick={confirmHandler}>Confirm</Button>
                </Grid>
            </Grid>
        </Fragment>
    );
}
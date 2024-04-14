import { Fragment, useState } from 'react';
import Image from 'next/image'
import { Grid, Button, InputAdornment, IconButton, Stack, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '../../../../components/Autocomplete'
import { ingredients } from '../../../../utils/Plans'
import { getTitle } from '../../helpers'

export default function RecipeForm({ item, onCancel, onUpdate, onCreate }) {
    const [recipe, setRecipe] = useState(item || {})
    const [newIngredientTitle, setNewIngredientTitle] = useState('')
    const [newIngredientWeight, setNewIngredientWeight] = useState('')
    const [mainImageLink, setMainImageLink] = useState('')
    const [newImageLink, setNewImageLink] = useState('')

    const { name, description, fats, carbs, proteins, cookingTime, calories, essentialIngredientIds, ingredients: recipeIngredients, mainImage, images = [], videos } = recipe
    const ingredientTitles = recipeIngredients?.map(obj => Object.keys(obj))

    const editFormHandler = (e) => {
        const { name, value } = e.target

        setRecipe((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const addMainImageHandler = () => {
        setRecipe(prev => ({ ...prev, mainImage: mainImageLink }))
        setMainImageLink('')
    }

    const editMainImageHandler = () => {
        setRecipe(prev => ({ ...prev, mainImage: '' }))
        setMainImageLink(mainImage)
    }

    const removeMainImageHandler = () => {
        setRecipe(prev => ({ ...prev, mainImage: '' }))
        setMainImageLink('')
    }

    const addNewImageHandler = () => {
        if (!images.includes(newImageLink)) {
            setRecipe(prev => ({ ...prev, images: prev.images?.length ? [...prev.images, newImageLink] : [newImageLink] }))
        }
        
        setNewImageLink('')
    }

    const editImageHandler = (image) => {
        const key = images.find(link => link === image)

        setNewImageLink(key)

        const filteredImages = images.filter(link => link !== image)
        setRecipe(prev => ({ ...prev, images: filteredImages }))
    }

    const removeImageHandler = (image) => {
        const filteredImages = images.filter(link => link !== image)

        setRecipe(prev => ({ ...prev, images: filteredImages }))
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
                                    InputProps={{
                                        endAdornment: newIngredientTitle ? <InputAdornment position="start">
                                            <IconButton onClick={() => setNewIngredientTitle('')}>
                                                <CloseIcon />
                                            </IconButton>
                                        </InputAdornment> : <></>,
                                    }}
                                    onChange={(e) => setNewIngredientTitle(e.target.value)}
                                />
                                <TextField
                                    value={newIngredientWeight}
                                    label="Weight"
                                    name="weight"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: newIngredientWeight ? <InputAdornment position="start">
                                            <IconButton onClick={() => setNewIngredientWeight('')}>
                                                <CloseIcon />
                                            </IconButton>
                                        </InputAdornment> : <></>,
                                    }}
                                    onChange={(e) => setNewIngredientWeight(e.target.value)}
                                />
                                <Button disabled={!newIngredientTitle || !newIngredientWeight} onClick={addIngredientHandler}>+ Add</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={9} md={6}>
                    <Typography variant='h5' sx={{ marginBottom: 2 }}>Main image:</Typography>
                    {mainImage && (
                        <Stack>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ height: 24, width: '100%' }}>
                                <Typography>{mainImage}</Typography>
                                <Stack direction='row'>
                                    <Button onClick={editMainImageHandler}>Edit</Button>
                                    <Button onClick={removeMainImageHandler}>Remove</Button>
                                </Stack>
                            </Stack>
                            <img width={100} height={100} src={mainImage} alt={mainImage} />
                        </Stack>
                    )}
                    {!mainImage && <Stack sx={{ marginTop: 2 }}>
                        <Stack direction='row' gap={2}>
                            <TextField
                                value={mainImageLink}
                                label="Add new image link for the main picture"
                                name="link"
                                fullWidth
                                InputProps={{
                                    endAdornment: mainImageLink ? <InputAdornment position="start">
                                        <IconButton onClick={() => setMainImageLink('')}>
                                            <CloseIcon />
                                        </IconButton>
                                    </InputAdornment> : <></>,
                                }}
                                onChange={(e) => setMainImageLink(e.target.value)}
                            />
                            <Button sx={{ width: 125 }} disabled={!mainImageLink} onClick={addMainImageHandler}>+ Add Link</Button>
                        </Stack>
                    </Stack>}
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={12} sm={9} md={6}>
                        <Typography variant='h5' sx={{ marginBottom: 2 }}>Images:</Typography>
                        {images?.map((imageLink, i) => (
                            <Stack key={imageLink + i}>
                                <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ height: 24, width: '100%' }}>
                                    <Stack direction='row' justifyContent='space-between'>
                                        <Typography>{imageLink}</Typography>
                                    </Stack>
                                    {!newImageLink && (
                                        <Stack direction='row'>
                                            <Button onClick={() => editImageHandler(imageLink)}>Edit</Button>
                                            <Button onClick={() => removeImageHandler(imageLink)}>Remove</Button>
                                        </Stack>
                                    )}
                                </Stack>
                                <img width={100} height={100} src={imageLink} alt={imageLink} />
                            </Stack>
                        ))}
                        <Stack sx={{ marginTop: 2 }}>
                            <Stack direction='row' gap={2}>
                                <TextField
                                    value={newImageLink}
                                    label="Add new image link"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: newImageLink ? <InputAdornment position="start">
                                            <IconButton onClick={() => setNewImageLink('')}>
                                                <CloseIcon />
                                            </IconButton>
                                        </InputAdornment> : <></>,
                                    }}
                                    onChange={(e) => setNewImageLink(e.target.value)}
                                />
                                <Button sx={{ width: 125 }} disabled={!newImageLink} onClick={addNewImageHandler}>+ Add Link</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{ marginRight: 5 }} onClick={onCancel}>Cancel</Button>
                    <Button sx={{ color: 'white' }} variant='contained' disabled={disabled} onClick={confirmHandler}>Save</Button>
                </Grid>
            </Grid>
        </Fragment>
    );
}
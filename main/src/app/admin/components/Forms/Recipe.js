import { Fragment, useState, useEffect } from 'react';
import { Autocomplete, Grid, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputAdornment, InputLabel, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import CustomAutocomplete from '../../../../components/Autocomplete'
import AppUploadButton from '../../../../components/AppUploadButton'
import { ingredients } from '../../../../utils/Plans'
import { getTitle } from '../../helpers'
import '../../../../../firebase/config'
import api from '../../../../utils/api'

const storage = getStorage();

const defaultIngredient = {
    title: '',
    weight: '',
    unit: '',
    kcal: ''
}
export default function RecipeForm({ item, onCancel, onUpdate, onCreate }) {
    const [recipe, setRecipe] = useState(item || { ingredients: [], ingredientsValue: [] })
    const [newIngredient, setNewIngredient] = useState(defaultIngredient)
    const [imageFiles, setImageFiles] = useState([])
    const [ingredientsData, setIngredientsData] = useState([])

    const { _id, name, description, fats, carbs, proteins, cookingTime, calories, essentialIngredientIds, ingredients: recipeIngredients, mealType = [], mainImage, videos, ingredientValues = [] } = recipe

    const ingredientTitles = recipeIngredients?.map(obj => Object.keys(obj))

    const listRef = ref(storage, _id);

    const getFiles = async () => {
        const res = await listAll(listRef)

        if (res) {
            const arr = []

            for (const itemRef of res.items) {
                const url = await getDownloadURL(ref(storage, itemRef._location.path));

                if (url) {
                    arr.push({ url, path: itemRef._location.path })
                }
            }

            setImageFiles(arr)
        }
    }

    const getIngredients = async () => {
        const { data } = await api.recipe.getIngredients()

        if (data?.length) {
            setIngredientsData(data)
        }
    }

    useEffect(() => {
        getFiles();
        getIngredients();
    }, [])

    const onUploadFile = (file) => {
        const storageRef = ref(storage, `${_id}/${file.name}`);

        uploadBytes(storageRef, file).then(() => {
            getFiles();
        });
    }

    const onRemoveFile = (path) => {
        const fileRef = ref(storage, path);

        deleteObject(fileRef).then(() => {
            getFiles();
        }).catch(() => {
            console.log('File was not deleted!')
        });
    }

    const editFormHandler = (e) => {
        const { name, value } = e.target

        setRecipe((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const addIngredientHandler = () => {
        setRecipe(prev => ({ ...prev, ingredients: [...prev.ingredients, { [newIngredient.title]: newIngredient.weight }], ingredientValues: [...prev.ingredientValues, { title: newIngredient.title, unit: newIngredient.unit || 'gram', value: newIngredient.kcal }] }))

        setNewIngredient(defaultIngredient)
    }

    const selectIngredientFromList = (name) => {
        const selectedIngredient = ingredientsData.find(i => i.title === name)

        const ing = {
            title: selectedIngredient.title,
            weight: '',
            unit: selectedIngredient.unit,
            kcal: selectedIngredient.value

        }
        setNewIngredient(ing)
    }

    const editIngredientHandler = key => {
        const ingredient = recipeIngredients.find(ingredient => ingredient[key])
        const ingredientValue = ingredientValues.find(iv => iv.title === key[0])

        setNewIngredient({
            title: key[0],
            weight: ingredient[key[0]],
            unit: ingredientValue?.unit,
            kcal: ingredientValue?.value
        })

        const filteredIngredients = recipeIngredients.filter(ingredient => !ingredient[key])
        const filteredIngredientValues = ingredientValues.filter(ingredientValue => ingredientValue.title !== key[0])
        setRecipe(prev => ({ ...prev, ingredients: filteredIngredients, ingredientValues: filteredIngredientValues }))
    }

    const removeIngredientHandler = key => {
        const filteredIngredients = recipeIngredients.filter(ingredient => !ingredient[key])
        const filteredIngredientValues = ingredientValues.filter(ingredientValue => ingredientValue.title !== key[0])

        setRecipe(prev => ({ ...prev, ingredients: filteredIngredients, ingredientValues: filteredIngredientValues }))
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
    
    const changeMealTypeHandler = (type) => {
        const mealTypes = [...mealType]
        if (!mealTypes.includes(type)) {
            mealTypes.push(type)
            
            setRecipe((prev) => ({
                ...prev,
                mealType: mealTypes
            }))
        } else {
            const filteredMealTypes = mealTypes.filter(item => item !== type)
            
            setRecipe((prev) => ({
                ...prev,
                mealType: filteredMealTypes
            }))
        }
    }

    const disabled = !name || !description || !fats || !carbs || !proteins || !cookingTime || !calories || !mealType.length

    const preparedIngredients = [...ingredients.vegetables, ...ingredients.grains, ...ingredients.desiredProducts, ...ingredients.meat].map(item => ({ ...item, title: getTitle(item.title) }))
console.log(mealType)
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
                    <CustomAutocomplete data={preparedIngredients} selected={essentialIngredientIds || []} onSelect={selectEssentialIngredientsHandler} />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='h5' sx={{ marginBottom: 2 }}>Recommended for:</Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox
                                checked={mealType.includes('breakfast')}
                                onChange={() => changeMealTypeHandler('breakfast')}
                            />}
                            label="Breakfast"
                        />
                        <FormControlLabel
                            control={<Checkbox
                                checked={mealType.includes('branch')}
                                onChange={() => changeMealTypeHandler('branch')}
                            />}
                            label="Branch" />
                        <FormControlLabel
                            control={<Checkbox
                                checked={mealType.includes('lunch')}
                                onChange={() => changeMealTypeHandler('lunch')}
                            />}
                            label="Lunch"
                        />
                        <FormControlLabel
                            control={<Checkbox
                                checked={mealType.includes('dinner')}
                                onChange={() => changeMealTypeHandler('dinner')}
                            />}
                            label="Dinner"
                        />
                    </FormGroup>
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

                                {!newIngredient?.title && (
                                    <Stack direction='row'>
                                        <Button onClick={() => editIngredientHandler(key)}>Edit</Button>
                                        <Button onClick={() => removeIngredientHandler(key)}>Remove</Button>
                                    </Stack>

                                )}
                            </Stack>
                        ))}
                        <Stack sx={{ marginTop: 2 }}>
                            {ingredientsData.length && (
                                <Stack>
                                    <Autocomplete
                                        sx={{ width: '100%', mb: 2 }}
                                        disablePortal
                                        id="combo-box-demo"
                                        options={ingredientsData}
                                        getOptionLabel={(option) => option.title}
                                        renderInput={(params) => <TextField {...params} label="Choose Ingredient" />}
                                        onChange={e => selectIngredientFromList(e.target.textContent)}
                                    />
                                    <Typography sx={{ width: '100%', mb: 2 }}>or enter new data below</Typography>
                                </Stack>
                            )}
                            <Stack direction='row' gap={2}>
                                <TextField
                                    value={newIngredient?.title}
                                    label="Title"
                                    name="title"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: newIngredient?.title ? <InputAdornment position="start">
                                            <IconButton onClick={() => setNewIngredient(prev => ({ ...prev, title: '' }))}>
                                                <CloseIcon />
                                            </IconButton>
                                        </InputAdornment> : <></>,
                                    }}
                                    onChange={(e) => setNewIngredient(prev => ({ ...prev, title: e.target.value }))}
                                />

                                <TextField
                                    value={newIngredient?.weight}
                                    label="Weight"
                                    name="weight"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: newIngredient?.weight ? <InputAdornment position="start">
                                            <IconButton onClick={() => setNewIngredient(prev => ({ ...prev, weight: '' }))}>
                                                <CloseIcon />
                                            </IconButton>
                                        </InputAdornment> : <></>,
                                    }}
                                    onChange={(e) => setNewIngredient(prev => ({ ...prev, weight: e.target.value }))}
                                />
                            </Stack>

                            <Stack direction='row' gap={2} mt={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="unit">KCal Unit</InputLabel>
                                    <Select
                                        labelId="unit"
                                        value={newIngredient?.unit || 'gram'}
                                        label="KCal Unit"
                                        onChange={(e) => setNewIngredient(prev => ({ ...prev, unit: e.target.value }))}
                                    >
                                        <MenuItem value={'gram'}>100g</MenuItem>
                                        <MenuItem value={'item'}>1 item</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    value={newIngredient?.kcal || ''}
                                    label="KCal value"
                                    name="kcal"
                                    fullWidth
                                    onChange={(e) => setNewIngredient(prev => ({ ...prev, kcal: e.target.value }))}
                                />
                            </Stack>

                            <Button disabled={!newIngredient?.title || !newIngredient?.weight} onClick={addIngredientHandler}>+ Add</Button>
                        </Stack>
                    </Grid>
                </Grid>

                {_id && <Grid item xs={12}>
                    <Grid item xs={12} sm={9} md={6}>
                        <Typography variant='h5' sx={{ marginBottom: 2 }}>Images:</Typography>

                        {imageFiles?.map(({ url, path }) => {
                            return <Stack key={url} direction="row" sx={{ position: 'relative' }}>
                                <img src={url} width="100%" alt="image" loading="lazy" />
                                <Stack>
                                    <Button
                                        sx={{ color: 'red' }}
                                        onClick={() => onRemoveFile(path)}
                                        edge="end"
                                    >
                                        delete
                                        <CloseIcon />
                                    </Button>
                                    {mainImage !== path ? <Button
                                        onClick={() => setRecipe(prev => ({ ...prev, mainImage: path }))}
                                        edge="end"
                                    >
                                        set as primary picture
                                        <CheckIcon />
                                    </Button> : <Typography>Main Image</Typography>}
                                </Stack>
                            </Stack>
                        })}

                        <Stack sx={{ marginTop: 2 }}>
                            <AppUploadButton onUpload={onUploadFile} />
                        </Stack>
                    </Grid>
                </Grid>}

                <Grid item xs={12}>
                    <Button sx={{ marginRight: 5 }} onClick={onCancel}>Cancel</Button>
                    <Button sx={{ color: 'white' }} variant='contained' disabled={disabled} onClick={confirmHandler}>Save</Button>
                </Grid>
            </Grid>
        </Fragment>
    );
}
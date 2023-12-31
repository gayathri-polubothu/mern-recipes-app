import {Button, Chip, Stack, TextField, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import * as Services from "../services/services";
import {useGetUserID} from "../hooks/useGetUserID";
import {useNavigate} from "react-router-dom";
import {useCookieState} from "../hooks/useCookieState";
import {containerStyle} from "../components/common/styles.common";
export const CreateRecipe = () => {
    const theme = useTheme();
    const [name, setName] = useState('');
    const [instructions, setInstructions] = useState();
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [cookingTime, setCookingTime] = useState(0);
    const [image, setImage] = useState('');
    const userID = useGetUserID()
    const navigate = useNavigate()
    const access_token = useCookieState({key: 'access_token'})
    const handleDelete = (chipToDelete) => {
        setIngredients(chips => chips.filter(chip=> chip!==chipToDelete) )
    }
    const handleCreateRecipe = async(event) => {
       event.preventDefault()
        const response = await Services.createRecipe({
            name, ingredients, instructions, cookingTime, image, userOwner: userID
        }, access_token)
        if(!response.error) {
            navigate('/recipes')
        }
    }
    return (
        <Stack direction={'column'} spacing={2}  sx={{
           ...containerStyle,
            my: 4,
            justifyContent: 'center',
            minWidth: 400,
            maxWidth: 'auto',
            m: 'auto'
        }}>
            <Typography style={{ color: theme.palette.primary.main, textAlign: 'center' }} variant={'h5'}>Create Recipe</Typography>
            <Stack direction={'column'} spacing={2}>
                <TextField label={'Name'} required
                           helperText={!name ? 'Required': null}
                           variant={'outlined'} value={name} onChange={(e)=> setName(e.target.value)}/>
                <TextField label={'Ingredients'} required
                           helperText={!ingredient && ingredients.length === 0 ? 'Required': null}
                           variant={'outlined'} value={ingredient} onChange={(e)=> setIngredient(e.target.value)}
                           onKeyDown={(e)=> {
                               if(e.key ==='Enter') {
                                   const chips = [...ingredients, ingredient];
                                   setIngredients(chips)
                                   setIngredient('')
                               }
                           }}
                />
                <Stack direction={'row'} spacing={1} sx={{maxWidth: 500, overflow: 'auto'}}>
                    {ingredients?.map((chip, idx)=>(
                        <Chip label={chip} key={chip+idx} size={'small'} onDelete={()=>handleDelete(chip)}/>
                    ))}
                </Stack>
                <TextField label={'Instructions'} required
                           helperText={!instructions ? 'Required': null}
                           variant={'outlined'} value={instructions} onChange={(e)=> setInstructions(e.target.value)}/>
                <TextField label={'Cooking Time(minutes)'} required
                           helperText={!cookingTime ? 'Required': null}
                           variant={'outlined'} value={cookingTime} onChange={(e)=> setCookingTime(e.target.value)}/>
                <TextField label={'Image Url'} required
                           helperText={!image ? 'Required': null}
                           variant={'outlined'} value={image} onChange={(e)=> setImage(e.target.value)}/>
                <Button variant="contained" onClick={handleCreateRecipe}>Create Recipe</Button>

            </Stack>
        </Stack>
    )
}

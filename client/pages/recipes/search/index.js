import Box from '@mui/material/Box'
import CustomSearchBar from "../../../app/components/CustomSearchBar";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import {useGlobalLoadingContext} from "../../../app/context/globalLoading";
import {useSession} from "next-auth/react";
import {useGetUserID} from "../../../app/hooks/useGetUserID";
import {useRouter} from "next/router";

const SearchRecipes = () => {
    const {data: session} = useSession()
    const userID = useGetUserID()
    const {setGlobalLoading} = useGlobalLoadingContext()
    const [recipes, setRecipes] = useState([]);
    const router = useRouter()

    useEffect(()=>{
        if(!session && !userID) {
            router.push('/')
        }
    },[])

    const handleSearch = async(searchTerm) => {
        setGlobalLoading(true)
        const response = await fetch('/api/recipes/search',{
            method: 'POST',
            body: JSON.stringify({searchTerm}),
            headers: {'Content-Type': 'application/json'}
        }).then(resp=> resp.json())
        setGlobalLoading(false)
        if(response?.recipes) {
            setRecipes(response?.recipes)
        }
    }

    return (
        <Box m={'10% auto'} p={2}>
            <CustomSearchBar searchLabel={'Search recipes...'} handleSearch={handleSearch}/>
            {recipes?.length === 0 ? (
                <Typography variant={'h6'} sx={{m: 5}}>No Recipes. Please input in search field</Typography>
            ) : (
                <Stack sx={{ width: '100%', maxWidth: '80vw', backgroundColor: 'transperent', mt: 3 }} direction={'column'} spacing={2}>
                    {recipes?.map((recipe,idx)=> (
                        <Card sx={{ maxWidth: '80vw' }} key={`${recipe?._id}-${idx}-${recipe?.timestamp}`}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="70"
                                    image={recipe.image}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {recipe?.name}
                                    </Typography>
                                    <Typography variant="body" color="text.secondary">
                                        Ingredients:
                                        {recipe?.ingredients?.map((chip, idx)=>(
                                            <Chip label={chip} variant={'outlined'} color={'primary'} size={'small'} key={`${recipe?._id}-${chip}-${idx}-${Math.random()}`}/>
                                        ))}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Stack>
            )}
        </Box>
    )
}
export default SearchRecipes
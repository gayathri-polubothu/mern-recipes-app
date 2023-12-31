import axios from "axios";
const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL
const elasticSearchCloudUrl = process.env.REACT_APP_ELASTIC_HOST_NAME


//Users Service
const registerUser = async(payload) => {
    try {
        const {data} = await axios.post(`${serverBaseUrl}/auth/register`, payload);
        return {message: data?.message || "Registration Successful", status: 200}
    }catch (e) {
        return {error: e.message}
    }
}
const login = async(payload) => {
    try {
        const {data} = await axios.post(`${serverBaseUrl}/auth/login`, payload);
        return {data, message: data?.message || "Login Successful", status: 200}
    }catch (e) {
        return {error: e.message}
    }
}

const updatePassword = async(payload) => {
    try {
        const {data} = await axios.post(`${serverBaseUrl}/auth/update-password`, payload);
        return {data, message: data?.message || "Password Updated Successfully", status: 200}
    }catch (e) {
        return {error: e.message}
    }
}

/*End of user service*/
//Recipes Service
const getAllRecipes = async() => {
    try {
        const {data} = await axios.get(`${serverBaseUrl}/recipes`);
        return {data, status: 200}
    }catch (e) {
        return {error: e.message}
    }
}
const createRecipe = async(payload, access_token) => {
    try {
        const {data} = await axios.post(`${serverBaseUrl}/recipes`, payload, {headers: {authorization: access_token}});
        return {data, status: 200}
    }catch (e) {
        return {error: e.message}
    }
}

//Save Recipe
const saveRecipe = async(payload, headers) => {
    try {
        const {data} = await axios.put(`${serverBaseUrl}/recipes`, payload, headers);
        return {data, status: 200}
    }catch (e) {
        return {error: e.message}
    }
}

//Get Saved Recipe
const getSavedRecipes = async(userID, onlyIds) => {
    try {
        const {data} = await axios.get(`${serverBaseUrl}/recipes/savedRecipes/${onlyIds ? 'ids/' : ''}${userID}`);
        return {data, status: 200}
    }catch (e) {
        return {error: e.message}
    }
}

//Search Recipes
const searchRecipes = async(searchTerm) => {
    try {
        const {data} = await axios.post(`${serverBaseUrl}/recipes/searchRecipes`,{searchTerm} )
        return {data: data?.recipes, total: data?.total}
    }catch (e) {
        return {error: e.message}
    }
}
/*End of recipes service*/

export {registerUser, login, updatePassword, getAllRecipes, createRecipe, saveRecipe, getSavedRecipes, searchRecipes}
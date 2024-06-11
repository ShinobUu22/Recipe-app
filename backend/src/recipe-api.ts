import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
    if (!apiKey) {
        throw new Error("API key not found");
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

    const queryParams = {
        apiKey,
        query: searchTerm,
        number: "10",
        offset: (page * 10).toString(),
    };

    url.search = new URLSearchParams(queryParams).toString();

    try {
        const searchResponse = await fetch(url.toString());
        const resultsJson = await searchResponse.json();
        return resultsJson;
    } catch (e) {
        console.log(e);
    }
};

export const getRecipeSummary = async (recipeId: string) => {
    if (!apiKey) {
        throw new Error("API key not found");
    }
    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);
    const params = {
        apiKey,
    };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url.toString());
    const json = await response.json();
    return json;
};

export const getFavouriteRecipeIDs = async (ids: string[]) => {
    if (!apiKey) {
        throw new Error("API key not found");
    }
    const url = new URL(`https://api.spoonacular.com/recipes/informationBulk`);
    const params = {
        apiKey,
        ids: ids.join(","),
    };
    url.search = new URLSearchParams(params).toString();
    const searchResponse = await fetch(url.toString());
    const json = await searchResponse.json();
    return { results: json };
};

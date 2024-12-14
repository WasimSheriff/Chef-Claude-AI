import React from "react"
import IngredientsList from "./components/ingridients";
import ClaudeReciepe from "./components/hardCodeReciepe";
import { getRecipeFromOpenAI} from "./ai"


export default function Main(){
    
    const [ingredients,setIngredients]=React.useState([])
    
    const [recipe,setRecipe]=React.useState("");
    
    function formSubmit(formData) {
        const newIngredient = formData.get("item")
        setIngredients(prev=>[...prev,newIngredient]);
    }

    async function getRecipe() {
        const recipeMarkDown = await getRecipeFromOpenAI(ingredients);
        setRecipe(recipeMarkDown)
    }
    
    return(
        <main>  
            <form action={formSubmit} className="add-ingredinet-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="item"
                />
                <button className="button">Add ingredient</button>
            </form>
            
            {ingredients.length>0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe}/>}
            {recipe && <ClaudeReciepe recipe={recipe}/>}
        </main>
    )
}

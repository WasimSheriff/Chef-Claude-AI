import React from "react";
const IngredientsList=(props)=>{
    const items=props.ingredients.map(item=>(
        <li key={item}>{item}</li>
    ))
    return(
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{items}</ul>
            {items.length>=4?<div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe</button>
            </div>:null}
        </section>
    )
}
export default IngredientsList;
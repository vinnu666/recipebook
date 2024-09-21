const API_KEY = "fa6c854fbc0545c6890a793444281d58";
const recipeListEl = document.getElementById("recipe-list");

const recipeImageEl = document.createElement("img");
const recipeTitleEl = document.createElement("h2");
const recipeIngredientsEl = document.createElement("p");
const recipeLinkEl = document.createElement("a");

function displayRecipes(recipes) {
  recipeListEl.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItemEl = document.createElement("li");
    recipeItemEl.classList.add("recipe-item");

    recipeImageEl.src = recipe.image;
    recipeImageEl.alt = "recipe image";

    recipeTitleEl.innerText = recipe.title;

    recipeIngredientsEl.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}
    `;

    recipeLinkEl.href = recipe.sourceUrl;
    recipeLinkEl.innerText = "View Recipe";

    recipeItemEl.appendChild(recipeImageEl.cloneNode(true));
    recipeItemEl.appendChild(recipeTitleEl.cloneNode(true));
    recipeItemEl.appendChild(recipeIngredientsEl.cloneNode(true));
    recipeItemEl.appendChild(recipeLinkEl.cloneNode(true));
    recipeListEl.appendChild(recipeItemEl);
  });
}

async function getRecipes() {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    return [];
  }
}

async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

init();

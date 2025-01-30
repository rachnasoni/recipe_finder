// Add your Spoonacular API Key here
const API_KEY = '7698c4d2b7d14475b46b8dd11a42c767'; // Replace with your actual API key
const API_URL = 'https://api.spoonacular.com/recipes/findByIngredients';

// Add event listener to the search button
document.getElementById('search-btn').addEventListener('click', async () => {
  const ingredientInput = document.getElementById('ingredient-input').value;

  // Check if the input is empty
  if (!ingredientInput) {
    alert('Please enter at least one ingredient!');
    return;
  }

  // Fetch recipes based on user input
  fetchRecipes(ingredientInput);
});

// Function to fetch recipes from Spoonacular API
async function fetchRecipes(ingredients) {
  const recipesContainer = document.getElementById('recipes-container');
  recipesContainer.innerHTML = '<p>Loading recipes...</p>'; // Show a loading message

  try {
    // Fetch recipes from the Spoonacular API
    const response = await fetch(`${API_URL}?ingredients=${ingredients}&number=10&apiKey=${API_KEY}`);
    const recipes = await response.json();

    // Check if recipes are found
    if (recipes.length === 0) {
      recipesContainer.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
      return;
    }

    // Clear the container
    recipesContainer.innerHTML = '';

    // Loop through each recipe and display it
    recipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe-card';

      recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, '-').toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a>
      `;

      recipesContainer.appendChild(recipeCard);
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    recipesContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
  }
}

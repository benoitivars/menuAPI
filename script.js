// Sélectionnez les éléments du DOM
const form = document.getElementById('searchForm');
const recipesGrid = document.getElementById('recipesGrid');
const modal = document.getElementById('recipeModal');
const closeModal = document.querySelector('.close-modal');

// Masquer le modal au chargement de la page
modal.style.display = 'none';

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Effacer les éléments de la grille existante
    recipesGrid.innerHTML = '';

    const meal = document.getElementById('mealInput').value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
    const data = await response.json();

    if (data.meals) {
        data.meals.forEach(meal => {
            const caseDiv = document.createElement('div');
            caseDiv.classList.add('case');
            caseDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>${meal.strMeal}</p>
            `;

            caseDiv.addEventListener('click', () => openModal(meal));

            recipesGrid.appendChild(caseDiv);
        });
    }
});

function openModal(recipeDetails) {
    document.getElementById('modalImage').src = recipeDetails.strMealThumb;
    document.getElementById('modalTitle').textContent = recipeDetails.strMeal;
    document.getElementById('modalDescription').textContent = recipeDetails.strInstructions;

    modal.style.display = 'block';
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});
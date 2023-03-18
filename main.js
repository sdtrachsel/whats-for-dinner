const letsCookBtn = document.getElementById('cookBtn');
const clearBtn = document.getElementById('clearBtn');
const radioBtns = document.getElementsByName('dish-type');
const crockpotImg = document.querySelector('.js-crockpot-pic');
const outputDisplay = document.querySelector('.js-output');
const outputText = document.querySelector('.js-output-text');

const meals = [
    { name: 'sides', options: ['Miso Glazed Carrots', 'Coleslaw', 'Garden Salad', 'Crispy Potatoes', 'Sweet Potato Tots', 'Coconut Rice', 'Caeser Salad', 'Shrimp Summer Rolls', 'Garlic Butter Mushrooms', 'Hush Puppies'] },
    { name: 'mains', options: ['Spaghetti and Meatballs', 'Pineapple Chicken', 'Shakshuka', 'Thai Yellow Curry', 'Bibimbap', 'Chicken Parmesean', 'Butternut Squash Soup', 'BBQ Chicken Burgers', 'Ramen', 'Empanadas', 'Chicken Fried Rice', 'Sheet Pan Fajitas', 'Margarita Pizza'] },
    { name: 'desserts', options: ['Apple Pie', 'Lemon Meringue Pie', 'Black Forest Cake', 'Banana Bread', 'Peach Cobbler', 'Cheesecake', 'Funfetti Cake', 'Baklava', 'Flan', 'Macarons', 'Macaroons', 'Chocolate Cupcakes', 'Pavlova', 'Pumpkin Pie', 'Key Lime Pie', 'Tart Tatin', 'Croissants', 'Eclairs'] }
];

//Event Listeners
letsCookBtn.addEventListener('click', populateOutput)
clearBtn.addEventListener('click', clearPage)

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function displayOutput() {
    hide(crockpotImg);
    show(outputDisplay);
    show(clearBtn);
}

function displayCrockpot() {
    show(crockpotImg);
    hide(outputDisplay);
    hide(clearBtn);
}

function clearPage() {
    displayCrockpot();
    clearRadioSelection();
    clearOutput();
}

function clearOutput() {
    outputText.innerText = '';
    outputText.classList.remove('single-dish');
    outputText.classList.remove('entire-meal');
}

function clearRadioSelection() {
    for (let i = 0; i < radioBtns.length; i++) {
        radioBtns[i].checked = false;
    }
}

function findSingleDishOption() {
    const mealType = findSelection();
    const selection = meals.find(meal => meal.name === mealType);

    return selection.options[getRandomIndex(selection.options)];
}

function findSelection() {
    const selection = Array.from(radioBtns).find(btn => {
          return btn.checked === true;
    }) 
      return selection.value;
}

function populateOutput() {
    clearOutput()
    if (!findSelection()) {
        displayCrockpot();
    } else if (findSelection() === 'entire-meal') {
        outputText.innerText = `${meals[1].options[getRandomIndex(meals[1].options)]} with a side of ${meals[0].options[getRandomIndex(meals[0].options)]} and ${meals[2].options[getRandomIndex(meals[2].options)]} for dessert!`;
        outputText.classList.add('entire-meal');
        displayOutput();
    } else {
        outputText.innerText = `${findSingleDishOption()}!`;
        outputText.classList.add('single-dish');
        displayOutput();
    }
}

function show(element) {
    element.classList.remove('hidden')
}

function hide(element) {
    element.classList.add('hidden')
}
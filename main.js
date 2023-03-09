var letsCookBtn = document.querySelector('.cook-button');
var clearBtn = document.querySelector('.clear-button');
var radioBtns = document.getElementsByName('dish-type');
var crockpotImg = document.querySelector('.js-crockpot-pic');
var outputDisplay = document.querySelector('.js-output');
var outputText = document.querySelector('.js-output-text');

var meals = [
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
    for (var i = 0; i < radioBtns.length; i++) {
        radioBtns[i].checked = false;
    }
}

function findSingleDishOption() {
    var mealType = findSelection();
    for (i = 0; i < meals.length; i++) {
        if (meals[i].name === mealType) {
            return meals[i].options[getRandomIndex(meals[i].options)];
        }
    }
}

function findIndex(selection) {
    var optionNames = [];
    for (var i = 0; i < meals.length; i++) {
        optionNames.push(meals[i].name)
    }
    return optionNames.indexOf(selection)
}

function findSelection() {
    for (var i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].checked) {
            return radioBtns[i].value;
        }
    }
}

function populateOutput() {
    clearOutput()
    if (!findSelection()) {
        displayCrockpot();
    } else if (findSelection() === 'entire-meal') {
        outputText.innerText = `${meals[findIndex('mains')].options[getRandomIndex(meals[findIndex('mains')].options)]} with a side of ${meals[0].options[getRandomIndex(meals[0].options)]} and ${meals[2].options[getRandomIndex(meals[2].options)]} for dessert!`;
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
/* Bored Box */
/*Api used - https://www.boredapi.com/documentation#endpoints-key */

/* Targets used */
const getitGoing = document.querySelector('#get-it-Going');
const box = document.getElementById('box');
const close = document.querySelector('.close');
const activity = document.querySelector('.activity');
const firstForm = document.querySelector('.first-Form');
const textSuggestion = document.getElementById('text-Suggestion');
const userInput = document.getElementById('user-Input');
const suggestSubmit = document.getElementById('suggest-Submit');
const secondForm = document.querySelector('.second-Form');
const seriously =  document.getElementById('seriously');
const numberSubmit = document.getElementById('number-Submit');
const numberSelect = document.getElementById('number-Select');
const funIdea = document.querySelector('.fun-Idea');
const ideaOutput = document.getElementById('idea-Output');
const tryAgain = document.getElementById('try-Again');
const storeIdea = document.getElementById('store-Idea');
const gotoStored = document.getElementById('goto-Stored');
const viewStored = document.querySelector('.view-Stored');
const storedIdea = document.getElementById('stored-Idea');
const storedOutput = document.querySelector('#stored-Output');
const goBack = document.getElementById('go-Back');
const noStorage = document.querySelector('.no-Storage');
const noStored = document.getElementById('no-Stored');
const back = document.getElementById('back');
const Directions = 'Hit the button for a fun idea. Or enter a number "2-5" for more friends to join you.';
const myArray = [1, 2, 3, 4, 5];//may try the array again at some point



/* Start Box Functioning */
getitGoing.addEventListener('click', function(e){
    box.style.display = 'block';
startBox(e);
})

/* Close Bored Box */
close.addEventListener('click', function(){
    box.style.display = 'none';
})

/* Function Beginning of Box */
function startBox(e){


    if(e.target.id == 'get-it-Going'){
        userInput.value = Directions;
        activity.style.display = 'block';
        firstForm.classList.add('first-Fade');
    }

    else if(e.target.id == 'go-Back'){
        firstForm.style.display = 'block';
        firstForm.classList.add('first-Fade');
        viewStored.classList.remove('move-right-to-place');
        viewStored.classList.add('move-right-back');       
    }

    else if(e.target.id == 'try-Again'){
        if(secondForm.classList.contains('move-top-back')){
            secondForm.classList.remove('move-top-back');
        }
        userInput.value = Directions;
        funIdea.classList.remove('move-left-to-place');
        funIdea.classList.add('move-left-back');
        firstForm.style.display = 'block';
        firstForm.classList.add('first-Fade');
    }
    else if(e.target.id == 'back'){
        noStorage.classList.remove('move-bottom-to-place');
        noStorage.classList.add('move-bottom-back');
        firstForm.style.display = 'block';
        firstForm.classList.add('first-Fade');
    }

}

/* Event for no storage to display go 'Back' */
back.addEventListener('click', function(e){
startBox(e);
})

/* Event handler to refresh div */
tryAgain.addEventListener('click', function(e){
startBox(e);
})

/* First Form Submit Button */
textSuggestion.addEventListener('submit', function(e){
e.preventDefault();
    let input = userInput.value;
    if(input == Directions){
        input = 1;
    }
    if(input == 1 || input == 2 || input == 3 || input == 4 || input == 5){  //i tried iterating through an array with no luck
        getIdea(input);
    }
    else{
        firstForm.style.display = 'none';
        firstForm.classList.remove('first-Fade');
        secondForm.classList.add('move-top-to-place');
    }
})

/* Second Form Submit Button */
seriously.addEventListener('submit', function(e){
e.preventDefault();
    firstForm.classList.remove('first-Fade');
    let input = 1;
    getIdea(input);
})

/* Second Form Selection menu */
function selectionInput(){
    let input = numberSelect.value;
    getIdea(input);
}

/* Event Storage to local for later view */
storeIdea.addEventListener('click', function (){
    let storeThisIdea = ideaOutput.innerHTML;
    let Idea = storeThisIdea;    
    localStorage.setItem('Idea', JSON.stringify(Idea));
})


/* Event View Stored Idea */
gotoStored.addEventListener('click', function(){
    if(localStorage.getItem('Idea') == null){
        if(noStorage.classList.contains('move-bottom-back')){
            noStorage.classList.remove('move-bottom-back');
        }
        firstForm.style.display = 'none';
        noStorage.classList.add('move-bottom-to-place');
    }
    else{
        if(viewStored.classList.contains('move-right-back')){
            viewStored.classList.remove('move-right-back');
        }
        let viewStoredIdea = JSON.parse(localStorage.getItem('Idea'));
        storedOutput.textContent = viewStoredIdea;
        firstForm.style.display = 'none';
        firstForm.classList.remove('first-Fade');
        viewStored.classList.add('move-right-to-place');
    }
})

/* Event to Go back to Beginning */
goBack.addEventListener('click', function(e){
    startBox(e);
})

/* Show Idea AFTER fetch */
function showIdea(activity){
    if(funIdea.classList.contains('move-left-back')){
        funIdea.classList.remove('move-left-back');
    }
    firstForm.style.display = 'none';
    firstForm.classList.remove('first-Fade');
    funIdea.classList.add('move-left-to-place');

    secondForm.classList.remove('move-top-to-place');
    secondForm.classList.add('move-top-back');
    ideaOutput.innerHTML = activity + `.`;
}

/* Get Idea Function- Input true from either form submit type*/
async function getIdea(input){
    let urlBeginning = 'https://www.boredapi.com/api/';
    let personActivity = 'activity?participants=' + input;
    let url = urlBeginning + personActivity;
    let response = await fetch(url);
    let json = await response.json();
    let {activity} = json;
showIdea(activity);
}


/* zMaG33z */
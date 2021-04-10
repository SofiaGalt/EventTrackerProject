let user = {};

window.addEventListener('load', function (evt) {
    console.log("script.js loaded");
    init();
})

function init(){
    loadZetaCircuit();
    userPrompt();
}

function userPrompt(){
    let div = document.querySelector('#currentUser');
    div.innerHTML = '';
    var submitButton = document.createElement('input');
    submitButton.type = "submit";
    submitButton.value= "Login";
    submitButton.addEventListener('click', login);
    div.appendChild(submitButton);
}

function login(){
    
    let div = document.querySelector('#currentUser');
    div.innerHTML = "";

    let getUserId = document.createElement('form');
    getUserId.name = 'getUserId';
    div.appendChild(getUserId);
    let label = document.createElement('label');
    getUserId.appendChild(label);
    let input = document.createElement('input');
    input.name = 'id';
    getUserId.appendChild(input);
    
    var submitButton = document.createElement('input');
    submitButton.type = "submit";
    submitButton.value= "Submit";
    submitButton.addEventListener('click', setUser);
    getUserId.appendChild(submitButton);
}

function setUser(e){

    e.preventDefault();
    console.log('inside setUser');
    let form = document.getUserId;
    console.log(form.id.value);
    let xhr = new XMLHttpRequest();

    xhr.open("GET", `api/users/${form.id.value}`);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                
                user = JSON.parse(xhr.responseText);
                console.log(user);
                displayUser();
            } else {
                let div = document.querySelector('#currentUser');
                let append = document.createElement('p');
                append.innerHTML = `We couldn't retrieve a user using that id.`;
                div.appendChild(append);
            }
        }
    }
    xhr.send();
}

function displayUser(){
    let div = document.querySelector('#currentUser');
    div.innerHTML = "";

    console.log("inside displayUser()");

    div.innerHTML = 'Logged in as ' + user.username + '<br>';

    var logout = document.createElement('input');
    logout.type = "submit";
    logout.value= "logout";
    logout.addEventListener('click', userPrompt);
    div.appendChild(logout);
}

function loadZetaCircuit(){
    console.log('inside loadZetaCircuit');
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "api/runs");
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                console.log(' successful get request! ***');
                let runs = JSON.parse(xhr.responseText);
                console.log(runs);
                displayRuns(runs);
            } else {
                displayErrors('Error retrieving runs: ' + xhr.status);
            }
        }
    }
    xhr.send();
}

function displayErrors(msg){
    let div = document.querySelector('#errors');
    let h1 = document.createElement('h3');
    h1.textContent = msg;
    div.appendChild(h1);
}

function displayRuns(runs){

    console.log('display runs');
    prepareRunEntriesTable();
    for (const run of runs) {
        displayRun(run);
    }
}

function displayRun(run){
    
    let div = document.querySelector('#runEntriesTable');
    let divListItem = document.createElement('div');
    divListItem.style.border = "1px solid black";
    
    if(run.raceTitle) divListItem.innerHTML = divListItem.innerHTML + `race: ${run.raceTitle}  `;
    if(run.location) divListItem.innerHTML = divListItem.innerHTML + `location: ${run.location}   `
    if(run.distance) {
        divListItem.innerHTML = divListItem.innerHTML + `distance: ${run.distance}`;
        if(run.distanceUnit) {
            divListItem.innerHTML = divListItem.innerHTML + `${run.distanceUnit}   `;
        }
    }
    if(run.hours || run.minutes || run.seconds) divListItem.innerHTML = divListItem.innerHTML + `time: `
    if(run.hours){ 
        divListItem.innerHTML = divListItem.innerHTML + `${run.hours}:`;
    } else {
        divListItem.innerHTML = divListItem.innerHTML + `00:`;
    }
    if(run.minutes) {
        divListItem.innerHTML = divListItem.innerHTML + `${run.minutes}:`;
    } else {
        divListItem.innerHTML = divListItem.innerHTML + `00:`;
    }
    if(run.seconds) {
        divListItem.innerHTML = divListItem.innerHTML + `${run.seconds}  `;
    } else {
        divListItem.innerHTML = divListItem.innerHTML + `00  `;
    }
    if(run.notes){
        divListItem.innerHTML = divListItem.innerHTML + `<br>${run.notes}`
    }
    divListItem.innerHTML = divListItem.innerHTML + `<br>Posted By ${run.user.username}`;
    div.appendChild(divListItem);
}

function prepareRunEntriesTable(){
    let div = document.querySelector('#runEntriesTable');
    div.innerHTML = '<h3>Run Entries</h3>';
}
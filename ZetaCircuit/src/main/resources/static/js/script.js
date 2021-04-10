window.addEventListener('load', function (evt) {
    console.log("script.js loaded");
    init();
})

function init(){
    loadZetaCircuit();
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
                displayError('Error retrieving runs: ' + xhr.status)
            }
        }
    }
    xhr.send();
}

function displayErrors(msg){
    let div = document.querySelector('#errors');
    let h1 = document.createElement('h3');
    h1.textContent(msg);
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
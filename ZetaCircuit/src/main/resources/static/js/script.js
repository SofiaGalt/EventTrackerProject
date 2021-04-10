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

    for (const run of runs) {
        displayRun(run);
    }
}

function displayRun(run){
    
    let div = document.querySelector('#runEntriesTable');
    let li = document.createElement('li');
    let divListItem = document.createElement('div');
    if(run.raceTitle) li.innerHTML = li.innerHTML + `race: ${run.raceTitle}  `;
    if(run.location) li.innerHTML = li.innerHTML + `location: ${run.location}   `
    if(run.distance) {
        li.innerHTML = li.innerHTML + `distance: ${run.distance}`;
        if(run.distanceUnit) {
            li.innerHTML = li.innerHTML + `${run.distanceUnit}   `;
        }
    }
    if(run.hours || run.minutes || run.seconds) li.innerHTML = li.innerHTML + `time: `
    if(run.hours){ 
        li.innerHTML = li.innerHTML + `${run.hours}:`;
    } else {
        li.innerHTML = li.innerHTML + `00:`;
    }
    if(run.minutes) {
        li.innerHTML = li.innerHTML + `${run.minutes}:`;
    } else {
        li.innerHTML = li.innerHTML + `00:`;
    }
    if(run.seconds) {
        li.innerHTML = li.innerHTML + `${run.seconds}  `;
    } else {
        li.innerHTML = li.innerHTML + `00  `;
    }
    if(run.notes){
        li.innerHTML = li.innerHTML + `<br>${run.notes}`
    }
    li.innerHTML = li.innerHTML + `<br>Posted By ${run.user.username}`;
    div.appendChild(li);
}
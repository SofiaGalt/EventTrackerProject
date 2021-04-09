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
 let div = document.querySelector('#runEntriesTable');
 for (const run of runs) {
     let li = document.createElement('li');
     li.textContent = run.distance;
     div.appendChild(li);
 }
}
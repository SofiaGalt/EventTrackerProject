let user = {};

window.addEventListener('load', function (evt) {
    console.log("script.js loaded");
    init();
})

function init(){
    loadZetaCircuit();
    userPrompt();
    document.createEntry.submit.addEventListener('click', createEntry);
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
    
    let submitButton = document.createElement('input');
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

    let logout = document.createElement('input');
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
    divListItem.style.borderRadius = "7px";
    divListItem.style.padding = "1.2em";
    divListItem.id = run.id;
    console.log("run.id: " +run.id);
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
    divListItem.innerHTML = divListItem.innerHTML + `<br>Posted By ${run.user.username}<br>`;
    
    let updateBtn = document.createElement('input');
    updateBtn.type = "submit";
    updateBtn.value = "update";
    updateBtn.id = run.id;
    updateBtn.run = run;
    updateBtn.addEventListener('click', update);
    divListItem.appendChild(updateBtn);
    
    let removeBtn = document.createElement('input');
    removeBtn.type = "submit";
    removeBtn.value = "remove";
    removeBtn.id = run.id;
    removeBtn.addEventListener('click', remove);
    divListItem.appendChild(removeBtn);
    
    div.appendChild(divListItem);
}

function update(e){
    
    // let toUpdate = document.getElementById(`${e.target.id}`);
    let toUpdate = e.target.run;
    console.log(e.target.run)
    
    // console.log(`${e.target.id}`);
    // toUpdate.style.color = 'red';

    // let removedOG = toUpdate.removeChild(toUpdate.firstChild);
    // console.log(removedOG);

    let updateForm = document.createEntry;

    document.querySelector('#formHeader').textContent = "Update Run Data";

    let formFields = updateForm.elements;

    for (var i = 0, field; field = formFields[i++];) {
        if (toUpdate[field.name])
            field.value = toUpdate[field.name];
    }

    updateForm.submit.id = toUpdate.id;
    updateForm.submit.userId = toUpdate.user.id;
    console.log("Posted by" + toUpdate.user.id);
    updateForm.submit.removeEventListener('click', createEntry);
    updateForm.submit.addEventListener('click', updateEntry);
}

function updateEntry(e){

    e.preventDefault();
    console.log("Update!");

    let form = document.createEntry;

    if(!user || !user.id){
        displayErrors("Please log in to update an entry.");
        return;
    }
    if(user.id != e.target.userId){
        console.log(e.target.userId);
        displayErrors("You cannot change another user's entry.");
    }
    let toPersist = {
        "distance": form.distance.value,
        "distanceUnit": form.distanceUnit.value,
        "hours": form.hours.value,
        "location": form.location.value,
        "minutes": form.minutes.value,
        "notes": form.notes.value,
        "raceTitle": form.raceTitle.value,
        "seconds": form.seconds.value
    }

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', `api/runs/${e.target.id}`);
    console.log(e.target.id);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
            if ( xhr.status == 200 || xhr.status == 201 ) {
                var run = JSON.parse(xhr.responseText);
                console.log(run);
                loadZetaCircuit();

                // updateForm.submit.removeEventListener('click', updateEntry);
                // updateForm.submit.addEventListener('click', createEntry);
            }
            else {
                console.log("update user bad request");
                displayErrors(`Something went wrong, we weren't able to update your entry. : ${xhr.status} Error`);
            }
        }
    };
    var userObjectJson = JSON.stringify(toPersist); 
    console.log(userObjectJson);
    xhr.send(userObjectJson);
}

function remove(e){
    console.log("remove.");
    console.log("remove! " + e.target);
}

function prepareRunEntriesTable(){
    let div = document.querySelector('#runEntriesTable');
    div.innerHTML = '<h3>Run Entries</h3>';
}

function createEntry(e){
    e.preventDefault();
    console.log("CREATE!");

    if(!user || !user.id){
        displayErrors("Please Log in to add a run entry.");
        return;
    }

    let form = document.createEntry;

    let toPersist = {
        "distance": form.distance.value,
        "distanceUnit": form.distanceUnit.value,
        "hours": form.hours.value,
        "location": form.location.value,
        "minutes": form.minutes.value,
        "notes": form.notes.value,
        "raceTitle": form.raceTitle.value,
        "seconds": form.seconds.value
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', `api/users/${user.id}/runs`);
    console.log(user);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
            if ( xhr.status == 200 || xhr.status == 201 ) {
                var run = JSON.parse(xhr.responseText);
                console.log(run);
                loadZetaCircuit();
            }
            else {
                console.log("create user bad request");
                displayErrors(`Something went wrong, we weren't able to save your entry. : ${xhr.status} Error`);
            }
        }
    };
    var userObjectJson = JSON.stringify(toPersist); 
    console.log(userObjectJson);
    xhr.send(userObjectJson);
}
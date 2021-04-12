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

    var createAccountButton = document.createElement('input');
    createAccountButton.type = "submit";
    createAccountButton.value= "Create Account";
    createAccountButton.addEventListener('click', createAccount);
    div.appendChild(createAccountButton);
}

function displayUser(){
    
    let div = document.querySelector('#currentUser');
    div.innerHTML = "";

    console.log("inside displayUser()");

    div.innerHTML = 'Logged in as ' + user.username + '<br>';

    let logoutBtn = document.createElement('input');
    logoutBtn.type = "submit";
    logoutBtn.value = "logout";
    logoutBtn.addEventListener('click', logout);
    div.appendChild(logoutBtn);

    let updateBtn = document.createElement('input');
    updateBtn.type = "submit";
    updateBtn.value = "update";
    updateBtn.user = user;
    updateBtn.addEventListener('click', updateUser);
    div.appendChild(updateBtn);

    let removeBtn = document.createElement('input');
    removeBtn.type = "submit";
    removeBtn.value = "remove";
    removeBtn.user = user;
    removeBtn.addEventListener('click', removeUser);
    div.appendChild(removeBtn);
}

function createAccount(){
    console.log(`Create Account!`);

    let div = document.querySelector('#currentUser');
    div.innerHTML = "";
    div.style.padding = '1.3em';
    div.style.border = '1px blue dotted';

    let createAccount = document.createElement('form');
    createAccount.name = 'createAccount';
    div.appendChild(createAccount);

    let usernameLabel = document.createElement('label');
    usernameLabel.textContent = "Username: ";
    createAccount.appendChild(usernameLabel);

    let unInput = document.createElement('input');
    unInput.name = 'username';
    createAccount.appendChild(unInput);

    // let passwordLabel = document.createElement('label');
    // passwordLabel.textContent = "Password: ";
    // createAccount.appendChild(passwordLabel);

    // let passInput = document.createElement('input');
    // passInput.name = 'password';
    // createAccount.appendChild(passInput);
    
    let submitButton = document.createElement('input');
    submitButton.type = "submit";
    submitButton.value= "Submit";
    submitButton.addEventListener('click', createUser);
    createAccount.appendChild(submitButton);
}

function createUser(e){

    e.preventDefault();
    console.log("CREATE USER!");

    let form;

    if(document.createAccount) {
        form = document.createAccount;
    } else {
        console.log('createAccount form does not exist');
        return;
    }

    let toPersist = {
        "username" : form.username.value,
        // "password" : form.password.value
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', `api/users/`);
    
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
            if ( xhr.status == 200 || xhr.status == 201 ) {
                user = JSON.parse(xhr.responseText);
                console.log(user);
                displayUser();
                loadZetaCircuit();
                refreshCreateForm();
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

function login(){
    
    let div = document.querySelector('#currentUser');
    div.innerHTML = "";
    div.style.padding = '1.3em';
    div.style.border = '1px blue dotted';
    let getUserId = document.createElement('form');
    getUserId.name = 'getUserId';
    div.appendChild(getUserId);
    let label = document.createElement('label');
    label.textContent = "User id:";
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
                loadZetaCircuit();
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

function updateUserRequest(e){
    console.log("xhr request -----------------------------");

    let toUpdate = user;
    console.log("toupdate :" + toUpdate.username);

    let form = document.updateAccount;
    
    let toPersist = {
         "username" : form.username.value
        // "password" : form.password.value
    }

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', `api/users/${user.id}`);
    
    xhr.setRequestHeader("Content-type", "application/json");

    // xhr.onreadystatechange = function() {
    //     console.log("On ready state change()! " + user);
    //     if (xhr.readyState === 4 ) {
    //         console.log("xhr.readyStatus ===4 ! " + user);
    //         if ( xhr.status == 200 || xhr.status == 201 ) {
    //             user = JSON.parse(xhr.responseText);
    //             console.log("Success update! " + user);
    //             displayUser();
    //             loadZetaCircuit();
    //             refreshCreateForm();
    //         }
    //         else {
    //             console.log("Fail update!" + user);
    //             console.log("update user bad request");
    //             displayErrors(`Something went wrong, we weren't able to update your entry. : ${xhr.status} Error`);
    //         }
    //     }
    // };
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
            if ( xhr.status == 200 || xhr.status == 201 ) {
                var run = JSON.parse(xhr.responseText);
                console.log("loaded: " + run);
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
    console.log("JSON : " + userObjectJson);
    xhr.send(userObjectJson);
        
}

function removeUser(e){

    e.preventDefault();
    console.log("remove.");
    console.log("remove! " + e.target.run);
    
    if(!user || !user.id){
        displayErrors("Please log in delete your account.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', `api/users/${user.id}`);
    console.log(`Path : DELETE api/users/${user.id}`);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
            if ( xhr.status == 204) {
                user = {};
                userPrompt();
                loadZetaCircuit();
            }
            else {
                console.log("remove run bad request");
                displayErrors(`Something went wrong, we weren't able to remove your account. : ${xhr.status} Error`);
            }
        }
    };
    
    xhr.send();
}

function updateUser(e){
    
    let div = document.querySelector('#currentUser');
    div.innerHTML = "";
    let updateForm = document.createElement('form');
    updateForm.name = 'updateAccount';
    div.appendChild(updateForm);

    let usernameLabel = document.createElement('label');
    usernameLabel.textContent = "Username: ";
    updateForm.appendChild(usernameLabel);

    let unInput = document.createElement('input');
    unInput.name = 'username';
    updateForm.appendChild(unInput);
    
    let submitButton = document.createElement('input');
    submitButton.type = "submit";
    submitButton.value= "Enter";
    submitButton.addEventListener('click', updateUserRequest);
    updateForm.appendChild(submitButton);

    div.appendChild(updateForm);
}


function refreshCreateForm(){
    let createForm = document.createEntry;
    document.querySelector('#formHeader').textContent = "Create Run Data";
    
    let formFields = createForm.elements;
    
    for (var i = 0, field; field = formFields[i++];) {
        field.value = '';
    }

    createForm.submit.removeEventListener('click', updateEntry);
    createForm.submit.removeEventListener('click', createEntry);
    createForm.submit.addEventListener('click', createEntry);
}

function logout(){
    user = {};
    userPrompt();
    loadZetaCircuit();
    refreshCreateForm();
}

function loadZetaCircuit(){
    console.log('inside loadZetaCircuit');
    let xhr = new XMLHttpRequest();

    if(!user.id) {
        document.querySelector('#runEntriesTable').innerHTML = `<h2>Log in to view your run entries</h2>`;
        return;
    }

    document.querySelector('#errors').textContent = "";

    xhr.open("GET", `api/users/${user.id}/totalMiles`);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                document.querySelector('#runEntriesTable').innerHTML = ``;
                console.log(' successful get request! ***');
                let amount = JSON.parse(xhr.responseText);
                console.log(amount);
                
                let sumOfMiles = document.createElement('div');
                sumOfMiles.innerHTML = `total miles: ${amount} <br>`;
                let currentUserDiv = document.querySelector("#currentUser");
                currentUserDiv.insertBefore(sumOfMiles, currentUserDiv.firstChild);
            } else {
                let sumOfMiles = document.createElement('div');
                sumOfMiles.innerHTML = `total miles: 0 <br>`;
                let currentUserDiv = document.querySelector("#currentUser");
                currentUserDiv.insertBefore(sumOfMiles, currentUserDiv.firstChild);
            }
        }
    }
    xhr.send();


    let xhr2 = new XMLHttpRequest();

    xhr2.open("GET", `api/users/${user.id}/runs`);
    xhr2.onreadystatechange = function(){
        if(xhr2.readyState === 4){
            if(xhr2.status === 200){
                document.querySelector('#runEntriesTable').innerHTML = ``;
                console.log(' successful get request! ***');
                let runs = JSON.parse(xhr2.responseText);
                console.log(runs);
                displayRuns(runs);
            } else {
                displayErrors('Error retrieving runs: ' + xhr2.status);
            }
        }
    }
    xhr2.send();
}

function displayErrors(msg){
    let div = document.querySelector('#errors');
    div.style.color = 'red';
    div.innerHTML = `<h3>${msg}</h3>`;
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
        } else{
            divListItem.innerHTML = divListItem.innerHTML + `  `;
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
    removeBtn.run = run;
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
        loadZetaCircuit();
        refreshCreateForm();
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
    e.preventDefault();
    console.log("remove.");
    console.log("remove! " + e.target.run);
    
    if(!user || !user.id){
        displayErrors("Please log in to remove an entry.");
        return;
    }

    if(user.id != e.target.run.user.id){
        console.log(e.target.run.user.id);
        displayErrors("You cannot remove another user's entry.");
        loadZetaCircuit();
        refreshCreateForm();
    }

    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', `api/users/${user.id}/runs/${e.target.run.id}`);
    console.log(e.target.run.id);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
            if ( xhr.status == 204) {
                loadZetaCircuit();
            }
            else {
                console.log("remove run bad request");
                displayErrors(`Something went wrong, we weren't able to remove your entry. : ${xhr.status} Error`);
            }
        }
    };
    
    xhr.send();
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
                refreshCreateForm();
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
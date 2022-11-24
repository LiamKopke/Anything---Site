//Get all needed html elements
let submit_btn = document.getElementById("submit");
let firstNameField = document.getElementById("name");
let passwordField = document.getElementById("pwd");

submit_btn.addEventListener("click", tryLogIn);
if (loadFromDB() == null) initializeDB();

let currentUsers = loadFromDB();

//Called when trying to login. 
//Checks if the info is valid then calls a function to either login or show alert that the info is invalid
function tryLogIn(e) {


    e.preventDefault();

    //Manually check validity
    passwordField.checkValidity();
    passwordField.reportValidity();
    firstNameField.checkValidity();
    firstNameField.reportValidity();
    
    //Ignore leading and trailing spaces to prevent confusion
    let firstName = firstNameField.value.trim();
    let password = passwordField.value.trim();

    //If input fields are empty return
    if (firstName == "" || password == "") return;

    //Create the user object
    let user = {
        name: firstName,
        password: password
    };

    //Check if login info is valid
    if (validateUser(user)) {
        login(firstName, e);
        return;
    }

    //Getting here means there was no match
    userTaken();

}

//Alerts the user that the info is invalid
function userTaken() {
    //Alert invalid info
    alert("Incorrect login information");

    //Reset fields
    document.getElementById("signin").reset();
}

//Logs the user in and loads the play page
function login(userName) {

    //Add user to the database as current user
    loginUser(userName);
    //Redirect to play.html
    window.location = "./play.html"
}
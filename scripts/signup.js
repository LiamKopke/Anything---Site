let firstNameField = document.getElementById("name");
let emailField = document.getElementById("email");
let passwordField = document.getElementById("pwd");
let createUserButton = document.getElementById("send");
let currentUsers;

createUserButton.addEventListener("click", tryCreateUser);
if (loadFromDB() == null) initializeDB();

//Called when trying to register, calls name taken if the name is taken or addUser if the info is all valid
function tryCreateUser(e) {

    //Make sure it loads every time so the currentUsers variable is never
    //out of sync
    currentUsers = loadFromDB();

    e.preventDefault();

    passwordField.checkValidity();
    passwordField.reportValidity();
    emailField.checkValidity();
    emailField.reportValidity();
    firstNameField.checkValidity();
    firstNameField.reportValidity();

    //Get rid of leading and trailing spaces
    let firstName = firstNameField.value.trim();
    let password = passwordField.value.trim();
    let email = emailField.value.trim();


    //Return if name is empty, password is empty, email doesn't include an @ or the trimmed email contains a space
    if (firstName == "" || password == "" ||
        !email.includes("@") || email.includes(" ") || email.split("@")[1].length == 0 ||
        (email.includes(".") && email.split(".")[1].length == 0))
        return

    //Check if name is already taken
    for (let i in currentUsers.users) {
        if (firstName == currentUsers.users[i].name) {
            nameTaken();
            return;
        }
    }

    //add the new user to the storage
    addUser(firstName, email, password);
}

//Alerts the user that the name is already taken
function nameTaken() {
    //Alert than the user already exists
    alert("User already exists in database");
    //Reset form
    document.getElementById("register").reset();
}

//Adds the user to the database
function addUser(name , email, pass) {
    //Create the user object
    let newUser = {
        name: name,
        email: email,
        password: pass,
        score: 0
    };

    //Add to the users list and save to storage
    currentUsers.users.push(newUser);
    saveToStorage(currentUsers);
    //Reset form
    document.getElementById("register").reset();
    //Alert successful registration
    alert("Registration successful");
    
}
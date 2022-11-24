// This file provides the event handler for the login button and 
// keeps track of its state by checking if there is a current logged in the database.

const login_btn = document.getElementById('login');
login_btn.addEventListener('click', resolveClick)

// If "Log-out" we have a logged in user and we should log them out.
// Otherwise, button text is "Log-in" and user should be redirect to the login page.

function resolveClick() {
    const btnText = login_btn.firstElementChild.innerHTML;

    if (btnText === "Log-out") {
        // function in fake_db.js
        logOut();
        // Reload page in case other elements depend on login state.
        window.location.reload();
    }
    else {
        // Redirect to login page
        window.location = "./login.html";
    }
    updateBtnText();
}

// Update the button text according to the loggin state in the database

function updateBtnText() {
    const btnText = login_btn.firstElementChild;
    const tempDB = loadFromDB();    // function in fake_db.js

    // if tempDB is not null or undefined
    if (tempDB){
        if (tempDB.loggedUser !== "") {
            btnText.innerHTML = "Log-out";
        }
        else {
            btnText.innerHTML = "Log-in";
        } 
    }
}

// Update the state of the button as soon as pages loads

updateBtnText();
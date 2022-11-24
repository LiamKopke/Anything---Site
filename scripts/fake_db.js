
// Template object for initializing the fake database in local storage

let starting_db = {
    db_name: "AI Jam User Database",
    users: [
        {
            name: "Mauricio",
            email: "mauricio@gmail.com",
            password: "1234bad",
            score: 12345
        },
        {
            name: "Larry",
            email: "larry@yahoo.com",
            password: "asdfnever",
            score: 67890
        },
        {
            name: "Meghrig",
            email: "meghrig@hotmail.com",
            password: "dontpassword",
            score: 98765
        },
        {
            name: "tester",
            email: "tester@gmail.com",
            password: "tester",
            score: 0
        }
    ],
    loggedUser: ""
};

const debug = true;     // Set to false to stop writting to console
const DB_NAME = 'ai-users';

// Receives a database object (see above) and saves it to the local storage.

function saveToStorage(db_object) {
    // convert object into a string
    let json_db = JSON.stringify(db_object);

    window.localStorage.setItem(DB_NAME, json_db);
    if (debug) console.log("Saved to local storage");
}

// Returns an object that represents the user database saved in the local storage

function loadFromDB() {
    const users_string = window.localStorage.getItem(DB_NAME);
    let session_db = JSON.parse(users_string);
    if (debug) {
        console.log("Current data in local storage:");
        console.log(session_db);
        console.log(JSON.stringify(session_db));
    }
    return session_db;
}

// Clears local storage

function clearDB() {
    localStorage.removeItem('ai-users');
    if (debug) console.log("Local storage cleared");
}

// Loads the starting_db (see top of file) into local storage

function initializeDB() {
    clearDB();
    if (debug) console.log("Initializing local storage from starting DB");

    saveToStorage(starting_db);
    if (debug) loadFromDB();
}

// Receives a user object with name, email and password, and returns
// true if the user is found inside the local storage.
// Returns false if user is not in local storage.

function validateUser(user) {
    const current_db = loadFromDB();
    const db_users = current_db.users;

    return (db_users.find(item => {
        return (item.name === user.name && item.password === user.password)
    }));
}

// Receives a username string and updates the DB loggerUser property,
// effectively creating a local user session

function loginUser(user) {
    const tempDB = loadFromDB();
    tempDB.loggedUser = user;
    saveToStorage(tempDB);
}

// Removed the loggedUser from the session

function logOut() {
    const tempDB = loadFromDB();
    tempDB.loggedUser = "";
    saveToStorage(tempDB);
}

// Receives a username string and removes user from local storage

function deleteDbUser(userName) {

    const temp_db = loadFromDB();
    const filteredUsers = temp_db.users.filter(user => {
        return user.name !== userName
    })
    temp_db.users = filteredUsers;
    saveToStorage(temp_db);
}
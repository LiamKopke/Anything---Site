let scoreTable = document.getElementById("table");

if (loadFromDB() == null) initializeDB();

let session_db = loadFromDB();
const tempDB = loadFromDB();

// creates all the users with their own scores
for(let i = 0; i < session_db.users.length; i++){
    let row = document.createElement("TR");
    let sCol = document.createElement("TD");
    let uCol = document.createElement("TD");
    let dCol = document.createElement("TD");
    let user = session_db.users[i].name;
    let score = session_db.users[i].score;
    let del = document.createElement("BUTTON");
    del.classList.add("trash");
    uCol.innerHTML = user; 
    sCol.innerHTML = score;
    del.innerHTML = "Delete";
    dCol.appendChild(del);
    row.appendChild(uCol);
    row.appendChild(sCol);
    row.appendChild(dCol);
    scoreTable.appendChild(row);
}

// only allows logged in users to delete the cards

if(tempDB.loggedUser == ""){
    let a = document.getElementsByClassName("trash");
    for(let i = 0; i < a.length; i++){
        a[i].style.display = "none";
    }
}
else{
    let a = document.getElementsByClassName("trash");
    for(let i = 0; i < a.length; i++){
        a[i].style.display = "block";
    }
}

// deletes a user when prompted, logges out if deleted own user
const list = document.querySelector("TABLE");

list.addEventListener('click', function(e){
    if(e.target.nodeName == 'BUTTON'){        
        const li = e.target.parentNode.parentNode.firstChild;
        for(let i = 0; i < session_db.users.length; i++){
            if(session_db.users[i].name == li.innerHTML){
                deleteDbUser(li.innerHTML);               
                list.removeChild(li.parentNode);
                if(li.innerHTML == tempDB.loggedUser){
                    logOut();
                    window.location.reload();
                    updateBtnText();
                }
            }
        }
    }   
});

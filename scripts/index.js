let play_btn = document.getElementById("play_btn");
play_btn.addEventListener("click", play);


if (loadFromDB() == null) initializeDB();

function play() {
    if (loadFromDB().loggedUser == "") {
        window.location = "./signup.html";
        return;
    }

    window.location = "./play.html";

}
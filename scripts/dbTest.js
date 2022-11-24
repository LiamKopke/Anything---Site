// File used for Storage Tester during development only
// Remove all references before shipping!

// Get references to relevant DOM objects

const btn_seed = document.getElementById("seed");
const btn_load = document.getElementById("load");
const btn_clear = document.getElementById("clear");

// Link the appropriate functions in fake_db.js

btn_seed.addEventListener("click", initializeDB);
btn_load.addEventListener("click", loadFromDB);
btn_clear.addEventListener("click", clearDB);
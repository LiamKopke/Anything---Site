class Sound{

    constructor(id){
        this.audio = document.getElementById(id);
    }
    
    playSound() {
        this.audio.load();
        this.audio.play();
    }

}
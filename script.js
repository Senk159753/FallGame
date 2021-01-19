var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var posun = 0;
var pocet =0;
var pohyb = [];

function moveLeft(){
    var left = //posun doleva
    parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){ //když je vetsi nez dano pozadni a character aby se zastavil a neprejel hraci plochu
        character.style.left = left - 2 + "px";
    }
}

function moveRight(){
    var left = //posun doprava
    parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380){ //když je mensi nez dano pozadni a character aby se zastavil a neprejel hraci plochu
        character.style.left = left + 2 + "px";
    }
}

document.addEventListener ("keydown", Event => {
    if(posun==0){ 
        posun++;
        if(Event.key==="ArrowLeft"){ //kdyz se zmackne sipka vlevo tak...
            interval = setInterval(moveLeft, 1);
        }
        if(Event.key==="ArrowRight"){ //kdyz se zmackne sipka vpravo tak...
            interval = setInterval(moveRight, 1);
        }
    }
});

document.addEventListener("keyup", Event => {
    clearInterval(interval);
    posun=0;
});

var zdi = setInterval(function(){
    var lastZed = document.getElementById("zed"+(pocet-1));
    var lastDira = document.getElementById("dira"+(pocet-1));
   //. var lastPrekazka = document.getElementById("prekazka"+(pocet-1)); //.
    if(pocet>0){
        var zmizLastZed = parseInt(window.getComputedStyle(lastZed).getPropertyValue("top"));
        var zmizLastDira = parseInt(window.getComputedStyle(lastDira).getPropertyValue("top"));
      //:  var zmizLastPrekazka = parseInt(window.getComputedStyle(lastPrekazka).getPropertyValue("top")); //.
    }
    if(zmizLastZed<400||pocet==0){
        var zed = document.createElement("div"); //tvorba zdi, blokace kulicky
        var dira = document.createElement("div"); //tvorba diry, propadnuti kulicky

       //. var prekazka = document.createElement("div"); //.

        zed.setAttribute("class", "zed");
        dira.setAttribute("class", "dira");

      //.  prekazka.setAttribute("class", "prekazka"); //.

        zed.setAttribute("id", "zed"+pocet);
        dira.setAttribute("id", "dira"+pocet);

      //.  prekazka.setAttribute("id","prekazka"); //.

        zed.style.top = zmizLastZed + 100 +"px"; //kazdych 100pixelu generuje novou zed
        dira.style.top = zmizLastDira + 100 + "px"; //kazdych 100pixelu generuje novou diru
       //. prekazka.style.top = zmizLastPrekazka + 120 + "px"; //.

        var random = Math.floor(Math.random() * 360); // nahodne generovani diry
        dira.style.left = random + "px";
       //. prekazka.style.left = random +"px"; //.

        game.appendChild(zed);
        game.appendChild(dira);
      //.  game.appendChild(prekazka); //.

        pohyb.push(pocet);
        pocet++;
    }
    var characterSec = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop =0;
    if(characterSec <= 0){
        alert("Rozmáčkla tě stěna, zkus to znovu :) Tvé skore: "+(pocet-9));
        clearInterval(zdi);
        location.reload();
    }
    for(var i = 0; i < pohyb.length; i++){  //aby to jezdilo porad a nove generovalo
        let proudeni = pohyb[i];
        let iZed = document.getElementById("zed"+proudeni);
        let iDira = document.getElementById("dira"+proudeni);
        let topZed = parseFloat(window.getComputedStyle(iZed).getPropertyValue("top"));
        let ihl = parseFloat(window.getComputedStyle(iDira).getPropertyValue("left"));
        iZed.style.top = topZed - 0.5 + "px";
        iDira.style.top = topZed - 0.5 + "px";
        if(iZed < -20){
            pohyb.shift();
            iZed.remove();
            iDira.remove();
        }
            if(topZed-20<characterSec && topZed>characterSec){
                drop++;
                if(ihl<=characterLeft && ihl+20>=characterLeft){
                    drop = 0;
                }
            }
        }
        if(drop==0){
            if(characterSec < 480){
                character.style.top = characterSec + 2 + "px";}
        }else{
            character.style.top = characterSec - 0.5 + "px";}  
},1);


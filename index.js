
import tabJoursEnOrdre from "./gestionTemps.js";

import  CLEAPI from "./apikey.js"
let resultatApi;

const temps = document.querySelector(".temps")
const temperature = document.querySelector(".temperature")
const localisation = document.querySelector(".localisation")
const heure = document.querySelectorAll(".heure-nom-prevision")
const tempPourH = document.querySelectorAll(".heure-prevision-valeur")
const joursDiv = document.querySelectorAll(".jour-prevision-nom")
const tempJoursDiv = document.querySelectorAll(".jour-prevision-temp")
const imgIcone = document.querySelectorAll(".logo-meteo")
const chargementContainer = document.querySelector(".overlay-icone-chargement")




// console.log(tempPourH);
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);


        let lon = position.coords.longitude
        let lat = position.coords.latitude
        AppelAPI(lon,lat)
    }, () => {
        alert("Vous avez refusé la localisation veuillez l 'activer")
    })
}


// console.log(tabJoursEnOrdre);
function AppelAPI(lon, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
        .then((response) => { return response.json() })
        .then((data) => {
            resultatApi = data
            temps.innerText = resultatApi.current.weather[0].description
            temperature.innerText = `${Math.trunc(resultatApi.current.temp)}°`
            localisation.innerText = resultatApi.timezone
            console.log(resultatApi);


            //les heures par tranches de trois avec leurs temperatures 

            let heureActuelle = new Date().getHours()
            
            for (let index = 0; index < heure.length; index++) {
                
                

                let heureIncr = heureActuelle + index * 3
                // console.log(heureIncr);

                if (heureIncr > 24) {
                    heure[index].innerText = `${heureIncr - 24} h`
                    
                } else if (heureIncr === 24) {
                    heure[index].innerText = "00 h"
                } else {
                    heure[index].innerText = `${heureIncr} h`
                }
            
                
            }



            //temp par tranche de 3 heure



            for (let j = 0; j < tempPourH.length; j++) {
            

                tempPourH[j].innerText = `${Math.trunc(resultatApi.hourly[j * 3].temp)}°`
                
            }


            for (let index = 0; index < tabJoursEnOrdre.length; index++) {
                const element = tabJoursEnOrdre[index];
                joursDiv[index].innerText = tabJoursEnOrdre[index].slice(0, 3)
            }
            //temperature par jour 
        


                //trois premieres lettres des jours 
            for (let index = 0; index < 7; index++) {
                
                tempJoursDiv[index].innerText = `${Math.trunc(resultatApi.daily[index + 1].temp.day)}°`
            }


            //icone dynamique
console.log(imgIcone.src = `/ressources/jour${resultatApi.current.weather[0].icon}.svg`);

            if (heureActuelle >= 66 && heureActuelle < 21) {
                imgIcone.src = `/ressources/jour${resultatApi.current.weather[0].icon}.svg`
                
            } else {
                imgIcone.src = `/ressources/nuit${resultatApi.current.weather[0].icon}.svg`
                
            }



            chargementContainer.classList.add("disparition")
        })



    


}
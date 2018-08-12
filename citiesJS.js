'use strict';

const cities = ["Melbourne", "Sydney", "Perth", "Adelaide", "Canberra",
                "Minsk", "Moscow", "Kiev", "Stockholm", "Oslo",
                "Madrid", "Rome", "Milan", "Berlin", "Paris",
                "Edinburgh", "Aberdeen", "Dublin", "York", "London",
                "New York", "Washington", "Pittsburgh", "Detroit", "Ottawa"];

const usedVariants = [];
let alarm = "";
let letterIndex = 0;
let firstEntry = 0;
let lastTextBoxSymbol = "";

const FINAL_MESSAGE = "Congratulation! Computer lost. It doesn't have any more variants. You are the winner!";

function startTheGame(){
    let textBoxCity = document.querySelector("input");

    textBoxCity.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            if (firstEntry === 0) {
                if (checkForEmptyName(textBoxCity)) return;

                compareCities(textBoxCity);
            } else {
                if (checkForEmptyName(textBoxCity)) return;

                let firstTextBoxSymbol = textBoxCity.value.substring(0, 1);

                if (firstTextBoxSymbol.toUpperCase() !== lastTextBoxSymbol.toUpperCase()) {
                    alert("The city's name must start with a(an) \"" + lastTextBoxSymbol.toUpperCase() + "\" character. " +
                        "If you don't write it you will lose.");
                    return;
                }
                compareCities(textBoxCity);
            }

            firstEntry++;
        }
    });
}

function compareCities(textBoxCity) {
    setCities(textBoxCity.value, "user");

    for (let i = 0; i < cities.length; i++){
        if (cities[i].toUpperCase() === textBoxCity.value.toUpperCase()){
            cities.splice(i, 1);
        }
    }

    if (checkAlarm()) return;

    lastTextBoxSymbol = textBoxCity.value.slice(-1);

    for (let i = 0; i <= cities.length; i++) {
        if (i === cities.length){
            writeFinalMessage();
            textBoxCity.disabled = true;
            textBoxCity.value = "The end of the game!";
            textBoxCity.style.backgroundColor = '#DCDCDC';
        } else {
            let firstCitiesSymbol = cities[i].substring(0, 1);

            if (lastTextBoxSymbol.toUpperCase() === firstCitiesSymbol.toUpperCase()) {
                if (checkAlarm()) return;

                textBoxCity.value = cities[i];
                cities.splice(i, 1);

                setCities(textBoxCity.value, "computer");
                if (checkAlarm()) return;

                lastTextBoxSymbol = textBoxCity.value.slice(-1);
                break;
            }
        }
    }
}

function setCities(city, idName) {
    for (let i = 0; i < usedVariants.length; i++){
        if (city.toUpperCase() === usedVariants[i].toUpperCase()){
            alarm = "This city has already been used! Please enter another variant. If you don't you will lose.";
            alert(alarm);
            return;
        }
    }

    usedVariants.push(city);

    let list = document.querySelector("#" + idName);
    let node = document.createElement("li");
    let content = document.createTextNode(city);

    node.appendChild(content);
    list.appendChild(node);
}

function checkForEmptyName(textBoxCity) {
    if (textBoxCity.value === "") {
        alert("The city's name can't be empty!");
        return true;
    }
}

function checkAlarm() {
    if (alarm){
        alarm = "";
        return true;
    }
}

function writeFinalMessage() {
    if (letterIndex < FINAL_MESSAGE.length) {
        document.querySelector("#winner").innerHTML += FINAL_MESSAGE.charAt(letterIndex);
        letterIndex++;
        setTimeout(writeFinalMessage, 50);
    }
}

function checkForLetters(event) {
    let symbol = String.fromCharCode(event.which);

    if (!(/[A-Za-z ]/.test(symbol))){
        event.preventDefault();
    }
}
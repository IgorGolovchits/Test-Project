var cities = ["Melbourne", "Sydney", "Perth", "Adelaide", "Canberra",
              "Minsk", "Moscow", "Kiev", "Stockholm", "Oslo",
              "Madrid", "Rome", "Milan", "Berlin", "Paris",
              "Edinburgh", "Aberdeen", "Dublin", "York", "London",
              "New York", "Washington", "Pittsburgh", "Detroit", "Ottawa"];

var usedVariants = [];
var alarm = "";
var firstEntry = 0;
var lastTextBoxSymbol = "";

const FINAL_MESSAGE = "Congratulation! Computer lost. You are the winner!";

function startTheGame(){
    var textBoxCity = document.getElementById("city");

    textBoxCity.addEventListener("keydown", function onEvent(event) {
        if (event.key === "Enter") {
            if (firstEntry === 0) {   //первый вход в игру. проверяется сначала последняя буква в текстбоксе и первая в массиве городов
                if (checkForEmptyName(textBoxCity) === true) return;

                compareCities(textBoxCity);
            } else { // второй и последующие входы проверяют на совпадение первую букву текстбокса и последнюю предыдущего слова
                if (checkForEmptyName(textBoxCity) === true) return;

                var firstTextBoxSymbol = textBoxCity.value.substring(0, 1);

                if (firstTextBoxSymbol.toUpperCase() === lastTextBoxSymbol.toUpperCase()) {
                    compareCities(textBoxCity);
                }
                else {
                    alert("The city's name must start with a(an) \"" + lastTextBoxSymbol.toUpperCase() + "\" character. " +
                          "If you don't write it you will lose.");
                }
            }

            firstEntry++;
        }
    });
}

function compareCities(textBoxCity) {
    var finish = false;

    setCities(textBoxCity.value, "user list");

    if (checkAlarm() === true) return;

    lastTextBoxSymbol = textBoxCity.value.slice(-1);

    for (var i = 0; i <= cities.length; i++) {
        if (i === cities.length){
            finish = true;
        } else {
            var firstCitiesSymbol = cities[i].substring(0, 1);

            if (lastTextBoxSymbol.toUpperCase() === firstCitiesSymbol.toUpperCase()) {
                if (checkAlarm() === true) return;

                textBoxCity.value = cities[i];
                cities.splice(i, 1);

                setCities(textBoxCity.value, "computer list");

                lastTextBoxSymbol = textBoxCity.value.slice(-1);
                break;
            }
        }
    }

    if (finish === true){
        writeFinalMessage();
        textBoxCity.disabled = true;
    }
}

function setCities(city, idName) {
    for (var i = 0; i < usedVariants.length; i++){
        if (city.toUpperCase() === usedVariants[i].toUpperCase()){
            alarm = "This city has already been used! Please enter another variant. If you don't you will lose.";
            alert(alarm);
            return;
        }
    }

    usedVariants.push(city);

    var list = document.getElementById(idName);
    var node = document.createElement("li");
    var content = document.createTextNode(city);

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
    if (alarm !== ""){
        alarm = "";
        return true;
    }
}

var letterIndex = 0;

function writeFinalMessage() {
    if (letterIndex < FINAL_MESSAGE.length) {
        document.getElementById("winner").innerHTML += FINAL_MESSAGE.charAt(letterIndex);
        letterIndex++;
        setTimeout(writeFinalMessage, 50);
    }
}

function checkForLetters(event) {
    var symbol = String.fromCharCode(event.which);

    if (!(/[A-Za-z]/.test(symbol))){
        event.preventDefault();
    }
}
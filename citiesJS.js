var cities = ["Melbourne", "Sydney", "Perth", "Adelaide", "Canberra",
    "Minsk", "Moscow", "Kiev", "Stockholm", "Oslo",
    "Madrid", "Rome", "Milan", "Berlin", "Paris",
    "Edinburgh", "Aberdeen", "Dublin", "York", "London",
    "New York", "Washington", "Pittsburgh", "Detroit", "Ottawa"];

var usedVariants = [];
var alarm = "";
var firstEntry = 0;
var lastTextBoxSymbol = "";
var finalMessage = "Congratulation! Computer lost. You are the winner!";

function myFunc(){
    var textBoxCity = document.getElementById("city");

    textBoxCity.addEventListener("keydown", function onEvent(event) {
        if (event.key === "Enter") {
            if (firstEntry === 0) {
                if (textBoxCity.value === "") {
                    alert("The city name can't be empty!");
                }
                else {
                    compareCities(textBoxCity);
                }
            }
            else{
                if (textBoxCity.value === "") {
                    alert("The city name can't be empty!");
                }
                else {
                    var firstTextBoxSymbol = textBoxCity.value.substring(0, 1);  //первая буква города из текстбокса

                    if (firstTextBoxSymbol.toUpperCase() === lastTextBoxSymbol.toUpperCase()) {
                        compareCities(textBoxCity);
                    }
                    else {
                        alert("The city's name must start with a(an) \"" + lastTextBoxSymbol.toUpperCase() + "\" character. "  +
                              "If you don't write it you will lose.");
                    }
                }
            }
            firstEntry++;
        }
    });
}

function compareCities(textBoxCity) {
    setCities(textBoxCity.value, "user list");           //добавление города в html лист пользователя
    lastTextBoxSymbol = textBoxCity.value.slice(-1);         //последняя буква города из текстбокса

    for (var i = 0; i < cities.length; i++) {
        var firstCitiesSymbol = cities[i].substring(0, 1);      //первая буква города из массива

        if (lastTextBoxSymbol.toUpperCase() === firstCitiesSymbol.toUpperCase()) {
            // if (alarm !== ""){
            //     alarm = "";
            //     return;
            // }
            textBoxCity.value = cities[i];                         //запись в текстбокс города из массива
            cities.splice(i, 1);
            setCities(textBoxCity.value, "computer list");       //добавление города в html лист компьютера
            lastTextBoxSymbol = textBoxCity.value.slice(-1);
            break;
        }
    }
}

function setCities(city, idName) {
    // for (var i = 0; i < usedVariants.length; i++){
    //     if (city === usedVariants[i]){
    //         alarm = "This city has already been used! Please enter another variant.";
    //         alert(alarm);
    //         return;
    //     }
    // }
    usedVariants.push(city);

    var list = document.getElementById(idName);
    var node = document.createElement("li");
    var content = document.createTextNode(city)

    node.appendChild(content);
    list.appendChild(node);
}
var i = 0;

function writeFinalMessage() {

    if (i < finalMessage.length) {
        document.getElementById("winner").innerHTML += finalMessage.charAt(i);
        i++;
        setTimeout(writeFinalMessage, 50);
    }
}
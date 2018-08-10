var cities = ["Melbourne", "Sydney", "Perth", "Adelaide", "Canberra",
    "Minsk", "Moscow", "Kiev", "Stockholm", "Oslo",
    "Madrid", "Rome", "Milan", "Berlin", "Paris",
    "Edinburgh", "Aberdeen", "Dublin", "York", "London",
    "New York", "Washington", "Pittsburgh", "Detroit", "Ottawa"];

var usedVariants = [];
var alarm = "";
function myFunc(){
    var cityName = document.getElementById('city');

    cityName.addEventListener('keydown', function onEvent(event) {
        if (event.key === "Enter") {
            for (var i = 0; i < cities.length; i++){
                var firstCitiesSymbol = cities[i].substring(0,1);
                var lastUsersSymbol = cityName.value.slice(-1);
                if (lastUsersSymbol.toUpperCase() === firstCitiesSymbol.toUpperCase()){
                    getVariants(cityName.value, 'user list');
                    if (alarm != ""){
                        alarm = "";
                        return;
                    }
                    cityName.value = cities[i];
                    cities.splice(i, 1);
                    getVariants(cityName.value, 'computer list');
                    break;
                }
            }
        }
    });
}

function getVariants(city, idName) {
    var variants = [];
    variants.push(city);
    for (var i = 0; i < usedVariants.length; i++){
        if (city === usedVariants[i]){
            alarm = 'This city has already been used! Please enter another variant.';
            alert(alarm);
            return;
        }
    }
    usedVariants.push(city);
    addItemToList(variants, idName);
}

function addItemToList(variants, idName) {
    var list = document.getElementById(idName);

    for (var i = 0; i < variants.length; i++){
        var node = document.createElement("li");
        var content = document.createTextNode(variants[i]);

        node.appendChild(content);
        list.appendChild(node);
    }
}
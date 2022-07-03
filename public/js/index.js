(function () {
    var Timer;

getResultAsync = function (url, data, success) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();

        req.open('GET', url + ( data==undefined ? '' :formatParams(data) ));

        req.onload = function () {
            if (req.status == 200) {
                resolve(success(JSON.parse(req.response)));
            }
            else {
                reject();
            }
        };

        req.send();
    });
}

consultaElementsSuccess = function(res){
    var html="";
    document.getElementById("bodytable").innerHTML =html;
    for(var key of res.results){
        html+=`<tr><td>${key.id}</td><td>${key.title}</td><td><img src="${key.image}"/></td></tr>`
    }
    document.getElementById("bodytable").innerHTML = html;
}

validarbusqueda = function(){
    if(document.getElementById("findrecipe").value.length>2){
        clearTimeout(Timer);
        Timer = setTimeout(busquedaSensitiva, 800);
    }
    
}
changeCalorias = function(){
    document.getElementById("numberCalories").innerHTML=document.getElementById("selectCalories").value;
    busquedaSensitiva();
}

changePagination = function(){
    busquedaSensitiva();
}

busquedaSensitiva = function(){
    //alert(`https://api.spoonacular.com/recipes/complexSearch?apiKey=576df5bad46f40eeaa8543c31255fb93&query=${document.getElementById("findrecipe").value}&maxCalories=${document.getElementById("selectCalories").value}&number=${document.getElementById("recetasbypage").value}`);
    getResultAsync(`https://api.spoonacular.com/recipes/complexSearch?apiKey=576df5bad46f40eeaa8543c31255fb93&query=${document.getElementById("findrecipe").value}&maxCalories=${document.getElementById("selectCalories").value}&number=${document.getElementById("recetasbypage").value}`,undefined,consultaElementsSuccess);
}

})();

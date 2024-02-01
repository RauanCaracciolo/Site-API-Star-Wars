
//Funcao para adicionar o HTML com todos os filmes
function addHtmlPeople(text, num){
    //Acha a localização no HTML
    let location = document.querySelector(".people_list");
    //Cria um elemento de LI
    let newElement = document.createElement("li");
    //Seta o ID dos LI
    newElement.setAttribute("id", num);
    newElement.setAttribute("class", "pessoa");
    //Adiciona um evento Onclick no LI
    newElement.setAttribute("onclick", "peopleLoadInfo(this.id)");
    //Coloca o texto no elemento desejado
    let h3 = document.createElement("p");
    h3.setAttribute("id", "person");
    h3.innerHTML = text;
    //Coloca o elemento no HTML
    location.appendChild(newElement);
    newElement.appendChild(h3);

}
//Variavel para abrir e fechar as Informaçoes
let pageOn = false;
//Função para carregar as informações dos filmes individualmente, já que é chamada no onclick
function peopleLoadInfo(pos){
    //Checa se as informações já estao abertas
    if(!pageOn){
        //Cria a div para ser aberta ou fechada
        let newDiv = document.createElement("div");
        //Coloca o atributo para ela ser encontrada depois
        newDiv.setAttribute("id", "parent");
        //Função para encontrar o filme identificado por POS na lista de filmes, coloca a informação dele em "data"
        swapiModule.getPerson(pos, function(data){
            //Acha a localização pelo ID da posição, para ser criado as informações abaixo disso
            let loc = document.getElementById(pos);
            //Cria uma div para ser colocada as informações dentro
            let para = document.createElement("div");

            //Cria uma nova div em baixo da posição Pos
            loc.appendChild(newDiv);

            //Definição das Info brutas pegando do Data
            let peopleName = data.name;
            let peopleGender = data.gender;
            let peopleSpecie = data.species;
            let peopleMass = data.mass;
            let peopleHeight = data.height;
            let peopleFilms = data.films;
            let peopleStarships = data.starships;
            let peopleVehicles = data.vehicles;
            //Fim do bloco de definições

            //Cria uma div e uma UL para os filmes
            let divFilms = document.createElement("div");
            divFilms.setAttribute("id","films");
            let ulFilms = document.createElement("ul");
            ulFilms.setAttribute("id","filmsList");
            ulFilms.innerHTML = "<p><strong>Filmes: </strong></p>"
            //Fim do bloco de Div dos filmes

            //Cria uma div e uma UL para as especies
            let divSpecies = document.createElement("div");
            divSpecies.setAttribute("id","species");
            let ulSpecies = document.createElement("ul");
            ulSpecies.setAttribute("id","speciesList");
            ulSpecies.innerHTML = "<p><strong>Especies: </strong></p>"
            //Fim do bloco de Div das especies

            //Cria uma div e uma UL para as Naves especiais
            let divStarships = document.createElement("div");
            divStarships.setAttribute("id","starships");
            let ulStarships = document.createElement("ul");
            ulStarships.setAttribute("id","starshipList");
            ulStarships.innerHTML = "<p><strong>Naves espaciais: </strong></p>"
            //Fim do bloco de Div das naves espaciais

            
            //Cria uma div e uma UL para os veiculos
            let divVehicles = document.createElement("div");
            divVehicles.setAttribute("id","vehicles");
            let ulVehicles = document.createElement("ul");
            ulVehicles.setAttribute("id","vehicleList");
            ulVehicles.innerHTML = "<p><strong>Veiculos: </strong></p>"
            //Fim do bloco de Div dos veiculos

            //Bloco de real colocação das informações
            para.innerHTML = "<p><strong>Nome: </strong>" + peopleName + "</p>"; 
            para.innerHTML = para.innerHTML + "<p><strong>Genero: </strong>" + peopleGender + "</p>";
            para.innerHTML = para.innerHTML + "<p><strong>Altura: </strong>" + peopleHeight + "cm</p>";
            para.innerHTML = para.innerHTML + "<p><strong>Peso: </strong>" + peopleMass + "kg</p>";
            newDiv.appendChild(para);
            newDiv.appendChild(divFilms);
            divFilms.appendChild(ulFilms);
            newDiv.appendChild(divSpecies);
            divSpecies.appendChild(ulSpecies);
            newDiv.appendChild(divStarships);
            divStarships.appendChild(ulStarships);
            newDiv.appendChild(divVehicles);
            divVehicles.appendChild(ulVehicles);
            //For para colocar cada membro dos personagens por nome
            for(i = 0; i < peopleFilms.length; i++){
                getCharacterFilm(peopleFilms[i]);
                
            }
            //Coloca a especie
            if(peopleSpecie[0] == null){
                let node = document.createTextNode("Human")
                ulSpecies.appendChild(node);
            }else{
                getPeopleSpecie(peopleSpecie);

            }
            //For para colocar cada membro das naves por nome
            for(i = 0; i < peopleStarships.length; i++){
                getFilmStarship(peopleStarships[i]);
            }
            //For para colocar cada membro dos veiculos por nome
            for(i = 0; i < peopleVehicles.length; i++){
                getFilmVehicle(peopleVehicles[i]);
            }
            //Fim do bloco de colocação de informação            
            //Deixa o pageOn como verdadeiro, evitando que chame a criacao da informação diversas vezes
            pageOn = true;
        })
    }else{
        let div = document.getElementById("parent");
        div.remove();
        pageOn = false;
    }
}
async function getCharacterFilm(url){
    //Coleta a ulr na variavel link
    let link = url;
    //Espera a resposta da API
    let response = await fetch(link);    
    
    //Checa se a resposta veio OK
    if(response.ok){
        //Transforma a resposta em um JSON usavel
        let data = await response.json();
        //Cria um elemento LI
        let liCharacters = document.createElement("li");
        //Detecta o começo da lista com ID charactersList
        let ulCharacters = document.querySelector("#filmsList");
        //Coleta o nome do personagem
        let name = data.title;
        //Coloca dentro do HTML li o nome do personagem
        liCharacters.innerHTML = name;
        //Cria um LI abaixo do ID charactersList
        ulCharacters.appendChild(liCharacters);
    }else{
        console.log("Erro no getCharacterFilm");
    }
}
//Pega o nome de planetas e coloca em uma lista anteriormente pré-setada
async function getFilmPlanet(url){
    //Coleta a ulr na variavel link
    let link = url;
    //Espera a resposta da API
    let response = await fetch(link);    
    
    //Checa se a resposta veio OK
    if(response.ok){
        //Transforma a resposta em um JSON usavel
        let data = await response.json();
        //Cria um elemento LI
        let liPlanets = document.createElement("li");
        //Detecta o começo da lista com ID planetsList
        let ulPlanets = document.querySelector("#planetsList");
        //Coleta o nome do planeta
        let name = data.name;
        //Coloca dentro do HTML li o nome do planeta
        liPlanets.innerHTML = name;
        //Cria um LI abaixo do ID planetsList
        ulPlanets.appendChild(liPlanets);
    }else{
        console.log("Erro no getFilmPlanet");
    }
}
async function getPeopleSpecie(url){
    //Coleta a ulr na variavel link
    let link = url;
    //Espera a resposta da API
    let response = await fetch(link);    
    
    //Checa se a resposta veio OK
    if(response.ok){
        //Transforma a resposta em um JSON usavel
        let data = await response.json();
        //Cria um elemento LI
        let liSpecies = document.createElement("li");
        //Detecta o começo da lista com ID speciesList
        let ulSpecies = document.querySelector("#speciesList");
        //Coleta o nome da especie
        let name = data.name;
        //Coloca dentro do HTML li o nome da especie
        liSpecies.innerHTML = name;
        //Cria um LI abaixo do ID speciesList
        ulSpecies.appendChild(liSpecies);
    }else{
        console.log("Erro no getFilmSpecie");
    }
}
async function getFilmStarship(url){
    //Coleta a ulr na variavel link
    let link = url;
    //Espera a resposta da API
    let response = await fetch(link);    
    
    //Checa se a resposta veio OK
    if(response.ok){
        //Transforma a resposta em um JSON usavel
        let data = await response.json();
        //Cria um elemento LI
        let liStarship = document.createElement("li");
        //Detecta o começo da lista com ID starshipList
        let ulStarship = document.querySelector("#starshipList");
        //Coleta o nome da nave
        let name = data.name;
        //Coloca dentro do HTML li o nome da nave
        liStarship.innerHTML = name;
        //Cria um LI abaixo do ID starshipList
        ulStarship.appendChild(liStarship);
    }else{
        console.log("Erro no getFilmStarship");
    }
}
async function getFilmVehicle(url){
    //Coleta a ulr na variavel link
    let link = url;
    //Espera a resposta da API
    let response = await fetch(link);    
    
    //Checa se a resposta veio OK
    if(response.ok){
        //Transforma a resposta em um JSON usavel
        let data = await response.json();
        //Cria um elemento LI
        let liVehicle = document.createElement("li");
        //Detecta o começo da lista com ID vehicleList
        let ulVehicle = document.querySelector("#vehicleList");
        //Coleta o nome do veiculo
        let name = data.name;
        //Coloca dentro do HTML li o nome do veiculo
        liVehicle.innerHTML = name;
        //Cria um LI abaixo do ID vehicleList
        ulVehicle.appendChild(liVehicle);
    }else{
        console.log("Erro no getFilmStarship");
    }
}
//Pega a data dos filmes
async function getPeopleData(){
    //Link basico para API enviar todos os filmes
    let url = "https://swapi.dev/api/people/";
    //Espera a resposta
    let response = await fetch(url);

    if(response.ok){
        let data = await response.json();
         console.log(data);
        for(i = 0; i < 10; i++){
            addHtmlPeople(data.results[i].name, i+1);
        }
    }else{
        console.log("erro na 1 chamada");
    }

    url = "https://swapi.dev/api/people/?page=2";
    response = await fetch(url);
    
    if(response.ok){
        let data = await response.json();
         console.log(data);
         //A API por algum motivo da erro quando se solicita a pessoa numero 17, ent fiz essa especie de gambiarra para tentar evitar isso
        for(i = 0; i < 10; i++){
            if(i+11 < 17){
                addHtmlPeople(data.results[i].name, i+11);
            }else if (i+11 >= 17){
                addHtmlPeople(data.results[i].name, i+12);
            }
        }
    }else{
        console.log("erro na 2 chamada");
    }
    url = "https://swapi.dev/api/people/?page=3";
    response = await fetch(url);
    
    if(response.ok){
        let data = await response.json();
         console.log(data);
        for(i = 0; i < 10; i++){
            addHtmlPeople(data.results[i].name, i+22);
        }
    }else{
        console.log("erro na 3 chamada");
    }
    url = "https://swapi.dev/api/people/?page=4";
    response = await fetch(url);
    
    if(response.ok){
        let data = await response.json();
         console.log(data);
        for(i = 0; i < 10; i++){
            addHtmlPeople(data.results[i].name, i+32);
        }
    }else{
        console.log("erro na 4 chamada");
    }
    url = "https://swapi.dev/api/people/?page=5";
    response = await fetch(url);
    
    if(response.ok){
        let data = await response.json();
         console.log(data);
        for(i = 0; i < 10; i++){
            addHtmlPeople(data.results[i].name, i+42);
        }
    }else{
        console.log("erro na 5 chamada");
    }
    url = "https://swapi.dev/api/people/?page=6";
    response = await fetch(url);
    
    if(response.ok){
        let data = await response.json();
         console.log(data);
        for(i = 0; i < 10; i++){
            addHtmlPeople(data.results[i].name, i+52);
        }
    }else{
        console.log("erro na 6 chamada");
    }
    url = "https://swapi.dev/api/people/?page=7";
    response = await fetch(url);
    
    if(response.ok){
        let data = await response.json();
         console.log(data);
        for(i = 0; i < 10; i++){
            addHtmlPeople(data.results[i].name, i+62);
        }
    }else{
        console.log("erro na 7 chamada");
    }
    url = "https://swapi.dev/api/people/?page=8";
    response = await fetch(url);
    
    if(response.ok){
        let data = await response.json();
         console.log(data);
        for(i = 0; i < 10; i++){
            addHtmlPeople(data.results[i].name, i+72);
        }
    }else{
        console.log("erro na 8 chamada");
    }
    url = "https://swapi.dev/api/people/?page=9";
    response = await fetch(url);
    
    if(response.ok){
        let data = await response.json();
         console.log(data);
        for(i = 0; i < 2; i++){
            addHtmlPeople(data.results[i].name, i+82);
        }
    }else{
        console.log("erro na 9 chamada");
    }
}
//Começa a rodar no Load da tela
window.onload = getPeopleData;
// Initialization for ES Users

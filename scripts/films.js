//Funcao para adicionar o HTML com todos os filmes
function addHtmlFilm(text, num){
    //Acha a localização no HTML
    let location = document.querySelector(".films_list");
    //Cria um elemento de LI
    let newElement = document.createElement("li");
    //Seta o ID dos LI
    newElement.setAttribute("id", num);
    //Adiciona uma classe identificatoria
    newElement.setAttribute("class", "filme");
    //Adiciona um evento Onclick no LI
    newElement.setAttribute("onclick", "filmsLoadInfo(this.id)");
    //Coloca o texto no elemento desejado
    let h3 = document.createElement("p");
    h3.setAttribute("id", "film");
    h3.innerHTML = text;
    //Coloca o elemento no HTML
    location.appendChild(newElement);
    newElement.appendChild(h3);
}
//Variavel para abrir e fechar as Informaçoes
let pageOn = false;
//Função para carregar as informações dos filmes individualmente, já que é chamada no onclick
function filmsLoadInfo(pos){
    //Checa se as informações já estao abertas
    if(!pageOn){
        //Cria a div para ser aberta ou fechada
        let newDiv = document.createElement("div");
        //Coloca o atributo para ela ser encontrada depois
        newDiv.setAttribute("id", "parent");
        //Função para encontrar o filme identificado por POS na lista de filmes, coloca a informação dele em "data"
        swapiModule.getFilm(pos, function(data){
            //Acha a localização pelo ID da posição, para ser criado as informações abaixo disso
            let loc = document.getElementById(pos);
            //Cria uma div para ser colocada as informações dentro
            let para = document.createElement("div");

            //Cria uma nova div em baixo da posição Pos
            loc.appendChild(newDiv);

            //Definição das Info brutas pegando do Data
            let filmDirector = data.director;
            let filmProducer = data.producer;
            let filmCharacters = data.characters; 
            let filmPlanets = data.planets;
            let filmSpecies = data.species;
            let filmStarships = data.starships;
            let filmVehicles = data.vehicles;
            //Fim do bloco de definições

            let divLists = document.createElement("div")
            //Cria uma div e uma UL para os personagems
            let divCharacters = document.createElement("div");
            divCharacters.setAttribute("id","characters");
            let ulCharacters = document.createElement("ul");
            ulCharacters.setAttribute("id","charactersList");
            ulCharacters.innerHTML = "<p><strong>Personagems: </strong></p>"
            //Fim do bloco de Div dos personagens

            //Cria uma div e uma UL para os planetas,
            let divPlanets = document.createElement("div");
            divPlanets.setAttribute("id", "planets");
            let ulPlanets = document.createElement("ul");
            ulPlanets.setAttribute("id", "planetsList");
            ulPlanets.innerHTML = "<p><strong>Planetas: </strong></p>"
            //Fim do bloco de Div dos planetas

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
            para.innerHTML = "<p><strong>Diretor: </strong>" + filmDirector + "</p>"; 
            para.innerHTML = para.innerHTML + "<p><strong>Produtor: </strong>" + filmProducer + "</p>";
            newDiv.appendChild(para);
            newDiv.appendChild(divCharacters);
            divCharacters.appendChild(ulCharacters);
            newDiv.appendChild(divPlanets);
            divPlanets.appendChild(ulPlanets);
            newDiv.appendChild(divSpecies);
            divSpecies.appendChild(ulSpecies);
            newDiv.appendChild(divStarships);
            divStarships.appendChild(ulStarships);
            newDiv.appendChild(divVehicles);
            divVehicles.appendChild(ulVehicles);
            //For para colocar cada membro dos personagens por nome
            for(i = 0; i < filmCharacters.length; i++){
                getFilmCharacter(filmCharacters[i]);
                
            }
            //For para colocar cada membro dos planetas por nome
            for(i = 0; i < filmPlanets.length; i++){
                getFilmPlanet(filmPlanets[i]);
                
            }
            //For para colocar cada membro dos planetas por nome
            for(i = 0; i < filmSpecies.length; i++){
                getFilmSpecie(filmSpecies[i]);
                
            }
            //For para colocar cada membro das naves por nome
            for(i = 0; i < filmStarships.length; i++){
                getFilmStarship(filmStarships[i]);
            }
            //For para colocar cada membro dos veiculos por nome
            for(i = 0; i < filmVehicles.length; i++){
                getFilmVehicle(filmVehicles[i]);
            }
            //Fim do bloco de colocação de informação
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
async function getFilmCharacter(url){
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
        let ulCharacters = document.querySelector("#charactersList");
        //Coleta o nome do personagem
        let name = data.name;
        //Coloca dentro do HTML li o nome do personagem
        liCharacters.innerHTML = name;
        //Cria um LI abaixo do ID charactersList
        ulCharacters.appendChild(liCharacters);
    }else{
        console.log("Erro no getCharacterPlanet");
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
async function getFilmSpecie(url){
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
async function getFilmData(){
    //Link basico para API enviar todos os filmes
    let url = "https://swapi.dev/api/films/";
    //Espera a resposta
    let response = await fetch(url);

    if(response.ok){
        let data = await response.json();
        for(i = 0; i < 6; i++){
            addHtmlFilm(data.results[i].title, i+1);
        }
    }else{
        console.log("Deu erro fi, esquece");
    }
}
//Começa a rodar no Load da tela
window.onload = getFilmData;
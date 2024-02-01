// ESSE CODIGO É BASICAMENTE UMA RECICLAGEM COMPLETA DOS ANTERIORES, APENAS COM LEVES ALTERAÇÕES, MAIORIA DOS NOMES E COMENTARIOS NÃO CONDIZEM, OLHE FILMES E PERSONAGES PARA COMENTARIOS EXATOS
//Funcao para adicionar o HTML com todos os filmes
function addHtmlStarship(text, num){
    //Acha a localização no HTML
    let location = document.querySelector(".species_list");
    //Cria um elemento de LI
    let newElement = document.createElement("li");
    //Seta o ID dos LI
    newElement.setAttribute("id", num);
    newElement.setAttribute("class", "especies")
    //Adiciona um evento Onclick no LI
    newElement.setAttribute("onclick", "starshipLoadInfo(this.id)");
    let h3 = document.createElement("p");
    h3.setAttribute("id", "specie");
    h3.innerHTML = text;
    //Coloca o elemento no HTML
    location.appendChild(newElement);
    newElement.appendChild(h3);
}
//Variavel para abrir e fechar as Informaçoes
let pageOn = false;
//Função para carregar as informações dos filmes individualmente, já que é chamada no onclick
function starshipLoadInfo(pos){
    //Checa se as informações já estao abertas
    if(!pageOn){
        //Cria a div para ser aberta ou fechada
        let newDiv = document.createElement("div");
        //Coloca o atributo para ela ser encontrada depois
        newDiv.setAttribute("id", "parent");
        //Função para encontrar o filme identificado por POS na lista de filmes, coloca a informação dele em "data"
        swapiModule.getSpecies(pos, function(data){
            console.log(data);
            //Acha a localização pelo ID da posição, para ser criado as informações abaixo disso
            let loc = document.getElementById(pos);
            //Cria uma div para ser colocada as informações dentro
            let para = document.createElement("div");

            //Cria uma nova div em baixo da posição Pos
            loc.appendChild(newDiv);

            //Definição das Info brutas pegando do Data
            let speciesName = data.name;
            let speciesClassification = data.classification;
            let speciesDesignation = data.designation;
            let speciesAvrg = data.average_height;
            let speciesLifespan = data.average_lifespan;
            let speciesHomeworld = data.homeworld;
            let speciesLanguage = data.language;
            let speciesPeople = data.people;
            let speciesFilms = data.films;
            //Fim do bloco de definições

            //Cria uma div e uma UL para os pilotos
            let divPeople = document.createElement("div");
            divPeople.setAttribute("id","people");
            let ulPeople = document.createElement("ul");
            ulPeople.setAttribute("id","pilotsList");
            ulPeople.innerHTML = "<p><strong>Personagems: </strong></p>"
            //Fim do bloco de Div dos pilotos

            //Cria uma div e uma UL para os filmes
            let divFilms = document.createElement("div");
            divFilms.setAttribute("id","films");
            let ulFilms = document.createElement("ul");
            ulFilms.setAttribute("id","filmsList");
            ulFilms.innerHTML = "<p><strong>Filmes: </strong></p>"
            //Fim do bloco de Div dos filmes

        
            //Bloco de real colocação das informações
            para.innerHTML = "<p><strong>Nome: </strong>" + speciesName + "</p>"; 
            para.innerHTML = para.innerHTML + "<p><strong>Classificação: </strong>" + speciesClassification + "</p>";
            para.innerHTML = para.innerHTML + "<p><strong>Designação: </strong>" + speciesDesignation + "</p>";
            para.innerHTML = para.innerHTML + "<p><strong>Tamanho médio: </strong>" + speciesAvrg + "</p>";
            para.innerHTML = para.innerHTML + "<p><strong>Espectativa de vida: </strong>" + speciesLifespan + "</p>";
            console
            swapiModule.getPlanet(pegaIDPlaneta(speciesHomeworld), function(data){
                para.innerHTML = para.innerHTML + "<p><strong>Planeta natal: </strong>" + data.name; + "</p>";
            })
            para.innerHTML = para.innerHTML + "<p><strong>Linguagem: </strong>" + speciesLanguage + "</p>";


            newDiv.appendChild(para);
            newDiv.appendChild(divPeople);
            divFilms.appendChild(ulPeople);
            newDiv.appendChild(divFilms);
            divFilms.appendChild(ulFilms);
            
            //For para colocar cada membro dos personagens por nome
            for(i = 0; i < speciesFilms.length; i++){
                getShipFilm(speciesFilms[i]);
                
            }
            for(i = 0; i < speciesPeople.length; i++){
                getShipPilot(speciesPeople[i]);
            }
            //Coloca a especie
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
async function getShipFilm(url){
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

async function getShipPilot(url){
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
        let ulCharacters = document.querySelector("#pilotsList");
        //Coleta o nome do personagem
        let name = data.name;
        //Coloca dentro do HTML li o nome do personagem
        liCharacters.innerHTML = name;
        //Cria um LI abaixo do ID charactersList
        ulCharacters.appendChild(liCharacters);
    }else{
        console.log("Erro no getShipPilot");
    }
}

//Pega a data dos filmes
async function getPeopleData(){
    //Link basico para API enviar todos os filmes
    let url = "https://swapi.dev/api/species/";
    //Espera a resposta
    let response = await fetch(url);

    if(response.ok){
        let data = await response.json();
         console.log(data);
        for(i = 0; i < 10; i++){
            pegaIDSpecie
            (data.results[i].url);
           addHtmlStarship(data.results[i].name, pegaIDSpecie(data.results[i].url));
     }
    }else{
        console.log("erro na 1 chamada");
    }

    url = "https://swapi.dev/api/species/?page=2";
    response = await fetch(url);
    
    if(response.ok){
        let data = await response.json();
         console.log(data);
         //A API por algum motivo da erro quando se solicita a pessoa numero 17, ent fiz essa especie de gambiarra para tentar evitar isso
        for(i = 0; i < 10; i++){
            if(i+11 < 17){
                addHtmlStarship(data.results[i].name, pegaIDSpecie(data.results[i].url))
         }
        }
    }else{
        console.log("erro na 2 chamada");
    }
    url = "https://swapi.dev/api/species/?page=3";
    response = await fetch(url);
    
    if(response.ok){
        let data = await response.json();
         console.log(data);
        for(i = 0; i < 10; i++){
            addHtmlStarship(data.results[i].name, pegaIDSpecie(data.results[i].url));
     }
    }else{
        console.log("erro na 3 chamada");
    }
    url = "https://swapi.dev/api/species/?page=4";
    response = await fetch(url);
    
    if(response.ok){
        let data = await response.json();
         console.log(data);
        for(i = 0; i < 7; i++){
            addHtmlStarship(data.results[i].name, pegaIDSpecie(data.results[i].url));
     }
    }else{
        console.log("erro na 4 chamada");
    }
}

function pegaIDSpecie(str){
    let id = str.substr(30,31);
    let newId = id.replace('/','');
    return Number(newId);
    
}
function pegaIDPlaneta(str){
    let id = str.substr(30,31);
    let newId = id.replace('/','');
    return Number(newId);
}
//Começa a rodar no Load da tela
window.onload = getPeopleData;
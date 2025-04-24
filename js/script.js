
 async function apiFilmes(){
    const filmes=await fetch('https://yts.mx/api/v2/list_movies.json')
    return filmes
 }
 



function pegarFilmes(){
    apiFilmes()
    .then(res => res.json())
    .then(json => {

        for (const filme of json.data.movies) {
            criarCard((filme.large_cover_image),(filme.title),(filme.year))
            console.log(filme)
        }
  
  });
}


    pegarFilmes()



function criarCard(img,titulo,data){
    const divSessaoFilmes=document.querySelector("#sessao-films")
    const divFilm=document.createElement("div")
          divFilm.classList.add("film")
    const divCapa=document.createElement("div")
          divCapa.classList.add("capa")
          divCapa.style.backgroundImage=`url(${img})`
    const divInfo=document.createElement("div")
          divInfo.classList.add("info-film")
    const tituloFilme=document.createElement("p")
          tituloFilme.innerText=titulo
    const dataFilme=document.createElement("span")
          dataFilme.innerText=data
    divInfo.appendChild(tituloFilme)
    divInfo.appendChild(dataFilme)

    divFilm.appendChild(divCapa)
    divFilm.appendChild(divInfo)
    divSessaoFilmes.appendChild(divFilm)
}


    
function pesquisaFilmes(){
    const inputValue=document.querySelector("#inputSearch").value
    const divSessaoFilmes=document.querySelector("#sessao-films")
    divSessaoFilmes.innerText=""
apiFilmes()
.then(res => res.json())
.then(json=>{
    for(const filme of json.data.movies){
        
        if((filme.title)==(inputValue) || (filme.year)==(inputValue) || (filme.genres)==(inputValue)  ){
            criarCard((filme.large_cover_image),(filme.title),(filme.year))   
            console.log("tem")
        }         

    }
   
})
 if(inputValue==""){
        divSessaoFilmes.innerText=""
        pegarFilmes(); 
        console.log("nao á nada")
    }
}
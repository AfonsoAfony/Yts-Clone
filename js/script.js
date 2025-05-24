const divSessaoFilmes=document.querySelector("#sessao-films")
const inputSearch = document.querySelector("#inputSearch")

let currentPage=1
let limit=20
 async function apiFilmes(page){
    const filmes=await fetch(`https://yts.mx/api/v2/list_movies.json?page=${page}&limit=${limit}`)
    return filmes
 }
 
console.log(apiFilmes())


function pegarFilmes(page){
    apiFilmes(page)
    .then(res => res.json())
    .then(json => {

        for (const filme of json.data.movies) {
            criarCard((filme.large_cover_image),(filme.title),(filme.year))
        }
  
  });
}

pegarFilmes(currentPage)

    //Mostrar a pág actual com base o o fetch:
document.querySelector("#actualPage").innerText=currentPage;

    //Funcão Prev and Next
    function nextPage(){
         currentPage++;
        divSessaoFilmes.innerText=""

        if (inputSearch.value!="") {
            pesquisaFilmes(currentPage)
        
            //Mostrar a pág actual com base o o fetch:
             document.querySelector("#actualPage").innerText=currentPage;
        }
        else{
            pegarFilmes(currentPage)
        
            //Mostrar a pág actual com base o o fetch:
             document.querySelector("#actualPage").innerText=currentPage;
         }
}
    function prevPage(){
        if(currentPage>1){
            currentPage--;
            if (inputSearch.value!="") {
                pesquisaFilmes(currentPage)
            
                //Mostrar a pág actual com base o o fetch:
                 document.querySelector("#actualPage").innerText=currentPage;
            }
            else{
                divSessaoFilmes.innerText=""
            pegarFilmes(currentPage)
            }
            

                //Mostrar a pág actual com base  no fetch:
                document.querySelector("#actualPage").innerText=currentPage;
        }
        
    }


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


    
function pesquisaFilmes(page){
    const inputValue= inputSearch.value
   
    divSessaoFilmes.innerText=""
apiFilmes(page)
.then(res => res.json())
.then(json=>{
    for(const filme of json.data.movies){
        
        if( (filme.title.toLowerCase()).includes(inputValue.toLowerCase()) ){
            criarCard((filme.large_cover_image),(filme.title),(filme.year))   
            console.log("tem")
        }         

    }
   
})
 if(inputValue==""){
        divSessaoFilmes.innerText=""
        pegarFilmes(currentPage)
            //Mostrar a pág actual com base o o fetch:
document.querySelector("#actualPage").innerText=currentPage;
        console.log("nao á nada")
    }
}



/*
function listItem(items, pageActual, limitItems){
    let result=[]
    
let totalPage= Math.ceil(items.length / limitItems)
let count= ( pageActual * limitItems) - limitItems
let delimiter= count + limitItems

if(pageActual>=totalPage){
    //Create Loop

    for (let i = 0; i < delimiter; i++) {
       //Insert more element in array result
       //increment +1 in variable count
       result.push(items[i])
       count++;
        
    }

}
return result
}
*/



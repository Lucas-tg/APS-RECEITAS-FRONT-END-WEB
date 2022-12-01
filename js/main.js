//Padrão para envio de Cabeçalho com FETCH
let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  mode: 'no-cors'
}

//Comum a todos os REST da seleção
let url = 'http://localhost:8090'


class CartaoReceita {
  constructor() {

  }
}

// incluir usuario
function incluirUsuario() {
  let obj = {
    cpf: cpfUsuario.value,
    nome: nomeUsuario.value
  }

  fetch(url + '/usuarios', {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    //.then((res) => res.text())
    //.then((text) => console.log(text))
    .then(listarFetch())
    .catch((err) => console.log(err.message))

}


// incluir nova receita
function incluirReceita() {
  const imgBase64 = img.replace("data:", "").replace(/^.+,/, "");
  
  //Objeto a ser convertido e enviado
  let obj = {
    nome: nomeReceita.value,
    tempoPreparo: parseFloat(tempoPreparoReceita.value),
    passos: passosReceita.value,
    ingredientes: [],
    imagem: imgBase64
  }

  let usuario = nomeUsuarioID.value;
  //console.log(usuario);

  fetch(url + '/receitas/' + usuario, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    //.then((res) => res.text())
    // .then((text) => console.log(text))
    .catch((err) => console.log(err.message))

  // document.location.reload(true)
}

// lista receita pelo nome
function getReceita() {
  let nomeReceita = nomeReceitaID.value
  //console.log(nomeReceita);

  fetch(url + '/avaliacoes/' + nomeReceita, {
    headers: headers,
    method: 'GET',
  })
    .then((res) => res.json())
    // .then((res) => console.log(res))
    .then((res) => listarReceitasNome(res))
  // .catch((err) => console.log(err.message))
  console.log('Chamada realizada')
}


function listarReceitasNome(lista) {

  let linha = ''

  for (let i = 0; i < lista.object.length; i++) {
    let nome = lista.object[i].receita.nome
    let autor = lista.object[i].receita.usuario.nome

    console.log(nome)


    linha += `

  <div class="col">
    <div class="card">
      <img src="./img/${nome}.jpeg" class="card-img-top" alt="${nome}">
      <div class="card-body">             

      <h5 class="card-title">${nome}</h5>
      <p class="card-text">Feito Por: ${autor}</p>

      </div>
    </div>
  </div>
    `
  }
  let cardzin = `
        ${linha}  
  `
  receitasId.innerHTML = cardzin

}

// lista receitas na pagina inicial
function listarFetch() {
  fetch(url + '/receitas', {
    headers: headers,
    method: 'GET',
    redirect: 'follow',
  })
    .then((res) => res.json())
    // .then((res) => console.log(res))
    .then((res) => listarReceitas(res))
  // .catch((err) => console.log(err.message))
  console.log('Chamada realizada')
}

function listarReceitas(lista) {


  // oculta descicao das Receitas
  //  addNoneDescricaoReceitasId()

  let linha = ''

  for (let i = 0; i < lista.object.length; i++) {
    let nome = lista.object[i].nome
    let autor = lista.object[i].usuario.nome

    linha += `
      <div id="${i}" class="col">
        <div class="card">
          <img src="/img/${nome}.jpeg" class="card-img-top" alt="${nome}">
          <div class="card-body">             
            <h5 class="card-title">${nome}</h5>
            <p class="card-text">Feito Por: ${autor}</p>
            <button class="btn btn-outline-success" onclick="clicaReceita(${nome})">Receita</button>
          </div>
        </div>
      </div>
      `
  }
  let cardzin = `
        ${linha}  
  `
  receitasId.innerHTML = cardzin

}

// add d-none to class tag
function addNoneReceitaId() {
  document.getElementById('receitasId').className = 'row row-cols-1 row-cols-md-2 g-4 d-none'
}

// remove d-none to class tag
function removeNoneReceitaId() {
  document.getElementById('receitasId').className = ('row row-cols-1 row-cols-md-2 g-4')
}

// add d-none to class tag
function addNoneDescricaoReceitasId() {
  document.getElementById('descricaoReceitasId').className = 'row row-cols-1 row-cols-md-2 g-4 d-none'
}

// remove d-none to class tag
function removeNoneDescricaoReceitasId() {
  document.getElementById('descricaoReceitasId').className = ('row row-cols-1 row-cols-md-2 g-4')
}


/* Esse método nao foi implementado
1- clica na receita
2- abre nova pagina com a respectiva receita com detalhes sobre ela

// adicionar tratamento de erro

adicionar rota para as paginas
http://localhost:8090/receita/0
http://localhost:8090/receita/1
...
*/


// abre mais detalhes da receita
// baseado no ID da receita
function clicaReceita(nome) {
  //console.log(id);


  fetch(`${url}/avaliacoes/${nome}`, {
    headers: headers,
    method: 'GET',
    redirect: 'follow',
  })
    .then((res) => res.json())
    //  .then((res) => console.log(res))
    .then((res) => listarUmaReceita(res))
  // .catch((err) => console.log(err.message))
  // console.log('Chamada realizada')

}

// Exibe mais detalhes sobre a receita
function listarUmaReceita(lista) {

  // oculta receitas
  addNoneReceitaId()

  console.log(lista);


  let nome = lista.object[1].receita.nome
  let autor = lista.object[1].receita.usuario.nome
  let passos = lista.object[1].receita.passos
  let tempo = lista.object[1].receita.tempoPreparo

  let modal = `
    <div class="modal-dialog">
      <div class="modal-body">
        <div class="container">
          <div class="row">
            <div class="col">
              <form>
                <div class="card mb-3">
                  <img src="./img/${nome}.jpeg" class="card-img-top" alt="imgReceita">
                  <div class="card-body">
                    <h5 class="card-title">${nome}</h5>
                    <p class="card-text">Passos: ${passos}</p>
                    <p class="card-text">Tempo de Preparo: ${tempo} minutos</p>
                    <p class="card-text"><small class="text-muted">Autor: ${autor} </small></p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  receitasId.innerHTML = modal
}

  // adiciono d-none na classe com id receitasId
  // removo o d-none da classe com id descricaoReceitasId



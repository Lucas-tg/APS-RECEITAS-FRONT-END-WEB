//Padrão para envio de Cabeçalho com FETCH
let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  mode: 'no-cors'
}

//Comum a todos os REST da seleção
let url = 'http://localhost:8090'


function incluirUsuario(){
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
    .then((text) => console.log(text))
    .then(listarFetch())
    .catch((err) => console.log(err.message))

}


function incluirReceita() {
  //Objeto a ser convertido e enviado
  let obj = {
    nome: nomeReceita.value,
    tempoPreparo: parseFloat(tempoPreparoReceita.value),
    passos: passosReceita.value,
    ingredientes: [],
  }

  let usuario = nomeUsuarioID.value;
  console.log(usuario);

  fetch(url + '/receitas/' + usuario, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    //.then((res) => res.text())
    .then((text) => console.log(text))
    .catch((err) => console.log(err.message))

   document.location.reload(true)
}

function getReceita() {
  let nomeReceita = nomeReceitaID.value
  console.log(nomeReceita);

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

function listarReceitasNome(lista){

let linha = ''

for (let i = 0; i < lista.object.length; i++) {
  let nome = lista.object[i].receita.nome
  let autor = lista.object[i].receita.usuario.nome
  
  console.log(nome)


  linha += `

  <div class="col">
    <div class="card">
      <img src="./img/bolo_chocolate.jpg" class="card-img-top" alt="bolo_chocolate">
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


function listarReceitas(lista){

let linha = ''

  for (let i = 0; i < lista.object.length; i++) {
    let nome = lista.object[i].nome
    let autor = lista.object[i].usuario.nome


    

    linha += `

  <div class="col">
    <div class="card">
      <img src="./img/bolo_chocolate.jpg" class="card-img-top" alt="bolo_chocolate">
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
let ipt_buscar = document.getElementById('ipt_buscar');
let div_usuario = document.getElementById('div_usuario');
let div_estatistica = document.getElementById('div_estatistica');
let todosUsuarios = [];
let filtroUsuarios = [];
let pessoasHtml = null;
let pessoaHtml = null;
let valorBusca = null;
let nRegistros = document.getElementById('nRegistros');
let quantSexM = document.getElementById('quantSexM');
let somaIdade = document.getElementById('somaIdade');
let mediaIdade = document.getElementById('mediaIdade');

window.addEventListener('load', () =>{

fecthUsuarios();
ipt_buscar.addEventListener('keyup',filtrar)

}); //ativa quando carregar

async function fecthUsuarios() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();

    todosUsuarios = json.results.map(itens => {
        const {id,name, picture, dob, gender} = itens;

        return {
            id: id,
            name: `${name.first} ${name.last}`,
            picture: picture.large,
            age: dob.age,
            gender: `${gender[0].toUpperCase()}`
        };
    });
    renderizar();
}; // busca API e armazena no vetor 'todos usuários'

function renderizar(){
    listarPessoas();
}//executa vários blocos

function listarPessoas(){
  pessoasHtml = "<br/><div>";
  
  todosUsuarios.sort((a,b) => {
    return a.name.localeCompare(b.name)
  }); //ordenando bloco de código

  todosUsuarios.forEach(itens =>{
    blocoHtml(itens);
  }); //listando os blocos já ordenados

  nRegistros.textContent = todosUsuarios.length;
  quantSexM.textContent = todosUsuarios.filter(itens => itens.gender[0] == "M").length;
  quantSexF.textContent = todosUsuarios.filter(itens => itens.gender[0] == "F").length;
  //somaIdade.textContent = todosUsuarios.reduce((accumulator, current) =>{
   // return accumulator + current.age
  //});
  //mediaIdade.textContent = somaIdade / todosUsuarios.length;

    pessoasHtml += '</div>'
    div_usuario.innerHTML = pessoasHtml;
}

function blocoHtml(itens){
  const { id,name, picture, age, gender } = itens;

  pessoaHtml = `
  <div class="card-panel grey lighten-5 z-depth-1">
    <div class="row valign-wrapper">
      <div class="col s2">
        <img src="${picture}" alt="${name}" class="circle responsive-img"> <!-- notice the "circle" class -->
      </div>
      <div class="col s10">
        <span class="black-text">
        <ul>
        <li>Nome:<strong> ${name}</strong></li>
        <li>Idade: <strong>${age} anos</strong></li>
        <li>Sexo: <strong>${gender}</strong></li>
    </ul>
        </span>
      </div>
    </div>
  </div>
</div>
  `;
  pessoasHtml += pessoaHtml;
}

function filtrar(event){
   valorBusca = event.target.value;


  filtroUsuarios = todosUsuarios.filter(itens => {
    return itens.name.toLowerCase().includes(valorBusca);
  });
  carregaFiltro();
  
  //div_usuario.innerHTML = ipt_buscar.value 
} // função que alimenta o vetor e depois executa carregaFiltro()

function carregaFiltro(){
  
  pessoasHtml = "<br/><div>";
  
  filtroUsuarios.sort((a,b) => {
    return a.name.localeCompare(b.name)
  }); //ordenando bloco de código

  filtroUsuarios.forEach(itens =>{
    blocoHtml(itens);
  }); //listando os blocos já ordenados

  nRegistros.textContent = filtroUsuarios.length;
  nRegistros.textContent = filtroUsuarios.length;
  quantSexM.textContent = filtroUsuarios.filter(itens => itens.gender[0] == "M").length;
  quantSexF.textContent = filtroUsuarios.filter(itens => itens.gender[0] == "F").length;
  //somaIdade.textContent = filtroUsuarios.reduce((accumulator, current) =>{
    //return accumulator + current.age
  //});
  //mediaIdade.textContent = somaIdade / todosUsuarios.length;


    pessoasHtml += '</div>'
    div_usuario.innerHTML = pessoasHtml;
}
//exibindo filtro carregado por campo de busca

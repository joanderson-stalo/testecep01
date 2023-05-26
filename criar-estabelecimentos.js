/**
 * Função que faz a consulta do endereço pelo CEP
 */

let listaCidades = [];
fetch('./cidades.json')
  .then((response) => response.json())
  .then((jsondata) => {
    listaCidades = jsondata;
    listaCidades.forEach(estado => {
        let option = document.createElement('option');
        option.value = estado.sigla;
        option.text = estado.nome;
        inputUF.add(option);
    });
  });

const inputCep = document.getElementById('client_address_cep');
const inputRua = document.getElementById('client_address');
const inputBairro = document.getElementById('client_address_neighborhood');
const inputUF = document.getElementById('client_address_state');
const inputCidade = document.getElementById('client_address_city');

inputCep.addEventListener('keyup', (event) => {
  buscarCep(event.target.value);
});

function buscarCep(value) {
  const typedValue = value.replace('.', '').replace('-', '');

  limparCampos();

  if (typedValue.length === 8) {
    fetch(`https://viacep.com.br/ws/${typedValue}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.erro) {
          inputRua.value = data.logradouro;
          inputBairro.value = data.bairro;
          inputUF.value = data.uf;
          filtrarCidades(data.uf);
          inputCidade.value = data.localidade;
        }
      });
  }
}

// caso o cep for invalido 
function limparCampos() {
  inputRua.value = '';
  inputBairro.value = '';
  inputUF.value = '';
  inputCidade.value = '';
}

function filtrarCidades(uf) {
  while (inputCidade.options.length > 1) {
    inputCidade.remove(1);
  }
  
  const estadoSelecionado = listaCidades.find((estado) => estado.sigla === uf);
  if (!estadoSelecionado) return;

  const cidadesSelecionadas = estadoSelecionado.cidades;
  cidadesSelecionadas.forEach((cidade) => {
    let option = document.createElement('option');
    option.value = cidade;
    option.text = cidade;
    inputCidade.add(option);
  });
}


// função apenas para teste te envio das informações 

function enviarDados() {
  const endereco = {
    cep: inputCep.value,
    rua: inputRua.value,
    bairro: inputBairro.value,
    estado: inputUF.value,
    cidade: inputCidade.value,
  };

  console.log('dados',endereco);
}



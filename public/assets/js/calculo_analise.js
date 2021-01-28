// Recebendo telas da página Resultado
const resultadoSolo  = document.getElementById('resultadoSolo');
const resultadoFolha = document.getElementById('resultadoFolha');

// Exibir o formulário de análise baseado no seu tipo (folha ou grão)
function exibirOcultar(event) {
	const opcao = event.target.value;
	const solo = document.getElementById('solo');
	const folha = document.getElementById('folha');

	if(opcao == "folha") {
		solo.style.display = 'none';
		folha.style.display = 'block';
	} else if (opcao == "solo"){
		solo.style.display = 'block';
		folha.style.display = 'none';
	} else {
		solo.style.display = 'none';
		folha.style.display = 'none';
	}
};

// Mostrar o resultado baseado na escolha do tipo de análise (solo ou folha)
function tipoResultado() {
	const opcao  = analise.type;
	console.log(opcao);
	
	if (opcao == "folha") {
		mostrarValorFolha();
	} else {
		mostrarValorSolo();
	}
}

// Exibir a tela de resultado de Folha
function mostrarValorFolha() {
	resultadoSolo.style.display = 'none';
	resultadoFolha.style.display = '-ms-grid';
}

// Exibir a tela de resultado de Solo
function mostrarValorSolo() {
	resultadoSolo.style.display = '-ms-grid';
	resultadoFolha.style.display = 'none';
}
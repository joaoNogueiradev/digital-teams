let teams = [];

createBtn.onclick = () => {
	modal.classList.add("active");
	overlay.classList.add("active");
};

closeBtn.onclick = () => {
	modal.classList.remove("active");
	overlay.classList.remove("active");
};

overlay.onclick = () => {
	modal.classList.remove("active");
	overlay.classList.remove("active");
};


document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		modal.classList.remove("active");
		overlay.classList.remove("active");
	}
});

modal.onsubmit = () => {
	event.preventDefault();

	if (isNaN(capacidade.value)) {
		alert("Por favor, digite um número válido para a capacidade.");
		capacidade.value = "";
		return; // Interrompe a execução do código se a entrada não for um número
	}

	let newTeamName = nome.value;

	for (let i = 0; i < teams.length; i++) {
		if (teams[i].name === newTeamName) {
			if (confirm("Já existe um time com esse nome, gostaria de repetir a criação?")) {
			} else {
				alert("Criação cancelada!");
				nome.value = '';
				return;
			}
		}
	}

	teams.push({
		name: newTeamName,
		capacity: capacidade.value,
		members: [],
	});
	
	nome.value = '';
	capacidade.value = '';

	let newTeam = ``;

	for (let i = 0; i < teams.length; i++) {
		newTeam +=`
			<li>
			<h4>${teams[i].name}<box-icon name='show'></box-icon></h4>
			<h1>0 <span>/ ${teams[i].capacity}</span></h1>
			<div class="actions">
			<button>adicionar</button>
			<button><box-icon name="trash"></box-icon></button>
			</div>
			</li>
		`;

		listTeams.innerHTML = newTeam;
	}
	
	modal.classList.remove("active");
	overlay.classList.remove("active");
};

// evento específico para form é o onsubmit
// event.preventDefault(); previne que o form procure arquivos e faça o que foi comandado na função
// `` são conhecidas na programação como template literals
// sempre que precisar de uma
// quando precisar iterar elementos (Sem usar element create e appendChild), utilizar variáveis para que o novo elemento seja colocado e usaddo em iteração

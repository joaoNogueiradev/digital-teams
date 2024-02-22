let teams = [];
let deletedTeams =  [];

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
		id:teams.length + 1,
		name: newTeamName,
		capacity: capacidade.value,
		members: [],
	});

	
	modal.classList.remove("active");
	overlay.classList.remove("active");
	
	adicionarCards();

};

listDeletedTeams.onload = () => {

}


function adicionarCards(){

	if(teams.length ===0){
		listTeams.innerHTML = `<li class="noTeam"><h4>Você ainda não criou um team :(</h4></li>`;
	} else {
		listTeams.innerHTML = '';
		for(let i = 0; i < teams.length; i++){
			listTeams.innerHTML += `
			<li>
			<h4>${teams[i].name}<box-icon name='show'></box-icon></h4>
			<h1>0 <span>/ ${teams[i].capacity}</span></h1>
			<div class="actions">
				<button>adicionar</button>
				<button id="${i}" onclick="removeTeam(${i})"><box-icon name="trash"></box-icon></button>
				</div>
				</li>
				`;
		} 	 
	}
}

function removeTeam(index) {
    let idRemovedTeam = teams[index].id;
    let nameRemovedTeam = teams[index].name;
	let capacityRemovedTeam = teams[index].capacity;
	let membersRemovedTeam = teams[index].members;

	if (confirm(`Tem certeza que gostaria de excluir o time '${nameRemovedTeam}' ?`)) {
		teams.splice(idRemovedTeam - 1);
		deletedTeams.push({
			id:idRemovedTeam,
			name: nameRemovedTeam,
			capacity: capacityRemovedTeam,
			members: membersRemovedTeam,
		});

 
	} else {
		alert("Exclusão cancelada!");
		return;
	};
	
	adicionarCards();
	addDeletedCards();
};

function addDeletedCards(){
	if(deletedTeams.length === 0){
		listDeletedTeams.innerHTML = `<li class="noTeam"><h4>Você ainda não tem times excluídos!</h4></li>`;
	} else {
		listDeletedTeams.innerHTML = '';
		for(let i = 0; i < deletedTeams.length; i++){
			listDeletedTeams.innerHTML += `
			<li class="layoutDeletedTeams">
			<h4>${deletedTeams[i].name}<box-icon name='show'></box-icon></h4>
			<h1>0 <span>/ ${deletedTeams[i].capacity}</span></h1>
			<div class="actions">
				<button>restaurar</button>
			</div>
		</li>
		`;
		} 	 
	}
}


// evento específico para form é o onsubmit
// event.preventDefault(); previne que o form procure arquivos e faça o que foi comandado na função
// `` são conhecidas na programação como template literals
// sempre que precisar de uma
// quando precisar iterar elementos (Sem usar createElement e appendChild), utilizar variáveis para que o novo elemento seja colocado e usaddo em iteração

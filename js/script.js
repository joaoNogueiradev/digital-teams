const cachedTeams = JSON.parse(window.localStorage.getItem('cachedTeams'));
const deletedCachedTeams = JSON.parse(window.localStorage.getItem('cachedDeletedItems'));

const teams = cachedTeams || [];
const deletedTeams =  deletedCachedTeams || [];

window.onload = () => {
	renderCards();
	renderDeletedCards();
}

createBtn.onclick = () => {
	modal.classList.add("active");
	overlay.classList.add("active");
};

closeBtn.onclick = () => {
	modal.classList.remove("active");
	overlay.classList.remove("active");
};

fecharParticipanteBtn.onclick = () => {
	formParticipante.classList.remove("active");
	overlay.classList.remove("active");
};

fecharMostrarMembros.onclick = () => {
	formMostrarMembros.classList.remove("active");
	overlay.classList.remove("active");	
}

overlay.onclick = () => {
	modal.classList.remove("active");
	overlay.classList.remove("active");
	formParticipante.classList.remove("active");
	formMostrarMembros.classList.remove("active");
};

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		modal.classList.remove("active");
		overlay.classList.remove("active");
		formParticipante.classList.remove("active")
		formMostrarMembros.classList.remove("active")
	}
});

formParticipante.onsubmit = (event) => {
	event.preventDefault();

	if(teams[Number(teamId.value)].members.length == teams[Number(teamId.value)].capacity){
		alert('Capacidade máxima do time alcançada!')
		nomeParticipante.value = '';
		return;
	} else {
		event.preventDefault();
		teams[Number(teamId.value)].members.push(nomeParticipante.value);
		alert("Participante inserido com sucesso!");
		formParticipante.reset();
		renderCards();
	}
}

modal.onsubmit = (event) => {
	event.preventDefault();

	if (isNaN(capacidade.value)) {
		alert("Por favor, digite um número válido para a capacidade.");
		capacidade.value = "";
		return;
	}

	if(verifyName(nome.value)){
		if(confirm("Já existe um Team com esse nome, gostaria de criar mesmo assim?")){
		} else {
			alert('Criação cancelada');
			nome.value = '';
			return;
		}
	}

	const newTeam = {
		id:teams.length + 1,
		name: nome.value,
		capacity: capacidade.value,
		members: []
	}

	teams.push(newTeam);
	window.localStorage.setItem('cachedTeams', JSON.stringify(teams))

	modal.classList.remove("active");
	overlay.classList.remove("active");

	renderCards();
	modal.reset();
};

let btnAdicionar = document.querySelector(".adicionar");


function renderCards(){
	createCard(teams)
}

function removeTeam(index) {
    let idRemovedTeam = teams[index].id;
    let nameRemovedTeam = teams[index].name;
		let capacityRemovedTeam = teams[index].capacity;
		let membersRemovedTeam = teams[index].members;

	if (confirm(`Tem certeza que gostaria de excluir o time '${nameRemovedTeam}' ?`)) {
		teams.splice(idRemovedTeam - 1,1);

		const deletedTeam = {
			id:idRemovedTeam,
			name: nameRemovedTeam,
			capacity: capacityRemovedTeam,
			members: membersRemovedTeam,
		}

		deletedTeams.push(deletedTeam);
		window.localStorage.setItem('cachedDeletedItems', JSON.stringify(deletedTeams));
	} else {
		alert("Exclusão cancelada!");
		return;
	};
	
	renderCards();
	renderDeletedCards();
};

function renderDeletedCards() {
	createDeletedCard(deletedTeams)
}

function verifyName(nome){
	let foundName = false;
	for (let i = 0; i < teams.length; i++) {
	if (teams[i].name === nome) {
			foundName = true;
			return foundName;
		}	
	}
}

function showMemberForm() { 
	overlay.classList.add("active");
	formParticipante.classList.add("active");
}

function showMembersList(index){
	overlay.classList.add("active");
	formMostrarMembros.classList.add("active");
	if(teams[index].members.length === 0){
		membersList.innerHTML = `<li>Essa equipe ainda não possui membros!<li>`
	} else {
		membersList.innerHTML = `<li>${teams[index].members}<li>`
	}
}

function restoreTeam(index){
	let idRestoredTeam = deletedTeams[index].id;
    let nameRestoredTeam = deletedTeams[index].name;
	let capacityRestoredTeam = deletedTeams[index].capacity;
	let membersRestoredTeam = deletedTeams[index].members;

	if (confirm(`Tem certeza que gostaria de restaurar o time '${nameRestoredTeam}' ?`)) {
		deletedTeams.splice(idRestoredTeam - 1,1);
		teams.push({
			id:idRestoredTeam,
			name: nameRestoredTeam,
			capacity: capacityRestoredTeam,
			members: membersRestoredTeam,
		});
	} else {
		alert("Restauração cancelada!");
		return;
	};
	
	renderCards();
	renderDeletedCards();
}

function searchTeam() {
    let lista = document.querySelectorAll('#teams ul li');
    let termoPesquisa = document.querySelector('.busca input').value.toLowerCase();

    if (termoPesquisa.length >= 1) {
        lista.forEach(item => {
            let textoItem = item.children[0].innerText.toLowerCase();
            item.classList.toggle("none", !textoItem.includes(termoPesquisa));
        });
    } else {
        lista.forEach(item => {
            item.classList.remove("none");
        });
    }
}


// evento específico para form é o onsubmit
// event.preventDefault(); previne que o form procure arquivos e faça o que foi comandado na função
// `` são conhecidas na programação como template literals
// sempre que precisar de uma
// quando precisar iterar elementos (Sem usar createElement e appendChild), utilizar variáveis para que o novo elemento seja colocado e usaddo em iteração
// ao clicar em "exibir membros", ter o campo de adicionar funçção dentro do time

function createCard(data) {
	if(data.length === 0) {
		listTeams.innerHTML = `<li class="noTeam"><h4>Você ainda não criou um team :(</h4></li>`;
	} else {
		listTeams.innerHTML = '';
		for(let i = 0; i < data.length; i++){
			listTeams.innerHTML += `
			<li>
			<h4>${data[i].name}<box-icon name='show' onclick="showMembersList(${i})"></box-icon></h4>
			<h1>${data[i].members.length} <span>/ ${data[i].capacity}</span></h1>
			<div class="actions">
				<button onclick="showMemberForm(${i})">adicionar</button>
				<button onclick="removeTeam(${i})"><box-icon name="trash"></box-icon></button>
				</div>
				</li>
				`;
		} 	 
	}
}

function createDeletedCard(data) {
	if(data.length === 0){
		listDeletedTeams.innerHTML = `<li class="noTeam"><h4>Você ainda não tem times excluídos!</h4></li>`;
	} else {
		listDeletedTeams.innerHTML = '';
		for(let i = 0; i < data.length; i++){
			listDeletedTeams.innerHTML += `
			<li class="layoutDeletedTeams">
			<h4>${data[i].name}<box-icon name='show'></box-icon></h4>
			<h1>${data[i].members.length} <span>/ ${data[i].capacity}</span></h1>
			<div class="actions">
				<button onclick="restoreTeam(${i})">restaurar</button>
			</div>
		</li>
		`;
		} 	 
	}
}
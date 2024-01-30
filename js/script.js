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

// fechanddo modal no Esc com função callback
// document.addEventListener("keydown", (event) => {
// 	if (event.key === "Escape") {
// 		modal.classList.remove("active");
// 		overlay.classList.remove("active");
// 	}
// });

document.addEventListener("keydown", function (event) {
	if (event.key === "Escape") {
		modal.classList.remove("active");
		overlay.classList.remove("active");
	}
});

modal.onsubmit = () => {
	event.preventDefault();

	let nomeTeam = nome.value;
	let capacidadeTeam = Number(capacidade.value);

	if (isNaN(capacidadeTeam)) {
		alert("Por favor, digite um número válido para a capacidade.");
		capacidade.value = "";
		return; // Interrompe a execução do código se a entrada não for um número
	}

	listTeams.innerHTML = "";
	listTeams.innerHTML = `
        <li>
            <h4>${nomeTeam}<box-icon name='show'></box-icon></h4>
            <h1>0 <span>/ ${capacidadeTeam}</span></h1>
            <div class="actions">
                <button>adicionar</button>
                <button><box-icon name="trash"></box-icon></button>
            </div>
        </li>
    `;
	modal.classList.remove("active");
	overlay.classList.remove("active");
};

// Evento específico para form = onsubmit
// event.preventDefault(); previne que o form procure arquivos e restringe o mesmo para que faça o que foi comandado na função sem interrupções.

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


document.addEventListener("keydown", function(event) {
	if (event.key === "Escape") {
		modal.classList.remove("active");
		overlay.classList.remove("active");
	}
});

modal.onsubmit = () => {
    event.preventDefault();
    
    let capacidadeNumber = Number(capacidade.value);

    if(isNaN(capacidadeTeam)){
        alert("Favor inserir uma quantidade válida:");
        capacidade.value="";
        return;
    }

    listTeams.innerHTML = '';
    listTeams.innerHTML = `
        <li>
            <h4>${nome.value}<box-icon name='show'></box-icon></h4>
            <h1>0 <span>/ ${capacidadeNumber}</span></h1>
            <div class="actions">
                <button>adicionar</button>
                <button><box-icon name="trash"></box-icon></button>
            </div>
        </li>
    `;
    modal.classList.remove("active");
    overlay.classList.remove("active");
}


// evento específico para form é o onsubmit
// event.preventDefault(); previne que o form procure arquivos e faça o que foi comandado na função
// `` são conhecidas na programação como template literals
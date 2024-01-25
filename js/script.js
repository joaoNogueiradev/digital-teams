createBtn.onclick = () => {
    modal.classList.add("active"); 
    overlay.classList.add("active");
}

closeBtn.onclick = () => {
    modal.classList.remove("active"); 
    overlay.classList.remove("active");
}
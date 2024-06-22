function showSpinner() {
    const spinner = document.querySelector('#spinner');
    if (spinner) {
        spinner.style.display = "block";
    }
}

function hideSpinner() {
    const spinner = document.querySelector('#spinner');
    if (spinner) {
        spinner.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function() {
   showSpinner();
});




export { hideSpinner, showSpinner };
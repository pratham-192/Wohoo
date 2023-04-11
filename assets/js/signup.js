let clickedname = false, clickedemail = false;
function putname(input) {
    if (clickedname) return;
    input.value = input.placeholder;
    clickedname = true;
}
function putemail(input) {
    if (clickedemail) return;
    input.value = input.placeholder;
    clickedemail = true;
}

function validateEmail(email) {
    // Regex pattern for a valid Google email ID
    const pattern = /^\w+([\.-]?\w+)*@gmail\.com$/;

    // Check if the email matches the pattern
    if (pattern.test(email)) {
        return true;
    } else {
        return false;
    }
}

function validateForm(event) {
    // Get the email input element
    const emailInput = document.getElementById("email");

    // Check if the email is valid
    if (!validateEmail(emailInput.value)) {
        // Display an error message
        alert("Please enter a valid Google email address.");
        // Prevent the form from being submitted
        event.preventDefault();
    }
}
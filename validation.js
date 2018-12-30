const validationState = new Set();

function manageState() {
    
}

// The function submits the form
function submitForm() {
    const submitButton = document.getElementsByClassName('js-submit-user')[0];
    submitButton.addEventListener('click', function() {
        validateState();
    });
}
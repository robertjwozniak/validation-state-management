const validationState = new Set();
const loginForm = document.getElementsByClassName('form-1')[0];


function validationRules() {
    return {
        username: (inputProps) => {
            const usernameValidationRule = /[A-Za-z0-9]{6,}/;
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = usernameValidationRule.test(inputValue);

            if(isInputValid) {

                manageState().removeFromState(inputName);
            }
        },

        password: (inputProps) => {

        }
    }
}

function validateForm(inputProps) {
    const inputName = inputProps.name;
    const verifyInputName = {
        'username': validationRules().username,
        'password': validationRules().password
    };

    return verifyInputName[inputName](inputProps)
}

function manageState() {
    return {
        addToState: () => {

        },
        removeFromState: () => {

        },
        validateState: () => {

        }
    }
};

function attachKeyUpEvent() {
    loginForm.addEventListener('keyup', function(event) {
        const nodeName = event.target.nodeName;
        const inputProps = event.target;

        if(nodeName === 'INPUT') {
            validateForm(inputProps);
        }
    });
}

// The function submits the form
function submitForm() {
    const submitButton = document.getElementsByClassName('js-submit-user')[0];
    submitButton.addEventListener('click', function() {
        manageState().validateState();
    });
}

function init() {
    attachChangeEvent();
}

document.addEventListener('DOMContentLoaded', init);
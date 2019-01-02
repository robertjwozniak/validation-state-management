const validationState = new Set();
const loginForm = document.getElementsByClassName('form-1')[0];

function manipulateValidationMsg(validationData) {
    const { inputProps, action } = validationData;
    const elementValidationMsg = inputProps.nextElementSibling;
    const validationMsgClasses = elementValidationMsg.classList;
    const removeClass = () => {
        validationMsgClasses.remove('hide');
    };

    const addClass = () => {
        validationMsgClasses.add('hide');
    };

    return action === 'addClass' ? addClass() : removeClass();
}


function validationRules() {
    return {
        username: (inputProps) => {
            const usernameValidationRule = /[A-Za-z0-9]{6,}/;
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = usernameValidationRule.test(inputValue);

            isInputValid ? manageState().removeFromState({inputProps, inputName}) : manageState().addToState({inputProps, inputName});

            return true;
        },

        password: (inputProps) => {
            const passwordValidationRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/g;
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = passwordValidationRule.test(inputValue);

            isInputValid ? manageState().removeFromState({inputProps, inputName}) : manageState().addToState({inputProps, inputName});

            return true;
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
        addToState: (inputData) => {
            const action = 'removeClass';
            const { inputProps, inputName } = inputData;
            validationState.add(inputName);
            manipulateValidationMsg({ inputProps, action });
        },
        removeFromState: (inputData) => {
            const action = 'addClass';
            const { inputProps, inputName } = inputData;
            validationState.delete(inputName);
            manipulateValidationMsg({ inputProps, action})
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
    attachKeyUpEvent();
}

document.addEventListener('DOMContentLoaded', init);
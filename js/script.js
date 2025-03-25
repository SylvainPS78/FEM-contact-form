const submitButton = document.getElementById("submit-button");
const radioElements = document.querySelectorAll(".radioElement");
const confirmationMessage = document.getElementById("confirmationMessage");
let isError = false;

const resetErrors = () => {
    const allInputs = document.querySelectorAll("input");
    const textArea = document.querySelector("textarea");
    const errorMessages = document.querySelectorAll(".error-message");
    isError = false;

    errorMessages.forEach(message => {
        message.style.visibility = "hidden";
    })
    allInputs.forEach(input => {
        input.style.border = "1px solid var(--text-grey)";
        input.removeAttribute("aria-invalid");
    })
    textArea.style.border = "1px solid var(--text-grey)";
    textArea.removeAttribute("aria-invalid");
    radioElements.forEach(radioInput => {
        radioInput.style.border = "1px solid var(--text-grey)"});
}

const errorMessageDisplay = () => {
    const textEmailInput = document.querySelectorAll('input[type="text"], input[type="email"]');
    const queryTypeSelected = document.querySelector("input[name='queryType']:checked");
    const consentBoxSelected = document.querySelector("input[name='consent']:checked");
    const textArea = document.querySelector("textarea");

    textEmailInput.forEach(input => {
        const inputName = input.name;
        const errorMessageElement = document.getElementById(`${inputName}-error`);
        
        if (!input.value) {

            errorMessageElement.textContent = `This field is required`;
            errorMessageElement.style.visibility = "visible";
            input.style.border = "1px solid var(--color-error)";
            input.setAttribute("aria-invalid", "true");
            isError = true;
        }
        else if (!input.checkValidity()) {
            let errorMessage;
            switch(inputName) {
                case "email":
                    errorMessage = 'Please enter a valid email address';
                    break;
                case 'firstName':
                    errorMessage = 'Please enter a valid first name';
                    break;
                case 'lastName':
                    errorMessage = 'Please enter a valid last name';
                    break;
                default:
                    errorMessage = 'Please enter a valid input';
            }
            errorMessageElement.textContent = errorMessage;
            errorMessageElement.style.visibility = "visible";
            input.style.border = "1px solid var(--color-error)";
            input.setAttribute("aria-invalid", "true");
            isError = true;
        }
    });

    if (!queryTypeSelected) {
        document.getElementById(`queryType-error`).textContent = "Please select a query type";
        document.getElementById(`queryType-error`).style.visibility = "visible";
        radioElements.forEach((radioInput) => {
            radioInput.style.border = "1px solid var(--color-error)";
            isError = true;
        });
    }

    if (!consentBoxSelected) {
        document.getElementById(`consent-error`).textContent = "To submit this form, please consent to be contacted";
        document.getElementById(`consent-error`).style.visibility = "visible";
        document.querySelector("#consent").style.border = "1px solid var(--color-error)";
        document.querySelector("#consent").setAttribute("aria-invalid", "true");
        isError = true;
    }

    if (!textArea.value) {
        document.getElementById("message-error").textContent = "This field is required";
        document.getElementById("message-error").style.visibility = "visible";
        textArea.style.border = "1px solid var(--color-error)";
        textArea.setAttribute("aria-invalid", "true");
        isError = true;
    }
}

const displayConfirmationMessage = () => {
    if (!isError) {
        confirmationMessage.style.display = "grid";
    }
}

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    resetErrors();
    errorMessageDisplay();
    displayConfirmationMessage();
});





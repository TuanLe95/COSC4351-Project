function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const admin_Login = document.querySelector("#admin_Login");
    const admin_CreateAccount = document.querySelector("#admin_CreateAccount");

    document.querySelector("#linkadmin_CreateAccount").addEventListener("click", e => {
        e.preventDefault();
        admin_Login.classList.add("form--hidden");
        admin_CreateAccount.classList.remove("form--hidden");

    });

    document.querySelector("#linkadmin_Login").addEventListener("click", e => {
        e.preventDefault();
        admin_Login.classList.remove("form--hidden");
        admin_CreateAccount.classList.add("form--hidden");

    });

    admin_Login.addEventListener("submit", e => {
        e.preventDefault();

        //Perform your ajax/fetch login??
        setFormMessage(admin_Login, "error", "Invalid Email/ Password")
        //setFormMessage(loginForm, "success", "You've now been logged in");
    });

});
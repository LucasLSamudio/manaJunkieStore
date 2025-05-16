const errorFrase = (e) => document.getElementById(e);

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function validarPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/;
    return regex.test(password);
}

const formLogin = document.getElementById('idFormUserLogin');

const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
// const inputIcon = document.getElementById('input-icon');

inputEmail.addEventListener('focus' , function() {
    const inputIcon = this.nextElementSibling;
            inputIcon.classList.remove('icon-visible');
})

inputEmail.addEventListener('blur' , function() {
    const inputIcon = this.nextElementSibling;
    switch (true) {
        case this.value.length < 1:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            inputIcon.classList.add('icon-visible');

            errorFrase('error-email').innerHTML = 'El email no debe estar vacío.';
            break;

        case !validarEmail(this.value):
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            inputIcon.classList.add('icon-visible');

            errorFrase('error-email').innerHTML = 'Debe ingresar un email válido.';
            break;

        // default:
        //     this.classList.remove('is-invalid');
        //     this.classList.add('is-valid');
        //     inputIcon.classList.remove('icon-visible');

        //     errorFrase('error-email').innerHTML = null;
        //     break;
    }
})  

inputPassword.addEventListener('focus' , function() {
    const inputIcon = this.nextElementSibling;
            inputIcon.classList.remove('icon-visible');
})

inputPassword.addEventListener('blur' , function() {
    const inputIcon = this.nextElementSibling;
    switch (true) {
        case this.value.length < 3:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            inputIcon.classList.add('icon-visible');
            errorFrase('error-password').innerHTML = 'La contraseña debe tener al menos 8 caracteres';
            break;

        case this.value.length > 20:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            inputIcon.classList.add('icon-visible');
            errorFrase('error-password').innerHTML = 'La contraseña debe tener menos de 20 caracteres';
            break;

        // case !validarPassword(this.value):
        //     this.classList.remove('is-valid');
        //     this.classList.add('is-invalid');
        //     inputIcon.classList.add('icon-visible');
        //     errorFrase('error-password').innerHTML = 'La contraseña debe tener al menos \nuna letra minúscula, una mayúscula y un carácter especial.';
        //     break;

        // default:
        //     this.classList.remove('is-invalid');
        //     this.classList.add('is-valid');
        //     inputIcon.classList.remove('icon-visible');
        //     errorFrase('error-password').innerHTML = null;
        //     const pass = this.value
        //     break;
    }

});
formLogin.addEventListener('submit', function (event) {
    let errors = false;
    const elementForm = this.elements;
    for (let i = 0; i < elementForm.length; i++) {
        const el = elementForm[i];
        if (el.type !== 'submit' && (el.value.trim() === '' || el.classList.contains('is-invalid'))) {
            errors = true;
            break;
        }
    }

    if (errors){
        event.preventDefault();
        errorFrase('errorForm').innerHTML = 'Por favor, corrige los errores antes de enviar el formulario.';
        }}
);
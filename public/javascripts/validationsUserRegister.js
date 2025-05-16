const errorFrase = (e) => document.getElementById(e);

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function validarPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/;
    return regex.test(password);
}
function esTelefonoValido(numero) {
    const regex = /^\d{10}$/;
    return regex.test(numero);
}

const formCrear = document.getElementById('idFormUserRegister');
const inputFirstName = document.getElementById('firstName');
const inputLastName = document.getElementById('lastName');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputPassword2 = document.getElementById('password2');
const inputPhone = document.getElementById('phone');

inputFirstName.addEventListener('blur' , function() {
    switch (true) {
        case this.value.length < 1:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-firstName').innerHTML = 'El nombre no puede estar vacío.';
            break;

        case this.value.length < 2:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-firstName').innerHTML = 'El nombre debe tener al menos 2 carácteres.';
            break;

        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFrase('error-firstName').innerHTML = null;
            break;
    }
})

inputLastName.addEventListener('blur' , function() {
    switch (true) {
        case this.value.length < 1:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-lastName').innerHTML = 'El apellido no puede estar vacío';
            break;

        case this.value.length < 2:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-lastName').innerHTML = 'El apellido debe tener al menos 2 carácteres.';
            break;

        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFrase('error-lastName').innerHTML = null;
            break;
    }

})

inputEmail.addEventListener('blur' , function() {
    switch (true) {
        case this.value.length < 1:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-email').innerHTML = 'El email no debe estar vacío.';
            break;

        case !validarEmail(this.value):
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-email').innerHTML = 'Debe ingresar un email válido.';
            break;

        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFrase('error-email').innerHTML = null;
            break;
    }
})  

inputPassword.addEventListener('blur' , function() {
    switch (true) {
        case this.value.length < 8:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-password').innerHTML = 'La contraseña debe tener al menos 8 caracteres';
            break;

        case this.value.length > 20:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-password').innerHTML = 'La contraseña debe tener menos de 20 caracteres';
            break;

        case !validarPassword(this.value):
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-password').innerHTML = 'La contraseña debe tener al menos \nuna letra minúscula, una mayúscula y un carácter especial.';
            break;

        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFrase('error-password').innerHTML = null;
            const pass = this.value
            break;
    }
})

inputPassword2.addEventListener('blur' , function() {
    switch (true) {
        case this.value.length < 8:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-password2').innerHTML = 'La contraseña debe tener al menos 8 caracteres';
            break;

        case this.value.length > 20:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-password2').innerHTML = 'La contraseña debe tener menos de 20 caracteres';
            break;

        case !validarPassword(this.value):
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-password2').innerHTML = 'La contraseña debe tener al menos \nuna letra minúscula, una mayúscula y un carácter especial.';
            break;

        case inputPassword.value != this.value:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-password2').innerHTML = 'Las contraseñas no coinciden.';
            break;
        
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFrase('error-password2').innerHTML = null;
            break;
    }
})

inputPhone.addEventListener('blur', function () {
    const valor = this.value.trim();

    if (valor === '') {
        // campo vacío, lo consideramos válido (si eso está permitido)
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        errorFrase('error-phone').innerHTML = null;
        return;
    }

    if (esTelefonoValido(valor)) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        errorFrase('error-phone').innerHTML = null;
    } else {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
        errorFrase('error-phone').innerHTML = 'El número de teléfono debe tener 10 dígitos numéricos, sin letras ni símbolos.';
    }
});

formCrear.addEventListener('submit', function (event) {
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
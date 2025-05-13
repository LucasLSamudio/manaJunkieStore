const errorFrase = (e) => document.getElementById(e);


const formCrear = document.getElementById('idFormAddProduct');
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const selectedCategory = document.getElementById('category');
const textAreaDescription = document.getElementById('description');
const inputImage = document.getElementById('productImage');
const inputDiscount = document.getElementById('discount');

inputName.addEventListener('blur' , function() {
    switch (true) {
        case this.value.length < 5:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-name').innerHTML = 'Tangamandapio';
            break;
        case this.value.length > 100:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-name').innerHTML = 'El nombre debe tener menos de 100 caracteres';
            break;
    
        default:

            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFrase('error-name').innerHTML = null;
            break;
    }

})
inputPrice.addEventListener('blur' , function() {
    switch (true) {
        case this.value.length < 1:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-price').innerHTML = 'El precio no puede estar vacío';
            break;
        case this.value.length < 3:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-price').innerHTML = 'El precio debe ser de un mínimo de $100.';
            break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFrase('error-price').innerHTML = null;
            break;
    }

})

inputDiscount.addEventListener('blur' , function() {
    const value = parseFloat(this.value)
    switch (true) {
        case this.value < 0:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-discount').innerHTML = 'El descuento no puede ser negativo.';
            break;
        case this.value > 90:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-discount').innerHTML = 'El descuento no puede superar el 90%.';
            break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFrase('error-discount').innerHTML = null;
            break;
    }
})  

textAreaDescription.addEventListener('blur' , function() {
    switch (true) {
        case this.value.length < 20:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-description').innerHTML = 'La descripción debe tener al menos 20 caracteres';
            break;
        case this.value.length > 500:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-description').innerHTML = 'La descripción debe tener menos de 500 caracteres';
            break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFrase('error-description').innerHTML = null;
            break;
    }

})
selectedCategory.addEventListener('blur' , function() {
    switch (true) {
        case this.value.length < 1:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-category').innerHTML = 'La categoría no puede estar vacía';
            break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFrase('error-category').innerHTML = null;
            break;
    }

})

inputImage.addEventListener('blur' , function() {
    switch (true) {
        case this.value.length < 2:
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            errorFrase('error-image').innerHTML = 'La imagen no puede estar vacía';
            break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorFrase('error-image').innerHTML = null;
            break;
    }

})

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
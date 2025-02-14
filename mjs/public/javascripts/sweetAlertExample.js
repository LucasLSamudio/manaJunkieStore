(async () => {
    const {value: rol} = await Swal.fire({
        title: '¡Bienvenido al panel de control de administrador!',
        text: 'Puedes agregar, editar y borrar productos.',
        // icon: 'success',
        // width: '60%',
        confirmButtonText: '¡De acuerdo!',
        // background: '#bf930d',
        // grow: 'column', // row || fullscreen || column (Grow solo funciona sin width.)
        // timer: 5000,
        // timerProgressBar: true,
        // toast: true,
        position: 'center',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: true,
        stopKeydownPropagation: false,
    
        // input: "text",
        // inputPlaceholder: "Tremendo mi panamera" ,
        
        input: "select",
        inputPlaceholder: "Rol",
        inputValue: "",
        inputOptions: {
            admin: 'Administrador',
            vendedor: 'Vendedor',
            comprador: 'Comprador',
            visit: 'Visitante'
        },

        // Boton cancelar
        showCancelButton: true,
        cancelButtonText: 'Borrar',
        cancelButtonColor: 'red',
        cancelButtonAriaLabel: 'Borrar'
    })
    
    if(rol){
        Swal.fire({
            title: `Seleccionaste ${rol}`
        })
    }

})();    







            // Propiedades

// title:
// text:
// html:
// icon:
// confirmButtonText:
// footer:
// width:
// padding:
// background:
// grow:
// backdrop:
// timer:
// timerProgressBar:
// toast:
// position:
// allowOutsideClick:
// allowEscapeKey:
// allowEnterKey:
// stopKeydownPropagation:

// input:
// inputPlaceholder:
// inputValue:
// inputOptions:

//  customClass:
// 	container:
// 	popup:
// 	header:
// 	title:
// 	closeButton:
// 	icon:
// 	image:
// 	content:
// 	input:
// 	actions:
// 	confirmButton:
// 	cancelButton:
// 	footer:	

// showConfirmButton:
// confirmButtonColor:
// confirmButtonAriaLabel:

// showCancelButton:
// cancelButtonText:
// cancelButtonColor:
// cancelButtonAriaLabel:

// buttonsStyling:
// showCloseButton:
// closeButtonAriaLabel:


// imageUrl:
// imageWidth:
// imageHeight:
// imageAlt:
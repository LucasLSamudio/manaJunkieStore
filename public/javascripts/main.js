$(document).on('click', '#btn-normal', function () {
    alert('si');
});

$(document).on('click', '#btn-guardar', function () {
    Swal.fire({
        title: "Producto guardado!",
        html: "Cerrando en <b></b> milisegundos.",
        icon: "success",
        position: "top-end", // Ubicación de la alerta
        showConfirmButton: false, // No muestra el botón "OK"
        timer: 900, // Tiempo en milisegundos
        timerProgressBar: true, // Barra de progreso
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            let timerInterval = setInterval(() => {
                if (timer) {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then(() => {
        // Aquí continúa el proceso después de la alerta
        console.log("La alerta ha cerrado, continuando proceso...");
    });

});

$(document).on('click', '#btn-eliminar', function () {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Los cambios son irreversibles!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Si, borrar!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Eliminado!",
                text: "El producto ha sido eliminado.",
                icon: "success"
            });
        }
    });
});

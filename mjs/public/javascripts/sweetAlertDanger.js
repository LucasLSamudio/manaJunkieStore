document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".borrarProd").forEach(button => {
        button.addEventListener("click", function () {
            let productId = this.getAttribute("data-id");
            let productName = this.getAttribute("data-name")
            let form = this.closest("td").querySelector(".delete-form");

            Swal.fire({
                title: `¿Estás seguro de borrar ${productName}?`,
                text: "Esta acción no se puede revertir.",
                icon: "warning",
                background: "#bcac79",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, borrar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    form.submit();
                }
            });
        });
    });
});
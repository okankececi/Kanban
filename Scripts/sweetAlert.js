document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('myForm').addEventListener('submit', function (e) {
        e.preventDefault();
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
            confirmButtonColor: '#28a745'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Saved!",
                    icon: "success",
                    timer: 1000, // Mesaj 2 saniye boyunca gösterilecek
                    timerProgressBar: true // Süre çubuğu göster
                }).then(() => {
                    this.submit(); // Timer bitince form gönderimi gerçekleştir
                });
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    });
});

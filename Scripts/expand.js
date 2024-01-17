// Tüm genişletilebilir satırları ve genişletme butonlarını seç
var expandButtons = document.querySelectorAll('.expand-button');
var expandableRows = document.querySelectorAll('.expandable-row');

expandButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
        // Önce tüm satırları kapat
        expandableRows.forEach(function (row, rowIndex) {
            if (rowIndex !== index) {
                row.style.display = 'none';
            }
        });

        // Ardından tıklanan satırı aç/kapat
        var row = expandableRows[index];
        if (row.style.display === 'none' || row.style.display === '') {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
});


var inputs = document.querySelectorAll('.editable-input');

inputs.forEach(function (input) {
    var originalValue = ''; // Değişiklikleri kontrol etmek için orijinal değer

    // Çift tıklama işlevi
    input.addEventListener('dblclick', function () {
        this.disabled = false;
        this.focus(); // Otomatik odaklanma
        originalValue = this.value; // Çift tıklamadan önceki orijinal değer
    });

    // Enter tuşu işlevi
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            this.disabled = true; // Enter'a basıldığında pasif yap
            var inputValue = this.value;
            var inputId = this.getAttribute('id'); // Alanın kimliğini al

            // Değerin değişip değişmediğini veya boş olup olmadığını kontrol edin
            if (inputValue !== originalValue && inputValue.trim() !== '') {
                // Değer değişti ve boş değil, işlem yapabilirsiniz.

                // İsteğe bağlı olarak, belirli bir koşula göre özel bir değeri ayarlayabilirsiniz.
                // Örnek: Eğer inputValue 1 ise, özel bir değer yazdır.
                var customValue = inputValue === '1' ? 'Özel Değer' : inputValue;

                console.log("Input ID: " + inputId);
                console.log("Değer alındı: " + customValue);
            } else {
                // Değer değişmedi veya boş, işlem yapmayın.
            }

            e.preventDefault(); // Enter tuşunun varsayılan işlevini engelle
        }
    });

    // İnput dışına tıklanıldığında pasif yap ve değeri al
    document.addEventListener('click', function (e) {
        if (input !== e.target) {
            input.disabled = true;
            var inputValue = input.value;
            console.log("Değer alındı: " + inputValue);
        }
    });
});
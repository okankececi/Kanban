const calendarBody = document.getElementById("calendar-body");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const currentMonthSpan = document.getElementById("current-month");

let currentDate = new Date();

function selectDate(selectedDate) {
    // Seçilen tarihe ait verilere yönlendirme işlemini burada gerçekleştirin.
    // Örneğin, window.location.href ile ilgili sayfaya yönlendirebilirsiniz.
    // Örnek: window.location.href = "/veriler?date=" + selectedDate;
}

function createCalendar() {
    calendarBody.innerHTML = "";

    const startDate = new Date(currentDate);
    startDate.setDate(1); // Ayın başlangıç günü
    startDate.setHours(0, 0, 0, 0); // Saat, dakika, saniye ve milisaniye sıfırlama

    // Pazartesi gününden başlayarak 6 haftalık bir takvim oluşturun
    for (let week = 0; week < 5; week++) {
        const row = document.createElement("tr");

        for (let day = 0; day < 7; day++) {
            const cell = document.createElement("td");
            const button = document.createElement("button");
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + (week * 7) + day);
            const options = { weekday: 'short', day: 'numeric' };
            const formattedDate = currentDate.toLocaleDateString('tr-TR', options);

            button.textContent = formattedDate;
            button.className = "date-button";

            // Eğer tarih, seçilen ayın günlerine ait değilse gri yap
            if (currentDate.getMonth() !== currentDate.getMonth()) {
                button.classList.add("disabled-date");
            }

            button.addEventListener("click", () => {
                // currentDate'i bir kopyasını alarak üzerinde değişiklik yapmak daha güvenlidir
                const nextDay = new Date(currentDate);

                // currentDate'e 1 gün ekleyin
                nextDay.setDate(nextDay.getDate() + 1);

                // Seçilen tarihi selectDate fonksiyonuna gönderin
                selectDate(nextDay.toISOString().split('T')[0]);
            });

            cell.appendChild(button);
            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }

    // Ay ve yıl bilgisini güncelle
    const monthOptions = { month: 'long', year: 'numeric' };
    currentMonthSpan.textContent = currentDate.toLocaleDateString('tr-TR', monthOptions);
}

prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    createCalendar();
});

nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    createCalendar();
});

createCalendar();

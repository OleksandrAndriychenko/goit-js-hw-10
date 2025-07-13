import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
let userSelectedDate
let chosenDate
const startBtn = document.querySelector("[data-start]");
const newDay = document.querySelector("[data-days]");
const newHour = document.querySelector("[data-hours]");
const newMinute = document.querySelector("[data-minutes]");
const newSecond = document.querySelector("[data-seconds]");
startBtn.disabled = true;
const newInput = document.querySelector("#datetime-picker");
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        startBtn.disabled = true;
        const now = new Date();
        chosenDate = new Date(selectedDates[0]);
        if (chosenDate < now) {
            startBtn.disabled = true;
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
                backgroundColor: "#ef4040",
                titleColor: "#fff",
                messageColor: "#fff",
            });
        } else {
            startBtn.disabled = false;
        }
    },
};
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}
const fp = flatpickr("#datetime-picker", options);
startBtn.addEventListener("click", () => {
    newInput.disabled = true;
    startBtn.disabled = true;
    let intervalId = setInterval(() => {
        const now = new Date();
        const diff = chosenDate.getTime() - now.getTime();
        if (diff <= 0) {
        clearInterval(intervalId);
        newDay.textContent = "00";
        newHour.textContent = "00";
        newMinute.textContent = "00";
        newSecond.textContent = "00";
        return;
        }
        const newDiff = convertMs(diff)
        newDay.textContent = String(newDiff.days).padStart(2, "0");
        newHour.textContent = String(newDiff.hours).padStart(2, "0");
        newMinute.textContent = String(newDiff.minutes).padStart(2, "0");
        newSecond.textContent = String(newDiff.seconds).padStart(2, "0");
    }, 1000);
});

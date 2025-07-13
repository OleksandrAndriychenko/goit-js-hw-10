import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector(".form");
form.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const delay = parseInt(formData.get('delay'), 10);
    const status = formData.get('state');
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
    promise
        .then(ms => iziToast.success({
            title: '',
            message: `Fulfilled promise in ${delay}ms`,
            position: 'topRight',
        }))
        .catch(ms => iziToast.error({
            title: '',
            message: `Rejected promise in ${delay}ms`,
            position: 'topRight',
            backgroundColor: "#ef4040",
            titleColor: "#fff",
            messageColor: "#fff",
        }))
    
})

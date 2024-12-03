const toastContainer = document.getElementById("toastContainer");
let currentToasts = [];

function Update() {
    fetch('index.php')
        .then(response => response.json())
        .then(toasts => {
            console.log(toasts);
            if (JSON.stringify(toasts) !== JSON.stringify(currentToasts)) {
                currentToasts = toasts;
                toastContainer.innerHTML = '';

                for (let i = 0; i < toasts.length; i++) {
                    toastContainer.innerHTML += `<div class="toast"><div class="sender">${toasts[i].sender}</div>
                    <div class="message">${toasts[i].message}</div></div>`;
                }

                while (toastContainer.children.length > 5) {
                    toastContainer.removeChild(toastContainer.firstElementChild);
                }
            }
        })
        .catch(error => console.error('Error loading objects:', error));
}

setInterval(Update, 1000);

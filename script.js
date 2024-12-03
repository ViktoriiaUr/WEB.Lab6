document.getElementById("toastForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const senderName = document.getElementById("senderInput").value;
    const toastMessage = document.getElementById("messageInput").value;

    const toastData = {
        sender: senderName,
        message: toastMessage,
    };

    fetch('index.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(toastData),
    })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            document.getElementById("senderInput").value = '';
            document.getElementById("messageInput").value = '';
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function clearToasts() {
    fetch('index.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

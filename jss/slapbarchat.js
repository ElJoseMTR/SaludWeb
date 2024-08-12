document.addEventListener("DOMContentLoaded", function() {
    const notificationButton = document.getElementById("notification-button");
    const notificationBar = document.getElementById("notification-bar");

    notificationButton.addEventListener("click", function() {
        if (notificationBar.style.display === "none" || notificationBar.style.display === "") {
            notificationBar.style.display = "block";
        } else {
            notificationBar.style.display = "none";
        }
    });

    // Cerrar el slide bar cuando se hace clic fuera de él
    window.addEventListener("click", function(event) {
        if (!notificationButton.contains(event.target) && !notificationBar.contains(event.target)) {
            notificationBar.style.display = "none";
        }
    });
});
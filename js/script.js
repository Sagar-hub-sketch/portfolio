// Basic client-side form feedback
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById("formStatus").innerText =
        "Thank you for your message!";
      form.reset();
    });
  }
});

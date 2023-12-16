// Get references to important DOM elements
const contactForm = body.querySelector("form");
const submitButton = contactForm.querySelector("button");
const navAnchors = header.querySelectorAll(".header__nav_anchor");
const mobileNavAnchor = mobileHeader.querySelectorAll(".header__nav_anchor");

// Function to smoothly scroll to a target element
function smoothScrollTo(targetId) {
  const targetElement = body.querySelector(targetId);

  // Check if the target element exists
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Add click event listeners to navigation anchors
navAnchors.forEach((link, index) => {
  // Check if it's one of the first three or the last anchor
  if (index <= 3 || index === navAnchors.length - 1) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      smoothScrollTo(targetId);
    });
  }
});
mobileNavAnchor.forEach((link, index) => {
  // Check if it's one of the first three or the last anchor
  if (index <= 3 || index === navAnchors.length - 1) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      smoothScrollTo(targetId);
    });
  }
});
// Add click event listener to a specific element with class 'my-info__hero__image__a'
body
  .querySelector(".my-info__hero__image__a")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const targetId = this.getAttribute("href");
    smoothScrollTo(targetId);
  });

// Add submit event listener to the contact form
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Perform form submission with fetch
  fetch("https://formspree.io/f/xleqreeo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Show success message
      document.getElementsByClassName(
        "contact-form__message"
      )[0].style.display = "block";
      document.getElementsByClassName(
        "contact-form__message"
      )[1].style.display = "none";
      submitButton.disabled = true;

      // Hide success message after a delay and reset the form
      setTimeout(function () {
        document.getElementsByClassName(
          "contact-form__message"
        )[0].style.display = "none";
        submitButton.disabled = false;
        contactForm.reset();
      }, 2000);
    })
    .catch((error) => {
      // Show error message
      document.getElementsByClassName(
        "contact-form__message"
      )[1].style.display = "block";
      document.getElementsByClassName(
        "contact-form__message"
      )[0].style.display = "none";
      submitButton.disabled = true;

      // Hide error message after a delay
      setTimeout(function () {
        document.getElementsByClassName(
          "contact-form__message"
        )[1].style.display = "none";
        submitButton.disabled = false;
      }, 2000);
    });
});

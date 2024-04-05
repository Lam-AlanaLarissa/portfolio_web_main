let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
//  Open/close menu button
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href *= ' + id + ']').classList.add('active')
            })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active')
}

// send email
const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function validateInputs() {
    // Check if any of the required fields are empty
    if (!fullName.value || !email.value || !phoneNumber.value || !subject.value || !message.value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill in all required fields.",
        });
        return false; // Stop further execution
    }
    return true; // All validations passed
}

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phoneNumber.value}<br> Message: ${message.value}`;

    if (!validateInputs()) {
        return; // Stop further execution if validation fails
    }

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "nghalam1210@gmail.com",
        Password: "5FDD1CB95E7B76B9FEB02195EC3D343EF69B",
        To: 'nghalam1210@gmail.com',
        From: "nghalam1210@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success"
                });
            }
        }
    );
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendEmail();
})

// Projects slider
let slider = document.querySelector('#slider .list');
let items = document.querySelectorAll('#slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('#slider .dots li');

let lengthItems = items.length - 1;
let active = 0;

next.onclick = function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}

let refreshInterval = setInterval(() => {
    next.click()
}, 3000);

function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';

    let last_active_dot = document.querySelector('#slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click()
    }, 3000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    })
})

window.onresize = function (event) {
    reloadSlider();
}
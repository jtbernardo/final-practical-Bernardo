
// 1. NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("is-open");
});




// 2. NAME AND THEME

const themeToggle = document.getElementById("theme-toggle");

const SETTINGS_KEY = "portfolioSettings";

// Default visitor settings
let settings = {
    theme: "light",
    visitorName: ""
};

// Retrieve saved settings
try {
    const savedSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY));

    if (savedSettings && typeof savedSettings === "object") {
        if (savedSettings.theme === "light" || savedSettings.theme === "dark") {
            settings.theme = savedSettings.theme;
        }

        if (typeof savedSettings.visitorName === "string") {
            settings.visitorName = savedSettings.visitorName;
        }
    }
} catch (error) {
    console.log("Unable to retrieve saved preferences.");
}

// Ask for the visitor's name (if they have not entered one yet before)
if (!settings.visitorName) {
    const visitorName = prompt("Welcome! What should we call you?");

    if (visitorName && visitorName.trim()) {
        settings.visitorName = visitorName.trim();
    }
}

// Save visitor preferences
function saveSettings() {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
        console.log("Unable to save visitor preferences.");
    }
}

// Apply the saved theme
document.body.classList.toggle("dark-mode", settings.theme === "dark");

themeToggle.textContent = settings.theme === "dark"
    ? "Light Mode"
    : "Dark Mode";

saveSettings();

// Theme switch
themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    settings.theme = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";

    themeToggle.textContent = settings.theme === "dark"
        ? "Light Mode"
        : "Dark Mode";

    saveSettings();
});




// 3. SKILLS CONTENT

const skills = [
    {
        name: "Digital Art",
        proficiency: "Intermediate"
    },
    {
        name: "Graphic Design",
        proficiency: "Intermediate"
    },
    {
        name: "Web Design",
        proficiency: "Mid"
    }
];

const skillsList = document.getElementById("skills-list");

skillsList.innerHTML = skills.map(function(skill) {
    return `
        <tr>
            <th scope="row">${skill.name}</th>
            <td>${skill.proficiency}</td>
        </tr>
    `;
}).join("");


// 4. CONTACT FORM

// 4. CONTACT FORM
const contactForm = document.querySelector(".contact form");

const fname = document.getElementById("fname");
const email = document.getElementById("email");
const message = document.getElementById("message");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let isValid = true;

    // NAME VALIDATION
    const nameError = document.getElementById("fname-error");

    if (fname.value.trim() === "") {
        nameError.textContent = "Please fill in your name ˙⋆✮⋆˚࿔";
        isValid = false;
    } else if (fname.value.trim().length < 2) {
        nameError.textContent = "⟳ Your name must have at least 2 characters.";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    // EMAIL VALIDATION
    const emailError = document.getElementById("email-error");

    if (email.value.trim() === "") {
        emailError.textContent = "Please enter your email ˙⋆✮⋆˚࿔";
        isValid = false;
    } else if (!email.checkValidity()) {
        emailError.textContent = "⟳ Please enter a valid email address.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // MESSAGE VALIDATION
    const messageError = document.getElementById("message-error");

    if (message.value.trim() === "") {
        messageError.textContent = "Please write a message ˙⋆✮⋆˚࿔";
        isValid = false;
    } else if (message.value.trim().length < 10) {
        messageError.textContent = "⟳ Your message must have at least 10 characters.";
        isValid = false;
    } else {
        messageError.textContent = "";
    }

    if (isValid) {
        alert("Your message has been sent! ⁀જ➣");
        contactForm.reset();
    }
});

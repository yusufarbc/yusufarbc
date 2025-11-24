// Typewriter Effect
const text = "Cyber Security Engineer | Digital Sovereignty Architect";
const typewriterElement = document.getElementById('typewriter-text');
let i = 0;

function typeWriter() {
    if (typewriterElement && i < text.length) {
        typewriterElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Scroll Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Start typewriter when page loads
window.onload = function() {
    typeWriter();
    reveal(); // Check for visible elements on load
};
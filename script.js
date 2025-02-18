function updateCategoryText() {
    if (window.matchMedia("(max-width: 768px)").matches) {
        document.querySelectorAll(".category-btn").forEach(button => {
            if (button.textContent.trim() === "Web Development") {
                button.textContent = "WebDev";
            } else if (button.textContent.trim() === "App Development") {
                button.textContent = "AppDev";
            }
        });
    } else {
        document.querySelectorAll(".category-btn").forEach(button => {
            if (button.textContent.trim() === "WebDev") {
                button.textContent = "Web Development";
            } else if (button.textContent.trim() === "AppDev") {
                button.textContent = "App Development";
            }
        });
    }
}

function navigateToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function scrollExperience(direction) {
    const container = document.querySelector('.experience-container');
    const scrollAmount = 260;
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

function switchCategory(event) {
    if (event.target.classList.contains('category-btn')) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateCategoryText();
    window.addEventListener("resize", updateCategoryText);
    
    const categoryContainer = document.querySelector('.project-categories');
    if (categoryContainer) {
        categoryContainer.addEventListener('click', switchCategory);
    }
});
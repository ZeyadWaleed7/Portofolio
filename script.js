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
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
        container.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
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

function toggleNavbar() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('visible');
    mobileMenu.classList.toggle('hidden');

    // Toggle hamburger icon animation if needed
    const hamburgerBtn = document.getElementById('hamburger-toggle');
    hamburgerBtn.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function () {
    updateCategoryText();
    window.addEventListener("resize", updateCategoryText);

    // Initialize hamburger menu functionality
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    if (hamburgerToggle) {
        hamburgerToggle.addEventListener('click', toggleNavbar);
    }

    const categoryContainer = document.querySelector('.project-categories');
    if (categoryContainer) {
        categoryContainer.addEventListener('click', switchCategory);
    }

    const categoryButtons = document.querySelectorAll('.category-btn');
    const projects = document.querySelectorAll('.projects-container');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Use requestAnimationFrame for smoother transitions
            requestAnimationFrame(() => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                projects.forEach(project => {
                    if (category === 'all' || project.getAttribute('data-category') === category) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    });

    // Auto-scroll functionality removed - cards will scroll continuously
});
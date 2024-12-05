document.addEventListener('DOMContentLoaded', function() {
    const gradesNav = document.querySelector('[data-page="grades"]');
    const dropdownMenu = document.querySelector('.grades-dropdown');
    const gradesLink = gradesNav.querySelector('a');
    
    gradesNav.addEventListener('click', function(e) {
        if (!e.target.closest('.grades-dropdown')) {
            e.preventDefault();
            dropdownMenu.classList.toggle('show');
            gradesNav.classList.toggle('active');
        }
    });

    gradesLink.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownMenu.classList.toggle('show');
        gradesNav.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (!gradesNav.contains(e.target)) {
            dropdownMenu.classList.remove('show');
            gradesNav.classList.remove('active');
        }
    });

    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                item.style.backgroundColor = 'transparent';
            }
        });
    });

    document.querySelector('.grades-dropdown').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    const dropdownItems = document.querySelectorAll('.grades-dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            window.location.href = href;
        });
    });

    const backButton = document.querySelector('.back-button a');
    backButton.addEventListener('mouseenter', () => {
        backButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    
    backButton.addEventListener('mouseleave', () => {
        backButton.style.backgroundColor = 'transparent';
    });
});git 




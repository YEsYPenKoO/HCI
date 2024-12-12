document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');
    
    function setActiveNavItem(pageId) {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === pageId) {
                item.classList.add('active');
            }
        });
    }
    this.getElementsByClassName("onClickLink").addEventListener('click', () => {
            console.log("work");
            window.location.href = '../Test_And_Grades/tests_grades.html';
    });
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
        
        item.addEventListener('click', () => {
            const pageId = item.dataset.page;
            setActiveNavItem(pageId);
            localStorage.setItem('currentPage', pageId);
        });
    });

    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
        setActiveNavItem(savedPage);
    }

    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.getAttribute('href').startsWith('http')) {
                e.preventDefault();
                const navItem = link.closest('.nav-item');
                if (navItem) {
                    const pageId = navItem.dataset.page;
                    setActiveNavItem(pageId);
                }
            }
        });
    });

    const backButton = document.querySelector('.back-button a');
    backButton && backButton.addEventListener('mouseenter', () => {
        backButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    
    backButton && backButton.addEventListener('mouseleave', () => {
        backButton.style.backgroundColor = 'transparent';
    });

    function updateScrollbarStyles() {
        const containers = document.querySelectorAll('.deadlines-container, .notifications-container');
        containers.forEach(container => {
            const scrollbarWidth = container.offsetWidth - container.clientWidth;
            if (scrollbarWidth > 0) {
                container.style.paddingRight = `${scrollbarWidth}px`;
            }
        });
    }

    window.addEventListener('resize', updateScrollbarStyles);
    updateScrollbarStyles();
});
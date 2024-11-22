document.addEventListener('DOMContentLoaded', function() {
    // Store references to frequently accessed elements
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');
    
    // Function to handle navigation
    function navigateToPage(pageId) {
        // Remove active class from all nav items and pages
        navItems.forEach(item => item.classList.remove('active'));
        pages.forEach(page => page.style.display = 'none');
        
        // Add active class to clicked nav item
        const activeNavItem = document.querySelector(`[data-page="${pageId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
        
        // Show selected page
        const activePage = document.getElementById(`${pageId}-page`);
        if (activePage) {
            activePage.style.display = 'flex';
        }
        
        // Save the current page to localStorage
        localStorage.setItem('currentPage', pageId);
    }
    
    // Add click handlers to nav items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.dataset.page;
            navigateToPage(pageId);
        });
    });
    
    // Add hover effects
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

    // Check for saved page on load
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
        navigateToPage(savedPage);
    } else {
        // Show dashboard by default
        document.getElementById('dashboard-page').style.display = 'flex';
    }

    // Your existing notification code here
    // Sample notifications data
    const sampleNotifications = [
        {
            icon: '🔔',
            message: 'Emily from Class B submitted an assignment',
            time: '2 hours ago'
        },
        // ... rest of your notifications ...
    ];

    // Function to render notifications
    function renderNotifications() {
        const container = document.querySelector('.notifications-container');
        container.innerHTML = '';
        
        sampleNotifications.forEach(notification => {
            const notificationElement = document.createElement('div');
            notificationElement.className = 'notification-item';
            notificationElement.innerHTML = `
                <div class="notification-icon">${notification.icon}</div>
                <div class="notification-content">
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${notification.time}</div>
                </div>
            `;
            container.appendChild(notificationElement);
        });
    }

    // Initialize notifications
    renderNotifications();
});
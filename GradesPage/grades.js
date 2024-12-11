document.addEventListener('DOMContentLoaded', function() {
    const gradesNav = document.querySelector('[data-page="grades"]');
    const dropdownMenu = document.querySelector('.grades-dropdown');
    const navItems = document.querySelectorAll('.nav-item');
    
    gradesNav.addEventListener('click', function(e) {
        if (!e.target.closest('.grades-dropdown')) {
            e.preventDefault();
            dropdownMenu.classList.toggle('show');
            gradesNav.classList.toggle('active');
        }
    });

    document.addEventListener('click', function(e) {
        if (!gradesNav.contains(e.target)) {
            dropdownMenu.classList.remove('show');
            gradesNav.classList.remove('active');
        }
    });

    const clickableRows = document.querySelectorAll('.table-row.clickable');
    clickableRows.forEach(row => {
        row.addEventListener('click', () => {
            const testName = row.querySelector('.test-name').textContent;
            if (testName.includes('Week 1')) {
                window.location.href = '../TestsGrades/week1.html';
            } else if (testName.includes('Week 2')) {
                window.location.href = '../TestsGrades/week2.html';
            } else if (testName.includes('Week 3')) {
                window.location.href = '../TestsGrades/week3.html';
            } else if (testName.includes('Exam 1')) {
                window.location.href = '../TestsGrades/exam1.html';
            }
        });
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
    });

    const backButton = document.querySelector('.back-button a');
    backButton.addEventListener('mouseenter', () => {
        backButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    
    backButton.addEventListener('mouseleave', () => {
        backButton.style.backgroundColor = 'transparent';
    });
    const newExam = document.createElement('div');
    newExam.innerHTML =
    `
        <div class="table-row clickable">
            <span class="test-name">Exam 2: Test Exam</span>
            <span class="grade">?%</span>
        </div>
    `;
    gradesTable.appendChild(newExam);
});
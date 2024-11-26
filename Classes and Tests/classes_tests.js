document.addEventListener('DOMContentLoaded', function() {
    const classesContainer = document.getElementById('classesContainer');
    const testsContainer = document.getElementById('testsContainer');
    const addClassButton = document.getElementById('addClassButton');
    const addTestButton = document.getElementById('addTestButton');
    const classModal = document.getElementById('newClassModal');
    const editClassModal = document.getElementById('editClassModal');
    const testModal = document.getElementById('newTestModal');
    const editTestModal = document.getElementById('editTestModal');
    const errorModal = document.getElementById('errorModal');
    const classForm = document.getElementById('newClassForm');
    const editClassForm = document.getElementById('editClassForm');
    const testForm = document.getElementById('newTestForm');
    const editTestForm = document.getElementById('editTestForm');
    const assignClassSelect = document.getElementById('assignClass');
    const classContextMenu = document.getElementById('classContextMenu');
    const testContextMenu = document.getElementById('testContextMenu');
    const gradesNav = document.querySelector('[data-page="grades"]');
    const dropdownMenu = document.querySelector('.grades-dropdown');

    let classes = JSON.parse(localStorage.getItem('classes')) || [];
    let tests = JSON.parse(localStorage.getItem('tests')) || [];
    let currentClassId = null;
    let currentTestId = null;

    function generateRandomColor() {
        const colors = [
            '#4CAF50', '#2196F3', '#9C27B0', '#FF5722', '#607D8B',
            '#795548', '#FF9800', '#009688', '#673AB7', '#3F51B5',
            '#E91E63', '#00BCD4', '#CDDC39', '#FFC107', '#7C4DFF',
            '#FF5252', '#8BC34A', '#03A9F4', '#E040FB', '#FF7043',
            '#1E88E5', '#5E35B1', '#D81B60', '#3949AB', '#00897B', 
            '#C0CA33', '#43A047', '#6D4C41', '#9E9D24', '#D32F2F',
            '#AFB42B', '#7B1FA2', '#0097A7', '#FB8C00', '#F57C00',
            '#689F38', '#F50057', '#039BE5', '#8E24AA', '#E53935',
            '#546E7A', '#FF9800', '#C51162', '#33691E', '#880E4F',
            '#AA00FF', '#311B92', '#FFD600', '#B71C1C', '#827717',
            '#6200EA', '#004D40', '#FF6D00', '#BF360C', '#FFFF00',
            '#FF5722', '#33691E', '#4A148C', '#A52714', '#BF360C',
            '#3E2723', '#1B5E20', '#880E4F', '#FF0000', '#FF4081',
            '#006064', '#EF6C00', '#E65100', '#01579B', '#263238'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function showError(message) {
        document.getElementById('errorMessage').textContent = message;
        errorModal.classList.add('show');
    }

    function validateDate(date) {
        const selectedDate = new Date(date);
        const now = new Date();
        const maxDate = new Date('2026-12-31');
        now.setHours(0, 0, 0, 0);
        
        if (selectedDate < now) {
            return 'Date cannot be in the past';
        }
        if (selectedDate > maxDate) {
            return 'Date cannot be later than 2026';
        }
        return null;
    }

    function updateClassesDisplay() {
        classesContainer.innerHTML = '';
        assignClassSelect.innerHTML = '';
        document.getElementById('editAssignClass').innerHTML = '';
        
        classes.forEach(classItem => {
            const classCard = document.createElement('div');
            classCard.className = 'class-card';
            classCard.style.backgroundColor = classItem.color;
            
            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            cardContent.textContent = classItem.name;
            
            const burgerDots = document.createElement('div');
            burgerDots.className = 'burger-dots';
            burgerDots.addEventListener('click', (e) => {
                e.stopPropagation();
                showBurgerMenu(e, classItem.id, 'class');
            });
            
            classCard.appendChild(cardContent);
            classCard.appendChild(burgerDots);
            classesContainer.appendChild(classCard);

            [assignClassSelect, document.getElementById('editAssignClass')].forEach(select => {
                const option = document.createElement('option');
                option.value = classItem.id;
                option.textContent = classItem.name;
                select.appendChild(option);
            });
        });
    }

    function updateTestsDisplay() {
        testsContainer.innerHTML = '';
        tests.forEach(test => {
            const testCard = document.createElement('div');
            testCard.className = 'test-card';
            const classItem = classes.find(c => c.id === test.assignedClassId);
            testCard.style.backgroundColor = classItem ? classItem.color : '#999';
            
            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            cardContent.innerHTML = `
                <h3>${test.name}</h3>
                <p>Type: ${test.type}</p>
                <p>Class: ${classItem ? classItem.name : 'Unknown'}</p>
                <p>Deadline: ${new Date(test.deadline).toLocaleDateString()}</p>
                <p>Duration: ${test.timeAllocation} minutes</p>
            `;
            
            const burgerDots = document.createElement('div');
            burgerDots.className = 'burger-dots';
            burgerDots.addEventListener('click', (e) => {
                e.stopPropagation();
                showBurgerMenu(e, test.id, 'test');
            });
            
            testCard.appendChild(cardContent);
            testCard.appendChild(burgerDots);
            
            testCard.addEventListener('click', (e) => {
                if (!e.target.classList.contains('burger-dots')) {
                    window.location.href = `/Tests/test.html?id=${test.id}`;
                }
            });
            
            testsContainer.appendChild(testCard);
        });
    }

    function showBurgerMenu(e, id, type) {
        e.preventDefault();
        const menu = type === 'class' ? classContextMenu : testContextMenu;
        
        document.querySelectorAll('.burger-menu').forEach(m => m.classList.remove('show'));
        
        if (type === 'class') {
            currentClassId = id;
        } else {
            currentTestId = id;
        }
        
        menu.style.left = `${e.pageX}px`;
        menu.style.top = `${e.pageY}px`;
        menu.classList.add('show');
    }

    function editClass(classId) {
        const classItem = classes.find(c => c.id === classId);
        if (classItem) {
            document.getElementById('editClassName').value = classItem.name;
            document.getElementById('editClassId').value = classId;
            editClassModal.classList.add('show');
        }
    }

    function editTest(testId) {
        const test = tests.find(t => t.id === testId);
        if (!test) return;

        document.getElementById('editTestName').value = test.name;
        document.getElementById('editTimeAllocation').value = test.timeAllocation;
        document.getElementById('editTestType').value = test.type;
        document.getElementById('editTestDeadline').value = test.deadline;
        document.getElementById('editAssignClass').value = test.assignedClassId;
        document.getElementById('editTestInstructions').value = test.instructions;
        document.getElementById('editTestId').value = testId;

        editTestModal.classList.add('show');
    }

    addClassButton.addEventListener('click', () => {
        classModal.classList.add('show');
    });

    addTestButton.addEventListener('click', () => {
        if (classes.length === 0) {
            showError('You need to create at least one class before creating a test.');
            return;
        }
        testModal.classList.add('show');
    });

    classForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const className = document.getElementById('className').value.trim();
        
        if (className.length === 0) {
            showError('Class name cannot be empty.');
            return;
        }

        if (classes.some(c => c.name === className)) {
            showError('A class with this name already exists.');
            return;
        }

        classes.push({
            id: generateUniqueId(),
            name: className,
            color: generateRandomColor()
        });

        localStorage.setItem('classes', JSON.stringify(classes));
        updateClassesDisplay();
        classModal.classList.remove('show');
        classForm.reset();
    });

    editClassForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const className = document.getElementById('editClassName').value.trim();
        const classId = document.getElementById('editClassId').value;
        
        if (className.length === 0) {
            showError('Class name cannot be empty.');
            return;
        }

        if (classes.some(c => c.name === className && c.id !== classId)) {
            showError('A class with this name already exists.');
            return;
        }

        const classIndex = classes.findIndex(c => c.id === classId);
        if (classIndex !== -1) {
            classes[classIndex].name = className;
            localStorage.setItem('classes', JSON.stringify(classes));
            updateClassesDisplay();
            updateTestsDisplay();
            editClassModal.classList.remove('show');
            editClassForm.reset();
        }
    });

    testForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('testName').value.trim();
        const timeAllocation = parseInt(document.getElementById('timeAllocation').value);
        const type = document.getElementById('testType').value;
        const deadline = document.getElementById('testDeadline').value;
        const assignedClassId = document.getElementById('assignClass').value;
        const instructions = document.getElementById('testInstructions').value.trim();

        if (name.length === 0) {
            showError('Test name cannot be empty.');
            return;
        }

        if (!timeAllocation || timeAllocation < 60) {
            showError('Time allocation must be at least 60 minutes.');
            return;
        }

        const dateError = validateDate(deadline);
        if (dateError) {
            showError(dateError);
            return;
        }

        const newTest = {
            id: generateUniqueId(),
            name,
            timeAllocation,
            type,
            deadline,
            assignedClassId,
            instructions,
            questions: []
        };

        tests.push(newTest);
        localStorage.setItem('tests', JSON.stringify(tests));
        window.location.href = `/Tests/test.html?id=${newTest.id}`;
    });

    editTestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const testId = document.getElementById('editTestId').value;
        const testIndex = tests.findIndex(t => t.id === testId);
        
        if (testIndex === -1) return;

        const updatedTest = {
            ...tests[testIndex],
            name: document.getElementById('editTestName').value.trim(),
            timeAllocation: parseInt(document.getElementById('editTimeAllocation').value),
            type: document.getElementById('editTestType').value,
            deadline: document.getElementById('editTestDeadline').value,
            assignedClassId: document.getElementById('editAssignClass').value,
            instructions: document.getElementById('editTestInstructions').value.trim()
        };

        const dateError = validateDate(updatedTest.deadline);
        if (dateError) {
            showError(dateError);
            return;
        }

        if (!updatedTest.timeAllocation || updatedTest.timeAllocation < 60) {
            showError('Time allocation must be at least 60 minutes.');
            return;
        }

        tests[testIndex] = updatedTest;
        localStorage.setItem('tests', JSON.stringify(tests));
        editTestModal.classList.remove('show');
        updateTestsDisplay();
    });

    classContextMenu.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (action === 'edit') {
            editClass(currentClassId);
        } else if (action === 'delete') {
            if (tests.some(t => t.assignedClassId === currentClassId)) {
                showError('Cannot delete class that has tests assigned to it.');
            } else {
                classes = classes.filter(c => c.id !== currentClassId);
                localStorage.setItem('classes', JSON.stringify(classes));
                updateClassesDisplay();
            }
        }
        classContextMenu.classList.remove('show');
    });

    testContextMenu.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (action === 'edit') {
            editTest(currentTestId);
        } else if (action === 'delete') {
            tests = tests.filter(t => t.id !== currentTestId);
            localStorage.setItem('tests', JSON.stringify(tests));
            updateTestsDisplay();
        }
        testContextMenu.classList.remove('show');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.burger-menu') && !e.target.closest('.burger-dots')) {
            document.querySelectorAll('.burger-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    document.querySelectorAll('.cancel-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('show');
            if (e.target.closest('form')) {
                e.target.closest('form').reset();
            }
        });
    });

    document.querySelector('.ok-button').addEventListener('click', () => {
        errorModal.classList.remove('show');
    });

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

    const testDeadline = document.getElementById('testDeadline');
    const editTestDeadline = document.getElementById('editTestDeadline');
    [testDeadline, editTestDeadline].forEach(input => {
        input.min = new Date().toISOString().split('T')[0];
        input.max = '2026-12-31';
    });

    updateClassesDisplay();
    updateTestsDisplay();
});
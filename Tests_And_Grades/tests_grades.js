document.addEventListener('DOMContentLoaded', function() {
    // const classesContainer = document.getElementById('classesContainer');
    const testsContainer = document.getElementById('testsContainer');
    // const addClassButton = document.getElementById('addClassButton');
    // const addTestButton = document.getElementById('addTestButton');
    const classModal = document.getElementById('newClassModal');
    const editClassModal = document.getElementById('editClassModal');
    const testModal = document.getElementById('newTestModal');
    const editTestModal = document.getElementById('editTestModal');
    const errorModal = document.getElementById('errorModal');
    const credentialsModal = document.getElementById('credentialsModal');
    const classForm = document.getElementById('newClassForm');
    const editClassForm = document.getElementById('editClassForm');
    const testForm = document.getElementById('newTestForm');
    const editTestForm = document.getElementById('editTestForm');
    const assignClassSelect = document.getElementById('assignClass');
    const gradesNav = document.querySelector('[data-page="grades"]');
    const dropdownMenu = document.querySelector('.grades-dropdown');

    let classes = JSON.parse(localStorage.getItem('classes')) || [];
    let tests = JSON.parse(localStorage.getItem('tests')) || [];

    function generateRandomColor() {
        const colors = [
            '#4CAF50', '#2196F3', '#9C27B0', '#FF5722', '#607D8B',
            '#795548', '#FF9800', '#009688', '#673AB7', '#3F51B5'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function generateStudentNumber(classLetter) {
        const numbers = Array.from({length: 5}, () => Math.floor(Math.random() * 10)).join('');
        return `${numbers}${classLetter}`;
    }

    function generatePassword() {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const special = '!@#$%^&*';
        
        let password = '';
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += special[Math.floor(Math.random() * special.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        
        while (password.length < 9) {
            const allChars = lowercase + uppercase + numbers;
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }

    function showCredentialsModal(className) {
        const classLetter = className.charAt(0).toUpperCase();
        document.getElementById('studentNumber').value = generateStudentNumber(classLetter);
        document.getElementById('studentPassword').value = generatePassword();
        credentialsModal.classList.add('show');
    }

    function showError(message) {
        document.getElementById('errorMessage').textContent = message;
        errorModal.classList.add('show');
    }

    function createClassCard(classItem) {
        const classCard = document.createElement('div');
        classCard.className = 'class-card';
        classCard.style.backgroundColor = classItem.color;
        
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        cardContent.textContent = classItem.name;
        
        const cardActions = document.createElement('div');
        cardActions.className = 'card-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'action-btn edit-btn';
        editBtn.innerHTML = '✏️';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editClass(classItem.id);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-btn delete-btn';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (tests.some(t => t.assignedClassId === classItem.id)) {
                showError('Cannot delete class that has tests assigned to it.');
            } else {
                classes = classes.filter(c => c.id !== classItem.id);
                localStorage.setItem('classes', JSON.stringify(classes));
                updateClassesDisplay();
            }
        });
        
        const generateBtn = document.createElement('button');
        generateBtn.className = 'action-btn generate-btn';
        generateBtn.innerHTML = '👤+';
        generateBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showCredentialsModal(classItem.name);
        });
        
        cardActions.appendChild(editBtn);
        cardActions.appendChild(deleteBtn);
        cardActions.appendChild(generateBtn);
        
        classCard.appendChild(cardContent);
        classCard.appendChild(cardActions);
        
        return classCard;
    }

    function updateClassesDisplay() {
        // classesContainer.innerHTML = '';
        // assignClassSelect.innerHTML = '';
        // document.getElementById('editAssignClass').innerHTML = '';
        
        // classes.forEach(classItem => {
        //     const classCard = createClassCard(classItem);
        //     classesContainer.appendChild(classCard);

        //     [assignClassSelect, document.getElementById('editAssignClass')].forEach(select => {
        //         const option = document.createElement('option');
        //         option.value = classItem.id;
        //         option.textContent = classItem.name;
        //         select.appendChild(option);
        //     });
        // });
    }

    function editClass(classId) {
        const classItem = classes.find(c => c.id === classId);
        if (classItem) {
            document.getElementById('editClassName').value = classItem.name;
            document.getElementById('editClassId').value = classId;
            editClassModal.classList.add('show');
        }
    }


    function createTestCard(test) {
        const testCard = document.createElement('div');
        testCard.className = 'test-card';
        const classItem = classes.find(c => c.id === test.assignedClassId);
        testCard.style.backgroundColor = classItem ? classItem.color : '#999';
        
        const cardContent = document.createElement('div');
        cardContent.innerHTML = `
            <h3>${test.name}</h3>
            <p>Type: ${test.type}</p>
            <p>Class: ${classItem ? classItem.name : 'Unknown'}</p>
            <p>Deadline: ${new Date(test.deadline).toLocaleDateString()}</p>
            <p>Duration: ${test.timeAllocation} minutes</p>
        `;
        
        const cardActions = document.createElement('div');
        cardActions.className = 'card-actions';
        
        // const editBtn = document.createElement('button');
        // editBtn.className = 'action-btn edit-btn';
        // editBtn.innerHTML = '✏️';
        // editBtn.addEventListener('click', (e) => {
        //     e.stopPropagation();
        //     editTest(test.id);
        // });
        
        // const deleteBtn = document.createElement('button');
        // deleteBtn.className = 'action-btn delete-btn';
        // deleteBtn.innerHTML = '🗑️';
        // deleteBtn.addEventListener('click', (e) => {
        //     e.stopPropagation();
        //     tests = tests.filter(t => t.id !== test.id);
        //     localStorage.setItem('tests', JSON.stringify(tests));
        //     updateTestsDisplay();
        // });
        
        // cardActions.appendChild(editBtn);
        // cardActions.appendChild(deleteBtn);
        
        testCard.appendChild(cardContent);
        testCard.appendChild(cardActions);
        
        testCard.addEventListener('click', (e) => {
            if (!e.target.closest('.action-btn')) {
                window.location.href = `test.html?id=${test.id}`;
            }
        });
        
        return testCard;
    }
    
    function updateTestsDisplay() {
        testsContainer.innerHTML = '';
        tests.forEach(test => {
            const testCard = createTestCard(test);
            testsContainer.appendChild(testCard);
        });
    }

    classForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const className = document.getElementById('className').value.trim();
        
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
        
        if (classes.some(c => c.name === className && c.id !== classId)) {
            showError('A class with this name already exists.');
            return;
        }

        const classIndex = classes.findIndex(c => c.id === classId);
        if (classIndex !== -1) {
            classes[classIndex].name = className;
            localStorage.setItem('classes', JSON.stringify(classes));
            updateClassesDisplay();
            editClassModal.classList.remove('show');
            editClassForm.reset();
        }
    });

    // addClassButton.addEventListener('click', () => {
    //     classModal.classList.add('show');
    // });

    // addTestButton.addEventListener('click', () => {
    //     if (classes.length === 0) {
    //         showError('You need to create at least one class before creating a test.');
    //         return;
    //     }
    //     testModal.classList.add('show');
    // });


    testForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('testName').value.trim();
        const timeAllocation = parseInt(document.getElementById('timeAllocation').value);
        const type = document.getElementById('testType').value;
        const deadline = document.getElementById('testDeadline').value;
        const assignedClassId = document.getElementById('assignClass').value;
        const instructions = document.getElementById('testInstructions').value.trim();
    
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
        window.location.href = `test.html?id=${newTest.id}`;
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
    
        tests[testIndex] = updatedTest;
        localStorage.setItem('tests', JSON.stringify(tests));
        editTestModal.classList.remove('show');
        updateTestsDisplay();
    });
    
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

    document.querySelectorAll('.cancel-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('show');
            if (e.target.closest('form')) {
                e.target.closest('form').reset();
            }
        });
    });

    document.querySelector('.done-button').addEventListener('click', () => {
        credentialsModal.classList.remove('show');
    });

    document.querySelector('.ok-button').addEventListener('click', () => {
        errorModal.classList.remove('show');
    });

    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const input = document.getElementById(targetId);
            input.select();
            document.execCommand('copy');
        });
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
    testDeadline.min = new Date().toISOString().split('T')[0];
    testDeadline.max = '2026-12-31';

    updateClassesDisplay();
    updateTestsDisplay();
});
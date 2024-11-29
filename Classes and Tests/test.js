document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('id');
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    const questionModal = document.getElementById('questionModal');
    const questionForm = document.getElementById('questionForm');
    const questionType = document.getElementById('questionType');
    const choiceOptionsSection = document.getElementById('choiceOptionsSection');
    const questionsContainer = document.getElementById('questionsContainer');
    const questionTemplate = document.getElementById('questionTemplate');
    const choiceTemplate = document.getElementById('choiceTemplate');
    const pointsInput = document.getElementById('questionPoints');
    const remainingPointsDisplay = document.getElementById('remainingPoints');

    let test = null;
    let tests = JSON.parse(localStorage.getItem('tests')) || [];
    let totalPoints = 0;

    function loadTest() {
        test = tests.find(t => t.id === testId);
        if (!test) {
            window.location.href = 'classes_tests.html';
            return;
        }
        document.getElementById('testName').textContent = test.name;
        test.questions = test.questions || [];
        renderQuestions();
        updateTotalPoints();
    }

    function updateTotalPoints() {
        totalPoints = test.questions.reduce((sum, q) => sum + q.points, 0);
        const remaining = 100 - totalPoints;
        remainingPointsDisplay.textContent = `Remaining points: ${remaining}`;
        pointsInput.max = remaining;
        
        addQuestionBtn.style.display = remaining === 0 ? 'none' : 'block';
    }

    function createChoice(question, index) {
        const choiceDiv = document.createElement('div');
        choiceDiv.className = 'choice-option';

        const input = document.createElement('input');
        input.type = question.type === 'single' ? 'radio' : 'checkbox';
        input.name = `question-${question.id}`;
        input.checked = question.correctAnswers.includes(index);
        input.addEventListener('change', () => {
            if (question.type === 'single') {
                question.correctAnswers = [index];
            } else {
                if (input.checked) {
                    question.correctAnswers.push(index);
                } else {
                    const idx = question.correctAnswers.indexOf(index);
                    if (idx > -1) {
                        question.correctAnswers.splice(idx, 1);
                    }
                }
            }
            saveTest();
        });

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.className = 'choice-text';
        textInput.value = question.choices[index] || '';
        textInput.placeholder = 'Enter option';
        textInput.addEventListener('input', () => {
            question.choices[index] = textInput.value;
            saveTest();
        });

        choiceDiv.appendChild(input);
        choiceDiv.appendChild(textInput);
        return choiceDiv;
    }

    function createQuestion(question, index) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.dataset.id = question.id;

        const header = document.createElement('div');
        header.className = 'question-header';
        header.innerHTML = `
            <span class="question-number">Question ${index + 1}</span>
            <span class="points-value">${question.points} points</span>
            <div class="burger-menu">
                <button class="burger-dots">⋮</button>
                <div class="burger-dropdown">
                    <div class="burger-item" data-action="duplicate">
                        <span class="menu-icon">📋</span>Duplicate
                    </div>
                    <div class="burger-item" data-action="delete">
                        <span class="menu-icon">🗑️</span>Delete
                    </div>
                </div>
            </div>
        `;

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.className = 'question-text';
        textInput.value = question.text || '';
        textInput.placeholder = 'Click here to type the task';
        textInput.addEventListener('input', () => {
            question.text = textInput.value;
            saveTest();
        });

        const content = document.createElement('div');
        content.className = 'question-content';

        if (question.type !== 'open') {
            const choicesContainer = document.createElement('div');
            choicesContainer.className = 'choices-container';
            question.choices.forEach((_, i) => {
                choicesContainer.appendChild(createChoice(question, i));
            });
            content.appendChild(choicesContainer);
        }

        if (question.allowAttachments) {
            const attachmentIndicator = document.createElement('div');
            attachmentIndicator.className = 'attachment-indicator';
            attachmentIndicator.innerHTML = `
                <span class="attachment-icon">📎</span>
                <span>Attachments are on for this question</span>
            `;
            content.appendChild(attachmentIndicator);
        }

        questionDiv.appendChild(header);
        questionDiv.appendChild(textInput);
        questionDiv.appendChild(content);

        const burgerDots = questionDiv.querySelector('.burger-dots');
        const burgerDropdown = questionDiv.querySelector('.burger-dropdown');

        burgerDots.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.burger-dropdown').forEach(dropdown => {
                if (dropdown !== burgerDropdown) dropdown.classList.remove('show');
            });
            burgerDropdown.classList.toggle('show');
        });

        const deleteAction = questionDiv.querySelector('[data-action="delete"]');
        deleteAction.addEventListener('click', () => {
            test.questions.splice(index, 1);
            saveTest();
            renderQuestions();
            updateTotalPoints();
        });

        const duplicateAction = questionDiv.querySelector('[data-action="duplicate"]');
        duplicateAction.addEventListener('click', () => {
            const newQuestion = JSON.parse(JSON.stringify(question));
            newQuestion.id = Date.now().toString();
            test.questions.push(newQuestion);
            saveTest();
            renderQuestions();
            updateTotalPoints();
        });

        return questionDiv;
    }

    function displayFile(file, container, question) {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'attached-file';
        fileDiv.innerHTML = `
            <span class="file-icon">📎</span>
            <span class="file-name">${file.name}</span>
            <button class="delete-file">🗑️</button>
        `;

        fileDiv.querySelector('.delete-file').addEventListener('click', () => {
            const index = question.files.findIndex(f => f.name === file.name);
            if (index > -1) {
                question.files.splice(index, 1);
                fileDiv.remove();
                saveTest();
            }
        });

        container.appendChild(fileDiv);
    }

    function renderQuestions() {
        questionsContainer.innerHTML = '';
        test.questions.forEach((question, index) => {
            const questionElement = createQuestion(question, index);
            questionsContainer.appendChild(questionElement);
        });
    }

    function saveTest() {
        const index = tests.findIndex(t => t.id === testId);
        if (index !== -1) {
            tests[index] = test;
            localStorage.setItem('tests', JSON.stringify(tests));
        }
    }

    addQuestionBtn.addEventListener('click', () => {
        if (totalPoints < 100) {
            questionModal.classList.add('show');
        }
    });

    questionType.addEventListener('change', () => {
        choiceOptionsSection.style.display = 
            questionType.value !== 'open' ? 'block' : 'none';
    });

    questionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const points = parseInt(pointsInput.value);
        if (points + totalPoints > 100) {
            alert('Total points cannot exceed 100');
            return;
        }

        const newQuestion = {
            id: Date.now().toString(),
            type: questionType.value,
            points: points,
            text: '',
            correctAnswers: [],
            files: []
        };

        if (questionType.value !== 'open') {
            const numOptions = parseInt(document.getElementById('numOptions').value);
            newQuestion.choices = Array(numOptions).fill('');
        }

        newQuestion.allowAttachments = document.getElementById('allowAttachments').checked;

        test.questions.push(newQuestion);
        saveTest();
        renderQuestions();
        updateTotalPoints();
        
        questionModal.classList.remove('show');
        questionForm.reset();
        choiceOptionsSection.style.display = 'none';
    });

    document.querySelector('.finish-button').addEventListener('click', () => {
        window.location.href = '/Classes and Tests/classes_tests.html';
    });

    document.querySelector('.cancel-button').addEventListener('click', () => {
        questionModal.classList.remove('show');
        questionForm.reset();
        choiceOptionsSection.style.display = 'none';
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.burger-menu')) {
            document.querySelectorAll('.burger-dropdown').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });

    loadTest();
});
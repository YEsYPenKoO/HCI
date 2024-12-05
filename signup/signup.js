document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const password = document.getElementById('password');
    const retypePassword = document.getElementById('retypePassword');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            schoolName: document.getElementById('schoolName').value.trim(),
            password: document.getElementById('password').value.trim(),
            retypePassword: document.getElementById('retypePassword').value.trim()
        };

        // Validate passwords match
        if (formData.password !== formData.retypePassword) {
            showError(retypePassword, 'Passwords do not match');
            return;
        }

        // Validate password requirements
        if (formData.password.length < 8) {
            showError(password, 'Password must be at least 8 characters long');
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            showError(password, 'Password must contain at least one special character');
            return;
        }

        if (!/[A-Z]/.test(formData.password)) {
            showError(password, 'Password must contain at least one uppercase letter');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showError(document.getElementById('email'), 'Please enter a valid email address');
            return;
        }

        // Store user data
        const teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
        
        // Check if email already exists
        if (teachers.some(teacher => teacher.email === formData.email)) {
            showError(document.getElementById('email'), 'This email is already registered');
            return;
        }

        // Add new teacher
        teachers.push({
            id: Date.now().toString(),
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            schoolName: formData.schoolName,
            password: formData.password // In a real app, this should be hashed
        });

        localStorage.setItem('teachers', JSON.stringify(teachers));

        // Redirect to login
        window.location.href = '../login/login.html';
        alert('Registration successful! You can now log in.');
    });

    function showError(inputElement, message) {
        // Remove any existing error
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create and show new error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message show';
        errorDiv.textContent = message;
        inputElement.parentElement.appendChild(errorDiv);

        // Clear error after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
});
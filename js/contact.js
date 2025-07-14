// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateForm(data)) {
                return;
            }
            
            // Simulate form submission
            submitForm(data);
        });
    }
    
    // Add input validation
    addInputValidation();
});

function validateForm(data) {
    const requiredFields = ['name', 'email', 'subject', 'message'];
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    requiredFields.forEach(field => {
        const value = data[field];
        const input = document.getElementById(field);
        
        if (!value || value.trim() === '') {
            showFieldError(input, `${getFieldLabel(field)} is required`);
            isValid = false;
        }
    });
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        const emailInput = document.getElementById('email');
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getFieldLabel(field) {
    const labels = {
        'name': 'Full Name',
        'email': 'Email Address',
        'subject': 'Subject',
        'message': 'Message'
    };
    return labels[field] || field;
}

function showFieldError(input, message) {
    // Remove existing error
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class to input
    input.classList.add('error');
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // Insert error message after input
    input.parentNode.appendChild(errorElement);
}

function clearErrors() {
    // Remove error classes
    document.querySelectorAll('.error').forEach(input => {
        input.classList.remove('error');
    });
    
    // Remove error messages
    document.querySelectorAll('.field-error').forEach(error => {
        error.remove();
    });
}

function submitForm(data) {
    const submitBtn = document.querySelector('.btn-form');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Log data (in real implementation, you'd send this to your server)
        console.log('Form data:', data);
        
    }, 2000);
}

function showSuccessMessage() {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
        </div>
    `;
    
    // Insert at top of form
    const form = document.getElementById('contact-form');
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    // Scroll to top of form to show message
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function addInputValidation() {
    // Real-time validation for email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !isValidEmail(value)) {
                showFieldError(this, 'Please enter a valid email address');
            } else {
                clearFieldError(this);
            }
        });
    }
    
    // Real-time validation for required fields
    const requiredInputs = document.querySelectorAll('#name, #email, #subject, #message');
    requiredInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                clearFieldError(this);
            }
        });
    });
}

function clearFieldError(input) {
    input.classList.remove('error');
    const error = input.parentNode.querySelector('.field-error');
    if (error) {
        error.remove();
    }
}

// Add styles for form validation
const formStyles = `
    .field-error {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .field-error:before {
        content: '⚠';
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    .success-message {
        background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
        border: 2px solid #b8dacc;
        border-radius: 15px;
        padding: 2rem;
        margin-bottom: 2rem;
        text-align: center;
        animation: slideIn 0.3s ease-out;
    }
    
    .success-content i {
        font-size: 3rem;
        color: #28a745;
        margin-bottom: 1rem;
    }
    
    .success-content h3 {
        color: #155724;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
    }
    
    .success-content p {
        color: #155724;
        margin: 0;
        opacity: 0.9;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .btn-form:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

// Add validation styles to head
const formStyleSheet = document.createElement('style');
formStyleSheet.textContent = formStyles;
document.head.appendChild(formStyleSheet);

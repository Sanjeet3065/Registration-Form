// Modern Interactive Form Handling & Validation

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const termsCheckbox = document.getElementById('terms');
  const submitBtn = document.getElementById('submitBtn');
  const btnSpinner = document.getElementById('btnSpinner');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnIcon = submitBtn.querySelector('.btn-icon');
  
  // Strength Meter Elements
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');

  // Modals
  const successModal = document.getElementById('successModal');
  const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
  const modalUserGreeting = document.getElementById('modalUserGreeting');
  
  const legalModal = document.getElementById('legalModal');
  const legalModalTitle = document.getElementById('legalModalTitle');
  const legalModalContent = document.getElementById('legalModalContent');
  const closeLegalModalBtn = document.getElementById('closeLegalModalBtn');
  const openTermsLink = document.getElementById('openTermsLink');
  const openPrivacyLink = document.getElementById('openPrivacyLink');

  // =========================================================================
  // 1. Password Visibility Toggle
  // =========================================================================
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const targetInput = document.getElementById(targetId);
      const eyeOpen = button.querySelector('.eye-open');
      const eyeClosed = button.querySelector('.eye-closed');

      if (targetInput.type === 'password') {
        targetInput.type = 'text';
        eyeOpen.classList.add('hidden');
        eyeClosed.classList.remove('hidden');
      } else {
        targetInput.type = 'password';
        eyeOpen.classList.remove('hidden');
        eyeClosed.classList.add('hidden');
      }
    });
  });

  // =========================================================================
  // 2. Real-time Password Strength Meter
  // =========================================================================
  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    const strength = calculatePasswordStrength(val);
    updateStrengthUI(strength, val.length);
    validatePasswordMatch();
  });

  confirmPasswordInput.addEventListener('input', () => {
    validatePasswordMatch();
  });

  function calculatePasswordStrength(password) {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0 to 4
  }

  function updateStrengthUI(score, length) {
    strengthBar.className = 'strength-meter-fill';
    
    if (length === 0) {
      strengthBar.style.width = '0%';
      strengthText.textContent = 'Password Strength';
      strengthText.style.color = 'var(--text-subtle)';
      return;
    }

    switch (score) {
      case 1:
        strengthBar.classList.add('strength-weak');
        strengthText.textContent = 'Weak';
        strengthText.style.color = 'var(--accent-rose)';
        break;
      case 2:
        strengthBar.classList.add('strength-fair');
        strengthText.textContent = 'Fair';
        strengthText.style.color = 'var(--accent-amber)';
        break;
      case 3:
        strengthBar.classList.add('strength-good');
        strengthText.textContent = 'Good';
        strengthText.style.color = 'var(--accent-cyan)';
        break;
      case 4:
        strengthBar.classList.add('strength-strong');
        strengthText.textContent = 'Strong & Secure';
        strengthText.style.color = 'var(--accent-emerald)';
        break;
      default:
        strengthBar.classList.add('strength-weak');
        strengthText.textContent = 'Too Short';
        strengthText.style.color = 'var(--accent-rose)';
    }
  }

  function validatePasswordMatch() {
    const pass = passwordInput.value;
    const confirm = confirmPasswordInput.value;
    const errorSpan = document.getElementById('confirmPasswordError');
    const wrapper = confirmPasswordInput.closest('.input-wrapper');

    if (!confirm) {
      errorSpan.textContent = '';
      wrapper.classList.remove('is-invalid');
      return true;
    }

    if (pass !== confirm) {
      errorSpan.textContent = 'Passwords do not match';
      wrapper.classList.add('is-invalid');
      return false;
    } else {
      errorSpan.textContent = '';
      wrapper.classList.remove('is-invalid');
      return true;
    }
  }

  // Clear errors on input
  [firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
    input.addEventListener('input', () => {
      const errorSpan = document.getElementById(`${input.id}Error`);
      const wrapper = input.closest('.input-wrapper');
      if (errorSpan) errorSpan.textContent = '';
      if (wrapper) wrapper.classList.remove('is-invalid');
    });
  });

  termsCheckbox.addEventListener('change', () => {
    const errorSpan = document.getElementById('termsError');
    if (termsCheckbox.checked && errorSpan) {
      errorSpan.textContent = '';
    }
  });

  // =========================================================================
  // 3. Form Submission Handling
  // =========================================================================
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let hasError = false;

    // Validate First Name
    if (!firstNameInput.value.trim()) {
      showFieldError(firstNameInput, 'First name is required');
      hasError = true;
    }

    // Validate Last Name
    if (!lastNameInput.value.trim()) {
      showFieldError(lastNameInput, 'Last name is required');
      hasError = true;
    }

    // Validate Email
    if (!emailInput.value.trim()) {
      showFieldError(emailInput, 'Email address is required');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      showFieldError(emailInput, 'Please enter a valid email address');
      hasError = true;
    }

    // Validate Password
    if (!passwordInput.value) {
      showFieldError(passwordInput, 'Password is required');
      hasError = true;
    } else if (passwordInput.value.length < 6) {
      showFieldError(passwordInput, 'Password must be at least 6 characters');
      hasError = true;
    }

    // Validate Confirm Password & Matching
    if (!confirmPasswordInput.value) {
      showFieldError(confirmPasswordInput, 'Please confirm your password');
      hasError = true;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
      showFieldError(confirmPasswordInput, 'Passwords do not match!');
      showToast('Passwords do not match!', 'error');
      hasError = true;
    }

    // Validate Terms Checkbox
    if (!termsCheckbox.checked) {
      const termsError = document.getElementById('termsError');
      if (termsError) termsError.textContent = 'Please accept the Terms of Use & Privacy Policy';
      showToast('Please accept the Terms of Use', 'error');
      hasError = true;
    }

    if (hasError) return;

    // Simulate Smooth Submission State
    setLoadingState(true);

    setTimeout(() => {
      setLoadingState(false);

      // Show Success Toast and Modal
      showToast('Registration successful! Welcome!', 'success');
      
      const fullName = `${firstNameInput.value.trim()} ${lastNameInput.value.trim()}`;
      modalUserGreeting.textContent = `Hello ${fullName}! Your account has been created successfully. Welcome to our community!`;
      
      if (typeof successModal.showModal === 'function') {
        successModal.showModal();
      } else {
        alert('Registration successful!');
      }

      // Reset form
      form.reset();
      updateStrengthUI(0, 0);
    }, 600);
  });

  function showFieldError(input, message) {
    const errorSpan = document.getElementById(`${input.id}Error`);
    const wrapper = input.closest('.input-wrapper');
    if (errorSpan) errorSpan.textContent = message;
    if (wrapper) wrapper.classList.add('is-invalid');
  }

  function setLoadingState(isLoading) {
    submitBtn.disabled = isLoading;
    if (isLoading) {
      btnSpinner.classList.remove('hidden');
      btnText.textContent = 'Creating account...';
      btnIcon.classList.add('hidden');
    } else {
      btnSpinner.classList.add('hidden');
      btnText.textContent = 'Register Now';
      btnIcon.classList.remove('hidden');
    }
  }

  // =========================================================================
  // 4. Toast Notification Function
  // =========================================================================
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconSvg = type === 'success' 
      ? `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // =========================================================================
  // 5. Modal Dialog Handlers
  // =========================================================================
  closeSuccessModalBtn.addEventListener('click', () => {
    successModal.close();
  });

  if (openTermsLink) {
    openTermsLink.addEventListener('click', (e) => {
      e.preventDefault();
      legalModalTitle.textContent = 'Terms of Use';
      legalModalContent.textContent = 'By registering on our service, you agree to comply with all applicable laws, keep your password secure, and use the platform respectfully. Any unauthorized access or breach of security may result in immediate suspension.';
      legalModal.showModal();
    });
  }

  if (openPrivacyLink) {
    openPrivacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      legalModalTitle.textContent = 'Privacy Policy';
      legalModalContent.textContent = 'We value your privacy. We never share or sell your email address or personal credentials to third parties. All passwords are encrypted using state-of-the-art cryptographic standards.';
      legalModal.showModal();
    });
  }

  closeLegalModalBtn.addEventListener('click', () => {
    legalModal.close();
  });

  // Close modals on backdrop click
  [successModal, legalModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        modal.close();
      }
    });
  });
});
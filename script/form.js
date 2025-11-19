const form = document.getElementById('email-form');
const submitBtn = form.querySelector('input[type="submit"]');
const successMessage = document.querySelector('.contact-success-message');
const errorMessage = document.querySelector('.contact-error-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Hide old messages
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';

  const formData = new FormData(form);

  // Button loading state
  const originalText = submitBtn.value;
  submitBtn.value = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      form.reset();
      successMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'block';
      console.error(data.message);
    }
  } catch (error) {
    errorMessage.style.display = 'block';
    console.error(error);
  } finally {
    submitBtn.value = originalText;
    submitBtn.disabled = false;
  }
}); 

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const messageDiv = document.getElementById('message');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous messages
        messageDiv.textContent = '';
        messageDiv.className = 'message';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            experience: parseFloat(document.getElementById('experience').value),
            skills: document.getElementById('skills').value,
            company_code: document.getElementById('companyCode').value,
            resume_link: document.getElementById('resumeLink').value
        };
        
        try {
            // Send data to FastAPI backend
            const response = await fetch('/api/submit-application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Show success message
                messageDiv.textContent = 'Application submitted successfully!';
                messageDiv.classList.add('success');
                form.reset();
            } else {
                // Show error message
                messageDiv.textContent = data.detail || 'Error submitting application. Please try again.';
                messageDiv.classList.add('error');
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.textContent = 'Network error. Please check your connection and try again.';
            messageDiv.classList.add('error');
        }
    });
});
// Client-side JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const actionBtn = document.getElementById('actionBtn');
    const output = document.getElementById('output');
    const statusMessage = document.getElementById('statusMessage');

    actionBtn.addEventListener('click', async () => {
        try {
            // Call the API endpoint
            const response = await fetch('/api/status');
            const data = await response.json();
            
            // Show the output
            output.classList.remove('hidden');
            statusMessage.textContent = data.message;
            
            // Update button text
            actionBtn.textContent = 'Push Again!';
        } catch (error) {
            output.classList.remove('hidden');
            statusMessage.textContent = 'Error: ' + error.message;
        }
    });
});

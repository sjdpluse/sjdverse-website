document.addEventListener('DOMContentLoaded', () => {
    // Simulate loading for placeholders
    setTimeout(() => {
        document.querySelectorAll('[id^="loading-"]').forEach(el => {
            el.innerHTML = 'Loaded content: Example data here.';
        });
    }, 1000);
});
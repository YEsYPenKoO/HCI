document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

    function drawGraph(canvas, percentages, correctIndex) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const barWidth = width / 7;
        const maxHeight = height * 0.8;

        ctx.clearRect(0, 0, width, height);

        percentages.forEach((percentage, index) => {
            const x = barWidth * (index + 1);
            const barHeight = (percentage / 100) * maxHeight;
            const y = height - barHeight - 20;

            // Bar color
            ctx.fillStyle = index === correctIndex ? '#4CAF50' : colors[index];
            ctx.fillRect(x, y, barWidth * 0.6, barHeight);

            // Percentage on top of bar
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${percentage}%`, x + (barWidth * 0.3), y - 5);

            // Letter label
            ctx.fillText(String.fromCharCode(65 + index), x + (barWidth * 0.3), height - 5);
        });
    }

    questions.forEach(question => {
        const canvas = question.querySelector('canvas');
        const percentages = canvas.dataset.answers.split(',').map(Number);
        const correctIndex = parseInt(canvas.dataset.correct);
        
        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = 200;
        
        drawGraph(canvas, percentages, correctIndex);
    });

    // Sort functionality
    const sortSelect = document.getElementById('sortType');
    sortSelect.addEventListener('change', function() {
        const container = document.querySelector('.questions-container');
        const questions = Array.from(container.children);

        questions.sort((a, b) => {
            const percentageA = parseInt(a.querySelector('.correct-percentage').textContent);
            const percentageB = parseInt(b.querySelector('.correct-percentage').textContent);

            switch(this.value) {
                case 'high':
                    return percentageB - percentageA;
                case 'low':
                    return percentageA - percentageB;
                case 'numerical':
                    return parseInt(a.querySelector('h3').textContent.match(/\d+/)[0]) - 
                           parseInt(b.querySelector('h3').textContent.match(/\d+/)[0]);
                default:
                    return parseInt(a.querySelector('h3').textContent.match(/\d+/)[0]) - 
                           parseInt(b.querySelector('h3').textContent.match(/\d+/)[0]);
            }
        });

        questions.forEach(question => container.appendChild(question));
    });
});
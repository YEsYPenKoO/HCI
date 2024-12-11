document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
    let marked = 0;
    let markedcorrect = 0;
 
    function q1update(correct) {
        marked = marked+1;
        if (correct == 1) {
            markedcorrect = markedcorrect+1;
        }
        let result = (markedcorrect / marked)*100;
        let finalResult = (result+66.6+83)/3;
        document.getElementById("percent1").innerHTML = result.toFixed(1)+"%";
        document.getElementById("totalPercent").innerHTML = "Average score: "+finalResult.toFixed(1)+"%";
    }

    const tickBtn1 = document.createElement('button');
    tickBtn1.className = 'action-btn delete-btn';
    tickBtn1.id = 'firstTick';
    tickBtn1.innerHTML = '✅';//❌
    tickBtn1.addEventListener('click', (e) => {
        e.stopPropagation();
        tickBtn1.remove();
        crossBtn1.remove();
        q1update(1);
    });
    const crossBtn1 = document.createElement('button');
    crossBtn1.className = 'action-btn delete-btn';
    crossBtn1.id = 'firstTick';
    crossBtn1.innerHTML = '❌';//❌
    crossBtn1.addEventListener('click', (e) => {
        e.stopPropagation();
        tickBtn1.remove();
        crossBtn1.remove();
        q1update(0);
    });
    const q1attach = document.getElementById('q1-1');
    q1attach.appendChild(tickBtn1);
    q1attach.appendChild(crossBtn1);

    const tickBtn2 = document.createElement('button');
    tickBtn2.className = 'action-btn delete-btn';
    tickBtn2.id = 'firstTick';
    tickBtn2.innerHTML = '✅';//❌
    tickBtn2.addEventListener('click', (e) => {
        e.stopPropagation();
        tickBtn2.remove();
        crossBtn2.remove();
        q1update(1);
    });
    const crossBtn2 = document.createElement('button');
    crossBtn2.className = 'action-btn delete-btn';
    crossBtn2.id = 'firstTick';
    crossBtn2.innerHTML = '❌';//❌
    crossBtn2.addEventListener('click', (e) => {
        e.stopPropagation();
        tickBtn2.remove();
        crossBtn2.remove();
        q1update(0);
    });
    const q2attach = document.getElementById('q1-2');
    q2attach.appendChild(tickBtn2);
    q2attach.appendChild(crossBtn2);
    const tickBtn3 = document.createElement('button');
    tickBtn3.className = 'action-btn delete-btn';
    tickBtn3.id = 'firstTick';
    tickBtn3.innerHTML = '✅';//❌
    tickBtn3.addEventListener('click', (e) => {
        e.stopPropagation();
        tickBtn3.remove();
        crossBtn3.remove();
        q1update(1);
    });
    const crossBtn3 = document.createElement('button');
    crossBtn3.className = 'action-btn delete-btn';
    crossBtn3.id = 'firstTick';
    crossBtn3.innerHTML = '❌';//❌
    crossBtn3.addEventListener('click', (e) => {
        e.stopPropagation();
        tickBtn3.remove();
        crossBtn3.remove();
        q1update(0);
    });
    const q3attach = document.getElementById('q1-3');
    q3attach.appendChild(tickBtn3);
    q3attach.appendChild(crossBtn3);

    

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
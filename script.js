const questions = [
    "Do you have trouble paying attention to details?",
    "Do you have difficulty staying organized?",
    "Do you often lose things necessary for tasks?",
    "Do you get easily distracted?",
    "Do you have trouble sitting still?",
    "Do you often feel restless or fidgety?",
    "Do you have difficulty completing tasks?",
    "Do you often forget daily activities?",
    "Do you frequently make careless mistakes?",
    "Do you have trouble following instructions?"
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
    updateProgress();
}

function showQuestion() {
    if (currentQuestion < questions.length) {
        const questionElement = document.getElementById('question');
        questionElement.classList.remove('fade-in');
        void questionElement.offsetWidth; // Trigger reflow
        questionElement.classList.add('fade-in');
        questionElement.textContent = questions[currentQuestion];
        updateProgress();
    } else {
        showResult();
    }
}

function updateProgress() {
    const progress = ((currentQuestion) / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function selectOption(option) {
    // Add visual feedback for selection
    const buttons = document.querySelectorAll('.option');
    buttons.forEach(button => button.style.transform = 'scale(1)');
    event.target.style.transform = 'scale(0.98)';

    // Score calculation
    switch(option) {
        case 'never': score += 0; break;
        case 'sometimes': score += 1; break;
        case 'often': score += 2; break;
        case 'veryOften': score += 3; break;
    }
    
    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 300); // Small delay for better UX
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';
    resultElement.classList.add('fade-in');
    
    const maxScore = questions.length * 3;
    const percentage = (score / maxScore) * 100;
    
    // Animate the score progress bar
    setTimeout(() => {
        document.getElementById('score-progress').style.width = `${percentage}%`;
    }, 100);
    
    let message = `Your Score: ${percentage.toFixed(1)}%\n\n`;
    message += getRecommendation(percentage);
    
    document.getElementById('score').textContent = message;
    
    // Add recommendations
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = getDetailedRecommendations(percentage);
}

function getRecommendation(percentage) {
    if (percentage < 30) {
        return "Your responses suggest low likelihood of ADHD symptoms.";
    } else if (percentage < 60) {
        return "Your responses suggest moderate ADHD symptoms. Consider consulting a healthcare provider.";
    } else {
        return "Your responses suggest significant ADHD symptoms. It's recommended to consult a healthcare professional for a proper evaluation.";
    }
}

function getDetailedRecommendations(percentage) {
    let recommendations = '<h3>Recommendations:</h3><ul>';
    
    if (percentage < 30) {
        recommendations += `
            <li>Continue maintaining good organizational habits</li>
            <li>Practice regular mindfulness and focus exercises</li>
            <li>Maintain a healthy sleep schedule</li>
        `;
    } else if (percentage < 60) {
        recommendations += `
            <li>Consider discussing symptoms with a healthcare provider</li>
            <li>Implement organizational strategies in daily life</li>
            <li>Try time management techniques</li>
            <li>Consider mindfulness practices</li>
        `;
    } else {
        recommendations += `
            <li>Schedule an appointment with a healthcare professional</li>
            <li>Keep a symptom diary to share with your provider</li>
            <li>Learn more about ADHD management strategies</li>
            <li>Consider joining ADHD support groups</li>
        `;
    }
    
    recommendations += '</ul>';
    return recommendations;
}

// Start the quiz when page loads
window.onload = startQuiz;
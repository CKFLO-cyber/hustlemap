
document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const questions = [
        {q: "Do you prefer creative work or technical work?", a: ["Creative", "Technical"]},
        {q: "Do you want flexible hours?", a: ["Yes", "No"]},
    ];
    let current = 0;
    const showQuestion = () => {
        quizContainer.innerHTML = `
            <h2>${questions[current].q}</h2>
            ${questions[current].a.map(opt => `<button class="btn">${opt}</button>`).join('')}
        `;
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                current++;
                if (current < questions.length) {
                    showQuestion();
                } else {
                    window.location.href = "paywall.html";
                }
            });
        });
    };
    showQuestion();
});

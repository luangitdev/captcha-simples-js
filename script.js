// Função para gerar uma pergunta e resposta aleatória
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = Math.random() < 0.5 ? '+' : '-';

    const questionElement = document.getElementById('question');
    questionElement.textContent = `Quanto é ${num1} ${operation} ${num2}?`;

    return operation === '+' ? num1 + num2 : num1 - num2;
}

// Função para verificar a resposta
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const correctAnswer = sessionStorage.getItem('correctAnswer');

    if (userAnswer === parseInt(correctAnswer)) {
        alert('Resposta correta! Você é humano.');
    } else {
        alert('Resposta incorreta. Tente novamente.');
    }

    // Gera uma nova pergunta após verificar a resposta
    const newCorrectAnswer = generateQuestion();
    sessionStorage.setItem('correctAnswer', newCorrectAnswer);
}

// Função para inicializar a página com uma pergunta
function init() {
    // Exibe a pergunta gerada aleatoriamente
    generateQuestion();

    // Adiciona o evento de clique ao botão "Enviar"
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', checkAnswer);
    }

    // Adiciona o evento de submissão ao formulário
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o envio do formulário
            checkAnswer();
        });
    }

    // Verifica se há uma resposta correta na sessão
    const correctAnswer = sessionStorage.getItem('correctAnswer');
    if (!correctAnswer) {
        // Se não houver resposta correta na sessão, gera uma nova pergunta e armazena na sessão
        const newCorrectAnswer = generateQuestion();
        sessionStorage.setItem('correctAnswer', newCorrectAnswer);
    }
}

// Chama a função init quando a página for carregada
window.onload = init;


const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const recordText = document.getElementById("record");
const startBtn = document.getElementById("startBtn");

let score = 0;
let timeLeft = 30;
let gameRunning = false;

let timer = null;
let animalTimer = null;

const ANIMAL = "🐱";
const ANIMAL_SIZE = 72;
const ANIMAL_LIFETIME = 500; // 0.5 soniya

let record = Number(localStorage.getItem("tezkorQolRecord")) || 0;

recordText.textContent = record;

function showAnimal() {
    if (!gameRunning) return;

    clearTimeout(animalTimer);
    gameArea.innerHTML = "";

    const animal = document.createElement("button");
    animal.className = "animal";
    animal.textContent = ANIMAL;
    animal.type = "button";

    const maxX = Math.max(0, gameArea.clientWidth - ANIMAL_SIZE);
    const maxY = Math.max(0, gameArea.clientHeight - ANIMAL_SIZE);

    animal.style.left = Math.random() * maxX + "px";
    animal.style.top = Math.random() * maxY + "px";

    animal.addEventListener("click", () => {
        if (!gameRunning) return;

        score++;
        scoreText.textContent = score;

        if (score > record) {
            record = score;
            recordText.textContent = record;
            localStorage.setItem("tezkorQolRecord", record);
        }

        // Bosilishi bilan darhol yangi mushuk chiqadi
        showAnimal();
    });

    gameArea.appendChild(animal);

    // 0.5 soniyada bosilmasa, boshqa joyga o'tadi
    animalTimer = setTimeout(() => {
        if (gameRunning) {
            showAnimal();
        }
    }, ANIMAL_LIFETIME);
}

function startGame() {
    clearInterval(timer);
    clearTimeout(animalTimer);

    score = 0;
    timeLeft = 30;
    gameRunning = true;

    scoreText.textContent = score;
    timeText.textContent = timeLeft;

    startBtn.disabled = true;
    startBtn.textContent = "O‘YIN DAVOM ETMOQDA...";

    showAnimal();

    timer = setInterval(() => {
        timeLeft--;
        timeText.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameRunning = false;

    clearInterval(timer);
    clearTimeout(animalTimer);

    gameArea.innerHTML = `
        <div class="result">
            <h2>⏰ Vaqt tugadi!</h2>
            <p>To‘plagan ballingiz:</p>
            <h2>${score}</h2>
            <p>🏆 Rekord: ${record}</p>
        </div>
    `;

    startBtn.disabled = false;
    startBtn.textContent = "QAYTA O‘YNASH";
}

startBtn.addEventListener("click", startGame);

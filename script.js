const imagePaths = [
    "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", 
    "image6.jpg", "image7.jpg", "image8.jpg", "image9.jpg", "image10.jpg", 
    "image11.jpg", "image12.jpg", "image13.jpg", "image14.jpg", "image15.jpg", 
    "image16.jpg", "image17.jpg", "image18.jpg", "image19.jpg", "image20.jpg", 
    "image21.jpg", "image22.jpg", "image23.jpg", "image24.jpg", "image25.jpg", 
    "image26.jpg", "image27.jpg", "image28.jpg", "image29.jpg", "image30.jpg", 
    "image31.jpg", "image32.jpg"
];

let currentRound = [];
let nextRound = [];
let currentIndex = 0;
let roundNumber = 32;

// 페이지 요소들
const startButton = document.getElementById("start-button");
const firstPage = document.getElementById("first-page");
const tournamentPage = document.getElementById("tournament-page");
const finalPage = document.getElementById("final-page");
const roundTitle = document.getElementById("round-title");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const selectImage1Button = document.getElementById("select-image1");
const selectImage2Button = document.getElementById("select-image2");
const finalImage = document.getElementById("final-image");

// 게임 시작
startButton.addEventListener("click", () => {
    firstPage.classList.add("hidden");
    tournamentPage.classList.remove("hidden");
    initializeTournament();
    showNextPair();
});

function initializeTournament() {
    currentRound = shuffleArray([...imagePaths]); // 이미지를 랜덤으로 섞음
    nextRound = [];
    currentIndex = 0;
    roundNumber = 32;
    roundTitle.textContent = `${roundNumber}강`;
}

// 다음 이미지 쌍 보여주기
function showNextPair() {
    if (currentIndex < currentRound.length - 1) {
        image1.src = currentRound[currentIndex];
        image2.src = currentRound[currentIndex + 1];
    } else {
        proceedToNextRound();
    }
}

// 선택 버튼 클릭 시 이벤트
selectImage1Button.addEventListener("click", () => {
    nextRound.push(currentRound[currentIndex]);
    currentIndex += 2;
    showNextPair();
});

selectImage2Button.addEventListener("click", () => {
    nextRound.push(currentRound[currentIndex + 1]);
    currentIndex += 2;
    showNextPair();
});

// 다음 라운드로 진행
function proceedToNextRound() {
    if (nextRound.length === 1) {
        // 최종 우승자가 결정된 경우
        showFinalPage();
    } else {
        currentRound = nextRound;
        nextRound = [];
        currentIndex = 0;
        roundNumber /= 2;
        roundTitle.textContent = `${roundNumber}강`;
        showNextPair();
    }
}

// 최종 페이지로 이동
function showFinalPage() {
    tournamentPage.classList.add("hidden");
    finalPage.classList.remove("hidden");
    finalImage.src = currentRound[0];
}

// 배열을 랜덤으로 섞는 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

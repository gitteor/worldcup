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

// 페이지 초기화 시 불러오는 함수
function initializeTournament() {
    // 이전에 저장된 라운드 정보가 있는지 확인
    if (localStorage.getItem('currentRound')) {
        currentRound = JSON.parse(localStorage.getItem('currentRound'));
        nextRound = JSON.parse(localStorage.getItem('nextRound'));
        currentIndex = parseInt(localStorage.getItem('currentIndex'), 10);
        roundNumber = parseInt(localStorage.getItem('roundNumber'), 10);
    } else {
        // 초기화
        currentRound = shuffleArray(imagePaths); // 이미지를 랜덤으로 섞음
        nextRound = [];
        currentIndex = 0;
        roundNumber = 32;
    }
    document.getElementById('round-title').textContent = `${roundNumber}강`;
    showNextPair();
}

// 다음 이미지 쌍 보여주기
function showNextPair() {
    if (currentIndex < currentRound.length - 1) {
        document.getElementById('image1').src = currentRound[currentIndex];
        document.getElementById('image2').src = currentRound[currentIndex + 1];
    } else {
        proceedToNextRound();
    }
}

// 이미지 선택 시 처리
document.getElementById('select-image1').addEventListener('click', () => {
    nextRound.push(currentRound[currentIndex]);
    currentIndex += 2;
    saveState();
    showNextPair();
});

document.getElementById('select-image2').addEventListener('click', () => {
    nextRound.push(currentRound[currentIndex + 1]);
    currentIndex += 2;
    saveState();
    showNextPair();
});

// 다음 라운드로 진행
function proceedToNextRound() {
    if (nextRound.length === 1) {
        // 최종 우승자가 결정된 경우
        localStorage.setItem('winner', nextRound[0]);
        window.location.href = 'final.html';
    } else {
        currentRound = nextRound;
        nextRound = [];
        currentIndex = 0;
        roundNumber /= 2;
        document.getElementById('round-title').textContent = `${roundNumber}강`;
        saveState();
        showNextPair();
    }
}

// 상태 저장 함수
function saveState() {
    localStorage.setItem('currentRound', JSON.stringify(currentRound));
    localStorage.setItem('nextRound', JSON.stringify(nextRound));
    localStorage.setItem('currentIndex', currentIndex);
    localStorage.setItem('roundNumber', roundNumber);
}

// 배열을 랜덤으로 섞는 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

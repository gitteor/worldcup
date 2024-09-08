const imagePaths = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/image5.jpg',
    'images/image6.jpg',
    'images/image7.jpg',
    'images/image8.jpg',
    'images/image9.jpg',
    'images/image10.jpg',
    'images/image11.jpg',
    'images/image12.jpg',
    'images/image13.jpg',
    'images/image14.jpg',
    'images/image15.jpg',
    'images/image16.jpg',
    'images/image17.jpg',
    'images/image18.jpg',
    'images/image19.jpg',
    'images/image20.jpg',
    'images/image21.jpg',
    'images/image22.jpg',
    'images/image23.jpg',
    'images/image24.jpg',
    'images/image25.jpg',
    'images/image26.jpg',
    'images/image27.jpg',
    'images/image28.jpg',
    'images/image29.jpg',
    'images/image30.jpg',
    'images/image31.jpg',
    'images/image32.jpg'
];

let currentRound = [];
let nextRound = [];
let currentIndex = 0;
let roundNumber = 32;

function initializeTournament() {
    // 이전에 저장된 라운드 정보가 있는지 확인
    if (localStorage.getItem('currentRound')) {
        currentRound = JSON.parse(localStorage.getItem('currentRound'));
        nextRound = JSON.parse(localStorage.getItem('nextRound'));
        currentIndex = parseInt(localStorage.getItem('currentIndex'), 10);
        roundNumber = parseInt(localStorage.getItem('roundNumber'), 10);
    } else {
        // 초기화
        currentRound = shuffleArray(imagePaths); 
        nextRound = [];
        currentIndex = 0;
        roundNumber = 32;
    }
    updateRoundTitle();
    showNextPair();
}

// 라운드 제목 업데이트 함수
function updateRoundTitle() {
    document.getElementById('round-title').textContent = `${roundNumber}강`;
}

function showNextPair() {
    if (currentIndex < currentRound.length - 1) {
        const image1 = document.getElementById('image1');
        const image2 = document.getElementById('image2');
        
        image1.src = currentRound[currentIndex];
        image2.src = currentRound[currentIndex + 1];
        
        // 이미지 클릭 이벤트 추가
        image1.onclick = () => handleSelection(image1, currentRound[currentIndex]);
        image2.onclick = () => handleSelection(image2, currentRound[currentIndex + 1]);

        // 버튼 클릭 이벤트
        document.getElementById('select-image1').onclick = () => handleSelection(image1, currentRound[currentIndex]);
        document.getElementById('select-image2').onclick = () => handleSelection(image2, currentRound[currentIndex + 1]);
    } else {
        proceedToNextRound();
    }
}

function handleSelection(selectedElement, selectedImage) {
    selectedElement.classList.add('selected');
    
    if (selectedElement === document.getElementById('image1')) {
        document.getElementById('select-image1').classList.add('selected-button');
    } else {
        document.getElementById('select-image2').classList.add('selected-button');
    }

    setTimeout(() => {
        nextRound.push(selectedImage);
        currentIndex += 2;
        resetSelection();
        showNextPair();
    }, 500);
}

function resetSelection() {
    document.querySelectorAll('.tournament-image').forEach(img => img.classList.remove('selected'));
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('selected-button'));
}

// 다음 라운드로 진행하는 함수
function proceedToNextRound() {
    if (nextRound.length === 1) {
        // 최종 우승자가 결정된 경우
        localStorage.setItem('winner', nextRound[0]);
        window.location.href = 'final.html';  // 최종 페이지로 이동
    } else {
        currentRound = nextRound;
        nextRound = [];
        currentIndex = 0;
        roundNumber /= 2;  // 라운드 번호 업데이트 (32강 -> 16강 -> 8강 ...)
        updateRoundTitle();  // 라운드 타이틀 업데이트
        saveState();  // 상태 저장
        showNextPair();  // 다음 이미지 쌍 보여주기
    }
}

// 상태 저장 함수
function saveState() {
    localStorage.setItem('currentRound', JSON.stringify(currentRound));
    localStorage.setItem('nextRound', JSON.stringify(nextRound));
    localStorage.setItem('currentIndex', currentIndex);
    localStorage.setItem('roundNumber', roundNumber);
}

// 배열을 랜덤으로 섞는 함수 (토너먼트 첫 번째 이미지 배치를 위해)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 페이지가 로드되면 토너먼트 초기화
window.onload = function () {
    const path = window.location.pathname;
    if (path.includes("tournament.html")) {
        initializeTournament();  // 대결 페이지에서 토너먼트 초기화
    } else if (path.includes("final.html")) {
        showWinner();  // 최종 우승자 페이지에서 우승자 표시
    }

    const startButton = document.getElementById('start-btn');
    if (startButton) {
        startButton.onclick = () => {
            localStorage.clear();  // 시작하기 버튼 클릭 시 상태 초기화
            window.location.href = 'tournament.html';
        };
    }
};

// 최종 우승자 표시
function showWinner() {
    const winnerImageSrc = localStorage.getItem('winner');
    if (winnerImageSrc) {
        document.getElementById('winner-image').src = winnerImageSrc;
    }
}

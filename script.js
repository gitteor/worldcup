const imagePaths = [
    "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", 
    // 더 많은 이미지 추가...
];

let currentRound = [];
let nextRound = [];
let currentIndex = 0;
let roundNumber = 32;

function initializeTournament() {
    if (localStorage.getItem('currentRound')) {
        currentRound = JSON.parse(localStorage.getItem('currentRound'));
        nextRound = JSON.parse(localStorage.getItem('nextRound'));
        currentIndex = parseInt(localStorage.getItem('currentIndex'), 10);
        roundNumber = parseInt(localStorage.getItem('roundNumber'), 10);
    } else {
        currentRound = shuffleArray(imagePaths); 
        nextRound = [];
        currentIndex = 0;
        roundNumber = 32;
    }
    updateRoundTitle();
    showNextPair();
}

function updateRoundTitle() {
    document.getElementById('round-title').textContent = `${roundNumber}강`;
}

function showNextPair() {
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const selectImage1Button = document.getElementById('select-image1');
    const selectImage2Button = document.getElementById('select-image2');

    if (currentIndex < currentRound.length - 1) {
        image1.src = currentRound[currentIndex];
        image2.src = currentRound[currentIndex + 1];
        
        // 선택 버튼과 이미지에 대한 클릭 이벤트 초기화
        selectImage1Button.onclick = () => handleSelection(image1, currentRound[currentIndex]);
        selectImage2Button.onclick = () => handleSelection(image2, currentRound[currentIndex + 1]);
        image1.onclick = () => handleSelection(image1, currentRound[currentIndex]);
        image2.onclick = () => handleSelection(image2, currentRound[currentIndex + 1]);
    } else {
        proceedToNextRound();
    }
}

// 선택을 처리하는 함수
function handleSelection(selectedElement, selectedImage) {
    // 선택된 이미지에 효과 적용
    selectedElement.classList.add('selected');
    
    // 버튼에 선택된 효과 적용
    if (selectedElement === document.getElementById('image1')) {
        document.getElementById('select-image1').classList.add('selected-button');
    } else {
        document.getElementById('select-image2').classList.add('selected-button');
    }

    // 0.5초 후에 다음 라운드로 진행 (선택된 느낌을 줄 시간)
    setTimeout(() => {
        nextRound.push(selectedImage);  // 선택한 이미지를 다음 라운드로 이동
        currentIndex += 2;  // 다음 쌍으로 이동
        resetSelection();  // 이전 선택 상태 초기화
        showNextPair();  // 다음 쌍 보여주기
    }, 500);
}

// 선택 상태를 초기화하는 함수
function resetSelection() {
    // 선택된 상태 초기화
    document.querySelectorAll('.tournament-image').forEach(img => img.classList.remove('selected'));
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('selected-button'));
}

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
        updateRoundTitle();
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

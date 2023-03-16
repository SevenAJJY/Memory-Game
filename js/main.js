document.querySelector('.control-buttons span').onclick = () => {
    let yourName = prompt('What\'s Your Name ?');
    if (yourName == null || yourName == "") {
        document.querySelector('.name span').innerHTML = 'Unknown';
    } else {
        document.querySelector('.name span').innerHTML = yourName;
    }
    document.querySelector('.control-buttons').remove();
    timer();
}

const duration = 1000;

let timeout;
let blocksContainer = document.querySelector(".memory-game-block");
let infoContainer = document.querySelector(".info-container");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];

orderRange = shuffle(orderRange);

blocks.forEach((block, index) => {
    // Add Css Order Property
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click', function() {

        // Trigger The Flip Block Function
        flipBlock(this);
    });
});

// Flip Block Function
function flipBlock(selectedBlock) {
    // Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

    // Collect All Flepped Cards
    let allFlippedBlocks = blocks.filter((flippedBlock) => {
        return flippedBlock.classList.contains('is-flipped');
    });

    // If Theres Two Selected Blocks
    if (allFlippedBlocks.length === 2) {
        // Stop Clicking Function
        stopClicking();
        // Check Matched Click Function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
        gameFinished();
    }

}

function stopClicking() {
    // Add Class No Clicking On Main Container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        // Remove Class No Clicking On Main Container
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}

function timer() {
    let timerCont = document.querySelectorAll('.time span');
    let seconds = minutes = 0;

    timeout = setInterval(() => {
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        timerCont[1].innerHTML = seconds;
        seconds++;
        if (seconds >= 59) {
            seconds = 0;
            minutes = parseInt(minutes);
            minutes += 1;
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            timerCont[0].innerHTML = minutes;
        }
    }, 1000);
}

function gameFinished() {
    let finished = document.querySelectorAll('.has-match');
    if (finished.length == 20) {
        blocksContainer.remove();
        infoContainer.classList.add('hide');
        showResult();
    }
}

function showResult() {
    let resultBox = document.querySelector('.result');
    let time = infoContainer.querySelectorAll('.time span');
    let name = infoContainer.querySelector('.name span').innerHTML;
    let tries = infoContainer.querySelector('.tries span').innerHTML;

    time[0].innerHTML = time[0].innerHTML < 10 ? `0${time[0].innerHTML}` : time[0].innerHTML;
    resultBox.classList.add('active');

    resultBox.querySelector('.name span').innerHTML = name;
    resultBox.querySelector('.time span').innerHTML = `${time[0].innerHTML} : ${time[1].innerHTML}`;
    resultBox.querySelector('.tries span').innerHTML = tries;
}

document.querySelector('.try-again').onclick = () => {
    window.location.reload();
}


function checkMatchedBlocks(fBlock, sBlock) {
    let triesElement = document.querySelector('.tries span');

    if (fBlock.dataset.crystals === sBlock.dataset.crystals) {
        fBlock.classList.remove('is-flipped');
        fBlock.classList.add('has-match');

        sBlock.classList.remove('is-flipped');
        sBlock.classList.add('has-match');

        document.querySelector('#success').play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            fBlock.classList.remove('is-flipped');
            sBlock.classList.remove('is-flipped');
        }, duration);

        document.querySelector('#fail').play();
    }
}

// shuffle function
function shuffle(array) {
    // Settings Vars
    let current = array.length;
    let temp, random;

    while (current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current);
        // Decrease Length By One
        current--;
        // [1] Save Current Element In Stash
        temp = array[current];
        // [2] Current Element = Random Element
        array[current] = array[random];
        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array;
}
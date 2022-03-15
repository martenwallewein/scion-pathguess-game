"use strict";

// Declare as variable
let canvas;
let context;
let secondsPassed;
let oldTimeStamp;
let fps;

const height = 400;
const width = 750;

// Listen to the onLoad event
window.onload = init;
let player;
let path1 = [
    "19-11:2332:31",
    "19-11:2332:41",
    "19-11:2332:43",
    "19-11:2332:44",
];
let path1Nodes = [];
let path1Lines = [];
let player1Upwards = true;

let bot;
let path2 = [
    "19-11:2332:31",
    // "19-11:2332:41",
    // "19-11:2332:43",
    "19-11:2332:46",
];
let path2Nodes = [];
let path2Lines = [];
let player2Upwards = true;

const remotes = [
    "19-11:2332:44",
    "19-11:2332:46"
]

const availablePaths = {
    "19-11:2332:44": [
        path1,
        path2,
    ],
    "19-11:2332:46": [
        path1,
        path2,
    ],
}

const gameStates = {
    MENU: 1,
    SELECT_REMOTE: 2,
    SELECT_PATH: 3,
    RUN: 4,
    RESULT: 5,
};

let gameState = gameStates.MENU;

let menu;

// Trigger init function when the page has loaded
function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    bot = new Player(context, 100, 100);
    player = new Player(context, 100, 100);
    menu = new Menu(context);
    // Request an animation frame for the first time
    // The gameLoop() function will be called as a callback of this request
    window.requestAnimationFrame(gameLoop);
    menu.remotes = remotes;
    menu.remote = remotes[0];
    menu.availablePaths = availablePaths;
}

function initPaths() {
    let asY = 50; let asX = 400;
    path2.forEach((hop, index) => {
        const curAs = new AS(context, asX, asY, true, hop);
        if (index > 0) {
            const line = new Link(context, path2Nodes[index - 1], curAs);
            path2Lines.push(line);
        }
        path2Nodes.push(curAs);
        asY += 100;
    });
    bot.move(path2Nodes[path2Nodes.length - 1].x, path2Nodes[path2Nodes.length - 1].y);

    asY = 50; asX = 50;
    path1.forEach((hop, index) => {
        const curAs = new AS(context, asX, asY, true, hop);
        if (index > 0) {
            const line = new Link(context, path1Nodes[index - 1], curAs);
            path1Lines.push(line);
        }
        path1Nodes.push(curAs);
        asY += 100;
    });
    player.move(path1Nodes[path1Nodes.length - 1].x, path1Nodes[path1Nodes.length - 1].y);
}

function gameLoop(timeStamp) {

    drawFPS(timeStamp);

    switch (gameState) {
        case gameStates.RUN:
            drawRun();
            break;
        case gameStates.MENU:
        case gameStates.SELECT_REMOTE:
        case gameStates.SELECT_PATH:
            drawMenu();
            break;
    }


    // The loop function has reached it's end
    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

const drawMenu = () => {
    menu.draw();
}

const drawFPS = (timeStamp) => {
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);
    context.clearRect(0, 0, width, height);
    // Draw number to the screen
    context.fillStyle = 'white';
    context.fillRect(0, 0, 200, 100);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText("FPS: " + fps, 10, 30);
}

const drawRun = () => {
    path1Nodes.forEach(n => n.draw());
    path1Lines.forEach(l => l.draw());
    path2Nodes.forEach(n => n.draw());
    path2Lines.forEach(l => l.draw());

    if (player.y == path1Nodes[0].y && player1Upwards) {
        player1Upwards = false;
    }

    if (player.y > path1Nodes[0].y && player1Upwards) {
        player.move(player.x, player.y - player.speed);
    }

    if (player.y < path1Nodes[path1Nodes.length - 1].y && !player1Upwards) {
        player.move(player.x, player.y + player.speed);
    }

    player.draw();

    if (bot.y == path2Nodes[0].y && player2Upwards) {
        player2Upwards = false;
    }

    if (bot.y > path2Nodes[0].y && player2Upwards) {
        bot.move(bot.x, bot.y - bot.speed);
    }

    if (bot.y < path2Nodes[path2Nodes.length - 1].y && !player2Upwards) {
        bot.move(bot.x, bot.y + bot.speed);
    }

    bot.draw();

}

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        if (gameState == gameStates.MENU) {
            gameState = gameStates.SELECT_REMOTE;
            menu.state = gameStates.SELECT_REMOTE;
        } else if (gameState == gameStates.SELECT_REMOTE) {
            gameState = gameStates.SELECT_PATH;
            menu.state = gameStates.SELECT_PATH;
        } else if (gameState == gameStates.SELECT_PATH) {
            const remote = menu.remotes[menu.remoteIndex];
            path1 = menu.availablePaths[remote][menu.pathIndex];
            path2 = menu.availablePaths[remote][menu.pathIndex];
            initPaths();
            gameState = gameStates.RUN;
        }
    }
    if (gameState == gameStates.SELECT_REMOTE) {
        let newIndex;
        switch (e.keyCode) {
            // case 37:
            //    alert('left');
            //    break;
            case 38:
                newIndex = menu.remoteIndex - 1;
                if (newIndex <= 0) {
                    newIndex = 0;
                }
                menu.remoteIndex = newIndex;
                break;
            //case 39:
            //    alert('right');
            //    break;
            case 40:
                newIndex = menu.remoteIndex + 1;
                if (newIndex >= remotes.length) {
                    newIndex = remotes.length - 1;
                }
                menu.remoteIndex = newIndex;
                break;
        }
    }

    if (gameState == gameStates.SELECT_PATH) {
        let newIndex;
        switch (e.keyCode) {
            // case 37:
            //    alert('left');
            //    break;
            case 38:
                newIndex = menu.pathIndex - 1;
                if (newIndex <= 0) {
                    newIndex = 0;
                }
                menu.pathIndex = newIndex;
                break;
            //case 39:
            //    alert('right');
            //    break;
            case 40:
                newIndex = menu.pathIndex + 1;
                const remote = menu.remotes[menu.remoteIndex];
                if (newIndex >= availablePaths[remote].length) {
                    newIndex = availablePaths[remote].length - 1;
                }
                menu.pathIndex = newIndex;
                break;
        }
    }
}

var test = document.getElementById("test");

function move(dir = "backward") {
    if (dir === "forward") {
        test.textContent = "Moving Forward"
    } else {
        test.textContent = "Moving Backward"
    }
}

function stop() {
    test.textContent = "Stopped"
}

var bWard = document.getElementById("backward");
var fWard = document.getElementById("forward");

bWard.onmousedown = () => move();
bWard.onmouseup = () => stop();

fWard.onmousedown = () => move("forward");
fWard.onmouseup = () => stop();
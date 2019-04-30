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


window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
let finalTranscript = '';
let recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.maxAlternatives = 10;
recognition.continuous = true;

recognition.onerror = (e) => {
    console.log("Error")
    console.log(e)
}

recognition.onresult = (event) => {
  let interimTranscript = '';
  for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  document.querySelector('.title').innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
}

recognition.onspeechend = () => recognition.stop()


const startRecognition = () => recognition.start();
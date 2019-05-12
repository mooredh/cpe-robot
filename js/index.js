var test = document.getElementById("test");
const URL = "http://127.0.0.1:5000";
const bWard = document.getElementById("backward");
const fWard = document.getElementById("forward");
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

let finalTranscript = '';
let recognition = new window.SpeechRecognition();
recognition.interimResults = false;
recognition.maxAlternatives = 10;
recognition.continuous = false;
const msg = document.getElementById('message')

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
msg.innerHTML = finalTranscript
mapMessageToAction(finalTranscript)
  this.setTimeout(() => {
    finalTranscript = "";
    interimTranscript = "";
    msg.innerHTML = "Waiting for voice";
  }, 2500)
}

recognition.onspeechend = () => {
  recognition.stop()
  

}

const mapMessageToAction = (message) => {
  console.log("MESSAGE ->",message)
  if(message.includes("forward")){
    request("forward");
  }
  else if (message.includes("backward")){
    request("backward");
  }
  else if (message.includes("picture")){
    request("capture")
  }
  else{
    msg.innerHTML = `I'm afraid I didn't understand '${msg.innerHTML}'`;
    return 
  }
}


const request = async (path) => {
  try{
    const res = await axios.get(`${URL}/${path}`)
    console.log(res)
  }
  catch(e){
    console.log("An error occured")
    console.log(e)
  }
}


const startRecognition = () => {
  console.log("Starting recog")
  recognition.start();
}
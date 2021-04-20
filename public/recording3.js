const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.querySelector("video");
const downloadButton = document.querySelector('button#download');

let recorder, stream;
let recordedBlobs;
const audio = audioToggle.checked || false;

async function startRecording() {

    recordedBlobs = [];
    stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
        audio: true
    });
    recorder = new MediaRecorder(stream);

    const chunks = [];
    recorder.ondataavailable = handleDataAvailable;
    recorder.onstop = e => {
        const completeBlob = new Blob(chunks, { type: chunks[0].type });
        video.src = URL.createObjectURL(completeBlob);
    };

    recorder.start();
}

function handleDataAvailable(event) {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}

start.addEventListener("click", () => {
    start.setAttribute("disabled", true);
    stop.removeAttribute("disabled");

    startRecording();
});

stop.addEventListener("click", () => {
    stop.setAttribute("disabled", true);
    start.removeAttribute("disabled");

    recorder.stop();
    stream.getVideoTracks()[0].stop();
});

downloadButton.addEventListener('click', () => {
    const blob = new Blob(recordedBlobs, { type: 'video/mp4' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.mp4';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
});

const videoElem = document.getElementById("videos");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
const downloadButton = document.querySelector('button#download');


// Options for getDisplayMedia()

var displayMediaOptions = {
    video: {
        cursor: "always"
    },
    audio: false
};

// Set event listeners for the start and stop buttons
startElem.addEventListener("click", function (evt) {
    startCapture();
}, false);

stopElem.addEventListener("click", function (evt) {
    stopCapture();
}, false);

console.log = msg => logElem.innerHTML += `${msg}<br>`;
console.error = msg => logElem.innerHTML += `<span class="error">${msg}</span><br>`;
console.warn = msg => logElem.innerHTML += `<span class="warn">${msg}<span><br>`;
console.info = msg => logElem.innerHTML += `<span class="info">${msg}</span><br>`;

async function startCapture() {
    logElem.innerHTML = "";


    try {
        videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        dumpOptionsInfo();
    } catch (err) {
        console.error("Error: " + err);
    }


}

function handleDataAvailable(event) {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}



function stopCapture(evt) {
    let tracks = videoElem.srcObject.getTracks();

    tracks.forEach(track => track.stop());
    videoElem.srcObject = null;
}

function dumpOptionsInfo() {

    const videoTrack = videoElem.srcObject.getVideoTracks()[0];


    console.info("Track settings:");
    console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
    console.info("Track constraints:");
    console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));

}

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
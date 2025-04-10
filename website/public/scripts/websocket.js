const ws = new WebSocket("ws:localhost:3000");

const volume_meter=document.getElementById('volume-meter');
const pitch_meter=document.getElementById('pitch-meter');

const volume_knob=document.getElementById('volume-knob');
const pitch_knob=document.getElementById('pitch-knob');

let c_note = 0;
let d_note = 0;
let e_note = 0;
let f_note = 0;
let g_note = 0;
let a_note = 0;
let b_note = 0;

let pitch = 0;
let volume = 0;
let wave = 0;

let interval;

ws.onopen = () => {
    
};

ws.onmessage = (event) => {
    let message = JSON.parse(event.data);
    if(message.receiver=="webserver"){
        console.log("Message from server:", message);
    };
};

function turnLightOn(musical_note){
    let light = document.getElementById('light-'+musical_note);
    light.classList.remove('off');
    light.classList.add('on');
}

function turnLightOff(musical_note){
    let light = document.getElementById('light-'+musical_note);
    light.classList.add('off');
    light.classList.remove('on');
}

const keys = document.querySelectorAll('.key');
keys.forEach(element => {
    element.addEventListener('mousedown',(e)=>{
        updateNoteValue(element.id,1);
        turnLightOn(element.id);
        
        interval = setInterval(() => {
            sendDataToWebSocket();
        }, 100);

    });
    element.addEventListener('mouseup',(e)=>{
        turnLightOff(element.id);
        clearInterval(interval);
        updateNoteValue(element.id,0);
    });
    element.addEventListener('mouseleave', () => {
        turnLightOff(element.id);
        clearInterval(interval);
        updateNoteValue(element.id,0);
    });
});

volume_knob.addEventListener('mousedown', (e)=>{
    interval = setInterval(() => {
        volume_meter.innerText=volume_knob.value;
        updateVolumeValue(volume_knob.value);
        sendDataToWebSocket();
    }, 100);
});

volume_knob.addEventListener('mouseup', (e)=>{
    clearInterval(interval);
});

pitch_knob.addEventListener('mousedown', (e)=>{
    interval = setInterval(() => {
        pitch_meter.innerText=pitch_knob.value;
        updatePitchValue(pitch_knob.value);
        sendDataToWebSocket();
    }, 100);
});

pitch_knob.addEventListener('mouseup', (e)=>{
    clearInterval(interval);
});

function updateNoteValue(musical_note,value){
    switch (musical_note) {
        case "C": c_note = value; break;
        case "D": d_note = value; break;
        case "E": e_note = value; break;
        case "F": f_note = value; break;
        case "G": g_note = value; break;
        case "A": a_note = value; break;
        case "B": b_note = value; break;
    }
};

function updateVolumeValue(value){
    volume=value;
};

function updatePitchValue(value){
    pitch=value;
};

function sendDataToWebSocket(){
    dataObj={
        sender:"webserver",
        receiver:"esp32",
        data:{
            c_note_value: c_note,
            d_note_value: d_note,
            e_note_value: e_note,
            f_note_value: f_note,
            g_note_value: g_note,
            a_note_value: a_note,
            b_note_value: b_note,
            volume_value: volume,
            pitch_value: pitch,
            wave_value: wave
        }
    };
    ws.send(JSON.stringify(dataObj));
};
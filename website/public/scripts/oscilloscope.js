function drawPWM(dutyCycle) {
    const canvas = document.getElementById("pwmCanvas");
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;
    const period = 50; // Period in pixels
    const highTime = (dutyCycle / 100) * period;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let x = 0; x < width; x += period) {
        ctx.moveTo(x, height / 2);
        ctx.lineTo(x + highTime, height / 2);
        ctx.lineTo(x + highTime, height);
        ctx.lineTo(x + period, height);
        ctx.lineTo(x + period, height / 2);
    }
    ctx.stroke();
}

function updatePWM() {
    drawPWM(dutyCycle);
}

drawPWM(50);
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const result = document.getElementById("result");
const spinBtn = document.getElementById("spin");
const spinSound = document.getElementById("spinSound");
const spinCounter = document.getElementById("spinCount");

const sectors = [
  "Tambah Jagungnya!",
  "Tambah Jelly-nya!",
  "Tambah Kejunya!",
  "ZONK!",
  "FREE 1 Cup Medium",
  "Beli 3 Gratis 1"
];

let spinCount = 0;
let angle = 0;
const colors = ["#FFEB3B", "#FFF176", "#FFD54F", "#FDD835", "#FBC02D", "#FFEE58"];

function drawWheel() {
  const arcSize = (2 * Math.PI) / sectors.length;
  sectors.forEach((text, i) => {
    const startAngle = i * arcSize;
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, startAngle, startAngle + arcSize);
    ctx.fill();
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(startAngle + arcSize / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(text, 230, 10);
    ctx.restore();
  });
}

drawWheel();

function spinWheel() {
  spinSound.play();
  const arcSize = (2 * Math.PI) / sectors.length;
  let selectedIndex;

  do {
    selectedIndex = Math.floor(Math.random() * sectors.length);
  } while (
    sectors[selectedIndex] === "FREE 1 Cup Medium" ||
    (sectors[selectedIndex] === "Beli 3 Gratis 1" && spinCount < 25)
  );

  spinCount++;
  spinCounter.textContent = spinCount;

  const angleTo = (2 * Math.PI * 10) + ((selectedIndex + 0.5) * arcSize);
  let duration = 3000;
  const start = performance.now();

  function animate(now) {
    const elapsed = now - start;
    if (elapsed < duration) {
      angle = easeOut(elapsed, 0, angleTo, duration);
      drawRotatedWheel(angle);
      requestAnimationFrame(animate);
    } else {
      angle = angleTo;
      drawRotatedWheel(angle);
      result.textContent = `Kamu dapat: ${sectors[selectedIndex]}`;
    }
  }

  requestAnimationFrame(animate);
}

function drawRotatedWheel(rot) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate(rot);
  ctx.translate(-250, -250);
  drawWheel();
  ctx.restore();
}

function easeOut(t, b, c, d) {
  t /= d;
  t--;
  return c * (t * t * t + 1) + b;
}

spinBtn.addEventListener("click", spinWheel);

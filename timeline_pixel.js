const character = document.getElementById('character');
const timeline = document.getElementById('timeline');
const points = document.querySelectorAll('.timeline-point');
const contents = document.querySelectorAll('.content');

let currentX = 0;

points.forEach((point, index) => {
  point.addEventListener('click', () => {
    const pointX = point.offsetLeft + point.offsetWidth / 2 - 24;
    animateWalk(currentX, pointX, index);
    currentX = pointX;
  });
});

function animateWalk(start, end, contentIndex) {
  let frame = 0;
  let x = start;
  const distance = end - start;
  const direction = distance > 0 ? 1 : -1;
  const step = 5 * direction;

  character.style.background = "url('https://i.imgur.com/KpGg2xB.png') 0 0";

  const walk = setInterval(() => {
    if ((direction > 0 && x >= end) || (direction < 0 && x <= end)) {
      clearInterval(walk);
      character.style.background = "url('https://i.imgur.com/KpGg2xB.png') 0 0";
      showContent(contentIndex);
      return;
    }

    frame = (frame + 1) % 4;
    character.style.backgroundPosition = `-${frame * 48}px 0px`;
    x += step;
    character.style.left = `${x}px`;
  }, 80);
}

function showContent(index) {
  contents.forEach((c, i) => {
    c.classList.toggle('active', i === index);
  });
}

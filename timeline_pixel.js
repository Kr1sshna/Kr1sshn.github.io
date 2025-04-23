const character = document.getElementById('character');
const timeline = document.getElementById('timeline');
const points = document.querySelectorAll('.timeline-point');
const contents = document.querySelectorAll('.content');

let currentX = 0;

points.forEach((point, index) => {
  point.addEventListener('click', () => {
    const pointX = point.offsetLeft + point.offsetWidth / 2 - 24; // Center the character at the point
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

  character.style.backgroundPosition = `url('walk-imported.png')0px 0px`;

  const walk = setInterval(() => {
    if ((direction > 0 && x >= end) || (direction < 0 && x <= end)) {
      clearInterval(walk);
      showContent(contentIndex);
      return;
    }

    frame = (frame + 1) % 4; // Animate the sprite by switching frames
    character.style.backgroundPosition = `-${frame * 48}px 0px`;
    x += step;
    character.style.left = `${x}px`; // Move the character horizontally
  }, 80);
}

function showContent(index) {
  contents.forEach((c, i) => {
    c.classList.toggle('active', i === index);
  });
}

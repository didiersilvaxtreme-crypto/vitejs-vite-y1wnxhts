import './style.css';

const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const scene3 = document.getElementById('scene3');
const scene4 = document.getElementById('scene4');
const scene5 = document.getElementById('scene5');

const startBtn = document.getElementById('startBtn');
const score = document.getElementById('score');
const gameArea = document.getElementById('gameArea');
const response = document.getElementById('response');
const typingText = document.getElementById('typingText');
const cursor = document.getElementById('cursor');
const giftBtn = document.getElementById('giftBtn');

const scenes = [scene1, scene2, scene3, scene4, scene5];

if (scenes.some((scene) => !scene) || !startBtn || !score || !gameArea) {
  console.error('Faltan elementos HTML. Revisa los IDs de index.html.');
} else {
  const TARGET = 22;
  let collected = 0;
  let typingStarted = false;

  const message = `Hola, ojitos dulces.

¡Feliz cumpleaños!

Espero que hoy tengas un día muy bonito, que sonrías mucho y que este nuevo año de vida te traiga momentos que te hagan feliz de verdad. Deseo que puedas cumplir tus metas, disfrutar de las pequeñas cosas y encontrar muchas razones para seguir sonriendo.

Me alegra que hayamos vuelto a hablar. A veces, por miedo a lo que uno siente, termina alejándose de personas que realmente le importan. Y quizá hay cosas que, con el tiempo, uno aprende a afrontar de una manera diferente.

Por eso, esta vez quise hacer algo especial para ti. No es un gran regalo, pero sí un pequeño detalle preparado con cariño, porque me hacía ilusión sacarte una sonrisa en un día tan especial.

Espero que la vida te sorprenda con cosas bonitas, que nunca dudes de lo mucho que puedes lograr y que siempre encuentres motivos para ser feliz.

Disfruta muchísimo tu día, ojitos dulces. Gracias por permitirme coincidir contigo una vez más.

¡Feliz cumpleaños!`;

  function showScene(sceneToShow) {
    scenes.forEach((scene) => {
      scene.classList.remove('active');
    });

    sceneToShow.classList.add('active');
  }

  startBtn.addEventListener('click', () => {
    collected = 0;
    score.textContent = `0 / ${TARGET}`;
    gameArea.replaceChildren();

    showScene(scene2);
    createCollectible();
  });

  function createCollectible() {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'collectible';

    const objects = ['⭐', '💎', '🎁', '🪙', '🎮'];
    item.textContent = objects[Math.floor(Math.random() * objects.length)];

    item.style.left =
      Math.random() * Math.max(0, gameArea.clientWidth - 46) + 'px';

    item.style.top =
      Math.random() * Math.max(0, gameArea.clientHeight - 46) + 'px';

    item.addEventListener('click', () => {
      collected++;
      score.textContent = `${collected} / ${TARGET}`;
      item.remove();

      if (collected >= TARGET) {
        showScene(scene3);
      } else {
        createCollectible();
      }
    });

    gameArea.appendChild(item);
  }

  const correctBtn = document.querySelector('.correct');
  const wrongBtns = document.querySelectorAll('.wrong');
  const answerBtns = document.querySelectorAll('.answers button');

  if (correctBtn && response) {
    correctBtn.addEventListener('click', () => {
      response.textContent = '¡Exacto!';

      answerBtns.forEach((button) => {
        button.disabled = true;
      });

      setTimeout(() => {
        showScene(scene4);
        startTyping();
      }, 1000);
    });
  }

  wrongBtns.forEach((button) => {
    button.addEventListener('click', () => {
      if (response) {
        response.textContent = '¡Inténtalo otra vez!';
      }
    });
  });

  function startTyping() {
    if (typingStarted || !typingText || !cursor || !giftBtn) {
      return;
    }

    typingStarted = true;
    typingText.textContent = '';
    giftBtn.hidden = true;
    cursor.style.display = 'inline';

    let index = 0;

    function writeNextCharacter() {
      if (index < message.length) {
        typingText.textContent += message.charAt(index);
        index++;

        setTimeout(writeNextCharacter, 25);
      } else {
        cursor.style.display = 'none';
        giftBtn.hidden = false;
      }
    }

    writeNextCharacter();
  }

  if (giftBtn) {
    giftBtn.addEventListener('click', () => {
      showScene(scene5);
    });
  }

  console.log('La aventura está lista.');
}

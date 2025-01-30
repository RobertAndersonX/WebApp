// script.js
const items = [
  { name: "AK-47 | Красная линия", rarity: "Фиолетовый", image: "images/Carosta.jpg" },
  { name: "AWP | Электрохайв", rarity: "Розовый", image: "images/Trump.jpg" },
  { name: "M4A4 | Звёздный шторм", rarity: "Голубой", image: "images/Putin.jpg" },
  { name: "Нож | Бабочка | Ультрафиолет", rarity: "Золотой", image: "images/Schrek.jpg" },
  { name: "Desert Eagle | Кобра", rarity: "Фиолетовый", image: "images/Zelensky.jpg" },
  { name: "Перчатки | Спектр", rarity: "Золотой", image: "images/Gosling.jpg" },
  { name: "USP-S | Кровавая паутина", rarity: "Розовый", image: "images/Derden.jpg" },
  { name: "Glock-18 | Водянистый", rarity: "Голубой", image: "images/Ricky.jpg" },
  { name: "AK-47 | Неоновая революция", rarity: "Фиолетовый", image: "images/Satoru.jpeg" },
  { name: "AWP | Гиперзверь", rarity: "Розовый", image: "images/Shariy.jpg" },
  { name: "M4A1-S | Кибербезопасность", rarity: "Голубой", image: "images/Chmonia.jpg" },
  { name: "Нож | Коготь | Ультрафиолет", rarity: "Золотой", image: "images/schelobaev.jpg" },
];

const rouletteElement = document.getElementById("roulette");
const openButton = document.getElementById("openButton");
const resultElement = document.getElementById("result");

let isSpinning = false;

openButton.addEventListener("click", () => {
  if (isSpinning) return;
  isSpinning = true;

  // Очищаем рулетку
  rouletteElement.innerHTML = "";

  // Создаем элементы для прокрутки (делаем 4 копии для большей плавности)
  for (let i = 0; i < 4; i++) {
    items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "roulette-item";
      const imgElement = document.createElement("img");
      imgElement.src = item.image;
      imgElement.alt = item.name;
      itemElement.appendChild(imgElement);
      rouletteElement.appendChild(itemElement);
    });
  }

  // Выбираем случайный предмет и рассчитываем его позицию
  const targetIndex = Math.floor(Math.random() * items.length);
  const itemHeight = 250;
  const numberOfItems = items.length;
  
  // Рассчитываем конечную позицию
  // Делаем 2 полных оборота + расстояние до выбранного предмета
  const spins = 2;
  const targetPosition = -(spins * numberOfItems * itemHeight + (targetIndex + numberOfItems) * itemHeight);

  let startTime = null;
  const duration = 5000; // Длительность анимации (5 секунд)

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Функция плавного замедления
    const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const easedProgress = easeOutExpo(progress);

    // Прокрутка
    const currentPosition = targetPosition * easedProgress;
    rouletteElement.style.transform = `translateY(${currentPosition}px)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      resultElement.textContent = `Вы получили: ${items[targetIndex].name} (${items[targetIndex].rarity})`;
      resultElement.style.color = getRarityColor(items[targetIndex].rarity);
    }
  }

  requestAnimationFrame(animate);
});

function getRarityColor(rarity) {
  switch (rarity) {
    case "Голубой":
      return "#4fc3f7";
    case "Фиолетовый":
      return "#ba68c8";
    case "Розовый":
      return "#ff79a3";
    case "Золотой":
      return "#ffd700";
    default:
      return "#fff";
  }
}
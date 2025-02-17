const items = [
  { name: "Пидор Кароста", rarity: "Легендарная", image: "images/Carosta.jpg" },
  { name: "Дональд Трамп", rarity: "Эпическая", image: "images/Trump.jpg" },
  { name: "Владимир Путин", rarity: "Эпическая", image: "images/Putin.jpg" },
  { name: "Шрек", rarity: "Необычная", image: "images/Schrek.jpg" },
  { name: "Владимир Зеленский", rarity: "Эпическая", image: "images/Zelensky.jpg" },
  { name: "Райан Гослинг", rarity: "Уникальная", image: "images/Gosling.jpg" },
  { name: "Тайлер Дерден", rarity: "Редкая", image: "images/Derden.jpg" },
  { name: "Рики Мартин", rarity: "Легендарная", image: "images/Ricky.jpg" },
  { name: "Годжо Сатору", rarity: "Редкая", image: "images/Satoru.jpeg" },
  { name: "Анатолий Шарий", rarity: "Редкая", image: "images/Shariy.jpg" },
  { name: "Чмоня", rarity: "Обычная", image: "images/Chmonia.jpg" },
  { name: "Михаил Шелобаев", rarity: "Редкая", image: "images/schelobaev.jpg" },
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

      const textElement = document.createElement("span");
      textElement.textContent = item.name;
      textElement.style.color = getRarityColor(item.rarity);
      textElement.className = 'hidden-text'; // Скрываем текст
      itemElement.appendChild(textElement);

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
      // Показываем текст только для выбранного элемента
      const selectedItem = rouletteElement.childNodes[targetIndex + numberOfItems];
      selectedItem.childNodes[1].classList.remove('hidden-text');
      resultElement.textContent = `Вы получили: ${items[targetIndex].name} (${items[targetIndex].rarity})`;
      resultElement.style.color = getRarityColor(items[targetIndex].rarity);
    }
  }

  requestAnimationFrame(animate);
});

function getRarityColor(rarity) {
  switch (rarity) {
    case "Обычная":
      return "#696969"; // Темно-серый
    case "Необычная":
      return "#00ff00"; // Зеленый
    case "Редкая":
      return "#0000ff"; // Голубо-синий
    case "Эпическая":
      return "#800080"; // Фиолетово-пурпурный
    case "Легендарная":
      return "#ffd700"; // Золотисто-оранжевый
    case "Уникальная":
      return "#00ffff"; // Ярко-бирюзовый
    default:
      return "#fff";
  }
}

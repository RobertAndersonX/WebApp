const items = [
  { name: "Пидор Кароста", rarity: "legendary", image: "images/Carosta.jpg" },
  { name: "Дональд Трамп", rarity: "epic", image: "images/Trump.jpg" },
  { name: "Владимир Путин", rarity: "epic", image: "images/Putin.jpg" },
  { name: "Шрек", rarity: "uncommon", image: "images/Schrek.jpg" },
  { name: "Владимир Зеленский", rarity: "epic", image: "images/Zelensky.jpg" },
  { name: "Райан Гослинг", rarity: "unique", image: "images/Gosling.jpg" },
  { name: "Тайлер Дерден", rarity: "rare", image: "images/Derden.jpg" },
  { name: "Рики Мартин", rarity: "legendary", image: "images/Ricky.jpg" },
  { name: "Годжо Сатору", rarity: "rare", image: "images/Satoru.jpeg" },
  { name: "Анатолий Шарий", rarity: "rare", image: "images/Shariy.jpg" },
  { name: "Чмоня", rarity: "common", image: "images/Chmonia.jpg" },
  { name: "Михаил Шелобаев", rarity: "rare", image: "images/schelobaev.jpg" },
];

const rouletteElement = document.getElementById("roulette");
const openButton = document.getElementById("openButton");
const resultElement = document.getElementById("result");
const finalCardContainer = document.getElementById("final-card-container");

let isSpinning = false;

openButton.addEventListener("click", () => {
  if (isSpinning) return;
  isSpinning = true;

  rouletteElement.innerHTML = "";
  finalCardContainer.innerHTML = "";

  // Вихрь карт
  for (let i = 0; i < 3; i++) {
    items.forEach((item) => {
      const itemElement = createCardElement(item);
      rouletteElement.appendChild(itemElement);
    });
  }

  const targetIndex = Math.floor(Math.random() * items.length);
  const itemHeight = 254;
  const numberOfItems = items.length;
  const spins = 2;
  const targetPosition = -(spins * numberOfItems * itemHeight + (targetIndex + numberOfItems) * itemHeight);

  let startTime = null;
  const duration = 3000;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const easedProgress = easeOutExpo(progress);

    const currentPosition = targetPosition * easedProgress;
    rouletteElement.style.transform = `translateY(${currentPosition}px)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      rouletteElement.style.opacity = "0";
      setTimeout(() => {
        rouletteElement.innerHTML = "";
        showFinalCard(items[targetIndex]);
        isSpinning = false;
      }, 500);
    }
  }

  requestAnimationFrame(animate);
});

function createCardElement(item) {
  const itemElement = document.createElement("div");
  itemElement.className = `roulette-item card ${item.rarity}`;
  const cardInfo = document.createElement("div");
  cardInfo.className = "card-info";
  const imgElement = document.createElement("img");
  imgElement.src = item.image;
  imgElement.alt = item.name;
  cardInfo.appendChild(imgElement);
  const textElement = document.createElement("span");
  textElement.textContent = item.name;
  cardInfo.appendChild(textElement);
  itemElement.appendChild(cardInfo);
  return itemElement;
}

function showFinalCard(item) {
  const finalCard = document.createElement("div");
  finalCard.className = `final-card card ${item.rarity}`;
  
  const cardBack = document.createElement("div");
  cardBack.className = "card-back";
  
  const cardFront = document.createElement("div");
  cardFront.className = "card-front";
  const imgElement = document.createElement("img");
  imgElement.src = item.image;
  imgElement.alt = item.name;
  cardFront.appendChild(imgElement);

  finalCard.appendChild(cardBack);
  finalCard.appendChild(cardFront);
  finalCardContainer.appendChild(finalCard);

  setTimeout(() => {
    resultElement.textContent = `Вы получили: ${item.name} (${item.rarity})`;
    resultElement.style.color = getRarityColor(item.rarity);
  }, 3000);
}

function getRarityColor(rarity) {
  switch (rarity) {
    case "common": return "#696969";
    case "uncommon": return "#00ff00";
    case "rare": return "#0000ff";
    case "epic": return "#800080";
    case "legendary": return "#ffd700";
    case "unique": return "#00ffff";
    default: return "#fff";
  }
}

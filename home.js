import { Fetch } from "./Fetch.js";

// Function to create subscription cards
function createCardsForSubscribes() {
  const url = "./subscriptionPlan.json"; // Replace with your actual JSON file URL

  Fetch(url)
    .then((data) => {
      // Iterate through the array of plans and create a card for each
      data.forEach((plan) => {
        createPlanCard(plan);
      });
    })
    .catch((error) => {
      console.error("Error fetching subscription plans:", error);
    });
}

// Function to create individual subscription card
function createPlanCard(plan) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("flexCol", "card", "wFull");

  const headerImageContainer = document.createElement("div");
  headerImageContainer.classList.add("flexBetween");

  const header = document.createElement("div");
  header.classList.add("header");
  const title = document.createElement("p");
  title.style.color = "#009aff";
  title.innerText = plan.title;
  const price = document.createElement("p");
  price.innerText = plan.price;
  header.appendChild(title);
  header.appendChild(price);

  const image = document.createElement("img");
  image.src = plan.image;
  image.alt = "DocTime Care";

  headerImageContainer.appendChild(header);
  headerImageContainer.appendChild(image);

  cardContainer.appendChild(headerImageContainer);

  const description = document.createElement("p");
  description.innerText = plan.description;
  cardContainer.appendChild(description);

  const lowerSideText = document.createElement("div");
  lowerSideText.classList.add("lowerSideText");
  plan.features.forEach((feature) => {
    const featureDiv = document.createElement("div");
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-check");
    const featureText = document.createElement("span");
    featureText.innerText = feature;
    featureDiv.appendChild(icon);
    featureDiv.appendChild(featureText);
    lowerSideText.appendChild(featureDiv);
  });

  cardContainer.appendChild(lowerSideText);

  const subscribeButton = document.createElement("button");
  subscribeButton.innerText = "Subscribe Now";
  cardContainer.appendChild(subscribeButton);

  document.getElementById("plansCard").appendChild(cardContainer);
}

// Function to fetch and render service cards
function renderServiceCards() {
  const url = "./services.json"; // Replace with your actual JSON file path

  Fetch(url)
    .then((services) => {
      const servicesContainer = document.querySelector(".servicesCards"); // Main container

      if (!servicesContainer) {
        console.error("Services container not found.");
        return;
      }

      // Loop through each service and create a card
      services.forEach((service) => {
        const card = createServiceCard(service);
        servicesContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching services:", error);
    });
}

// Function to create individual service card
function createServiceCard(service) {
  const card = document.createElement("div");
  card.classList.add("serviceOnecard", "flexAround");

  // Image container
  const imageContainer = document.createElement("div");
  imageContainer.style.height = "100%";

  const image = document.createElement("img");
  image.src = service.image;
  image.alt = service.title;

  imageContainer.appendChild(image);

  // Text side
  const textSide = document.createElement("div");
  textSide.classList.add("textSide");
  textSide.style.backgroundColor = "red";

  const title = document.createElement("h2");
  title.innerText = service.title;

  const description = document.createElement("p");
  description.innerText = service.text;

  textSide.appendChild(title);
  textSide.appendChild(description);

  // Append image and text to card
  card.appendChild(imageContainer);
  card.appendChild(textSide);

  return card;
}

// Call the function after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderServiceCards();
});

createCardsForSubscribes();

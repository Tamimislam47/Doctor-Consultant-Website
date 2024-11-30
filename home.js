import { Fetch } from "./Fetch.js";
import specialtiesList from "./specislitiesList.js";

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

function createServiceCard() {
  const url = "./services.json  ";

  Fetch(url)
    .then((data) => {
      renderCreateServiceCard(data);
    })
    .catch((error) =>
      console.error("Error fetching subscription plans:", error)
    );
}

function renderCreateServiceCard(cards) {
  const servicesCards = document.getElementById("servicesCards");

  if (!servicesCards) {
    console.error("servicesCards container not found");
    return;
  }

  cards.forEach((item) => {
    const { image, title, text } = item;

    // Create elements for each service card
    const serviceOnecard = document.createElement("div");
    const imgDiv = document.createElement("div");
    const textSide = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");

    // Set content and attributes
    img.src = image;
    img.alt = title;
    h2.textContent = title;
    p.textContent = text;

    // Add classes for styling
    serviceOnecard.classList.add("flexAround", "serviceOnecard");
    imgDiv.classList.add("imgDiv");
    textSide.classList.add("textSide");

    // Append elements in the correct hierarchy
    imgDiv.appendChild(img);
    serviceOnecard.appendChild(imgDiv);
    textSide.appendChild(h2);
    textSide.appendChild(p);
    serviceOnecard.appendChild(textSide);

    // Append each card to the main container
    servicesCards.appendChild(serviceOnecard);
  });
}

function availableSpecialities() {
  const specialitiesDiv = document.getElementById("specialities");

  // Loop through the specialties list
  specialtiesList.forEach((spcList) => {
    const { text } = spcList;

    // Create a new oneList container for each item
    const oneList = document.createElement("div");
    const cell = document.createElement("div");
    oneList.classList.add("oneList", "flexCenter");

    // Create the h3 element with the text
    const h3 = document.createElement("h3");
    h3.textContent = text;

    // Create the icon
    const i = document.createElement("i");
    i.classList.add("fa-solid", "fa-check", "iconColor");
    cell.classList.add("cell");

    cell.appendChild(i);
    cell.appendChild(h3);

    // Append the icon and h3 to the oneList container
    oneList.appendChild(cell);

    // Append the oneList container to the main container
    specialitiesDiv.appendChild(oneList);
  });

  // Add the "availableSpecialities" class to the specialitiesDiv
  // specialitiesDiv.classList.add("availableSpecialities");
}

createCardsForSubscribes();
createServiceCard();
availableSpecialities();

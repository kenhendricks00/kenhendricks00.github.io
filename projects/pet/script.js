const petContainer = document.getElementById("pet-container");
const nameTitle = document.getElementById("name");
const feedButton = document.getElementById("feed-btn");
const playButton = document.getElementById("play-btn");
const batheButton = document.getElementById("bathe-btn");
const sleepButton = document.getElementById("sleep-btn");
const treatSickButton = document.getElementById("treat-sick-btn");

let petStage = 0; // 0: egg, 1: chick, 2: young, 3: adult, 4: death
let isSick = false;
let isSleeping = false;
let isDead = false;
let tombstoneAppended = false; // Add this flag at the top of your script

let cleanliness = 100;
let energy = 100;
let hunger = 0;
let happiness = 100; // Initialize happiness

const cleanlinessDisplay = document.getElementById("cleanliness");
const energyDisplay = document.getElementById("energy");
const hungerDisplay = document.getElementById("hunger");
const happinessDisplay = document.getElementById("happiness");

// Initial stat displays and progress bars
updateStatDisplays();
updateStatProgress("cleanliness", cleanliness);
updateStatProgress("energy", energy);
updateStatProgress("hunger", hunger);
updateStatProgress("happiness", happiness);

if (isDead) {
    feedButton.disabled = true;
    playButton.disabled = true;
    batheButton.disabled = true;
    sleepButton.disabled = true;
    treatSickButton.disabled = true;
  }

function updateStatDisplays() {
  cleanlinessDisplay.textContent = cleanliness;
  energyDisplay.textContent = energy;
  hungerDisplay.textContent = hunger;
  happinessDisplay.textContent = happiness; // Add this line
}

// Function to update stat progress bars
function updateStatProgress(statId, progress) {
  const progressBar = document.getElementById(statId + "-progress");
  progressBar.style.width =
    Math.max(0, Math.min(100, Math.ceil(progress))) + "%"; // Apply min and max limits
}

// Function to update stats
function updateStats() {
    if (isDead) {
        return; // Exit the function if the pet is dead
    }
    
  if (petStage > 0 && !isSleeping) {
    // Calculate individual stat changes
    const cleanlinessChange = -5;
    const energyChange = -5;
    const hungerChange = 5;

    // Calculate new stat values after changes
    const newCleanliness = Math.max(0, cleanliness + cleanlinessChange);
    const newEnergy = Math.max(0, energy + energyChange);
    const newHunger = Math.max(0, hunger + hungerChange);

    // Apply the changes to stats
    cleanliness = newCleanliness;
    energy = newEnergy;
    hunger = newHunger;

    // Calculate happiness based on other attributes
    if (cleanliness > 0 && energy > 0 && hunger < 100) {
        happiness = Math.ceil(100 - (cleanliness + energy + hunger) / 3);
      }

    // Check if any of the stats are at or below 25%
    if (cleanliness <= 25 || energy <= 25 || hunger >= 75) {
      isSick = true;
      sicknessEffect();
    }

    if (cleanliness <= 0 || energy <= 0 || hunger >= 100) {
      isDead = true; // Pet is dead
      petStage = 4; // Set pet stage to death
      updatePetDisplay(); // Update the pet's emoji
      return; // Exit the function to prevent further updates
    }

    // Update displays and progress bars
    updateStatDisplays();
    updateStatProgress("cleanliness", cleanliness);
    updateStatProgress("energy", energy);
    updateStatProgress("hunger", hunger);
    updateStatProgress("happiness", happiness);
    updatePetDisplay();
  }
}

function sicknessEffect() {
  // Decrease all stats gradually when the pet is sick
  cleanliness -= 2;
  cleanliness = Math.max(0, cleanliness); // Ensure it doesn't go below 0

  energy -= 2;
  energy = Math.max(0, energy); // Ensure it doesn't go below 0

  hunger += 2;
  hunger = Math.min(100, hunger); // Ensure it doesn't exceed 100

  // Update displays and progress bars
  updateStatDisplays();
  updateStatProgress("cleanliness", cleanliness);
  updateStatProgress("energy", energy);
  updateStatProgress("hunger", hunger);
  updatePetDisplay();

  // Check if any stat is empty
  if (cleanliness <= 0 || energy <= 0 || hunger >= 100) {
    isDead = true; // Pet is dead
    petStage = 4; // Set pet stage to death
    updatePetDisplay(); // Update the pet's emoji
    return; // Exit the function to prevent further updates
  }
}

function updatePetDisplay() {
  let petEmoji;
  let overlayEmoji = "";

  // Remove any existing tombstone elements before appending
  const existingTombstones = document.querySelectorAll(".overlay-tombstone");
  existingTombstones.forEach((element) => {
    element.remove();
  });

  switch (petStage) {
    case 0:
      petEmoji = "🥚";
      petContainer.classList.add("wiggle"); // Add wiggle animation class
      break;
    case 1:
      petEmoji = "🐣";
      petContainer.classList.remove("wiggle"); // Remove wiggle animation class
      if (petName === "Carlos") {
        overlayEmoji = "🕶️";
      }
      if (petName === "Kylie") {
        overlayEmoji = "🎀";
      }
      break;
    case 2:
          petEmoji = "🐥";
          if (petName === "Carlos") {
            overlayEmoji = "🕶️";
          }
          if (petName === "Kylie") {
            overlayEmoji = "🎀";
          }
      break;
    case 3:
      petEmoji = "🐓";
      break;
    case 4:
      petEmoji = "🪦";
      petContainer.innerHTML = petEmoji; // Change this line
      if (!tombstoneAppended) {
        petContainer.innerHTML +=
          '<div class="overlay-tombstone text-white">' + petName + "</div>";
        tombstoneAppended = true;
          }
           // Disable interaction buttons when the pet is dead
          feedButton.disabled = true;
  playButton.disabled = true;
  batheButton.disabled = true;
  sleepButton.disabled = true;
  treatSickButton.disabled = true;
      break;
  }

  if (isSleeping) {
    petContainer.innerHTML =
      petEmoji + '<div class="sleeping-overlay">💤</div>';
  } else if (isSick) {
    if (!isDead) {
      nameTitle.innerHTML =
        '<div class="sickness-alert">' + petName + " 🤢</div></span>";
    }
  } else if (isDead) {
    nameTitle.innerHTML =
      '<div class="death-alert">' + petName + " 💀</div></span>";
  } else {
    petContainer.innerHTML = petEmoji;
  }

  if (overlayEmoji && petName === "Carlos" && petStage === 1) {
    petContainer.innerHTML +=
      '<div class="overlay-sunglasses">' + overlayEmoji + "</div>";
  }

  if (overlayEmoji && petName === "Kylie" && petStage === 1) {
    petContainer.innerHTML +=
      '<div class="overlay-bow">' + overlayEmoji + "</div>";
  }

  if (petStage === 4) {
      isDead = true;
      nameTitle.innerHTML =
      '<div class="death-alert">' + petName + " 💀</div></span>";
    petContainer.innerHTML +=
      '<div class="overlay-tombstone text-white">' + petName + "</div>";
  }
}

function advancePetStage() {
  if (!isSleeping) {
    if (petStage < 3) {
      petStage++;
      updatePetDisplay();
    }
  }
}

// Feed button event listener
feedButton.addEventListener("click", () => {
  if (petStage > 0 && hunger > 0 && !isSleeping) {
    hunger -= 10;
    hunger = Math.max(0, hunger); // Ensure it doesn't go below 0

    energy += 10;
    energy = Math.min(100, energy); // Ensure it doesn't exceed 100

    updateStatDisplays();
    updateStatProgress("hunger", hunger);
    updateStatProgress("energy", energy);
  }
});

// Play button event listener
playButton.addEventListener("click", () => {
  if (petStage > 0 && energy > 0 && !isSleeping) {
    energy -= 10;
    energy = Math.max(0, energy); // Ensure it doesn't go below 0

    happiness += 10;
    happiness = Math.min(100, happiness); // Ensure it doesn't exceed 100

    updateStatDisplays();
    updateStatProgress("energy", energy);
    updateStatProgress("happiness", happiness);
  }
});

// Bathe button event listener
batheButton.addEventListener("click", () => {
  if (petStage > 0 && cleanliness < 100 && !isSleeping) {
    cleanliness += 10;
    cleanliness = Math.min(100, cleanliness); // Ensure it doesn't exceed 100

    updateStatDisplays();
    updateStatProgress("cleanliness", cleanliness);
  }
});

sleepButton.addEventListener("click", () => {
  if (petStage > 0) {
    isSleeping = !isSleeping;

    if (isSleeping) {
      petContainer.classList.add("sleeping"); // Add the sleeping class
      const initialEnergy = energy;
      const initialHunger = hunger;

      const sleepDuration = (1 - initialEnergy / 100) * 30 * 1000 + 30000; // Range: 30s to 1 minute
      const startTime = Date.now();

      function updateSleepStats() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;

        energy = Math.ceil(
          Math.min(
            initialEnergy +
              (elapsedTime / sleepDuration) * (100 - initialEnergy),
            100
          )
        );
        hunger = Math.max(
          Math.ceil(
            initialHunger + (elapsedTime / sleepDuration) * (initialHunger * 2)
          ),
          0
        );

        updatePetDisplay();
        updateStatDisplays();
        updateStatProgress("energy", energy);
        updateStatProgress("hunger", hunger);

        if (isSleeping) {
          requestAnimationFrame(updateSleepStats);
        }
      }

      // Call the updateSleepStats function to update attributes
      updateSleepStats();
      setTimeout(() => {
        isSleeping = false;
        petContainer.classList.remove("sleeping"); // Remove sleeping class
        updatePetDisplay();
      }, sleepDuration);
    } else {
      petContainer.classList.remove("sleeping"); // Remove the sleeping class
      updatePetDisplay();
    }
  }
});

// Treat sickness button event listener
treatSickButton.addEventListener("click", () => {
  if (isSick) {
    if (cleanliness <= 25) cleanliness = 50;
    if (energy <= 25) energy = 50;
    if (hunger <= 25) hunger = 50;

    isSick = false;
    updatePetDisplay();
    updateStatDisplays();
    updateStatProgress("cleanliness", cleanliness);
    updateStatProgress("energy", energy);
    updateStatProgress("hunger", hunger);
    updateStatProgress("happiness", happiness);
  }
});

// Automatically advance pet's stage over time
setInterval(() => {
  advancePetStage();
}, 20000); // Advance stage every 20 seconds

// Update stats and progress bars periodically
setInterval(() => {
  updateStats();
}, 10000); // Update every 10 seconds

// Random pet names
const petNames = [
  "Fluffy",
  "Buddy",
  "Charlie",
  "Max",
  "Luna",
  "Milo",
  "Rocky",
  "Daisy",
  "Bailey",
  "Coco",
  "Carlos",
  "Kylie",
];

let currentNameIndex = Math.floor(Math.random() * petNames.length);
let petName = petNames[currentNameIndex];
const petNameElement = document.getElementById("name");

function changePetName() {
  currentNameIndex = (currentNameIndex + 1) % petNames.length;
  petName = petNames[currentNameIndex];
  petNameElement.textContent = petName;
}

window.addEventListener("DOMContentLoaded", () => {
  // Change pet name on page load
  changePetName();
  updatePetDisplay();
});

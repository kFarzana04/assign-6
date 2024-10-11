let petsData = []; // To store fetched pet data

// Function to display pets in the pet container
function displayPets(pets) {
  const petContainer = document.querySelector("#left-pets-container .grid");
  petContainer.innerHTML = ""; // Clear existing pet cards

  // Inside the displayPets function, add event listener for "Details" button
  // Inside the displayPets function, add event listener for "Details" button
  pets.forEach((pet) => {
    const petCard = document.createElement("div");
    petCard.className = "bg-white shadow-lg rounded-lg px-2 py-2";
    petCard.innerHTML = `
      <figure class="px-1 py-2">
          <img src="${pet.image}" alt="${
      pet.pet_name
    }" class="rounded-lg object-cover w-full h-48" />
      </figure>
      <div class="card-body p-4">
          <h2 class="card-title text-2xl font-bold text-black mb-2">${
            pet.pet_name
          }</h2>
          <div class="flex items-center mb-2 text-gray-600">
              <img src="./images/breed.png" alt="Breed Icon" class="mr-2">
              <span>Breed: ${pet.breed || "N/A"}</span>
          </div>
          <div class="flex items-center mb-2 text-gray-600">
              <img src="./images/birth.png" alt="Calendar Icon" class="mr-2">
              <span>Birth: ${pet.date_of_birth || "Unknown"}</span>
          </div>
          <div class="flex items-center mb-2 text-gray-600">
              <img src="./images/gender.png" alt="Gender Icon" class="mr-2">
              <span>Gender: ${pet.gender}</span>
          </div>
          <div class="flex items-center mb-2 text-gray-600">
              <img src="./images/price.png" alt="Price Icon" class="mr-2">
              <span>Price: ${pet.price !== null ? pet.price : "N/A"}</span>
          </div>
          <div class="card-actions justify-between mt-4">
              <div class="flex space-x-4">
                  <button class="flex items-center border border-[#0E7A81] text-xs text-[#0E7A81] rounded-lg px-3 py-2 like-btn" data-image="${
                    pet.image
                  }">
                      <img src="./images/like.png" alt="Like Icon" class="mr-2">Like
                  </button>
                  <button class="border border-[#0E7A81] text-xs text-[#0E7A81] rounded-lg px-3 py-2">Adopt</button>
                  <button class="border border-[#0E7A81] text-xs text-[#0E7A81] rounded-lg px-3 py-2 details-btn">Details</button>
              </div>
          </div>
      </div>
    `;
    petContainer.appendChild(petCard);

    // Add event listener for like button
    petCard.querySelector(".like-btn").addEventListener("click", function () {
      addToLikedImages(pet.image);
    });
    

    // Add event listener for details button
    petCard
      .querySelector(".details-btn")
      .addEventListener("click", function () {
        const modal = document.getElementById("my_modal_5");
        // Populate the modal with the pet details
        const modalContent = `
        <figure class="px-4 pt-4">
          <img src="${pet.image}" alt="${
          pet.pet_name
        }" class="rounded-lg object-cover w-full h-48" />
      </figure>
      <div class="card-body p-4">
          <h2 class="card-title text-2xl font-bold text-black mb-2">${
            pet.pet_name
          }</h2>
        <div class="flex items-center mb-2 text-gray-600">
              <img src="./images/breed.png" alt="Breed Icon" class="mr-2">
              <span>Breed: ${pet.breed || "N/A"}</span>
          </div>
          <div class="flex items-center mb-2 text-gray-600">
              <img src="./images/birth.png" alt="Calendar Icon" class="mr-2">
              <span>Birth: ${pet.date_of_birth || "Unknown"}</span>
          </div>
          <div class="flex items-center mb-2 text-gray-600">
              <img src="./images/gender.png" alt="Gender Icon" class="mr-2">
              <span>Gender: ${pet.gender}</span>
          </div>
          <div class="flex items-center mb-2 text-gray-600">
              <img src="./images/price.png" alt="Price Icon" class="mr-2">
              <span>Price: ${pet.price !== null ? pet.price : "N/A"}</span>
          </div>
          <hr/>
          <p><span>Details: ${pet.pet_details || "Unknown"}</span></p>
      `;
        modal.querySelector(".modal-box").innerHTML =
          modalContent +
          `
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      `;

        modal.showModal();
      });
  });
}

// Function to display a no-data message
function displayNoDataMessage(message) {
  const petContainer = document.querySelector("#left-pets-container .grid");
  petContainer.innerHTML = `<div class="text-center text-gray-600 text-xl">${message}</div>`;
}

// Function to fetch all pets
async function fetchAllPets() {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await response.json();
    petsData = data.pets; 
    return petsData; 
  } catch (error) {
    console.error("Error fetching all pets:", error);
  }
}

// Function to fetch pets by category
async function fetchPetsByCategory(categoryName) {
  const spinner = document.getElementById("spinner");
  const petContainer = document.querySelector("#left-pets-container .grid");

  // Show spinner
  spinner.classList.remove("hidden");

  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
    );
    const data = await response.json();
    const pets = data.data; // Get only the first 3 pets

    // Delay for 2 seconds to show the spinner
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Hide spinner
    spinner.classList.add("hidden");

    // Check if there are no pets
    if (pets.length === 0) {
      displayNoDataMessage(`
                <div class="flex items-center justify-center h-screen">
                    <div class="text-center">
                        <img src="../images/error.webp" class="w-48 h-48 mb-4" alt="Error Image" />
                        <h1 class="text-3xl font-semibold text-gray-800">No Information Available</h1>
                    </div>
                </div>
            `);
    } else {
      displayPets(pets);
    }
  } catch (error) {
    console.error("Error fetching pets by category:", error);
    // Hide spinner in case of error
    spinner.classList.add("hidden");
  }
}

// Function to fetch categories
async function fetchCategories() {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await response.json();
    const categoriesContainer = document.getElementById("categories");
    categoriesContainer.innerHTML = ""; // Clear existing categories

    data.categories.forEach((category) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className =
        "category-card border border-gray-200 rounded-full py-4 px-2 bg-white shadow-md hover:shadow-lg hover:bg-[#e6f1f2] hover:border-[#0E7A811A] transition-all";
      categoryDiv.id = `category-${category.category.toLowerCase()}`;
      categoryDiv.innerHTML = `
                <a href="#" class="flex flex-row items-center justify-center" data-category="${category.category.toLowerCase()}">
                    <img class="w-8 h-8" src="${category.category_icon}" alt="${
        category.category
      }" class="object-cover rounded-full mb-3">
                    <span class="text-lg font-semibold text-gray-800">${
                      category.category
                    }</span>
                </a>
            `;

      categoryDiv.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        const categoryName = e.target.dataset.category;
        fetchPetsByCategory(categoryName);
      });

      categoriesContainer.appendChild(categoryDiv);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Add image to liked images section
function addToLikedImages(imageUrl) {
  const likedImagesContainer = document.getElementById("liked-images");

  // Create a image div
  const imageDiv = document.createElement("div");
  imageDiv.className = "bg-gray-200 border border-gray-300 rounded-lg p-2 mt-2"; // Apply Tailwind styles
  imageDiv.innerHTML = `<img src="${imageUrl}" alt="Liked Pet Image" class="object-cover w-full h-32 rounded-lg">`;

  // Append the new image to the liked images container
  likedImagesContainer.appendChild(imageDiv);
}

// Add event listener for the sort button
document.getElementById("sort-price-btn").addEventListener("click", () => {
  const sortedPets = [...petsData].sort(
    (a, b) => (b.price || 0) - (a.price || 0)
  ); // Sort by price descending
  displayPets(sortedPets);
});

// Fetch pets and categories when the page loads
window.onload = async () => {
  await fetchCategories();
  petsData = await fetchAllPets();
  displayPets(petsData); 
};

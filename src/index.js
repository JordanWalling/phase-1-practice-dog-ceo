document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  // select dog container
  const container = document.querySelector("#dog-image-container");

  // fetch dog images
  async function fetchData() {
    const resp = await fetch(imgUrl);
    const data = await resp.json();
    const { message } = data;

    message.forEach((dog) => {
      let img = document.createElement("img");
      img.setAttribute("src", dog);
      container.appendChild(img);
    });
  }

  const ul = document.querySelector("#dog-breeds");

  // fetch Dog Breeds
  async function fetchBreeds() {
    const resp = await fetch(breedUrl);
    const data = await resp.json();
    const { message } = data;

    let breeds = Object.keys(message);

    breeds.forEach((breed) => {
      let li = document.createElement("li");
      li.innerHTML = breed;
      li.addEventListener("click", () => {
        li.style.color = "blue";
      });
      ul.appendChild(li);
    });

    // dropdown to select dogs by their starting letter
    const dropdown = document.querySelector("#breed-dropdown");
    dropdown.addEventListener("change", () => {
      ul.innerHTML = "";
      const selectedLetter = dropdown.value.toLowerCase();

      // Filter breeds based on the selected letter
      let filteredBreeds = breeds.filter(
        (breed) => breed.charAt(0) === selectedLetter
      );

      filteredBreeds.forEach((breed) => {
        let li = document.createElement("li");
        li.innerHTML = breed;
        li.addEventListener("click", () => {
          li.style.color = "blue";
        });
        ul.appendChild(li);
      });
    });
  }

  fetchData();
  fetchBreeds();
}

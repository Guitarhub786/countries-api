const super_container = document.getElementById('super_container');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

const REGIONS_ADDON_DATA = {
  AF: ['#F012BE', 'Africa'],
  NA: ['#7FDBFF', 'North America'],
  OC: ['#FFCC33', 'Oceania'],
  AN: ['#3366FF', 'Antarctica'],
  AS: ['#ff3366', 'Asia'],
  EU: ['#39CCCC', 'Europe'],
  SA: ['#ff6633', 'South America']
}


const main_types = Object.keys(REGIONS_ADDON_DATA)
console.log(main_types)

const test_consoleLog_AllObjects = Object(REGIONS_ADDON_DATA)
console.log(test_consoleLog_AllObjects)



searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.capital.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch('./countries.json');
    hpCharacters = await res.json();
    // console.log(hpCharacters)

    displayCharacters(hpCharacters);
  } catch (err) {
    console.error("Harry Potter Said", err);
  }
};

const displayCharacters = (characters) => {
  console.log("-=(NEW SEARCH)=-")
  let count = 1; // how many hits
  const htmlString = characters
    .map((country) => {
      const super_types = country.region
      // console.log(super_types)

      // Goes over types and finds first one in the array
      const type = main_types.find(
        type => super_types.indexOf(type) > -1
      )
      // console.log("type", type, "super_types", super_types)
      const colorize = REGIONS_ADDON_DATA[type]
      // console.log(colorize[0], colorize[1], "[hits]-->", count)
      console.log(colorize[0], colorize[1], "[hits]-->", count)
      count++;

      // super_container.style.backgroundColor = "orange";

      // fix lowercase "bad" to "Bad"
      const myAlignment = country.region[0].toUpperCase() + country.region.slice(1)

      return `
<div class="country" style="background-color: ${colorize[0]}">
  <div class="img-container">
    <img src=${country.flag} />
  </div>
    <h3 class="name">${country.name}</h3>
    <h3 class="capital">${country.capital}</h3>
     <small class="type">Type: <span>${type}</span></small>
    <h3 class="region">${colorize[1]}</h3>
    <h3 class="language">${country.language.name}</h3>
    <h3 class="currency">${country.currency.name}</h3>
    <h3 class="symbol">${country.currency.symbol}</h3>
</div>

        `;
    })
    .join('');
  super_container.innerHTML = htmlString;
};

loadCharacters();
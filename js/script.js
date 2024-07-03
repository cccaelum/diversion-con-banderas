/* Codigo corregido */

const countriesList = document.getElementById("countries-list") 
const divficha = document.getElementById("ficha")

const getCountry = async () => { //funcion fecth
  try {
    const response = await fetch("https://restcountries.com/v3/all")
    const countries = await response.json()
    sortedCountries(countries)
    return countries
  } catch (err) {
    console.log("Se ha producido un error al introducir los datos", err)
  }
}

const sortedCountries = (countries) => { //funcion para ordenar alfabeticamente
  countries.sort((a, b) => {
    const nameA = a.name.common.toUpperCase()
    const nameB = b.name.common.toUpperCase()
    return nameA.localeCompare(nameB)
})}

getCountry().then(countries => { //llamamos al fecth y pintamos en el DOM
  countries.forEach((country) => {
    const template = `
    <li class="cardflags">
    <img src="${country.flags[0]}" alt="${country.name.common}" />
    <h2>${country.name.common}</h2>
    </li>
    `
    countriesList.innerHTML += template
  });
  countries.forEach((country, index) => { //una vez cargada la lista de paises, los recorremos individualmente
    const countryElement = document.querySelectorAll('.cardflags')[index];
    
    countryElement.addEventListener('click', () => {
      const fichaTemplate = `
      <div>
      <button onclick="closeInfo()">X</button>
        <p>${country.name.common}</p>
        <img src="${country.flags[0]}" alt="${country.name.common}" width=200px/>
        <p>Capital: ${country.capital ? country.capital[0] : `${country.name.common}`}</p>
        <p>Población: ${country.population}</p>
        <p>Lado de la carretera: ${country.car.side === 'left' ? 'Izquierda' : 'Derecha'}</p>
      </div>
      `
      divficha.innerHTML = fichaTemplate
      divficha.classList.add("active")
    });  
  });
  
})

function closeInfo () {
  divficha.classList.remove("active")
}

/*Mi codigo cuando hice el ejercicio*/

/*const listaPaises = document.getElementById('countries-list');

const fetchFlags = async () => {
  const response = await fetch('https://restcountries.com/v3/all');
  const data = await response.json();
  return data;
}

const mostrarPaises = async () => {
  try {
    const countries = await fetchFlags();
    
    countries.sort((a, b) => {
        const nameA = a.name.common.toUpperCase(); 
        const nameB = b.name.common.toUpperCase(); 
        return nameA.localeCompare(nameB)
      });

    countries.forEach(country => {
      const name = country.name.common; 
      const capital = country.capital ? country.capital[0] : 'N/A';
      const population = country.population;
      const flag = country.flags[0];
      const carSide = country.car.side;

      const template = `
      <div class='container'>
      <ul><li class='country'>
        <h2>${name}</h2>
        <img src="${flag}" alt="${name}" width="100">
        <p>Capital: ${capital}</p>
        <p>Población: ${population}</p>
        <p>Lado de la carretera: ${carSide === 'left' ? 'Izquierda' : 'Derecha'}</p>
        <hr>
      </li></ul></div>
    `;
    listaPaises.innerHTML += template;
    });

  } catch (error) {
    console.error('Ocurrió un error:', error);
  }
}

mostrarPaises();*/
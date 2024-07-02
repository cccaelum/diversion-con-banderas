const listaPaises = document.getElementById('countries-list');

const fetchFlags = async () => {
  const response = await fetch('https://restcountries.com/v3/all');
  const data = await response.json();
  return data;
}

const mostrarPaises = async () => {
  try {
    const countries = await fetchFlags();
    
    countries.forEach(country => {
      const name = country.name.common; 
      const capital = country.capital ? country.capital[0] : 'N/A';
      const population = country.population;
      const flag = country.flags[0];

      const template = `
      <li>
        <h2>${name}</h2>
        <img src="${flag}" alt="${name}" width="100">
        <p>Capital: ${capital}</p>
        <p>Población: ${population}</p>
        <hr>
      </li>
    `;
    listaPaises.innerHTML += template;
    });

  } catch (error) {
    console.error('Ocurrió un error:', error);
  }
}

mostrarPaises();

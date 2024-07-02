const listaPaises = document.getElementById('countries-list');

const fetchFlags = async () => {
  const response = await fetch('https://restcountries.com/v3/all');
  const data = await response.json();
  return data;
}

const mostrarPaises = async () => {
  try {
    const countries = await fetchFlags();
    
    countries.sort((a, b) => {
        const nameA = a.name.common.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase(); // Convertimos el nombre común del país 'a' a mayúsculas
        const nameB = b.name.common.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase(); // Convertimos el nombre común del país 'b' a mayúsculas
  
        if (nameA < nameB) {
          return -1; // Si nameA es menor que nameB, a se coloca antes que b
        }
        if (nameA > nameB) {
          return 1; // Si nameA es mayor que nameB, a se coloca después que b
        }
        return 0; // Si nameA y nameB son iguales, no se cambia el orden
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

mostrarPaises();

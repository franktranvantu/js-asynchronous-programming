const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

function getJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if(xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
        reject(Error(xhr.responseText));
      }
    };
    xhr.onerror = () => reject(Error('A network error occurred'));
    xhr.send();
  });
}

function getProfiles(json) {
  const profiles = json.people.map( person => {
    return getJSON(wikiUrl + person.name);
  });
  return Promise.all(profiles);
}

// Generate the markup for each profile
function generateHTML(data) {
  data.map(person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    const src = person.thumbnail ? person.thumbnail.source : 'img/profile.jpg';
    section.innerHTML = `
      <img src=${src}>
      <h2>${person.title}</h2>
      <p>${person.description}</p>
      <p>${person.extract}</p>
    `;
  });
}

btn.addEventListener('click', (event) => {
  getJSON(astrosUrl)
    .then(getProfiles)
    .then(generateHTML)
    .catch(err => console.log(err));
  event.target.remove();
});
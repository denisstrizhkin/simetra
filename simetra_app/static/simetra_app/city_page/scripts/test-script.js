const cityUnparsed = JSON.parse(document.getElementById('cities-list-json').textContent);
const cityParsed = JSON.parse(cityUnparsed);

console.log(cityParsed['rating_security_n_development']);
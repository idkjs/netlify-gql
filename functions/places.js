const fs = require('fs');
const places = JSON.parse(fs.readFileSync("./data.json", "utf8"));

const addPlace = (name, description) => {
  const id = places[places.length - 1].id + 1;
  const newPlace = { id, name, description };
  places = [...places, newPlace];
  return { ...newPlace };
};

const getPlaces = () => {
  return places;
};

module.exports = {
  getPlaces,
  addPlace
};

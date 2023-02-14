import station from "./models/stations/station.model.js";

const allStations = await station.findAll();
console.log(allStations);
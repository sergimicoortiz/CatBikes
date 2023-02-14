import Stations from './station.model.js';
const stationResolvers = {
    Query: {
        stationCount: async () => await Stations.count(),
        stations: async () => await Stations.findAll(),
        station: async (parent, args) => await Stations.findOne({ where: { slug: args.slug } })
    }
};

export default stationResolvers;
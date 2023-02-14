import stations from './station.model.js';
const stationResolvers = {
    Query: {
        stationCount: async () => await stations.count(),
        stations: async () => await stations.findAll(),
        station: async (parent, args) => await stations.findOne({ where: { slug: args.slug } })
    }
};

export default stationResolvers;
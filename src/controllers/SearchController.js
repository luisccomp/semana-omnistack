const Dev = require('../models/Dev');

module.exports = {
    /**
     * Listando todos os desenvolvedores com base nas tecnologias e na sua
     * geolocalização.
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response) {
        // Buscar todos os devs num raio de 10km e filtrar por tecnologias
        // console.log(request.query);
        let { latitude, longitude, techs } = request.query;
        let techsArray = techs.split(',').map(tech => tech.trim());

        let devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        return response.json(devs);
    }
};

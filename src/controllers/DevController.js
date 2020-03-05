const axios = require('axios');

const Dev = require('../models/Dev');


module.exports = {
    /**
     * Insere um novo desenvolvedor no banco de dados da aplicação com base no
     * que é passado no corpo da requisição.
     * @param {*} request 
     * @param {*} response 
     */
    async store(request, response) {
        let { github_username, techs, latitude, longitude } = request.body;

        // Transformando a string de techs em um array de tecnologias e
        // eliminando os espaços em branco.        
        let techsArray = techs.split(',').map(tech => tech.trim());

        console.log(techsArray);

        // O if garante que o dev seja cadastrado apenas uma única vez
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            // Consultando os dados do desenvolvedor através da api do github
            // antes de cadastrá-lo.
            let apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            // Criando a localização com base nas coordenadas do desenvolvedor
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            let { name=login, avatar_url, bio } = apiResponse.data;

            // Inserindo o nosso dev no banco de dados (sempre colocar o await)
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }

        return response.json(dev);
    },

    /**
     * Lista todos os desenvolvedores que estão armazenados no banco de dados
     * da aplicação.
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response) {
        return response.json(await Dev.find());
    }
};

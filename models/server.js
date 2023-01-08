const express = require('express')
const cors = require('cors');
const { dbConnect } = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
                users: '/api/users',
                auth: '/api/auth',
                categories: '/api/categories'
            }
            // Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares()

        // Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnect();
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.users, require('../routes/user'))
        this.app.use(this.paths.categories, require('../routes/categories'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
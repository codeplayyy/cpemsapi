const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const config = require('./config.json');

// Create database connection 
mongoose.connect(config.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

// Connected
mongoose.connection.on('connected', function () {
    console.log(`Mongoose connected to ${config.mongo.url}`);
});

// Disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

// If Node process ends, close Mongoose connection 
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection terminated due to app termination');
        process.exit(0);
    });
});

const server = new ApolloServer({
    modules: [
        require('./api/organistaion'),
    ],

    formatError: (error) => {
        // Implement error logging here
        console.error(error);

        return {
            message: config.error.ise,
            path: error.path,
        };
    },

    context: ({ req }) => {
        return {
            // Empty context
        }
    }
});

server.listen(config.app.port).then((service) => { console.log(`Apollo at ${service.url}`); });
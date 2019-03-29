const server = require('./api/server.js');

const port = 3300;

server.listen(port, () => {
    console.log(`*** API is listening on http://localhost:${port} ***`)
});
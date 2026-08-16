const http = require('http');
const next = require('next');

// Inicializamos Next.js en modo producción
const app = next({ dev: false });
const handle = app.getRequestHandler();

// Passenger de DreamHost requiere que escuchemos en el socket 'passenger'
app.prepare().then(() => {
    const server = http.createServer((req, res) => {
        handle(req, res);
    });
    
    server.listen('passenger', () => {
        console.log('Next.js server started on DreamHost via Passenger');
    });
});

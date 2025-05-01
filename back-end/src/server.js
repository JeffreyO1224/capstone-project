import app from "./app.js";
import database from "./database.js";

app.get('/hello', function(req, res) {
    res.send('Hello from Get!');
});

app.get('/hello/:name', function(req, res) {
    res.send('Hello, ' + req.params.name + ' from Get with Params!');
});

app.post('/hello', function(req, res) {
    res.send('Hello, ' + req.body.name + ' from Post!');
});

app.listen(8080, function() {
    console.log('Server is listening on port 8080');
});
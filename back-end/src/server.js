import express from 'express';

const app = express();

app.use(express.json());

app.get('/hello', function(req, res) {
    res.send('Hello from Get!');
});

app.get('/hello/:name', function(req, res) {
    res.send('Hello, ' + req.params.name + ' from Get with Params!');
});

app.post('/hello', function(req, res) {
    res.send('Hello, ' + req.body.name + ' from Post!');
});

app.listen(8000, function() {
    console.log('Server is listening on port 8000');
});
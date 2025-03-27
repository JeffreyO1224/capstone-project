import app from "./app.js";

app.get('/hello', function(req, res) {
    res.send('Hello from Get!');
});

app.get('/hello/:name', function(req, res) {
    res.send('Hello, ' + req.params.name + ' from Get with Params!');
});

app.post('/hello', function(req, res) {
    res.send('Hello, ' + req.body.name + ' from Post!');
});

//For reference
/*
app.post('/api/articles/:name/like', function(req, res) {
    const article = articleInfo.find(a => a.name === req.params.name);
    article.upvotes += 1;

    res.send('Success! The article ' + req.params.name + ' now has ' + article.likes + ' likes!');
});
*/

app.listen(8000, function() {
    console.log('Server is listening on port 8000');
});
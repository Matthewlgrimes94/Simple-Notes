const express = require('express');
const path = require('path');
const fs = require('fs');

var id = 1;

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', function(req, res) {
    res.json('Develop/db/db.json');
});

app.post('/api/notes', function(req, res) {
    var data = req.body;
    data.id = id
    fs.appendFile('Develop/db/db.json', data, (err) => {
        if (err) throw err;
        console.log('Notes updated');
      });
    id += 1;
});

// app.delete('/api/nores/:id', function(req, res) {
//     var removeId = req.params.id;
//     var content;
//     fs.readFile('Develop/db/db.json', function(err, data) {
//         if (err) { throw new error;
//         }
//         content = data;
//         var elementPos = array.map(function(x) {return x.id; }).indexOf(removeId);
//         content.splice(elementPos, 1);
//         fs.writeFile('./db/db.json', content, (err) => {
//             if(err) throw new error;
//             console.log('Removed');
//         });
//     });
// });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

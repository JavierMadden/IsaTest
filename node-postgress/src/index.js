const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
// Initialize

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json())

//Settings
app.set('port', process.env.PORT || 3000);
// Starting the server 
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`.bgYellow);
})


// Routes 

app.use(require('../routes/routes')); 

const express =  require('express');
const hbs = require('hbs');
const fs = require('fs');

const  port  =  process.env.PORT || 3000;

var app =  express();
hbs.registerPartials(__dirname + '/views/partials' )
app.set('view engine','hbs') // express configuration to use hbs

//middleware
// http://localhost:3000/help.html
//static

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}; ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log',log +'\n',(err)=>{
        if(err){
            console.log("Unable to append")
        }
    });
    next();
})

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// })
app.use(express.static(__dirname +  '/public'))

hbs.registerHelper('getCurrentYear',()=>{
    //return "this"
    return new Date().getFullYear()

    })
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase()

})
app.get('/',(req, res)=>{
    //res.send("<h1>test</h1>")
    // res.send({
    //     name:"Joseph",
    //     likes: [1,2,3]
    // })
    res.render('home.hbs',{
        welcomeMessage: "Welcome to the homepage",
        pageTitle: 'Home Page',


    })
})

app.get('/about',(req,res)=>{
    // res.send("Inside ABout")
    res.render('about.hbs',{
        pageTitle: 'About Page',

    })
})

app.get('/bad',(req,res)=>{
    res.send({
        error: "Bad page"
    })
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
});

//heroku

var express = require('express')
var app = express()
app.use(express.static("./dist"));
app.get('./', (req,res)=> {
res.sendFile("./index.html");
})
app.listen(9000)
javascript:void(null)

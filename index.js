const express = require('express'),
      fileUpload = require('express-fileupload'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      _ = require('lodash'),
      path = require('path')
     
      
    require('dotenv').config({ path: '.env' })
const port = process.env.PORT || 8080,
      app = express()

// enable files upload
app.use(fileUpload({
    createParentPath: true
}))

//add other middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))
app.get('/', function (req, res) {  
  res.sendFile(path.join(__dirname + '/index.html'))
})
app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv(__dirname +'/uploads/' + avatar.name,function(err) {
             if(err){
                    console.log(err);
                }
            })
            //console.log( avatar)
            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            })
        }
    } catch (err) {
        res.status(500).send(err);
    }
})



//start app 


app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);
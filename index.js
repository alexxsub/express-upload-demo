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
            })
        } else {            
            let uploadfile = req.files            
            
            Object.keys(uploadfile).forEach(key => {                      
                const dst = __dirname + '/uploads/' + uploadfile[key].name                  
                uploadfile[key].mv(dst,err =>console.log(err))
                })
            
            //send response
            res.send({
                status: true,
                message: 'Files is uploaded'                
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
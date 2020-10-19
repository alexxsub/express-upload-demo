
import fileUpload from 'express-fileupload'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import _  from 'lodash'
import path from 'path'
import rfs from 'rotating-file-stream'
import  express  from 'express' 
import dotenv from 'dotenv'
    dotenv.config({ path: '.env' })
const port = process.env.PORT || 8080,
    app = express(),
    __dirname = process.env.PWD
    
// enable files upload
app.use(fileUpload({
    createParentPath: true
}))

//add other middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})
// setup logger
//app.use(morgan('dev')) 
//app.use(morgan('combined', { stream: accessLogStream }))
// custom log format
app.use(morgan(function (tokens, req, res) {
    var f = req.files
    Object.keys(f).forEach(key => { 
        delete f[key].data
    })
    return [
    tokens.method(req, res),
    JSON.stringify(f),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
},{ stream: accessLogStream }))
app.get('/', function (req, res) {  
  res.sendFile(path.join(__dirname,'/index.html'))
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
                const dst =path.join(__dirname, 'uploads/', uploadfile[key].name)                  
                uploadfile[key].mv(dst,err =>err!==undefined?console.log(err):'')
                })
            
            //send response
            res.send({
                status: true,
                message: 'Files is uploaded'                
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
})



//start app 


app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
)
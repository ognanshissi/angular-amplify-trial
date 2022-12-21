const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const Post = require('./models/Post');
const { default: mongoose } = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb+srv://boxtrackAdmin:0nWYnPafeiA4D6Ge@dev-cluster.cxrhz.mongodb.net/ng-amplify-post-db?retryWrites=true&w=majority';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/posts', async function(req, res) {
  // Add your code here
  try {
    const posts = await Post.find({});
    return res.json({success: 'get call succeed!', url: req.url, data: posts});
  } catch (err) {
    return res.send({success: false})
  }
});

app.get('/posts/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/posts', async function(req, res) {
  try {
    // Add your code here
    const post = new Post(req.body);
    await post.save()
    return res.json({success: 'post call succeed!', url: req.url, body: req.body, data: post})
  } catch (err) {
    console.log(err);
    return res.send({ success: false})
  }
});

app.post('/posts/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/posts', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/posts/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/posts', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/posts/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000
}).then(() => {
  app.listen(3000, function() {
    console.log("App started")
  });
}).catch(error => {
  console.log(error)
})



// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app

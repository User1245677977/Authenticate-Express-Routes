const admin = require('./admin');
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send("navigate to localhost/56106/login.html!"));

app.get('/open', (req,res) => res.send('Open Route!'));

// verify token at the root route
app.get('/auth', function(req,res){
    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);

    if (!idToken) {
      res.status(401).send();
      return
    } 
    //check, did they pass us the token?
    //if not, do a 401 error
    //check if verify id token was successful
    //if not, do 401

    //verify token, is this token valid?
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            res.send('Authentication Success!');
        }).catch(function(error) {
            console.log('error:', error);
            res.status(401).send("Token invalid!");
        });
})

app.listen(56106, () => {
    console.log('Running on port: 56106');
})

app.get('/open', (req, res) => {
  res.status(200).send('This is an open route');
});

app.get('/authenticated', async (req, res) => {
  const idToken = req.headers.authorization;
  if (idToken) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      res.status(200).send(`Authenticated route accessed by user: ${decodedToken.uid}`);
    } catch (error) {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(400).send('No token provided');
  }
});

const PORT = 56106;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

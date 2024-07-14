// Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    //add your firebaseConfig here
    var firebaseConfig = {
        apiKey: 
        authDomain: 
        databaseURL: 
        projectId: 
        storageBucket: 
        messagingSenderId
        appId: 
        measurementId: 
      };
    // Initialize Firebase

    (async () => {
        try {
            firebase.initializeApp(firebaseConfig);
            //if user is logged in, it persists through refreshes, this eliminates that issue
            await firebase.auth().signOut();
            const createUserResult = await firebase
                .auth()
                .createUserWithEmailAndPassword("example@mit.edu", "secret")
                console.log('createUserResult', createUserResult)
            firebase.auth().signOut();
        } catch(e) {
            console.log(e);
        }
    })();

    // get elements
    const email    = document.getElementById('email');
    const password = document.getElementById('password');
    const login    = document.getElementById('login');
    const logout   = document.getElementById('logout');
    const loginMsg = document.getElementById('loginMsg');
    const routeMsg = document.getElementById('routeMsg');

    // login & create token with signInWithEmailAndPassword
    login.addEventListener('click', e => {
        const auth  = firebase.auth();      
        const promise = auth.signInWithEmailAndPassword(email.value, password.value);
        promise.catch(e => console.log(e.message));
    });

    // logout
    logout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // login state
    firebase.auth().onAuthStateChanged(firebaseUser => {
        console.log("user", firebaseUser)
        if(firebaseUser){
         
            logout.style.display = 'inline';
            login.style.display  = 'none';
            loginMsg.innerHTML   = 'Authentication Success!';
        }
        else{
            console.log('User is not logged in');
            logout.style.display = 'none';          
            login.style.display  = 'inline';
            loginMsg.innerHTML   = 'Not Authenticated!';
        }
    });

    function callOpenRoute(){
        (async () => {
            let response = await fetch('/open');
            let text     = await response.text();
            console.log('response.text:', response);
            routeMsg.innerHTML = text;
        })();
    }

    function callAuthRoute(){
        // call server with token
    if (firebase.auth().currentUser) {
        firebase.auth().currentUser.getIdToken()
        .then(idToken => {
            console.log('idToken:', idToken);
            //async "iffe" function -> auto-executes
            (async () => {
                let response = await fetch('/auth', {
                    method: 'GET',
                    headers: {
                        'Authorization': idToken
                    }
                });
                let text = await response.text();
                console.log('response:', response);
                routeMsg.innerHTML = text;
            })();

        }).catch(e => console.log('e:', e));
    } else {
        console.warn('There is currently no logged in user. Unable to call Auth Route.');
    }
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASKxLFSWAlg3Iox1DkU9B2MpBZSR9jJ40",
  authDomain: "authenticate-express-rou-af6c8.firebaseapp.com",
  projectId: "authenticate-express-rou-af6c8",
  storageBucket: "authenticate-express-rou-af6c8.appspot.com",
  messagingSenderId: "328822758088",
  appId: "1:328822758088:web:d4d7ba132379c913cda3fd",
  measurementId: "G-DGGEEKL0RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
node -v 
npm -v
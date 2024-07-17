// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDExn9nzkr1pZrolfUvAxvy3sZWUiyHOOU",
  authDomain: "geohazards-unal.firebaseapp.com",
  databaseURL: "https://geohazards-unal-default-rtdb.firebaseio.com",
  projectId: "geohazards-unal",
  storageBucket: "geohazards-unal.appspot.com",
  messagingSenderId: "432302876299",
  appId: "1:432302876299:web:733a979f2d8434c37cd68e",
  measurementId: "G-H9GCJ4S8XK"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();


// FirebaseUI config.
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: 'visor-geohazard.html',
  signInOptions: [
    {
      // Leave the lines as is for the providers you want to offer your users.
      provider : firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        'https://www.googleapis.com/auth/contacts.readonly'
      ],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account'
      }


    }
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
    window.location.assign('<your-privacy-policy-url>');
  }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

initApp = function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      uname = user.displayName;
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      user.getIdToken().then(function (accessToken) {

        var jsonProfile = JSON.stringify({
          displayName: displayName,
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          uid: uid,
          accessToken: accessToken,
          providerData: providerData
        }, null, '  ');



        $("#firebaseui-auth-container").addClass("d-none");
        $("#cancel").addClass("d-none");
        $("#modal-perfil-container").removeClass("d-none");
        $("#loginModalLabel").text("Bienvenido");
        $("#user-photo").attr("src", photoURL);
        $("#foto-perfil").attr("src", photoURL);
        $("#nombre-perfil").html(displayName);
        $("#correo-perfil").html(email);
        $("#semestre-perfil").html("Geovisor GEOHAZARDS");


      });
    } else {
      $("#firebaseui-auth-container").removeClass("d-none");
      $("#cancel").removeClass("d-none");
      $("#modal-perfil-container").addClass("d-none");
      $("#logout").addClass("d-none");
    }
  }, function (error) {
    console.log(error);
  });
};


window.addEventListener('load', function () {
  initApp()
});

$("#logout").click(function (e) {
  firebase.auth().signOut();
  location.reload();
});
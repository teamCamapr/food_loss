$(function()
{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        } else {
          // No user is signed in.
        }
      });
});

function login(email, password)
{
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) 
    {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}

function logout()
{
    firebase.auth().signOut().then(function() 
    {
        // Sign-out successful.
        console.log("logout");
    })
    .catch(function(error) 
    {
        // An error happened.
    });
}

// ユーザ情報取得(Authentificationから)
function getUser()
{
    var user = firebase.auth().currentUser;
    var uid, name, email;

    if (user != null) 
    {
        uid = user.uid;
        name = user.displayName;
        email = user.email;
    }

    return {"uid": uid, "name": name, "email": email};
}

// ユーザ作成 これここに載せていいの？でもConsoleからでもfirebase.auth.createUserWithEmailAndPasswordで作成できちゃう
async function createUser(email, password)
{
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => 
    {
      // Signed in
      console.log("signed in");
    })
    .catch((error) => 
    {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode + " : " + errorMessage);
    });

    return getUser();
}
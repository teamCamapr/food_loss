// 画像DL download('images/17630962a45321.jpg');
function download(fileName)
{
    ref = firebase.storage().ref().child(fileName);
    ref.getDownloadURL().then((url) => 
    {
        document.getElementById('img').src = url;
    });
}

// 画像UP
function uploadPicture(file, postId)
{
    console.log(file)
    // Create a root reference
    var storageRef = firebase.storage().ref();

    var fileName = postId + '.' + file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2);

    var imagesRef = storageRef.child('images/' + fileName);

    imagesRef.put(file).then(function(snapshot) 
    {
        console.log('Uploaded a blob or file!');
    });
}

// 画像ID生成
function generateImageId()
{
    var id = new Date().getTime().toString(16)  + Math.floor(1000 * Math.random()).toString(16);
    console.log(id);
    return id;
}

// FileAPI
function loadFile()
{
    var inputFile = document.getElementById('inputfile');

    return inputFile.files;
}

// uidを投稿とstoreデータベースに入れて連携
// foodstuffの方に格納するstoreIdどうする
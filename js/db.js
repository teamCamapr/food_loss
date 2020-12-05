function getAllFoodstuffPosts()
{
    var db = firebase.firestore();
    db.collection("foodstuff").get().then((query) => 
    {
        var buff = [];
        query.forEach((doc) => 
        {
            var data = doc.data();
            // var postID = doc.id;
            buff.push({storeID: data.StoreID, classification: data.Classification, expirationData: data.ExpirationDate, description: data.Description, pictureURI: data.PictureURI});
        });
        console.log(buff);
        return buff;
    })
    .catch((error)=>
    {
        console.log(`データの取得に失敗しました`);
    });
}

function getFoodstuffFromClassification(postalCode)
{
    var db = firebase.firestore();
    db.collection("foodstuff").where("Classification", "==", classification)
    .get()
    .then((querySnapshot) => 
    {
        querySnapshot.forEach((doc) => 
        {
            var data = doc.data();
            buff.push({storeID: data.StoreID, classification: data.Classification, expirationData: data.ExpirationDate, description: data.Description, pictureURI: data.PictureURI});
        });
        console.log(buff);
        return buff;
    })
    .catch( (error) => 
    {
        console.log(`データの取得に失敗しました (${error})`);
    });
}

// 郵便番号から検索
function getFoodstuffFromPostalCode(postalCode)
{
    var db = firebase.firestore();
    db.collection("foodstuff").where("PostalCode", "==", postalCode)
    .get()
    .then((querySnapshot) => 
    {
        querySnapshot.forEach((doc) => 
        {
            var data = doc.data();
            buff.push({storeID: data.StoreID, classification: data.Classification, expirationData: data.ExpirationDate, description: data.Description, pictureURI: data.PictureURI});
        });
        console.log(buff);
        return buff;
    })
    .catch( (error) => 
    {
        console.log(`データの取得に失敗しました (${error})`);
    });
}

// storeIdはuidを使用
function getStoreFromStoreId(storeId)
{
    var db = firebase.firestore();
    db.collection("store").where("StoreID", "==", storeId)
    .get()
    .then((querySnapshot) => 
    {
        querySnapshot.forEach((doc) => 
        {
            var data = doc.data();
            buff.push({storeID: data.StoreID, name: data.Name, responsiblePerson: data.ResponsiblePerson, phoneNumber: data.PhoneNumber, email: data.Email, postalCode: data.PostalCode, prefecture: data.Prefecture, municipality: data.Municipality, streetAddress: data.StreetAddress});
        });
        console.log(buff);
        return buff;
    })
    .catch( (error) => 
    {
        console.log(`データの取得に失敗しました (${error})`);
    });
}

function getUserEmailFromPostalCode(postalCode)
{
    var db = firebase.firestore();
    db.collection("user").where("PostalCode", "==", postalCode)
    .get()
    .then((querySnapshot) => 
    {
        querySnapshot.forEach((doc) => 
        {
            var data = doc.data();
            buff.push({email: data.Email, postalCode: data.postalCode});
        });
        console.log(buff);
        return buff;
    })
    .catch((error) => 
    {
        console.log(`データの取得に失敗しました (${error})`);
    });
}

// データベース側のIDはFirebaseがpostした際に決めるため、PictureURIの項はこちらが作成したimageID
function postFoodstuff(classification, expirationDate, description, pictureURI)
{
    var db = firebase.firestore();
    db.collection("foodstuff").add(
    {
        StoreID: getUser().uid,
        Classification: classification,
        ExpirationDate: expirationDate,
        Description: description,
        PictureURI: pictureURI
    })
    .then((doc) => 
    {
        console.log('追加に成功しました');
    })
    .catch((error) => 
    {
        console.log(error);
    });
}

// 直前にアカウント登録判定が必要 非同期？
// flow : await createUser(); postStore();
function postStore(name, responsiblePerson, phoneNumber, postalCode, prefecture, municipality, streetAddress)
{
    var db = firebase.firestore();
    var userData = getUser();
    db.collection("foodstuff").add(
    {
        StoreID: userData.uid,
        Name: name,
        ResponsiblePerson: responsiblePerson,
        Email: userData.email,
        PhoneNumber: phoneNumber,
        PostalCode: postalCode,
        Prefecture: prefecture,
        Municipality: municipality,
        StreetAddres: streetAddress
    })
    .then((doc) => 
    {
        console.log('追加に成功しました');
    })
    .catch((error) => 
    {
        console.log(error);
    });
}

function postUser(email, postalCode)
{
    var db = firebase.firestore();
    db.collection("user").add(
    {
        Email: email,
        PostalCode: postalCode,
    })
    .then((doc) => 
    {
        console.log('追加に成功しました');
    })
    .catch((error) => 
    {
        console.log(error);
    });
}

// 店が投稿したときにユーザに送信するスクリプト
// userDB, email被りありそう putの作業
// dbアップロードするときにruleをpublicにしないといけない?
// 郵便番号で検索
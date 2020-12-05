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

// 市区町村から検索
function getFoodstuffFromMunicipality()
{
    var db = firebase.firestore();
    db.collection("foodstuff").where("StoreID", "==", storeId)
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

// データベース側のIDはFirebaseがpostした際に決めるため、PictureURIの項はこちらが作成したimageID
function postFoodstuff(classification, expirationDate, description, fileName)
{
    var db = firebase.firestore();
    db.collection("foodstuff").add(
    {
        StoreID: getUser().uid,
        Classification: classification,
        ExpirationDate: expirationDate,
        Description: description,
        PictureURI: "images/" + fileName
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

// 店が投稿したときにユーザに送信するスクリプト
// uidからユーザのemailとれる？ authentificationのdb
// 本来バックサイドでやることをフロントサイドで行っているのでdbアクセスなどいろいろアレ
// userDB, email被りありそう putの作業
// dbアップロードするときにruleをpublicにしないといけない?
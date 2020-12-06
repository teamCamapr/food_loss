async function getAllFoodstuffPosts()
{
    var buff = [];

    var db = firebase.firestore();
    await db.collection("foodstuff").get().then((query) => 
    {
        query.forEach((doc) => 
        {
            var data = doc.data();
            buff.push({postID: doc.id, storeID: data.StoreID, classification: data.Classification, expirationData: data.ExpirationDate, description: data.Description, pictureURI: data.PictureURI});
        });
        console.log(buff);
    })
    .catch((error)=>
    {
        console.log(`データの取得に失敗しました`);
    });

    return buff;
}

async function getFoodstuffFromClassification(classification)
{
    var buff = [];

    var db = firebase.firestore();
    await db.collection("foodstuff").where("Classification", "==", classification)
    .get()
    .then((querySnapshot) => 
    {
        querySnapshot.forEach((doc) => 
        {
            var data = doc.data();
            buff.push({postID: doc.id, storeID: data.StoreID, classification: data.Classification, expirationData: data.ExpirationDate, description: data.Description, pictureURI: data.PictureURI});
        });
        console.log(buff);
    })
    .catch( (error) => 
    {
        console.log(`データの取得に失敗しました (${error})`);
    });

    return buff;
}

// ドキュメントのuniqueIDから検索(検索結果をURLパラメータとして保持し、検索する際に)
async function getFoodstuffFromUniqueID(uniqueID)
{
    var buff = [];

    var db = firebase.firestore();
    await db.collection("foodstuff").get().then((query) => 
    {
        query.forEach((doc) => 
        {
            var data = doc.data();
            if(uniqueID == doc.id)
            buff.push({postID: doc.id, storeID: data.StoreID, classification: data.Classification, expirationData: data.ExpirationDate, description: data.Description, pictureURI: data.PictureURI});
        });
        console.log(buff);
    })
    .catch((error)=>
    {
        console.log(`データの取得に失敗しました`);
    });

    return buff[0];
}

// 郵便番号から検索
async function getFoodstuffFromPostalCode(postalCode)
{
    var buff = [];

    var db = firebase.firestore();
    await db.collection("foodstuff").where("PostalCode", "==", postalCode)
    .get()
    .then((querySnapshot) => 
    {
        querySnapshot.forEach((doc) => 
        {
            var data = doc.data();
            buff.push({postID: doc.id, storeID: data.StoreID, classification: data.Classification, expirationData: data.ExpirationDate, description: data.Description, pictureURI: data.PictureURI});
        });
        console.log(buff);    
    })
    .catch( (error) => 
    {
        console.log(`データの取得に失敗しました (${error})`);
    });

    return buff;
}

// storeIdはuidを使用
async function getStoreFromStoreId(storeId)
{
    var buff = [];

    var db = firebase.firestore();
    await db.collection("store").where("StoreID", "==", storeId)
    .get()
    .then((querySnapshot) => 
    {
        querySnapshot.forEach((doc) => 
        {
            var data = doc.data();
            buff.push({postID: doc.id, storeID: data.StoreID, name: data.Name, responsiblePerson: data.ResponsiblePerson, phoneNumber: data.PhoneNumber, email: data.Email, postalCode: data.PostalCode, prefecture: data.Prefecture, municipality: data.Municipality, streetAddress: data.StreetAddress});
        });
        console.log(buff);    
    })
    .catch( (error) => 
    {
        console.log(`データの取得に失敗しました (${error})`);
    });

    return buff[0];
}

async function getUserEmailFromPostalCode(postalCode)
{
    var buff = [];
    
    var db = firebase.firestore();
    await db.collection("user").where("PostalCode", "==", postalCode)
    .get()
    .then((querySnapshot) => 
    {
        
        querySnapshot.forEach((doc) => 
        {
            var data = doc.data();
            buff.push({postID: doc.id, email: data.Email, postalCode: data.postalCode});
        });
        console.log(buff);
        
    })
    .catch((error) => 
    {
        console.log(`データの取得に失敗しました (${error})`);
    });

    return buff;
}

// データベース側のIDはFirebaseがpostした際に決めるため、PictureURIの項はこちらが作成したimageID
async function postFoodstuff(classification, expirationDate, description, pictureURI)
{
    var db = firebase.firestore();
    await db.collection("foodstuff").add(
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
async function postStore(name, responsiblePerson, phoneNumber, postalCode, prefecture, municipality, streetAddress)
{
    var db = firebase.firestore();
    var userData = getUser();
    await db.collection("store").add(
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

async function postUser(email, postalCode)
{
    var db = firebase.firestore();
    await db.collection("user").add(
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
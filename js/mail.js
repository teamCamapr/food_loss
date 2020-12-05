function sendmail() {
const user_email = "b.iku1112@ezweb.ne.jp";
const user_city = "川崎市";
const store_city = "川崎市";
//ユーザーの町と店の町が一致したら
if (user_city==store_city) {
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "7416094@gmail.com",
    Password : "4BD91BDD0E1AB729BF23724FC89BFD4A818D",
    To : user_email,
    From : "7416094@gmail.com",
    Subject : "近くのお店から新しい商品の通知が来ました！",
    Body : "商品名："+document.getElementById("categories").value+"<br>"
           +"消費期限:"+document.getElementById("shop-name").value+"<br>"
           +document.getElementById("PR").value
}).then(
  message => location.href = "index_for_finished.html"
);
}
};

function save_data(){
	var file = loadFile();
	var file_path = uploadPicture(file);
	var classification = document.getElementById("categories").value;
	var expirationDate = document.getElementById("shop-name").value;
	var description = document.getElementById("PR").value;
	// var fileName = document.getElementById("file-image").value;
	console.log(classification)
	console.log(expirationDate)
	console.log(description)
	// console.log(fileName)
	// sendmail()
	postFoodstuff(classification, expirationDate, description, file_path);
}


$(function(){
	var
	  winW = $(window).width(),
		winH = $(window).height(),
		nav = $('#mainnav ul a'),
		curPos = $(this).scrollTop();
	
	if (winW > 880){
		var headerH =20;
	}
	else{
		var headerH =60;
	}
	
	$(nav).on('click', function(){
		nav.removeClass('active');
  	var $el = $(this),
		id = $el.attr('href');
 		$('html, body').animate({
   		scrollTop: $(id).offset().top - headerH
 		}, 500);
		$(this).addClass('active');
		if (winW < 880){
			$('#menuWrap').next().slideToggle();
			$('#menuBtn').removeClass('close');
		}
 		return false;
	});
	
	$('.panel').hide();
	$('#menuWrap').toggle(function(){
		$(this).next().slideToggle();
		$('#menuBtn').toggleClass('close');
	},
	function(){
		$(this).next().slideToggle();
		$('#menuBtn').removeClass('close');
	});

});

async function IndexForStoreLinkClicked()
{
	// dbに保存
	save_data();

	// 現在のユーザ情報を取得
	var user = getUser();

	// 店舗情報を取得
	var store = await getStoreFromStoreId(user.uid);

	// if(store == null || store == undefined) return;
	
	// postalCode取得
	var postalCode = store.postalCode;

	// dbから通知対象のユーザ読み込み
	var users = await getUserEmailFromPostalCode(postalCode);
	console.log(users);
	// [{email: "test@test.com", postalCode: "1111111"},{email: "test2@test.com", postalCode: "1111112"}]
	// みたいな感じで入ってます

	// 別当さんのメールスクリプト 下みたいな感じにしてほしい
	// sendmail(users);
}

async function MypageLoaded()
{
	var user = getUser();
	console.log(user);
	console.log(firebase.auth());
	console.log(firebase.auth().currentUser[0]);
	//var store = await getStoreFromStoreId(user.uid);
	console.log(store);
	$("#ShopName").val(store.name);
}

async function ReceivingUserLinkClicked() 
{
	await postUser($('#i_email').val(),$('#postal-code').val());

    target = document.getElementById("output1");
	target.innerHTML = "登録完了しました";
	target2 = document.getElementById("output2");
    target2.innerHTML = "食品を選ぶ";
    return false;
  }

async function IndexForStoreRegistrationLinkClicked()
{
	await createUser($('#i_email').val(),$('#password').val());
	await postStore($('#shop-name').val(),$('#name').val(),$('#tel').val(),$('#postal-code').val(),$('#address-level1').val(),$('#address-level2').val(),$('#address-line1').val());

	window.location.href = 'index_for_store_finished.html';
}

function FoodSearchLinkClicked()
{
	window.location.href = 'food_searched.html?q=' +  $('#classification').val();
}

async function FoodSearched()
{
	var query = location.search;
	var value = query.split('=');
 
	var q = value[1];
	var result = await getFoodstuffFromClassification(q);
	result.forEach(async foodstuff => 
	{
		var store = await getStoreFromStoreId(foodstuff.storeID);
		var pictureURL = await download(foodstuff.pictureURI);

		$('#sec01').last().after(
			'<center><h3><a href="receiving_food_niku.html?q='+ foodstuff.postID +'" class="link1"><p class="size1"><img src="'+ pictureURL +'"></p><p class="MS">'+foodstuff.description+'</p><p class="MS">'+store.prefecture+store.municipality+'/'+store.name+'</p></a></h3></center>'
			);
	});
}

async function RecievingFood()
{
	var query = location.search;
	var value = query.split('=');
 
	var q = value[1];
	var foodstuff = await getFoodstuffFromUniqueID(q);
	var store = await getStoreFromStoreId(foodstuff.storeID);
	var pictureURL = await download(foodstuff.pictureURI);

	$('#sec03').last().after(
		'<center><h3><a class="link1"><p class="size1"><img src="'+ pictureURL +'"></p><p class="MS">'+foodstuff.description+'</p><p class="MS">'+store.prefecture+store.municipality+'/'+store.name+'</p></a></h3></center>'
		);
}
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

async function ReceivingUserLinkClicked() {
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
	console.log(await getFoodstuffFromClassification(q));
}
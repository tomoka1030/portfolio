
/* --------------
ふわっとページ遷移
---------------- */

$(function() {
	$('body').fadeIn(1000); //1秒かけてフェードイン
});


/* ---------------------------------------------
スクロールするとハンバーガーメニューがフェードイン
----------------------------------------------- */

function FixedAnime() {
    //mvの高さを取得
    var mainvisualH = $('.mainvisual').outerHeight(true);
    var scroll = $(window).scrollTop();
    if (scroll >= mainvisualH){//mvの高さ以上までスクロールしたら
        $('.menu_btn').addClass('fadeDown');//.openbtnにfadeDownというクラス名を付与して
        $('#header').addClass('done');//#headerにdoneというクラス名を付与
    }else{//それ以外は
        $('.menu_btn').removeClass('fadeDown');//fadeDownというクラス名を除き
        $('#header').removeClass('done');//doneというクラス名を除く
    }
}

  // 画面をスクロールをしたら動かす
$(window).scroll(function () {
    if (window.matchMedia('(min-width: 1001px)').matches) {
        FixedAnime();
    } //画面幅が1000px以上になるとFixedAnimeを実行する
});
if (window.matchMedia('(max-width: 1000px)').matches) {
    $('#header').addClass('done');
}//画面幅が1000px以下になると#headerにdoneというクラス名を付与(メニューを表示させる)

  //ボタンをクリックした際のアニメーションの設定
$(".menu_btn").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    if($('#header').hasClass('panelactive')){
        $(".header__nav").addClass('is-slideup'); //スライドアップするクラスを一時的に付与
        setTimeout(function(){
            $("#header").toggleClass('panelactive');//ヘッダーのpanelactiveクラスも除去
            $(".header__nav").removeClass('is-slideup'); //スライドアップするクラスを削除
        }, 300);
    } else {
        $("#header").toggleClass('panelactive');//ヘッダーにpanelactiveクラスを付与
    }
});
$(".header__nav").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".menu_btn").removeClass('active');//ボタンの activeクラスを除去し
    $(".header__nav").addClass('is-slideup');
    setTimeout(function(){
        $("#header").toggleClass('panelactive');//ヘッダーのpanelactiveクラスも除去
        $(".header__nav").removeClass('is-slideup');
    }, 300);
});


/* ------------------------------------
エリア外をクリックした際、メニューを閉じる
--------------------------------------- */

$(document).on("click", function(event) {
    if (!$(event.target).closest(".header__nav, .menu_btn").length && $(".menu_btn").hasClass("active")) {
        $(".menu_btn").removeClass("active");
        $(".header__nav").addClass('is-slideup');
        setTimeout(function(){
            $("#header").toggleClass('panelactive');//ヘッダーのpanelactiveクラスも除去
            $(".header__nav").removeClass('is-slideup');
        }, 300);
    }
});



/* ----------
slick
------------- */

$(function () {
/*worksページ*/
    if($('.website__slider').length > 0){ // このクラス名が0以上あるなら(存在するなら)
    $('.website__slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        autoplaySpeed: 3000,
        // centerMode: true,// 次の画像をちら見せ
        // centerPadding: '5%',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '8%',
                }
            }
        ]
    });
    }

    if($('.banner__slider').length > 0){ // このクラス名が0以上あるなら(存在するなら)
    $('.banner__slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        autoplaySpeed: 3000,
        // centerMode: true,// 次の画像をちら見せ
        // centerPadding: '5%',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '8%',
                }
            }
        ]
    });
    }

    if($('.graphic__slider').length > 0){ // このクラス名が0以上あるなら(存在するなら)
    $('.graphic__slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        // autoplay: true,      // 実績増えたらオートプレイにする
        // autoplaySpeed: 2000,  
        dots: true,
        // centerMode: true,   // 次の画像をちら見せ
        // centerPadding: '5%',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '8%',
                }
            }
        ]
    });
    }
});
    
/*serviceページ*/
$(document).ready(function () {
    if ($('.flow__list').length > 0) {
        var $slider = $('.flow__list');
        var $slide = $slider.children();
        var slideLen = $slide.length;
        
        $slider.slick({
            dots: true,
            // autoplay: true,
            infinite: false,// スライダーのループを無効にする
            arrows: false,
            // pauseOnHover: true,// マウスホバー時に自動再生を一時停止する
            slidesToScroll: 4,
            variableWidth:true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToScroll:1,
                    }
                }
            ]
        }).on('afterChange', function () {
            var $self = $(this);
            if ((slideLen - 1) <= $self.slick('slickCurrentSlide')) {
                $self.slick('slickSetOption', 'autoplay', false);
            }
        });
    }
});


/* ---------------------
slick/message▶feature
--------------------- */

/*スマホのときのみスライダーを有効にする*/
$(function(){
	function sliderSetting(){
        var width = $(window).width();
        if($('.feature__list').length > 0){ // このクラス名が0以上あるなら(存在するなら)
            if(width <= 767){
                $('.feature__list').not('.slick-initialized').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // autoplay: true,
                    // autoplaySpeed: 4000,
                    dots: true,
                    arrows: false,
                    centerMode: true,// 次の画像をちら見せ
                    centerPadding: '5%',
                    infinite: false,// スライダーのループを無効にする
                    pauseOnHover: true,// マウスホバー時に自動再生を一時停止する
                    variableWidth:true,
                });
            } else {
                $('.slide.slick-initialized').slick('unslick');
            }
        }
	}
	sliderSetting();
	$(window).resize(function(){
        sliderSetting();
	});
});


/* ----------------
フェードイン
------------------- */

function fadeAnime(){

    $('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
        var elemPos = $(this).offset().top-30;//要素より、30px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();

        if (scroll >= elemPos - windowHeight){
            $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
        }else{
            $(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
        }
    });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function (){
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述


/* -------------------------------------
スクロールすると子要素が時間差ででてくる
---------------------------------------- */

// スクロール出現用関数（.offs ⇄ .ons）
function scr_ani(scr, offs_max) {
    var
        window_h = $(window).height(),
        offs_length = $('.offs').length,
        ons_length = $('.ons').length,
        wh_pos = 30;// 対象コンテンツの上端が画面下からどれくらい入ったら反応するか。画面高さに対する割合（%）
    if (offs_length) {
        var first_item = offs_max - offs_length;
        for (var i = 0; i < offs_length; i++) {
            var data_scr = first_item + i;
            var offs = $('.offs[data-scr="' + data_scr + '"]');
            var target = offs.offset().top;
            var trigger = target - (window_h + scr - window_h * wh_pos / 100);
            if (trigger < 0) {
                offs.removeClass('offs').addClass('ons');
            } else {
                break;
            }
        }
    }
    if (ons_length) {
        var last_item = ons_length - 1;
        for (var i = 0; i < ons_length; i++) {
            var data_scr = last_item - i;
            var ons = $('.ons[data-scr="' + data_scr + '"]');
            var target = ons.offset().top;
            var trigger = target - (window_h + scr);
            if (trigger > 0) {
                ons.removeClass('ons').addClass('offs');
            } else {
                break;
            }
        }
    }
};

$(function () {
    // スクロール出現アイテムにナンバリング
    var offs_max = $('.offs').length;
    for (var i = 0; i < offs_max; i++) {
        $('.offs').eq(i).attr('data-scr', i);
    }
    // ディレイを設定
    function setDelay(items) {
        for (var i = 0; i < items.length; i++) {
            let delay = items.eq(i).data('delay');
            if (delay) {
                items.eq(i).css('transition-delay', delay + 's');
            }
        }
    }

    // ディレイを設定
    setDelay($('.feature__item'));
    setDelay($('.service__item'));

    // （リロード時など）ロード時にすでにスクロールされている場合に対応
    var scr = $(window).scrollTop();
    scr_ani(scr, offs_max);


    // スクロール時
    $(window).on('scroll', function () {
        var scr = $(window).scrollTop();
        scr_ani(scr, offs_max);
    });
});
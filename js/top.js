
/* ---------------
ローディング画面
----------------- */

const loadingAreaBeige = document.querySelector('.loading');
const loadingAreaPeachFuzz = document.querySelector('.loading-screen');
const loadingText = document.querySelector('.loading__container');

// Web Storageの確認と設定
const webStorage = function () {
    if (sessionStorage.getItem('visit')) {
        // ユーザーが再訪問した場合、ローディング画面を非表示に設定
        loadingAreaBeige.style.display = 'none';
        loadingAreaPeachFuzz.style.display = 'none';
        loadingText.style.display = 'none';
    } else {
        // ユーザーが初めて訪問した場合、ローディング画面を表示し、訪問フラグを設定
        sessionStorage.setItem('visit', 'true');
        setTimeout(() => {
            loadingAreaBeige.style.display = 'none';
            loadingAreaPeachFuzz.style.display = 'none';
            loadingText.style.display = 'none';
        }, 8000); // 4000msの遅延と4000msのフェードアウトを合計して8000ms後に非表示にする
    }
}

window.addEventListener('load', () => {
    if (!sessionStorage.getItem('visit')) {
        // ユーザーが初めて訪問した場合にのみローディングアニメーションを実行
        // ローディング中（ベージュ）
        loadingAreaBeige.animate(
            {
                opacity: [1, 0],
                visibility: 'hidden',
            },
            {
                duration: 2000,
                delay: 1000,
                easing: 'ease',
                fill: 'forwards',
            }
        );

        // ローディング中（ピンクのスクリーン）
        loadingAreaPeachFuzz.animate(
            {
                translate: ['0 100vh', '0 0', '0 -100vh']
            },
            {
                duration: 2000,
                delay: 1100,
                easing: 'ease',
                fill: 'forwards',
            }
        );

        // ローディング中テキスト
        loadingText.animate(
            [
                {
                    opacity: 1,
                    offset: .9  //80%
                },
                {
                    opacity: 0,
                    offset: 1  //100%
                },
            ],
            {
                duration: 2100,
                easing: 'ease',
                fill: 'forwards',
            }
        );
    }
    // Web Storageの設定を実行
    webStorage();
});


/* --------------
ふわっとページ遷移
---------------- */

$(function() {
	$('body').fadeIn(1000); //1秒かけてフェードイン
});


/* -------------------------------------
スクロールするとハンバーガーメニューがフェードイン
---------------------------------------- */

function FixedAnime() {
    //fvの高さを取得
    var fvH = $('.fv').outerHeight(true);
    var scroll = $(window).scrollTop();
    if (scroll >= fvH) {//fvの高さ以上までスクロールしたら
        $('.menu_btn').addClass('fadeDown');//.openbtnにfadeDownというクラス名を付与して
        $('.fv__inner').addClass('done');//fvにdoneというクラス名を付与
    } else {//それ以外は
        $('.menu_btn').removeClass('fadeDown');//fadeDownというクラス名を除き
        $('.fv__inner').removeClass('done');//doneというクラス名を除く
    }
}

// 画面をスクロールをしたら動かす
$(window).scroll(function () {
    if (window.matchMedia('(min-width: 1001px)').matches) {
        FixedAnime();
    } //画面幅が1000px以上になるとFixedAnimeを実行する
});
if (window.matchMedia('(max-width: 1000px)').matches) {
    $('.fv__inner').addClass('done');
}//画面幅が1000px以下になると#headerにdoneというクラス名を付与(メニューを表示させる)

//ボタンをクリックした際のアニメーションの設定
$(".menu_btn").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $(".fv__inner").toggleClass('panelactive');//fvにpanelactiveクラスを付与
});
$(".fv__nav li a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".menu_btn").removeClass('active');//ボタンの activeクラスを除去し
    $(".fv__inner").removeClass('panelactive');//fvのpanelactiveクラスも除去
});

/* ------------------------------------
エリア外をクリックした際、メニューを閉じる
--------------------------------------- */

$(document).on("click", function(event) {
    if (!$(event.target).closest(".header__nav, .menu_btn").length && $(".menu_btn").hasClass("active")) {
        $(".menu_btn").removeClass("active");
        $(".fv__inner").removeClass("panelactive");
    }
});


/* -------------------------------------
スクロールすると子要素が時間差ででてくる
---------------------------------------- */

// スクロール出現用関数（.offs ⇄ .ons）
function scr_ani(scr, offs_max) {
    var
        window_h = $(window).height(),
        offs_length = $('.offs').length,
        ons_length = $('.ons').length,
        wh_pos = 20;// 対象コンテンツの上端が画面下からどれくらい入ったら反応するか。画面高さに対する割合（%）
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

    //クラス名ににディレイを設定
    setDelay($('.lead__contents'));
    setDelay($('.works__item'));
    setDelay($('.service__item'));
    setDelay($('.skill__item'));

    // （リロード時など）ロード時にすでにスクロールされている場合に対応
    var scr = $(window).scrollTop();
    scr_ani(scr, offs_max);


    // スクロール時
    $(window).on('scroll', function () {
        var scr = $(window).scrollTop();
        scr_ani(scr, offs_max);
    });
});


/* ----------------
フェードイン
------------------- */

// // 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime() {

    // ふわっ
    $('.fadeUpTrigger').each(function () { //fadeUpTriggerというクラス名が
        var elemPos = $(this).offset().top - 40;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();

        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
        } else {
            $(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
        }
    });
}

// 画面をスクロールをしたら動かす
$(window).scroll(function () {
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述


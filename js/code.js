var hataMesaji = 'Lütfen internet bağlantınızı kontrol ediniz.';

$.ajaxSetup({
    timeout: 10000
});

$(document).ajaxError(function () {
    alert(hataMesaji);
});

function sayfaVeIDDegistir(index, ID) {
    $('#vakaID').val(ID);
    swiperParent.swipeTo(index);
}

var $ = jQuery.noConflict();
$(function () {
    $('.form').find('input, select, textarea').on('touchstart mousedown click', function (e) {
        e.stopPropagation();
    })
})
var swiperParent = new Swiper('.swiper-parent', {
    pagination: '.pagination',
    paginationClickable: true,
    onFirstInit: function(){
    },
    onSlideChangeEnd: function () {
        if (swiperParent.activeIndex != 0) {
            $('#header').animate({'top': '0px'}, 400);
        }
        if (swiperParent.activeIndex == 0) {
            $('#header').animate({'top': '-100px'}, 400);
        }

        if(swiperParent.activeIndex == 1)
        {
            if($('#vakaID').val() == '0')
            {
                $('#cerrahiTarihi').val('');
                $('#hastaYasi').val('');
                $('#cerrahiPozisyon').val('');
                $('#vakaTuru').val('');
                $('#kullanilanTeknoloji').val('');
                $('#Komplikasyon').val('Yok');
                $('#komplikasyonAciklamasi').val('');

                $('#Komplikasyon').change();
            }
            else
            {
                $.get('operasyon.aspx', {A: $('#vakaID').val()}, function(dataJSON){
                    if(dataJSON.Status != 'OK')
                    {
                        alert('Belirtmiş olduğunuz operasyon bulunamadı. Operasyon silinmiş olabilir.');
                    }
                    else
                    {
                        $('#cerrahiTarihi').val(dataJSON.cerrahiTarihi);
                        $('#hastaYasi').val(dataJSON.hastaYasi);
                        $('#cerrahiPozisyon').val(dataJSON.cerrahiPozisyon);
                        $('#vakaTuru').val(dataJSON.vakaTuru);
                        $('#kullanilanTeknoloji').val(dataJSON.kullanilanTeknoloji);
                        $('#Komplikasyon').val(dataJSON.Komplikasyon);
                        $('#komplikasyonAciklamasi').val(dataJSON.komplikasyonAciklamasi);

                        $('#Komplikasyon').change();
                    }
                }, "jsonp");
            }
        }
        else if(swiperParent.activeIndex == 2)
        {
            if ($('#operasyonListesi').html() != '') {
                $.get('operasyonlistesi.aspx', function (dataJSON) {
                    if (dataJSON.length == 0) {
                        $('#operasyonListesi').html('<li>Kayıtlı operasyon bulunamadı.</li>');
                    }
                    else {
                        for (var i = 0; i < dataJSON.length; i++) {
                            $('#operasyonListesi').append('<li class="post"><a href="#" class="post_more"></a><div class="post_right_reveal"><h4>Cerrahi Türü : ' + dataJSON[i].cerrahiTuru + '<br>Vaka Türü : ' + dataJSON[i].vakaTuru + '</h4></div><div class="post_right_unreveal"><a class="post_comments" href="#" style="float: right;" onclick="sayfaVeIDDegistir(10,' + dataJSON[i].vakaID + ');">Yorum</a><a class="post_comments" href="#" style="float: right;" class="vakaSil" data-vakaid="' + dataJSON[i].vakaID + '">Sil</a><a class="post_comments" href="#" style="float: right"onclick="sayfaVeIDDegistir(1, ' + dataJSON[i].vakaID + ');">Düzenle</a></div><div class="post_left"><span class="day">' + dataJSON[i].Gun + '</span><span class="month">' + dataJSON[i].Ay + '</span><span class="year">' + dataJSON[i].Yil + '</span></div></li>');
                        }
                    }
                }, "jsonp");
            }
        }
        else if(swiperParent.activeIndex == 4)
        {
            if($('#istatistikCache').val() == '0')
            {
                var renkler = ["yellow", "red", "purple", "blue", "orange", "bluegreen"];

                $.get('istatistikler.aspx', function(dataJSON){
                    $('#toplamOperasyon').text(dataJSON.toplamOperasyon);
                    $('#komplikasyonSayisi').text(dataJSON.komplikasyonSayisi);

                    var toplam = 0;
                    var carpan = 1;

                    for(var i = 0; i < dataJSON.Teknolojiler.length; i++)
                    {
                        toplam += dataJSON.Teknolojiler[i].Sayisi;
                    }

                    carpan = 100 / toplam;

                    var shuffleRenkler = renkler;

                    for(var j, x, i = shuffleRenkler.length; i; j = Math.floor(Math.random() * i), x = shuffleRenkler[--i], shuffleRenkler[i] = shuffleRenkler[j], shuffleRenkler[j] = x);

                    for(var i = 0; i < dataJSON.Teknolojiler.length; i++)
                    {
                        $('#kullanilanTeknolojiler h3').append('<div class="stats"><span>' + dataJSON.Teknolojiler[i].Adi + '</span><div class="bar ' + shuffleRenkler.pop() + '" style="width: ' + Math.floor(dataJSON.Teknolojiler[i].Sayisi * carpan) + '%;">' + dataJSON.Teknolojiler[i].Sayisi + '</div></div><br>');
                    }

                    toplam = 0;

                    for(var i = 0; i < dataJSON.vakaTurleri.length; i++)
                    {
                        toplam += dataJSON.vakaTurleri[i].Sayisi;
                    }

                    carpan = 100 / toplam;

                    shuffleRenkler = renkler;

                    for(var j, x, i = shuffleRenkler.length; i; j = Math.floor(Math.random() * i), x = shuffleRenkler[--i], shuffleRenkler[i] = shuffleRenkler[j], shuffleRenkler[j] = x);

                    for(var i = 0; i < dataJSON.vakaTurleri.length; i++)
                    {
                        $('#vakaTurleri h3').append('<div class="stats"><span>' + dataJSON.vakaTurleri[i].Adi + '</span><div class="bar ' + shuffleRenkler.pop() + '" style="width: ' + Math.floor(dataJSON.vakaTurleri[i].Sayisi * carpan) + '%;">' + dataJSON.vakaTurleri[i].Sayisi + '</div></div><br>');
                    }

                    $('#istatistikCache').val('1');
                }, "jsonp");
            }
        }
        else if(swiperParent.activeIndex == 7) // operasyon yorumu
        {
            if ($('#vakaID').val() == '0') {
                swiperParent.swipeTo(2);
            }
            else {
                $.get('operasyonYorum.aspx', {A: $('#vakaID').val()}, function (dataJSON) {
                    $('#operasyonYorum').val(dataJSON.Yorum);
                }, "jsonp");
            }
        }
    }
})
var swiperNested = new Swiper('.swiper-nested', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical',
//Enable Scrollbar
    scrollbar: {
        container: '.swiper-scrollbar',
        hide: true,
        draggable: false
    }
})
var swiperNested1 = new Swiper('.swiper-nested1', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical',
//Enable Scrollbar
    scrollbar: {
        container: '.swiper-scrollbar1',
        hide: true,
        draggable: false
    }
})
var swiperNested2 = new Swiper('.swiper-nested2', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical',
//Enable Scrollbar
    scrollbar: {
        container: '.swiper-scrollbar2',
        hide: true,
        draggable: false
    }
})
var swiperNested3 = new Swiper('.swiper-nested3', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical',
//Enable Scrollbar
    scrollbar: {
        container: '.swiper-scrollbar3',
        hide: true,
        draggable: false
    },
    onInit: function(){
        $.get('Asistanlarim.aspx', function (dataJSON){
            if (dataJSON.length == 0) {
                $('#Asistanlarim').html('<li>Kullanıcıya bağlı asistan bulunamadı.</li>');
            }
            else{
                for(var i=0; i < dataJSON.length; i++){
                    $('#Asistanlarim').append('<li class="post"><a href="#" class="post_more"></a><div class="post_right_reveal" style="left: 0; width: 85%"><h4>Asistan Adı : ' + dataJSON[i].adi + ' </h4></div><div class="post_right_unreveal" style="left: 0; width: 85%"><a class="post_comments asistanKaldir" data-asistanid=" ' + dataJSON[i].asistanID + ' " href="#" style="float: right;">Kaldır</a></div></li>');
                }
            }
        }, "jsonp");
    }
})
var swiperNested4 = new Swiper('.swiper-nested4', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical',
//Enable Scrollbar
    scrollbar: {
        container: '.swiper-scrollbar4',
        hide: true,
        draggable: false
    }
})
var swiperNested5 = new Swiper('.swiper-nested5', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical',
//Enable Scrollbar
    scrollbar: {
        container: '.swiper-scrollbar5',
        hide: true,
        draggable: false
    },
    onInit: function(){
        $.get('asistanOperasyonlarim.aspx', function (dataJSON){
            if (dataJSON.length == 0) {
                $('#AsistanOperasyonListesi').html('<li>Asistanların operasyon kaydı bulunamadı.</li>');
            }
            else{
                for(var i=0; i < dataJSON.length; i++){
                    $('#AsistanOperasyonListesi').append('<li class="post" ><a href="#" class="post_more"></a><div class="post_right_reveal"><h4>Cerrahi Türü : ' + dataJSON[i].cerrahiTuru + ' <br>Vaka Türü : ' + dataJSON[i].vakaTuru + '</h4></div><div class="post_right_unreveal"><a class="post_comments" data-operasyonid="' + dataJSON[i].operasyonid + '" href="#" style="float: right;"onclick="swiperParent.swipeTo(10);">Yorum</a></div><div class="post_left"><span class="day">' + dataJSON[i].gun + '</span><span class="month">' + dataJSON[i].ay + '</span><span class="year">' + dataJSON[i].yil + '</span></div></li>');
                }
            }
        }, "jsonp");
    }
})
var swiperNested6 = new Swiper('.swiper-nested6', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical',
//Enable Scrollbar
    scrollbar: {
        container: '.swiper-scrollbar6',
        hide: true,
        draggable: false
    },
    onInit: function(){
        $.get('profil.aspx', function(dataJSON){
            $('#adiSoyadi').val(dataJSON.adiSoyadi);
            $('#dogumTarihi').val(dataJSON.dogumTarihi);
            $('#Hastane').val(dataJSON.Hastane);
            $('#Klinik').val(dataJSON.Klinik);
            $('#uzmBasladigiYil').val(dataJSON.uzmBasladigiYil);
            $('#hastGirisYili').val(dataJSON.hastGirisYili);
        }, "jsonp");
    }
})
var swiperNested7 = new Swiper('.swiper-nested7', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical',
//Enable Scrollbar
    scrollbar: {
        container: '.swiper-scrollbar7',
        hide: true,
        draggable: false
    }
})
var swiperNested8 = new Swiper('.swiper-nested8', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical',
//Enable Scrollbar
    scrollbar: {
        container: '.swiper-scrollbar8',
        hide: true,
        draggable: false
    }
})
var swiperNested9 = new Swiper('.swiper-nested9', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical',
//Enable Scrollbar
    scrollbar: {
        container: '.swiper-scrollbar9',
        hide: true,
        draggable: false
    }
})
var swiperNested10 = new Swiper('.swiper-nested10', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical'
})
var swiperNestedsingle = new Swiper('.swiper-nestedsingle', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical',
//Enable Scrollbar
    scrollbar: {
        container: '.swiper-scrollbarsingle',
        hide: true,
        draggable: false
    }
})
$('.scrolltop1').click(function () {
    swiperNested1.swipeTo(0);
});
$('.scrolltop2').click(function () {
    swiperNested2.swipeTo(0);
});
$('.scrolltop3').click(function () {
    swiperNested3.swipeTo(0);
});
$('.scrolltop4').click(function () {
    swiperNested4.swipeTo(0);
});
$('.scrolltop5').click(function () {
    swiperNested5.swipeTo(0);
});
$('.scrolltop6').click(function () {
    swiperNested6.swipeTo(0);
});
$('.scrolltop7').click(function () {
    swiperNested7.swipeTo(0);
});
$('.scrolltop8').click(function () {
    swiperNested8.swipeTo(0);
});
$('.scrolltop9').click(function () {
    swiperNested9.swipeTo(0);
});
$('.scrolltopsingle').click(function () {
    swiperNestedsingle.swipeTo(0);
});
$('.gohome').click(function () {
    swiperParent.swipeTo(0);
});/*
jQuery(function ($) {
    $(".swipebox").swipebox();
});
*/
$(function () {
    /*
    $('#tabsmenu').tabify();
    $(".toggle_container").hide();
    $(".toggle_container_blog").hide();
    $(".trigger").click(function () {
        $(this).toggleClass("active").next().slideToggle("slow", function () {
            swiperNested1.reInit();
            swiperNested4.reInit();
        });
        return false;
    });
    $(".trigger_blog").click(function () {
        $(this).toggleClass("activeb").next().slideToggle("slow", function () {
            swiperNested3.reInit();
        });
        return false;
    });
    */
    $(".post_more").click(function () {
        $(this).toggleClass("activep").next().slideToggle("slow");
        return false;
    });
});
$('#yeniOperasyonEkle').on('click', function (e) {
    e.preventDefault();

    $.post("yeniekle.aspx", {A: $('#cerrahiTarihi').val(), B: $('#hastaYasi').val(), C: $('#cerrahiPozisyon').val(), D: $('#vakaTuru').val(), E: $('#kullanilanTeknoloji').val(), F: $('#Komplikasyon').val(), G: $('#vakaID').val()}, function (dataJSON) {
        if (dataJSON.Status == 'OK') {

            if ($('#vakaID').val() == '0') {
                alert('Yeni Operasyon başarı ile eklendi.');

                $('#cerrahiTarihi').val('');
                $('#hastaYasi').val('');
                $('#cerrahiPozisyon').val('');
                $('#vakaTuru').val('');
                $('#kullanilanTeknoloji').val('');
                $('#Komplikasyon').val('Yok');
                $('#komplikasyonAciklamasi').val('');

                $('#Komplikasyon').change();
                $('#operasyonListesi').html('');
                $('#istatistikCache').val('0');
            }
            else {
                alert('Operasyon başarı ile düzenlendi.');
            }
        }
        else {
            alert(dataJSON.Message);
        }
    }, "jsonp");
});
$(document).on('click', '.vakaSil', function (e) {
    e.preventDefault();

    $.get('vakasil.aspx', {A: $(this).data('vakaid')}, function (dataJSON) {
        if (dataJSON.Status == 'OK') {
            alert('Operasyon başarı ile silindi.');
        }
        else {
            alert(hataMesaji);
        }
    })
}, "jsonp");
$(document).on('click', '.asistanKaldir', function (e) {
    e.preventDefault();

    $.get('asistanKaldir.aspx', {A: $(this).data('asistanid')}, function (dataJSON) {
        if (dataJSON.Status == 'OK') {
            alert('Asistan başarıyla kaldırıldı.');
        }
        else {
            alert(hataMesaji);
        }
    })
}, "jsonp");
$('#Komplikasyon').on('change', function(){
    if($(this).val() == 'Var')
    {
        $('#komplikasyonAciklamasi').parent().slideDown('fast');
    }
    else
    {
        $('#komplikasyonAciklamasi').parent().slideUp('fast');
    }
});
$('#yorumKaydet').on('click', function(e) {
    e.preventDefault();

    $.post("yorum.aspx", { A: $('#vakaID').val(), B: $('#operasyonYorum').val()}, function (dataJSON) {
        if (dataJSON.Status == 'OK') {
            alert('Yorum başarıyla eklendi.');
        }
        else {
            alert(hataMesaji);
        }
    }, "jsonp");
});
$('#profilGuncelle').on('click', function(e) {
    e.preventDefault();

    $.post("profil.aspx", { A: $('#adiSoyadi').val(), B: $('#dogumTarihi').val(), C: $('#Hastane').val(), D: $('#Klinik').val(), E: $('#uzmBasladigiYil').val(), D: $('#hastGirisYili').val()}, function (dataJSON) {
        if (dataJSON.Status == 'OK') {
            alert('Profil başarıyla güncellendi.');
        }
        else{
            alert(hataMesaji);
        }
    }, "jsonp");
});

$(document).ready(function () {
    $(".posts li").hide();
    size_li = $(".posts li").size();
    x=3;
    $('.posts li:lt('+x+')').show();
    $('#loadMore').click(function () {
        x= (x+1 <= size_li) ? x+1 : size_li;
        $('.posts li:lt('+x+')').show();
        swiperNested3.reInit();
        if(x == size_li){
            $('#loadMore').hide();
            $('#showLess').show();
        }
    });
});
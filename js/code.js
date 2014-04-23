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
    onSlideChangeEnd: function () {
        if (swiperParent.activeIndex != 0) {
            $('#header').animate({'top': '0px'}, 400);
        }
        if (swiperParent.activeIndex == 0) {
            $('#header').animate({'top': '-100px'}, 400);
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
    },
    onInit: function(){
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
    },
    onInit: function () {
        if ($('#operasyonListesi').html() != '') {
            $.get('operasyonlistesi.aspx', function (dataJSON) {
                if (dataJSON.length == 0) {
                    $('#operasyonListesi').html('Kayıtlı operasyon bulunamadı.');
                }
                else {
                    for (var i = 0; i < dataJSON.length; i++) {
                        $('#operasyonListesi').append('<li class="post"><a href="#" class="post_more"></a><div class="post_right_reveal"><h4>Cerrahi Türü : ' + dataJSON[i].cerrahiTuru + '<br>Vaka Türü : ' + dataJSON[i].vakaTuru + '</h4></div><div class="post_right_unreveal"><a class="post_comments" href="#" style="float: right;" onclick="sayfaVeIDDegistir(10,' + dataJSON[i].vakaID + ');">Yorum</a><a class="post_comments" href="#" style="float: right;" class="vakaSil" data-vakaid="' + dataJSON[i].vakaID + '">Sil</a><a class="post_comments" href="#" style="float: right"onclick="sayfaVeIDDegistir(1, ' + dataJSON[i].vakaID + ');">Düzenle</a></div><div class="post_left"><span class="day">' + dataJSON[i].Gun + '</span><span class="month">' + dataJSON[i].Ay + '</span><span class="year">' + dataJSON[i].Yil + '</span></div></li>');
                    }
                }
            }, "jsonp");
        }
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
    mode: 'vertical',
//Enable Scrollbar
    scrollbar: {
        container: '.swiper-scrollbar10',
        hide: true,
        draggable: false
    },
    onInit: function () {
        if ($('#vakaID').val() == '0') {
            swiperParent.swipeTo(2);
        }
        else {
            $.get('operasyonyorum.aspx', {A: $('#vakaID').val()}, function (dataJSON) {
                $('#operasyonYorum').val(dataJSON.Yorum);
            }, "jsonp");
        }
    }
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
});
jQuery(function ($) {
    $(".swipebox").swipebox();
});
$(function () {
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
    $(".post_more").click(function () {
        $(this).toggleClass("activep").next().slideToggle("slow");
        return false;
    });
});

$('#yeniOperasyonEkle').on('click', function (e) {
    e.preventDefault();

    $.post("yeniekle.aspx", {A: $('#cerrahiTarihi').val(), B: $('#hastaYasi').val(), C: $('#cerrahiPozisyon').val(), D: $('#vakaTuru').val(),
        E: $('#kullanilanTeknoloji').val(), F: $('#Komplikasyon').val(), G: $('#vakaID').val()}, function (dataJSON) {

        if (dataJSON.Status == 'OK') {
            alert('Yeni Operasyon başarı ile eklendi.');

            if ($('#vakaID').val() == '0') {
                $('#cerrahiTarihi').val('');
                $('#hastaYasi').val('');
                $('#cerrahiPozisyon').val('');
                $('#vakaTuru').val('');
                $('#kullanilanTeknoloji').val('');
                $('#Komplikasyon').val('Yok');
                $('#komplikasyonAciklamasi').val('');

                $('#Komplikasyon').change();
                $('#operasyonListesi').html('');
            }
            else {
                alert(dataJSON.Message);
            }
        }
        else {
            alert(hataMesaji);
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

    $.post("profil.aspx", { A: $('#adiSoyadi').val(), B: $('#dogumTarihi').val(), C: $('#Hastane').val(), D: $('#Klinik').val(),
        E: $('#uzmBasladigiYil').val(), D: $('#hastGirisYili').val()}, function (dataJSON) {

        if (dataJSON.Status == 'OK') {
            alert('Profil başarıyla güncellendi.');
        }
        else{
            alert(hataMesaji);
        }
    }, "jsonp");
});
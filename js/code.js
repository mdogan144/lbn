var hataMesaji = 'Lütfen internet bağlantınızı kontrol ediniz.';
var ip = 'http://192.168.1.108:8888';

$.ajaxSetup({
    timeout: 10000
});

$(document).ajaxError(function () {
    alert(hataMesaji);
});

// TODO: tarih formatı öğrenilecek, tarih parçalanacak. Ay string olarak döndürülecek.
function tarihiParcala(Tarih) {
    var parsedTarih = new Array();

    return parsedTarih;
}

function selectboxDegistir() {
    $('#kullanilanTeknoloji').change();
    $('#vakaTuru').change();
    $('#cerrahiPozisyon').change();
    $('#Komplikasyon').change();
}

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
    onFirstInit: function () {
        if ($('#Hastane').html() == '') {
            $.get(ip + '/User/getHospitalsList', function (data) {
                for (var i = 0; i < data.length; i++) {
                    $('#Hastane').append('<option value="' + data[i].ID + '">' + data[i].Name + '</option>');
                }
            }, "jsonp");
        }

        // TODO: parametreler eşleştirilecek
        $.get(ip + '/User/getUser', function (dataJSON) {
            $('#tcKimlikNo').val(dataJSON.SSN);
            $('#Soyadi').val(dataJSON.Name);
            $('#Adi').val(dataJSON.Surname);
            $('#epostaAdresi').val(dataJSON.MailAddress);
            $('#dogumTarihi').val(dataJSON.Birthday);
            $('#Hastane').val(dataJSON.Hospital);
            $('#Klinik').val(dataJSON.Clinic);
            $('#uzmBasladigiYil').val(dataJSON.uzmBasladigiYil);
            $('#hastGirisYili').val(dataJSON.hastGirisYili);

            $('#uyeTuru').val(dataJSON.DoctorRoleID);
        }, "jsonp");
    },
    onSlideChangeEnd: function () {
        if (swiperParent.activeIndex != 0) {
            $('#header').animate({'top': '0px'}, 400);
        }
        if (swiperParent.activeIndex == 0) {
            $('#header').animate({'top': '-100px'}, 400);
        }

        if (swiperParent.activeIndex == 1) {
            if ($('#kullanilanTeknoloji').html() == '') {
                // TODO: Request adresi ve parametreler değiştirilecek.
                $.get(ip + '/Operation/getTechnologiesList', function (dataJSON) {
                    for (var i = 0; i < dataJSON.length; i++) {
                        $('#kullanilanTeknoloji').append('<option value="' + dataJSON[i].ID + '">' + dataJSON[i].Name + '</option>');
                    }
                });
            }

            if ($('#vakaTuru').html() == '') {
                $.get(ip + '/Operation/getOperationTypesList', function (dataJSON) {
                    for (var i = 0; i < dataJSON.length; i++) {
                        $('#vakaTuru').append('<option value="' + dataJSON[i].ID + '">' + dataJSON[i].Name + '</option>');
                    }
                });
            }

            if ($('#cerrahiPozisyon').html() == '') {
                $.get(ip + '/SurgeryPosition/getSurgeryPositionsList', function (dataJSON) {
                    for (var i = 0; i < dataJSON.length; i++) {
                        $('#cerrahiPozisyon').append('<option value="' + dataJSON[i].ID + '">' + dataJSON[i].Name + '</option>');
                    }
                });
            }

            if ($('#vakaID').val() == '0') {
                $('#cerrahiTarihi').val('');
                $('#hastaYasi').val('');
                $('#cerrahiPozisyon').val('');
                $('#vakaTuru').val('');
                $('#kullanilanTeknoloji').val('');
                $('#Komplikasyon').val('Yok');
                $('#komplikasyonAciklamasi').val('');

                selectboxDegistir();
            }
            else {
                $.get(ip + '/Operation/getOperationDetail', {pOperationID: $('#vakaID').val()}, function (dataJSON) {
                    if (dataJSON.success != true) {
                        alert('Belirtmiş olduğunuz operasyon bulunamadı. Operasyon silinmiş olabilir.');
                    }
                    else {
                        $('#cerrahiTarihi').val(dataJSON.Date);
                        $('#hastaYasi').val(dataJSON.PatientAge);
                        $('#cerrahiPozisyon').val(dataJSON.SurgeryPositionRef);
                        $('#vakaTuru').val(dataJSON.OperationTypeRef);
                        $('#kullanilanTeknoloji').val(dataJSON.SurgeryTechnologyRef);
                        $('#Komplikasyon').val(dataJSON.ComplicationType);
                        $('#komplikasyonAciklamasi').val(dataJSON.ComplicationDetail);

                        selectboxDegistir();
                    }
                }, "jsonp");
            }
        }
        else if (swiperParent.activeIndex == 2) {
            if ($('#operasyonListesi').html() != '') {
                $.get(ip + '/Operation/getOperationsList', function (dataJSON) {
                    if (dataJSON.length == 0) {
                        $('#operasyonListesi').html('<li>Kayıtlı operasyon bulunamadı.</li>');
                    }
                    else {
                        for (var i = 0; i < dataJSON.length; i++) {
                            var tarih = tarihiParcala(dataJSON[i].Date);

                            $('#operasyonListesi').append('<li class="post"><a href="#" class="post_more"></a><div class="post_right_reveal"><h4>Cerrahi Pozisyon : ' + dataJSON[i].SurgeryPositionName + '<br>Vaka Türü : ' + dataJSON[i].OperationTypeName + '</h4></div><div class="post_right_unreveal"><a class="post_comments" href="#" style="float: right;" onclick="sayfaVeIDDegistir(10,' + dataJSON[i].ID + ');">Yorum</a><a class="post_comments" href="#" style="float: right;" class="vakaSil" data-vakaid="' + dataJSON[i].ID + '">Sil</a><a class="post_comments" href="#" style="float: right"onclick="sayfaVeIDDegistir(1, ' + dataJSON[i].ID + ');">Düzenle</a></div><div class="post_left"><span class="day">' + tarih[0] + '</span><span class="month">' + tarih[1] + '</span><span class="year">' + tarih[2] + '</span></div></li>');
                        }
                    }
                }, "jsonp");
            }
        }
        else if (swiperParent.activeIndex == 3) {
            // TODO: Request adresi değiştirilecek.
            $.get(ip + '/User/getAssistantsList', function (dataJSON) {
                if (dataJSON.length == 0) {
                    $('#Asistanlarim').html('<li>Kullanıcıya bağlı asistan bulunamadı.</li>');
                }
                else {
                    for (var i = 0; i < dataJSON.length; i++) {
                        $('#Asistanlarim').append('<li class="post"><a href="#" class="post_more"></a><div class="post_right_reveal" style="left: 0; width: 85%"><h4>Asistan Adı : ' + dataJSON[i].Name + ' </h4></div><div class="post_right_unreveal" style="left: 0; width: 85%"><a class="post_comments asistanKaldir" data-asistanid=" ' + dataJSON[i].ID + ' " href="#" style="float: right;">Kaldır</a></div></li>');
                    }
                }
            }, "jsonp");
        }
        else if (swiperParent.activeIndex == 4) {
            if ($('#istatistikCache').val() == '0') {
                var renkler = ["yellow", "red", "purple", "blue", "orange", "bluegreen"];

                // TODO : istatistikler alınacak
                $.get('istatistikler.aspx', function (dataJSON) {
                    $('#toplamOperasyon').text(dataJSON.toplamOperasyon);
                    $('#komplikasyonSayisi').text(dataJSON.komplikasyonSayisi);

                    var toplam = 0;
                    var carpan = 1;

                    for (var i = 0; i < dataJSON.Teknolojiler.length; i++) {
                        toplam += dataJSON.Teknolojiler[i].Sayisi;
                    }

                    carpan = 100 / toplam;

                    var shuffleRenkler = renkler;

                    for (var j, x, i = shuffleRenkler.length; i; j = Math.floor(Math.random() * i), x = shuffleRenkler[--i], shuffleRenkler[i] = shuffleRenkler[j], shuffleRenkler[j] = x);

                    for (var i = 0; i < dataJSON.Teknolojiler.length; i++) {
                        $('#kullanilanTeknolojiler h3').append('<div class="stats"><span>' + dataJSON.Teknolojiler[i].Adi + '</span><div class="bar ' + shuffleRenkler.pop() + '" style="width: ' + Math.floor(dataJSON.Teknolojiler[i].Sayisi * carpan) + '%;">' + dataJSON.Teknolojiler[i].Sayisi + '</div></div><br>');
                    }

                    toplam = 0;

                    for (var i = 0; i < dataJSON.vakaTurleri.length; i++) {
                        toplam += dataJSON.vakaTurleri[i].Sayisi;
                    }

                    carpan = 100 / toplam;

                    shuffleRenkler = renkler;

                    for (var j, x, i = shuffleRenkler.length; i; j = Math.floor(Math.random() * i), x = shuffleRenkler[--i], shuffleRenkler[i] = shuffleRenkler[j], shuffleRenkler[j] = x);

                    for (var i = 0; i < dataJSON.vakaTurleri.length; i++) {
                        $('#vakaTurleri h3').append('<div class="stats"><span>' + dataJSON.vakaTurleri[i].Adi + '</span><div class="bar ' + shuffleRenkler.pop() + '" style="width: ' + Math.floor(dataJSON.vakaTurleri[i].Sayisi * carpan) + '%;">' + dataJSON.vakaTurleri[i].Sayisi + '</div></div><br>');
                    }

                    $('#istatistikCache').val('1');
                }, "jsonp");
            }
        }
        else if (swiperParent.activeIndex == 5) {
            // TODO : Request adresi tanımlanacak. Asistan Adı AssistantName olarak yazıldı.
            $.get('asistanOperasyonlarim.aspx', function (dataJSON) {
                if (dataJSON.length == 0) {
                    $('#AsistanOperasyonListesi').html('<li>Asistanların operasyon kaydı bulunamadı.</li>');
                }
                else {
                    for (var i = 0; i < dataJSON.length; i++) {
                        var tarih = tarihiParcala(dataJSON[i].Date);
                        $('#AsistanOperasyonListesi').append('<li class="post" ><a href="#" class="post_more"></a><div class="post_right_reveal"><h4>' + dataJSON[i].AssistantName + '<br>Cerrahi Pozisyon : ' + dataJSON[i].SurgeryPositionName + ' <br>Vaka Türü : ' + dataJSON[i].OperationTypeName + '</h4></div><div class="post_right_unreveal"><a class="post_comments" data-operasyonid="' + dataJSON[i].ID + '" href="#" style="float: right;"onclick="sayfaVeIDDegistir(10,' + dataJSON[i].ID + ');">Yorum</a></div><div class="post_left"><span class="day">' + tarih[0] + '</span><span class="month">' + tarih[1] + '</span><span class="year">' + tarih[2] + '</span></div></li>');
                    }
                }
            }, "jsonp");
        }
        else if (swiperParent.activeIndex == 7) // operasyon yorumu
        {
            if ($('#uyeTuru').val() == '2') {
                $('#yorumKaydet').remove();
            }

            if ($('#vakaID').val() == '0') {
                swiperParent.swipeTo(2);
            }
            else {
                // TODO : yorum yapılacak adres commentOperation olarak varsayıldı.
                $.get(ip + '/Operation/commentOperation', {ID: $('#vakaID').val()}, function (dataJSON) {
                    $('#operasyonYorum').val(dataJSON.Comment);
                }, "jsonp");
            }
        }
    }
})
var swiperNested = new Swiper('.swiper-nested', {
    scrollContainer: true,
    mousewheelControl: true,
    mode: 'vertical',
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
$(function () {
    $(".post_more").click(function () {
        $(this).toggleClass("activep").next().slideToggle("slow");
        return false;
    });
});
$('#yeniOperasyonEkle').on('click', function (e) {
    e.preventDefault();

    var adres = $('#vakaID').val() == '0' ? 'createOperation' : 'updateOperation';
    $.post(ip + '/Operation/' + adres, {Date: $('#cerrahiTarihi').val(), PatientAge: $('#hastaYasi').val(), SurgeryPositionRef: $('#cerrahiPozisyon').val(), OperationTypeRef: $('#vakaTuru').val(), SurgeryTechnologyRef: $('#kullanilanTeknoloji').val(), ComplicationType: $('#Komplikasyon').val(), ComplicationDetail: $('#KomplikasyonAciklamasi').val(), ID: $('#vakaID').val()}, function (dataJSON) {
        if (dataJSON.success == true) {

            if ($('#vakaID').val() == '0') {
                alert('Yeni Operasyon başarı ile eklendi.');

                $('#cerrahiTarihi').val('');
                $('#hastaYasi').val('');
                $('#cerrahiPozisyon').val('');
                $('#vakaTuru').val('');
                $('#kullanilanTeknoloji').val('');
                $('#Komplikasyon').val('Yok');
                $('#komplikasyonAciklamasi').val('');

                $('#operasyonListesi').html('');
                $('#istatistikCache').val('0');

                selectboxDegistir();
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

    $.get(ip + '/Operation/deleteOperation', {ID: $(this).data('vakaid')}, function (dataJSON) {
        if (dataJSON.success == true) {
            alert('Operasyon başarı ile silindi.');
        }
        else {
            alert(hataMesaji);
        }
    })
}, "jsonp");
$(document).on('click', '.asistanKaldir', function (e) {
    e.preventDefault();

    // TODO : parametreler ve request adresi.
    $.get('asistanKaldir.aspx', {ID: $(this).data('asistanid')}, function (dataJSON) {
        if (dataJSON.success == true) {
            alert('Asistan başarıyla kaldırıldı.');
        }
        else {
            alert(hataMesaji);
        }
    })
}, "jsonp");
$('#Komplikasyon').on('change', function () {
    if ($(this).val() == 'Var') {
        $('#komplikasyonAciklamasi').parent().slideDown('fast');
    }
    else {
        $('#komplikasyonAciklamasi').parent().slideUp('fast');
    }
});
$('#yorumKaydet').on('click', function (e) {
    e.preventDefault();

    $.post("yorum.aspx", { A: $('#vakaID').val(), B: $('#operasyonYorum').val()}, function (dataJSON) {
        if (dataJSON.success == true) {
            alert('Yorum başarıyla eklendi.');
        }
        else {
            alert(hataMesaji);
        }
    }, "jsonp");
});
$('#profilGuncelle').on('click', function (e) {
    e.preventDefault();

    // TODO: parametreler
    $.post(ip + '/User/updateUser', { Name: $('#Adi').val(), Surname: $('#Soyadi').val(), Birthday: $('#dogumTarihi').val(), HospitalRef: $('#Hastane').val(), ClinicRef: $('#Klinik').val(), E: $('#uzmBasladigiYil').val(), F: $('#hastGirisYili').val(), G: $('#epostaAdresi').val()}, function (dataJSON) {
        if (dataJSON.success == true) {
            alert('Profil başarıyla güncellendi.');
        }
        else {
            alert(hataMesaji);
        }
    }, "jsonp");
});
$('#Hastane').on('change', function () {
    if ($(this).val() == '0') {
        $('#Klinik').html('');
    }
    else {
        $.get(ip + '/User/getClinicsForHospital', {pHospitalID: $('#Hastane').val()}, function (dataJSON) {
            $('#Klinik').html('');

            for (var i = 0; i < dataJSON.length; i++) {
                $('#Klinik').append('<option value="' + dataJSON[i].ID + '">' + dataJSON[i].Name +
                    '</option>');
            }
        }, "jsonp");
    }
});
$('#doktorAdi').on('keyrelease', function () {
    $.post('doktorara.aspx', {A: $('#doktarAdi').val()}, function (dataJSON) {
        for (var i = 0; i < dataJSON.length; i++) {
            $('#doktorListesi').append('<li>' + dataJSON[i].doktorAdi + '</li>');
        }
    }, "jsonp");
});
$(document).on('click', '.istekGonder', function (e) {
    e.preventDefault();

    $.post('supervizor.aspx', {A: $(this).data('doktorid')}, function (dataJSON) {
        if (dataJSON.success == true) {
            alert('Süpervizör isteğiniz gönderildi.');
        }
        else {
            alert(dataJSON.Message);
        }
    }, "jsonp");
});
$(document).on('click', '#supervizorIptal', function () {
    $.get('supervizoriptal.aspx', function (dataJSON) {
        if (dataJSON.success == true) {
            alert('İşlem başarı ile tamamlandı.');
        }
        else {
            alert(hataMesaji);
        }
    });
});
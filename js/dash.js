(function() {
    $(".dashboard-nav__item").on("click", function(e) {
        var itemId;
        e.preventDefault();
        $(".dashboard-nav__item").removeClass("dashboard-nav__item--selected");
        $(this).addClass("dashboard-nav__item--selected");
        itemId = $(this).children().attr("href");
        $(".dashboard-content__panel").hide();
        $(".dashboard-content__panel[data-panel-id=" + itemId + "]").show();
        if (window.screen.width > 800) {
            if (itemId === "my_trip") {
                $(".dashboard-preview").show();
            } else {
                $(".dashboard-preview").hide();
            }
        }
        document.querySelector("#mobile-menu").innerHTML = "☰";
        document.querySelector(".dashboard-nav").classList.remove("show");
        document.querySelector(".dashboard-content").classList.add("show");
        return console.log(itemId);
    });

    $(".dashboard-list__item").on("click", function(e) {
        var itemId;
        e.preventDefault();
        $(".dashboard-preview").show();
        $(".dashboard-content").hide();
        $(".dashboard-list__item").removeClass("dashboard-list__item--active");
        $(this).addClass("dashboard-list__item--active");
        itemId = $(this).attr("data-item-id");
        $(".dashboard-preview__panel").hide();
        $(".dashboard-preview__panel[data-panel-id=" + itemId + "]").show();
        return console.log(itemId);
    });
}.call(this));

var form = $("#contact");
form.validate({
    errorPlacement: function errorPlacement(error, element) {
        element.before(error);
    },
    rules: {
        confirm: {
            equalTo: "#password",
        },
    },
});
form.children("div").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    onStepChanging: function(event, currentIndex, newIndex) {
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    },
    onFinishing: function(event, currentIndex) {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function(event, currentIndex) {
        alert("Submitted!");
    },
});


$("#play").click(function() {
    $("#pop").css("display", "block");
    $("#wrap").css("display", "none");
    $("#btn").css("display", "none");
});
$("#close-btn").click(function() {
    $("#pop").css("display", "none");
});

$(document).ready(function() {
    $("a.go").click(function(e) {
        //скроллом поднимает страницу вверх
        e.preventDefault();
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $("html, body").animate({
                scrollTop: destination,
            },
            1000
        );
    });
});

function getRndInteger(min, max) {
    // выдает рандомное число
    return Math.floor(Math.random() * (max - min)) + min;
}

$("#pers").html(getRndInteger(7, 35)); // вставляет рандомное число внизу "В данный момент эту страницу просматривает: "

jQuery(function($) {
    $("#tel").mask("+7 (000) 000-00-00");
}); // маска для поля телефона

$("#apartment").html(getRndInteger(20, 62));
$("#house").html(getRndInteger(3, 17)); // вставляется рандомное число в "Вашу квартиру готовы выкупить "

function pagination() {
    var pagNum = $("#slide .block").length; //сколько блоков внутри id="slide"
    for (var i = 0; i < pagNum; i++) {
        //рассчитываем верхний прогрессбар
        $(".forma .line").append("<span></span>");
    }
    $(".forma .line span").css({
        width: 100 / pagNum + "%",
    });
    $(".forma .line span:eq(0)").addClass("active");
}

function proc() {
    //бегущие проценты в конце
    var p = 1;
    setInterval(function() {
        if (p < 100) {
            p = p + 1;
            $(".line__proc")
                .empty()
                .text(p + "%");
        }
    }, 50);
}

$(".checkboxs--preloader label").on("click", function() {
    //ставим в последнем блоке этот класс (после него запускается отсчет)
    setTimeout(function() {
        proc();
    }, 600);
    setTimeout(function() {
        if ($(".block.active").hasClass("block-preload")) {
            $(".block.active").fadeOut(500, function() {
                $(this).removeClass("active").next().addClass("active");
                $(this).next().fadeIn(500);
            });
        }
    }, 5600);
});

function nextStep() {
    $(".popup .forma label").on("click", function() {
        setTimeout(function() {
            $(".block.active").fadeOut(500, function() {
                $(this).removeClass("active").next().addClass("active");
                $(this).next().fadeIn(500);
            });
            var index = $(".block.active").index() + 1;
            $(".forma .line span:eq(" + index + ")")
                .addClass("active")
                .nextAll()
                .removeClass("active");
        }, 300);
    });
    $(".but.next").on("click", function() {
        var checkVal = false;
        var checkboxLength = $(".block.active input:radio").each(function() {
            if ($(this).prop("checked")) {
                checkVal = true;
            }
        });
        if (checkVal) {
            $(".block.active").fadeOut(500, function() {
                $(this).removeClass("active").next().addClass("active");
                $(this).next().fadeIn(500);
            });
            checkVal = false;
            var index = $(".block.active").index() + 1;
            $(".forma .line span:eq(" + index + ")")
                .addClass("active")
                .nextAll()
                .removeClass("active");
        } else {
            $('.block.active input[type="radio"]').next().addClass("animateError");
            setTimeout(function() {
                $('.block.active input[type="radio"]')
                    .next()
                    .removeClass("animateError");
            }, 800);
        }
    });
    $(".but.preview").on("click", function() {
        $(".block.active").fadeOut(500, function() {
            $(this).removeClass("active").prev().addClass("active");
            $(this).prev().fadeIn(500);
        });
    });
}

$("#tel").on("focus", function() {
    $(this).val("+7 (9");
});

$(window).on("load", function() {
    nextStep();
    pagination();
});
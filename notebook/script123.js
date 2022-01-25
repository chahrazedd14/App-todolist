$(document).ready(function() {
    $(".container").fadeIn(1000);
    $(".s2class").css({ color: "#EE9BA3" });
    $(".s1class").css({ color: "#748194" });
    $("#left").removeClass("left_hover");
    $("#right").addClass("right_hover");
    $(".signin").css({ display: "none" });
    $(".signup").css({ display: "" });
});
$("#right").click(function() {
    $("#left").removeClass("left_hover");
    $(".s2class").css({ color: "#EE9BA3" });
    $(".s1class").css({ color: "#748194" });
    $("#right").addClass("right_hover");
    $(".signin").css({ display: "none" });
    $(".signup").css({ display: "" });
});
$("#left").click(function() {
    $(".s1class").css({ color: "#EE9BA3" });
    $(".s2class").css({ color: "#748194" });
    $("#right").removeClass("right_hover");
    $("#left").addClass("left_hover");
    $(".signup").css({ display: "none" });
    $(".signin").css({ display: "" });
});
document.querySelector("button").onclick = (e) => {
    document.querySelector("button").style.left = "130px";
};

//submit
var button = $(".button"),
    spinner = '<span class="spinner"></span>';

button.click(function() {
    if (!button.hasClass("loading")) {
        button.toggleClass("loading").html(spinner);
    }
});

// button submit
var btn1 = $(".loading_btn1"),
    spinner = '<span class="spinner"></span>';

btn1.click(function() {
    if (!btn1.hasClass("loading")) {
        btn1.toggleClass("loading").html(spinner);
    }
});

var btn2 = $(".loading_btn2"),
    spinner = '<span class="spinner"></span>';

btn2.click(function() {
    if (!btn2.hasClass("loading3")) {
        btn2.toggleClass("loading").html(spinner);
    }
});

var btn3 = $(".loading_btn3"),
    spinner = '<span class="spinner"></span>';

btn3.click(function() {
    if (!btn3.hasClass("loading")) {
        btn3.toggleClass("loading").html(spinner);
    }
});

document.querySelector(".s1class").onclick = () => {
    document.querySelector(".toggleslide").style.transform = "translateX(0px)";
};
document.querySelector(".s2class").onclick = () => {
    document.querySelector(".toggleslide").style.transform = "translateX(0px)";
};
document.querySelector(".btnSubmit").addEventListener("click", () => {
    document.querySelector(
        ".container2 #email[data-forget='forget']"
    ).style.zIndex = "1";
});
var state = false;

function toggle() {
    // var et = window.event
    // var el = "password";
    // var eyew = "eye-wrapper";
    // var op = "open";
    // var cs = "close";
    if (state) {
        // if(et.target.parentElement.getAttribute("name")=="password-signup"){
        //     console.log(et.target.parentElement);
        //     el = "password-signup";
        //     eyew = "eye-wrapper-signup";
        //     op = "open-signup";
        //     cs = "close-signup";
        // }
        document.getElementById("password").setAttribute("type", "password");
        document.getElementById("eye-wrapper").style.boxShadow = "0 0 0 0px white";
        document.getElementById("open").style.display = "none";
        document.getElementById("close").style.display = "block";
        document.getElementById("close").style.fill = "white";
        state = false;
    } else {
        // console.log(this.currentTarget);
        // if(et.target.parentElement.getAttribute("name")=="password-signup"){
        //     console.log(et.target.parentElement);
        //     el = "password-signup";
        //     eyew = "eye-wrapper-signup";
        //     op = "open-signup";
        //     cs = "close-signup";
        // }
        document.getElementById("password").setAttribute("type", "text");
        document.getElementById("eye-wrapper").style.boxShadow =
            "0 0 0 250px #121726";
        document.getElementById("open").style.display = "block";
        document.getElementById("close").style.display = "none ";
        document.getElementById("close").style.fill = "red";
        state = true;
    }
}

// for signup eye
function toggle2() {
    if (state) {
        document.getElementById("password-signup").setAttribute("type", "password");
        document.getElementById("eye-wrapper-signup").style.boxShadow =
            "0 0 0 0px white";
        document.getElementById("open-signup").style.display = "none";
        document.getElementById("close-signup").style.display = "block";
        document.getElementById("close-signup").style.fill = "white";
        state = false;
    } else {
        document.getElementById("password-signup").setAttribute("type", "text");
        document.getElementById("eye-wrapper-signup").style.boxShadow =
            "0 0 0 250px #121726";
        document.getElementById("open-signup").style.display = "block";
        document.getElementById("close-signup").style.display = "none ";
        document.getElementById("close-signup").style.fill = "red";
        state = true;
    }
}

//Adjust size of text area acordingly
function textAreaAdjust(o) {
    o.style.height = "100px";
    o.style.height = 25 + o.scrollHeight + "px";
}

// When the browser is ready...
$(function() {
    //remove outline
    $("#username, #email, #password").click(function() {
        $(this).removeClass("outline");
    });

    // Setup form validation on the #register-form element
    $("#signupform").validate({
        // Specify the validation rules
        rules: {
            username: "required",
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
            },
        },

        // Specify the validation error messages
        messages: {
            username: "Please enter your Username",
            password: {
                required: "Please provide a password",
            },
            email: "Please enter a valid email address",
        },

        submitHandler: function(form) {
            if ($("#signupform").valid()) {
                form.submit();
            }
        },

        highlight: function(form, outline) {
            $(form).addClass("outline");
        },

        invalidHandler: function(event, validator) {
            // 'this' refers to the form
            var errors = validator.numberOfInvalids();
            if (errors) {
                var message = errors == 1;
            }
        },
    });

    $("#singinform").validate({
        // Specify the validation rules
        rules: {
            username: "required",

            password: {
                required: true,
            },
        },

        // Specify the validation error messages
        messages: {
            username: "Please enter your Username",
            password: {
                required: "Please provide a password",
            },
        },

        submitHandler: function(form) {
            if ($("#singinform").valid()) {
                form.submit();
            }
        },

        highlight: function(form, outline) {
            $(form).addClass("outline");
        },

        invalidHandler: function(event, validator) {
            // 'this' refers to the form
            var errors = validator.numberOfInvalids();
            if (errors) {
                var message = errors == 1;
            }
        },
    });
});
var cd;
var IsAllowed = false;
$(document).ready(function() {
    CreateCaptcha();
});

// Create Captcha
function CreateCaptcha() {
    //$('#InvalidCapthcaError').hide();
    var alpha = new Array(
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
    );

    var i;
    for (i = 0; i < 6; i++) {
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
        var f = alpha[Math.floor(Math.random() * alpha.length)];
    }
    cd = a + " " + b + " " + c + " " + d + " " + e + " " + f;
    $("#CaptchaImageCode")
        .empty()
        .append(
            '<canvas id="CapCode" class="capcode" width="250" height="80"></canvas>'
        );

    var c = document.getElementById("CapCode"),
        ctx = c.getContext("2d"),
        x = c.width / 2,
        img = new Image();

    img.src =
        "https://media.istockphoto.com/vectors/sunburst-background-vector-pattern-with-a-vintage-color-palette-of-vector-id1038701114?s=170x170";
    img.onload = function() {
        var pattern = ctx.createPattern(img, "repeat");
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.font = "30px Roboto Slab";
        ctx.fillStyle = "#ccc";
        ctx.textAlign = "center";
        ctx.setTransform(1, -0.12, 0, 1, 0, 15);
        ctx.fillText(cd, x, 55);
    };
}

// Validate Captcha
function ValidateCaptcha() {
    var string1 = removeSpaces(cd);
    var string2 = removeSpaces($("#UserCaptchaCode").val());
    if (string1 == string2) {
        return true;
    } else {
        return false;
    }
}

// Remove Spaces
function removeSpaces(string) {
    return string.split(" ").join("");
}

// Check Captcha
function CheckCaptcha() {
    var result = ValidateCaptcha();

    console.log(result);
    if (
        $("#UserCaptchaCode").val() == "" ||
        $("#UserCaptchaCode").val() == null ||
        $("#UserCaptchaCode").val() == "undefined"
    ) {
        $("#WrongCaptchaError")
            .text("Please enter code given below in a picture.")
            .show();
        $("#UserCaptchaCode").focus();
    } else {
        if (result == false) {
            IsAllowed = false;
            $("#WrongCaptchaError").text("Invalid Captcha! Please try again.").show();
            CreateCaptcha();
            $("#UserCaptchaCode").focus().select();
        } else {
            IsAllowed = true;
            $("#UserCaptchaCode")
                .val("")
                .attr("place-holder", "Enter Captcha - Case Sensitive");
            CreateCaptcha();
            $("#WrongCaptchaError").fadeOut(100);
            $("#SuccessMessage")
                .fadeIn(500)
                .css("display", "block")
                .delay(5000)
                .fadeOut(250);
        }
        //forget password
        var forget = $(".btnSubmit[name='forgetPassword']");
        var spinner = '<span class="spinner"></span>';
        if (!forget.hasClass("loading")) {
            setTimeout(function() {
                forget.css({ borderRadius: "50px" });
                forget.toggleClass("loading").html(spinner);
            }, 3000);
        }
    }
}

function Submit() {
    if (IsAllowed === false) {} else {
        // document.getElementById("thebutton").style.visibility = "visible";

        $("#forgetFORM").submit();
    }
}

// second one        for

$(".help").on("click", function() {
    $(".help-panel").animate({
            width: "300px",
        },
        500,
        function() {
            $(".help-panel").animate({
                    height: "506px",
                },
                500
            );
        }
    );
    setTimeout(function() {
        $("#help-panel").animate({
                opacity: "1.0",
            },
            250
        );
    }, 340);
});

$(".Collapse-Help").on("click", function() {
    $(".help-panel").animate({
            height: "180px",
        },
        500,
        function() {
            $(".help-panel").animate({
                    width: "0px",
                },
                500
            );

            $("#help-panel").show();
            $("#ThankYou").hide();
        }
    );

    setTimeout(function() {
        $("#help-panel").animate({
                opacity: "0",
            },
            250
        );
    }, 100);
});

$(".action-button").on("click", function() {
    var isValid = false;

    if (
        $("#textarea").val() == "" ||
        $("#textarea").val() == null ||
        $("#textarea").val() == "undefined"
    ) {
        $("#textarea").addClass("error").focus();
        isValid = false;
        return isValid;
    } else {
        isValid = true;
        $("#textarea").removeClass("error");
        $("#ThankYou").fadeIn(500);
        $("#help-panel").fadeOut(100);
        setTimeout(function() {
            $("#textarea").val("");
        }, 150);
        return isValid;
    }
});
import $ from 'jquery'

let letters = $(".container").children()

let open = false;

$.each(letters, (index, element) => {
    $( element ).click(() => {
        if (!open) {
            open = true;
            $($(element).children()[0]).css({"background-color": "hsl("+(60*(index+1))+", 40%, 50%)", "color": "white" })
            if ($(window).width() > 1100) {
                $(element).css("left", "0")
                for (let i = 0; i < letters.length - index -2; i++) {
                    $(letters[index+1+i]).css("left", "100vw")
                }
                $(".close").css("z-index", index+1)
            } else {
                $(element).css("bottom", "0")
                for (let i = index-1; i >= 0; i--) {
                    $(letters[i]).css("bottom", "100vh")
                }
                $(".close").css("z-index", Math.abs(6-index))
            }
            $(".container").addClass("fullView")
            $(".container").removeAttr("style")
            height = window.innerHeight
            $(".container").css("--height", height)
        }
    })    
})

$.each($(".close"), (index, element) => {
    $( element ).click(() => {
        $.each(letters, (index, elem) => {
            $(elem).removeAttr("style")
            $($(elem).children()[0]).removeAttr("style")
        })
        if ($(window).width() > 1100) {
            $(".container").css("transform", "perspective(600px) rotateY("+rotY+"deg) rotateX("+rotX+"deg) scale(0.6)")
        }
        setTimeout(() => {
            open = false
        }, 200)
        setTimeout(() => {
            $(".container").removeClass("fullView")
        }, 400)
    })
})

let centerY,centerX, mouseX, mouseY, rotY, rotX, height

$(document).ready(() => {
    height = window.innerHeight
    $(".container").css("--height", height)
    try{window.screen.orientation.lock("portrait")} catch {}
    $(document).mousemove((e) => {
        if ($(window).width() > 1100) {
            centerY = $(window).height() / 2
            centerX = $(window).width() / 2

            mouseX = e.pageX - centerX
            mouseY = (e.pageY - centerY) * -1


            rotY = (mouseX / centerX) * 8 // 5
            rotX = (mouseY / centerY) * 13 // 8
            if (!open) {
                $(".container").css("transform", "perspective(600px) rotateY("+rotY+"deg) rotateX("+rotX+"deg) scale(0.6)")
            }
        }
    })
})

$(window).resize(() => {
    height = window.innerHeight
    $(".container").css("--height", height)
})

setInterval(() => {
    var options = {
        timeZone: 'Europe/Dublin',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
    }
    let formatter = new Intl.DateTimeFormat([], options)
    let currTime = formatter.format(new Date())
    $("#time").html(
        currTime
    )
}, 1000)
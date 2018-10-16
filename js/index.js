import $ from 'jquery'

let letters = $(".container").children()

let open = false;

$.each(letters, (index, element) => {
    $( element ).click(() => {
        if (!open) {
            open = true;
            $(element).css("left", "0")
            $($(element).children()[0]).css({"background-color": "hsl("+(60*(index+1))+", 40%, 50%)", "color": "white" })
            for (let i = 0; i < letters.length - index -2; i++) {
                $(letters[index+1+i]).css("left", "100vw")
            }
            $(".close").css("z-index", index+1)
            $(".container").addClass("fullView")
            $(".container").removeAttr("style")
        }
    })    
})

$.each($(".close"), (index, element) => {
    $( element ).click(() => {
        $.each(letters, (index, elem) => {
            $(elem).removeAttr("style")
            $($(elem).children()[0]).removeAttr("style")
        })
        $(".container").css("transform", "perspective(600px) rotateY("+rotY+"deg) rotateX("+rotX+"deg) scale(0.6)")
        setTimeout(() => {
            open = false
        }, 200)
        setTimeout(() => {
            $(".container").removeClass("fullView")
        }, 400)
    })
})

let centerY,centerX, mouseX, mouseY, rotY, rotX

$(document).ready(() => {
    $(document).mousemove((e) => {
        centerY = $(window).height() / 2
        centerX = $(window).width() / 2

        mouseX = e.pageX - centerX
        mouseY = (e.pageY - centerY) * -1


        rotY = (mouseX / centerX) * 8 // 5
        rotX = (mouseY / centerY) * 13 // 8
        if (!open) {
            $(".container").css("transform", "perspective(600px) rotateY("+rotY+"deg) rotateX("+rotX+"deg) scale(0.6)")
        }
    })
})
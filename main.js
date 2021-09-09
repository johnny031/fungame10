let getName = localStorage.getItem("names")
let names = getName.split(",")
let current_player = -1
let current_question = -1
let schedule = 0
let interval

for (let i = 0; i < names.length; i++) {
    $(".board").append(`
        <div>${names[i]}：<span id="${i}">0</span> 分</div>
    `)

}

function startTimer(duration) {
    let timer = duration
    interval = setInterval(function () {
        $("#timer").text((timer / 100).toFixed(2))
        --timer
        if (timer < 333) {
            $("body").get(0).style.setProperty("--color1", "#e9b405")
            $("body").get(0).style.setProperty("--color2", "#a5890c")
        }
        if (timer < 167) {
            $("body").get(0).style.setProperty("--color1", "#fd664b")
            $("body").get(0).style.setProperty("--color2", "#bb473f")
        }
        if (timer < 0) {
            clearInterval(interval)
            $(".round").html("挑戰失敗QQ")
            $(".flip").html("下局")
            schedule++
        }

    }, 10)
}

function next() {
    current_player++
    $(".round").html(names[current_player])
    setTimeout(() => {
        current_question++
        $(".span").html(question[current_question])
    }, 500)
    if (current_player === names.length - 1) current_player = -1
}

function add_score(x) {
    current_player === -1 ? id = names.length - 1 : id = current_player
    $(`#${id}`).html(parseInt($(`#${id}`).html()) + x)
}

next()

$("#card").flip({ trigger: "manual" })

$(".flip").on("click", function () {
    if (schedule % 4 === 0) {
        $("#card").flip(true)
        $(this).html("開始")
    } else if (schedule % 4 === 1) {
        $(this).html("完成")
        startTimer(500)
    } else if (schedule % 4 === 2) {
        clearInterval(interval)
        if (confirm("檢查其答案是否合理？")) {
            $(".round").html("挑戰成功!")
            add_score(1)
        } else {
            $(".round").html("挑戰失敗QQ")
        }
        $(this).html("下局")
    } else if (schedule % 4 === 3) {
        $("body").get(0).style.setProperty("--color1", "#09d7e6")
        $("body").get(0).style.setProperty("--color2", "#10a1b4")
        $("#timer").text("5.00")
        $("#card").flip(false)
        $(this).html("翻牌")
        next()
    }
    schedule++
})

$(".round").on("click", function () {
    $(".board").slideToggle()
})
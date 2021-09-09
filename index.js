let player_number = 1
let names = []

$("#add_player").on("click", function () {
    $("#input_div").append("<div class='d" + player_number + "'><input type='text' class='names_input'><button class='icon_button b" + player_number + "' onclick='delete_button(" + player_number + ")'><i class='fas fa-times-circle'></i></button><br></div>")
    player_number++
})

function delete_button(player_number) {
    $(".d" + player_number).remove()
}

function start() {
    let invalid = false
    $(".names_input").each(function () {
        if ($(this).val() === "") {
            alert("玩家名稱請勿空白")
            invalid = true
            return false
        }
    })
    if (invalid) return false

    $(".names_input").each(function () {
        names.push($(this).val())
    })
    localStorage.setItem("names", names)
    location.href = "main.html";
}


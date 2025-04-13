var selected;
$(document).ready(function(){
    
    // create the board
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if ( (r + c) % 2 == 0) {
                // white tiles
                $("#grid").append("<div class='square black'></div>");
            } else {
                // red tiles
                $("#grid").append(`<div id='${r}${c}' class='square red'></div>`);

                // add the piece
                if ( r < 3 ) {
                    $(`#${r}${c}`).append("<div class='piece black'></div>")
                } else if ( r > 4 ) {
                    $(`#${r}${c}`).append("<div class='piece white'></div>")
                }
            }
        }
    }

    $('.piece').on("click", function(){
        let turn = $('#turn').html();
        if ($(this).hasClass(turn)) {
            $('.selected').removeClass("selected");
            selected = $(this);
            moveChecker();
            $(this).addClass("selected");
        }
    });
    // cannot put multiple pieces into a square
    $('.square.red').on("click", function(){
        if ( $('.selected').length > 0 && $(this).children().length == 0) {
            $(this).append( $(selected) );
            $('.selected').removeClass("selected");
            changeTurn()
        }
    });
})

function changeTurn() {
    let turn = $("#turn").html();
    if (turn == "black") {
        $("#turn").html("white");
        $("h3").removeClass("turn-black").addClass("turn-white");
    } else if (turn == "white") {
        $("#turn").html("black");
        $("h3").removeClass("turn-white").addClass("turn-black");
    } else {
        $("#turn").html("ERROR");
    }
}

function moveChecker() {
    /*
    doesn't move the checker, rather it checks if the ckecker can move there
    does this piece have squares it can move to?
    highlight possible locations
    */
    //turnary conditional
    let t = $("#turn").html()[0] == "b" ? 1 : -1;
    let prow = parseInt(selected.parent().attr("id")[0]);
    let pcol = parseInt(selected.parent().attr("id")[1]);

    if ($`#${prow + t}${pcol - 1}`.children().length == 0) {
        $(`#${prow + t}${pcol - 1}`).addClass('selected');
    }
    if ($`#${prow + t}${pcol + 1}`.children().length == 0) {
        $(`#${prow + t}${pcol + 1}`).addClass('selected');
    }

}

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
        if (
            selected != undefined && 
            selected.length > 0 && 
            $(this).children().length == 0 && 
            $(this).hasClass('selected')
        ) {
            $(this).append( selected );
            $('.selected').removeClass("selected");
            console.log($(this).hasClass('jump'));
            if ($(this).hasClass('jump')) {
                //how to move a piece, where to move it, which piece to move
                let t = $("#turn").html()[0] == "b" ? -1 : 1;
                let jrow = parseInt($(this).attr('id')[0]);
                let jcol = -1;
                if ($(this).hasClass('jump-left')) {
                    jcol = parseInt($(this).attr('id')[1]) + 1;
                } else if ($(this).hasClass('jump-right')) {
                    jcol = parseInt($(this).attr('id')[1]) - 1;
                }
                let PIECE = $(`#${jrow}${jcol}`).children();
                $('#score').append(PIECE);
                $(".jump-right").removeClass("jump-right");
                $(".jump-left").removeClass("jump-left");
                $(".jump").removeClass("jump");
            }
            if ( ($('#turn').html() == "black" && parseInt($(this).attr('id')[0]) == 7) ||
            ($('#turn').html() == "white" && parseInt($(this).attr('id')[0]) == 0)) {
                selected.addClass("king");
            }
            selected = undefined;
            changeTurn();
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

    if ($(`#${prow + t}${pcol - 1}`).children().length == 0) {
        $(`#${prow + t}${pcol - 1}`).addClass('selected');
    }else if ( ! $(`#${prow + t}${pcol - 1}`).children().hasClass($('turn').html())) {
        if ($(`#${prow + (t * 2)}${pcol - 2}`).children().length == 0) {
            $(`#${prow + (t * 2)}${pcol - 2}`).addClass('selected jump jump-left');
        }
    }
    if ($(`#${prow + t}${pcol + 1}`).children().length == 0) {
        $(`#${prow + t}${pcol + 1}`).addClass('selected');
    } else if ( ! $(`#${prow + t}${pcol + 1}`).children().hasClass($('turn').html())){
        if ($(`#${prow + (t * 2)}${pcol + 2}`).children().length == 0) {
            $(`#${prow + (t * 2)}${pcol + 2}`).addClass('selected jump jump-right');
        }
    }

    //backward moves for kings
    /*if selected.hasClass("king") {
        if ($(`#${prow - t}${pcol - 1}`).children().length == 0) {
            $(`#${prow - t}${pcol - 1}`).addClass('selected');
        }else if ( ! $(`#${prow + t}${pcol - 1}`).children().hasClass($('turn').html())) {
            if ($(`#${prow - (t * 2)}${pcol - 2}`).children().length == 0) {
                $(`#${prow - (t * 2)}${pcol - 2}`).addClass('selected jump jump-back-left');
            }
        }
        if ($(`#${prow - t}${pcol + 1}`).children().length == 0) {
            $(`#${prow - t}${pcol + 1}`).addClass('selected');
        } else if ( ! $(`#${prow + t}${pcol + 1}`).children().hasClass($('turn').html())){
            if ($(`#${prow + (t * 2)}${pcol + 2}`).children().length == 0) {
                $(`#${prow + (t * 2)}${pcol + 2}`).addClass('selected jump jump-back-right');
            }
        }
    }*/

    if ( $('.selected').length > 0) {
        selected.addClass('selected');
    } else {
        selected = undefined;
    }
}

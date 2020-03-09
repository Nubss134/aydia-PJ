function changeArrow(arrow) {
    if (arrow.matches) {
        $(".fa-arrow-right").addClass("fa-arrow-down")
            .removeClass("fa-arrow-right");
        $(".fa-arrow-left").addClass("fa-arrow-up")
            .removeClass("fa-arrow-left");
    } else {
        $(".fa-arrow-down").addClass("fa-arrow-right")
            .removeClass("fa-arrow-down");
        $(".fa-arrow-up").addClass("fa-arrow-left")
            .removeClass("fa-arrow-up");
    }
}

var getArrow1 = function (arrow) {
    return arrow.matches ? "fa-arrow-down" : "fa-arrow-right";
};

var getArrow2 = function (arrow) {
    return arrow.matches ? "fa-arrow-up" : "fa-arrow-left";
};

var arrow = window.matchMedia("(max-width: 991px)")
changeArrow(arrow)
arrow.addListener(changeArrow)

$(document).ready(function () {
    changeArrow(arrow);
    var appId = $("#app_id").val();
    $(".table-sortable-parent-menu").sortable({
        items: "> tr:not(:first)",
        start: function (event, ui) {
            ui.helper.first().removeAttr('style'); // undo styling set by
            // jqueryUI
        }
    });

    $(".table-sortable-submenu").sortable({
        items: "> tr:not(:first)",
        start: function (event, ui) {
            ui.helper.first().removeAttr('style'); // undo styling set by
        }
    });

    $(".table-sortable-bottom-menu").sortable({
        items: "> tr:not(:first)",
        start: function (event, ui) {
            ui.helper.first().removeAttr('style'); // undo styling set by
        }
    });
    
    $(".table-sortable-head-menu").sortable({
        items: "> tr:not(:first)",
        start: function (event, ui) {
            ui.helper.first().removeAttr('style'); // undo styling set by
        }
    });

    $(".table-sortable-parent-menu").disableSelection();
    $(".table-sortable-submenu").disableSelection();
    $(".table-sortable-bottom-menu").disableSelection();
    $(".table-sortable-head-menu").disableSelection();

    $(document).on("click", ".add-parent-menu", function () {
        var element = $(this).parent().parent();
        var id = element.attr('id');
        var name = element.find(".name").html();
        var type = element.find(".type").html();

        var html = '<tr height="45" id="' + id + '">' +
            '<td><i class="fa fa-arrows-v fa-lg arrow"></i></td>' +
            '<td class="name">' + name + '</td>' +
            ' <td class="type">' + type + '</td>' +
            '<td style="text-align: center;"><i class="fa ' + getArrow2(arrow) + ' back-parent-menu"></i></td>' +
            '</tr>';
        $(this).parent().parent().remove();
        $("#result_parent_menu").append(html);
        changeArrow(arrow)

    })

    $(document).on("click", ".add-head-menu", function () {
        var element = $(this).parent().parent();
        var id = element.attr('id');
        var name = element.find(".name").html();
        var type = element.find(".type").html();

        var html = '<tr height="45" id="' + id + '">' +
            '<td><i class="fa fa-arrows-v fa-lg arrow"></i></td>' +
            '<td class="name">' + name + '</td>' +
            ' <td class="type">' + type + '</td>' +
            '<td style="text-align: center;"><i class="fa ' + getArrow2(arrow) + ' back-head-menu"></i></td>' +
            '</tr>';
        $(this).parent().parent().remove();
        $("#result_head_menu").append(html);
        changeArrow(arrow)

    })
    
    $(document).on("click", ".add-submenu", function () {
        var element = $(this).parent().parent();
        console.log(element)
        var id = element.attr('id');
        var name = element.find(".name").html();
        console.log(name)
        var type = element.find(".type").html();

        var html = '<tr height="45" id="' + id + '">' +
            '<td><i class="fa fa-arrows-v fa-lg arrow"></i></td>' +
            '<td class="name">' + name + '</td>' +
            ' <td class="type">' + type + '</td>' +
            '<td style="text-align: center;"><i class="fa ' + getArrow2(arrow) + ' back-submenu"></i></td>' +
            '</tr>';
        $(this).parent().parent().remove();
        $("#result_submenu").append(html);

    })

    $(document).on("click", ".add-bottom-menu", function () {
        var element = $(this).parent().parent();
        console.log(element)
        var id = element.attr('id');
        var name = element.find(".name").html();
        console.log(name)
        var type = element.find(".type").html();

        var html = '<tr height="45" id="' + id + '">' +
            '<td><i class="fa fa-arrows-v fa-lg arrow"></i></td>' +
            '<td class="name">' + name + '</td>' +
            ' <td class="type">' + type + '</td>' +
            '<td style="text-align: center;"><i class="fa ' + getArrow2(arrow) + ' back-bottom-menu"></i></td>' +
            '</tr>';
        $(this).parent().parent().remove();
        $("#result_bottom_menu").append(html);

    })

    $(document).on("click", ".back-parent-menu", function () {
        var element = $(this).parent().parent();

        var id = element.attr('id');
        var name = element.find(".name").html();

        var type = element.find(".type").html();
        var html = '<tr height="45"  class="line" id="' + id + '">' +
            '<td class="name">' + name + '</td>' +
            '<td class="type">' + type + '</td>' +
            '<td style="text-align: center;"><i class="fa fa-pencil-square-o detail" data-toggle="modal" data-target="#modal_add_menu" ></i></td>' +
            '<td style="text-align: center;"><i class="fa ' + getArrow1(arrow) + ' add-parent-menu" ></i></td></tr>';
        $(this).parent().parent().remove();
        $("#list_parent_menu").append(html);

    })
    
    $(document).on("click", ".back-head-menu", function () {
        var element = $(this).parent().parent();

        var id = element.attr('id');
        var name = element.find(".name").html();

        var type = element.find(".type").html();
        var html = '<tr height="45"  class="line" id="' + id + '">' +
            '<td class="name">' + name + '</td>' +
            '<td class="type">' + type + '</td>' +
            '<td style="text-align: center;"><i class="fa fa-pencil-square-o detail" data-toggle="modal" data-target="#modal_add_menu" ></i></td>' +
            '<td style="text-align: center;"><i class="fa ' + getArrow1(arrow) + ' add-head-menu" ></i></td></tr>';
        $(this).parent().parent().remove();
        $("#list_head_menu").append(html);

    })

    $(document).on("click", ".back-submenu", function () {
        var element = $(this).parent().parent();
        var id = element.attr('id');
        var name = element.find(".name").html();
        var type = element.find(".type").html();
        var html = '<tr height="45"  class="line" id="' + id + '">' +
            '<td class="name">' + name + '</td>' +
            '<td class="type">' + type + '</td>' +
            '<td style="text-align: center;"><i class="fa fa-pencil-square-o detail" data-toggle="modal" data-target="#modal_add_menu"></i></td>' +
            '<td style="text-align: center;"><i class="fa ' + getArrow1(arrow) + ' add-submenu" ></i></td></tr>';

        $(this).parent().parent().remove();
        $("#list_submenu").append(html);
    })

    $(document).on("click", ".back-bottom-menu", function () {
        var element = $(this).parent().parent();
        var id = element.attr('id');
        var name = element.find(".name").html();
        var type = element.find(".type").html();
        var html;
        html = '<tr height="45"  class="line" id="' + id + '">' +
            '<td class="name">' + name + '</td>' +
            '<td class="type">' + type + '</td>' +
            '<td style="text-align: center;"><i class="fa fa-pencil-square-o detail" data-toggle="modal" data-target="#modal_add_menu"></i></td>' +
            '<td style="text-align: center;"><i class="fa ' + getArrow1(arrow) + ' add-bottom-menu" ></i></td>' + '</tr>';
        $(this).parent().parent().remove();
        $("#list_bottom_menu").append(html);
    })

    $(".number").on('click', function () {
        $(this).addClass('number-active')
        if ($(this).attr('id') == 'number_2') {
            $("#number_3").removeClass('number-active');
        } else {
            $("#number_2").removeClass('number-active');
        }
    })
    $('#btn_submit_order').on('click', function () {

        if ($("#result_bottom_menu tr:not(:first)").length > 5) {
            window.alert.show("error", "アプリ下部固定メニューは最大5個となります。設定内容をご確認ください。", 3000);
            return;
        }
        if ($("#result_bottom_menu tr:not(:first)").length < 1) {
            window.alert.show("error", "アプリ下部固定メニューは最少1個となります。設定内容をご確認ください。", 3000);
            return;
        }
        if ($("#result_submenu tr:not(:first)").length < 1) {
            window.alert.show("error", "サブメニューは最少1個となります。設定内容をご確認ください。", 3000);
            return;
        }

        if ($("#result_head_menu tr:not(:first)").length < 1) {
            window.alert.show("error", "トップページメインメニュ-は最少1個となります。設定内容をご確認ください。", 3000);
            return;
        }
        // new check parent menu
        var hasParentMenu = false;
        $('.list-row-menu-active > div').each(function() {
        	if($(this).find('.new-menu-deactivate').length > 0){
        		hasParentMenu = true;
        	} 
        });
        
        if (hasParentMenu == false) {
            window.alert.show("error", "トップページメインメニュ-は最少1個となります。設定内容をご確認ください。", 3000);    
            return;
        }

        var parentMenuIndexing = '';
        var subMenuIndexing = '';
        var bottomMenuIndexing = '';
        var headMenuIndexing = '';
        var rowNumber = 1;

        $('.list-row-menu-active > div').each(function() {
    		 // div has one menu of has button remove div
            if ($(this).children().length == 1){
            	if($(this).find('#remove-div').length > 0){
                	return;
            	} else {         		
            		var menuId = $(this).find('.new-menu-deactivate').attr('id').replace('menu-', '');
                    parentMenuIndexing += rowNumber + '-' + menuId + ',';
            	}
            } else{
            	$(this).children().each(function () {
                    var menuId = this.id.replace('menu-', '');
                    parentMenuIndexing += rowNumber + '-' + menuId + ',';
                });
            } 
            rowNumber++;
        });

        $("#result_submenu tr:not(:first)").each(function () {
            var menuId = $(this).attr('id').replace('menu-', '');
            subMenuIndexing += menuId + ',';
        })

        $("#result_bottom_menu tr:not(:first)").each(function () {
            var menuId = $(this).attr('id').replace('menu-', '');
            bottomMenuIndexing += menuId + ',';
        })
        
        $("#result_head_menu tr:not(:first)").each(function () {
            var menuId = $(this).attr('id').replace('menu-', '');
            headMenuIndexing += menuId + ',';
        })

        if (parentMenuIndexing.length > 0) {
            parentMenuIndexing = parentMenuIndexing.substring(0, parentMenuIndexing.length - 1);
        }

        if (subMenuIndexing.length > 0) {
            subMenuIndexing = subMenuIndexing.substring(0, subMenuIndexing.length - 1);
        }

        if (bottomMenuIndexing.length > 0) {
            bottomMenuIndexing = bottomMenuIndexing.substring(0, bottomMenuIndexing.length - 1);
        }
        if (headMenuIndexing.length > 0) {
        	headMenuIndexing = headMenuIndexing.substring(0, headMenuIndexing.length - 1);
        }

        var rowSize = 2;
        if ($("#number_3").hasClass("number-active")) {
            rowSize = 3;
        }

        var data = {
            "rowSizeUpdated": rowSize,
            "parentMenuIndexingUpdated": parentMenuIndexing,
            "subMenuIndexingUpdated": subMenuIndexing,
            "bottomMenuIndexingUpdated": bottomMenuIndexing,
            "headMenuIndexingUpdated": headMenuIndexing,
            "showBottomMenuUpdated": $('#is_show_bottom_menu').prop('checked')
        }
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/menu/createOrder",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $("#btn_submit_order").attr('disabled', true);
            },
            success: function (response) {
                switch (response.status.message) {
                    case "SUCCESS": {
                        $('html,body').animate({
                            scrollTop: 0
                        }, 300);
                        window.alert.show("success", "メニュー表示順番を更新しました。", 3000);

                        setTimeout(function () {
                            $(".message-add").hide();
                            location.reload();
                        }, 2000);
                        break;
                    }
                    case "ERROR": {
                        $(".message-add").addClass("hidden");
                        $(".message-add").addClass("alert-warning");
                        $(".message-add").removeClass("hidden");
                        $(".message-add").html(response.message);
                        $("#btn_submit_order").attr('disabled', false);
                        break;
                    }
                }
            }
        })
    })
});

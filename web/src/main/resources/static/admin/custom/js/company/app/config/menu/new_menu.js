$(document).ready(function () {
    doSortable();
//	setTitleForTooltips();

    $('.image-new-menu').each(function () {
        let functionEnglishName = $(this).attr('title');
        $(this).attr('title', 'タイプ: ' + convertFunctionEnglishNameToJapanName(functionEnglishName));
    })

    $('.type-function-name').each(function () {
        let functionEnglishName = $(this).html();
        $(this).html(convertFunctionEnglishNameToJapanName(functionEnglishName));
        checkAddThreeDotsToTypeFunctionName(this);
    })

    function checkAddThreeDotsToTypeFunctionName(idTag) {
        let parentWidth = $(idTag).parent().width() - 20;
        if ($(idTag).width() >= parentWidth) {
            $(idTag).css("display", "block");
            $(idTag).css("width", parentWidth);
        }
        ;
    }

    function convertFunctionEnglishNameToJapanName(englishName) {
        let japanNameOfFunction = "";
        switch (englishName) {
            case 'MY_PAGE':
                japanNameOfFunction = "マイページ";
                break;
            case 'QR':
                japanNameOfFunction = 'QR読み取り';
                break;
            case 'COUPON':
                japanNameOfFunction = 'クーポン'
                break;
            case 'SETTING':
                japanNameOfFunction = 'サブメニュー';
                break;
            case 'VIDEO':
                japanNameOfFunction = '動画視聴';
                break;
            case 'IMAGE_GALLERY':
                japanNameOfFunction = 'イイメージギャラリー';
                break;
            case 'PUSH_NOTIFICATION':
                japanNameOfFunction = 'プッシュ通知';
                break;
            case 'STORE':
                japanNameOfFunction = '店舗';
                break;
            case 'CATALOG':
                japanNameOfFunction = 'カタログ';
                break;
            case 'NOTIFICATION':
                japanNameOfFunction = 'お知らせ';
                break;
            case 'TERM':
                japanNameOfFunction = '利用規約';
                break;
            case 'CERTIFICATE_MEMBER':
                japanNameOfFunction = '会員証';
                break;
            case 'HOME':
                japanNameOfFunction = 'ホーム';
                break;
            case 'STAMP':
                japanNameOfFunction = 'スタンプラリー';
                break;
            case 'INTRODUCE_IMAGE':
                japanNameOfFunction = '紹介写真';
                break;
            case 'USING':
                japanNameOfFunction = '使い方';
                break;
            case 'QUESTION':
                japanNameOfFunction = 'よくある質問';
                break;
            case 'POLICY':
                japanNameOfFunction = 'プライバシーポリシー';
                break;
            case 'HISTORY_COUPON':
                japanNameOfFunction = 'クーポン利用履歴';
                break;
            case 'COMPANY_NOTIFICATION':
                japanNameOfFunction = 'お知らせ';
                break;
            case 'CONTACT_TO_COMPANY':
                japanNameOfFunction = '会社概要';
                break;
            case 'LOGIN':
                japanNameOfFunction = 'ログイン';
                break;
            case 'REGISTER':
                japanNameOfFunction = '会員登録';
                break;
            case 'LOGOUT':
                japanNameOfFunction = 'ログアウト';
                break;
            case 'WEB_VIEW':
                japanNameOfFunction = 'ウェブビュー';
                break;
            case 'GACHA':
                japanNameOfFunction = 'ガチャ';
                break;
            case 'LINK_APP':
                japanNameOfFunction = 'アプリリンク';
                break;
            case 'COLUMN':
                japanNameOfFunction = 'コラム';
                break;
            case 'NEW_COUPON':
                japanNameOfFunction = 'New クーポン';
                break;
            case 'GET_S_COUPON':
                japanNameOfFunction = '処方箋';
                break;
            default :
                japanNameOfFunction = englishName;
                break;
        }
        return japanNameOfFunction;
    }

    function doSortable() {
        $(".list-new-menu").sortable({
            delay: 0,
            connectWith: ".list-new-menu",
            start: function (event, ui) {
                let currentDiv = ui.item;
                let currentDivParent = currentDiv.parent();
                if (currentDivParent.attr('id').indexOf("row_menu_active") != -1) {
                    currentDiv.addClass('col-md-4');
                }
                deleteRemoveButtonForDivActiveMenu();
                addRemoveButtonForDivActiveMenu();
            },
            stop: function (event, ui) {
                let element = $(event.target);
//				console.log("Event",ui.item);
                if (element.attr('id').indexOf("row_menu_active") != -1) {
                    element.children().each(function () {
                        let count = element.children().length;
                        let newWidth = element.width() / count;
                        $(this).removeClass('col-md-4');
                        $(this).width(newWidth);
                    })
                }
                $('.type-function-name').each(function () {
                    $(this).css("display", "unset");
                    $(this).css("width", "unset");
                    checkAddThreeDotsToTypeFunctionName(this);
                });
                deleteRemoveButtonForDivActiveMenu();
                addRemoveButtonForDivActiveMenu();
            },
            receive: function (event, ui) {
                let element = ui.item.parent();
                if (element.attr('id').indexOf("row_menu_active") != -1) {
                    let count = 0;
                    $("#" + element.attr('id') + " .new-menu").each(function () {
                        count = count + 1;
                    })
                    $("#" + element.attr('id') + " .new-menu").each(function () {
                        let newWidth = element.width() / count;
                        $(this).removeClass('col-md-4')
                        $(this).width(newWidth);
                    })
                } else {
                    let currentDiv = ui.item;
                    currentDiv.addClass('col-md-4');
                }
            }
        });
    }

    // add new div for active menu
    $(document).on("click", "#add-div", function () {
        let divListRowMenuActive = $(this).prev();
        let newRowActiveNumber = parseInt(divListRowMenuActive.children().last().attr("id").replace('row_menu_active', '')) + 1;
        let newDiv = '<div class="list-new-menu row ui-sortable" id="row_menu_active"></div>';
        divListRowMenuActive.append(newDiv);
        doSortable();
        addRemoveButtonForDivActiveMenu();
    })

    // remove div for active menu
    $(document).on("click", "#remove-div", function () {
        $(this).parent().remove();
    })

    function addRemoveButtonForDivActiveMenu() {
        $('.list-row-menu-active > div').each(function () {
            if ($(this).children().length == 0) {
                let buttonRemoveDiv = '<button class="btn btn-sm btn-primary"'
                    + 'style ="margin: 23px auto;" id="remove-div"">行削除</button>'
                $(this).append(buttonRemoveDiv);
            }
        })
    }

    function deleteRemoveButtonForDivActiveMenu() {
        $('.list-row-menu-active > div').each(function () {
            if ($(this).children().length > 0) {
                if ($(this).children().attr("id") == 'remove-div') {
                    $('#remove-div').remove();
                }
            }
        })
    }
})
$(document).ready(function () {
    let appId = $("#app_id").val();
    let form_add_icon;
    let checkImageId;
    // type Function
    let LINK_FUNCTION = 1, WEBVIEW = 2, LINK_APP = 3, COLUMN = 4;
    // type Url
    let LINK = 1, PDF = 2;
    //type Open
    let OPEN_WEBVIEW = 1, OPEN_BROWSER = 2;
    form_add_icon = new Vue({
        el: "#form_add_menu",
        data: {
            //validImage: true,
            validName: true,
            validNameLength: true,
            validUrl: true,
            validPdf: true,
            validUrlAndroid: true,
            validUrlAndroidLength: true,
            validUrlCHplay: true,
            validUrlCHplayLength: true,
            validUrlIos: true,
            validUrlIosLength: true,
            validUrlAppStore: true,
            validUrlAppStoreLength: true,
            isUpdate: false,
            typeFunction: LINK_FUNCTION, // (LINK_FUNCTION, WEBVIEW, LINK_APP, COLUMN)
            typeUrl: LINK,// (LINK, PDF)
            typeOpen: OPEN_WEBVIEW,// (WEBVIEW, BROWSER)
            position: ""// menuType(PARENT, SUB, BOTTOM, HEAD)
        },
        methods: {
            updateForm: function (menu) {
                let self = this;
                self.position = menu.type;
                $(self.$refs['icon_menu'].$el).find("img").attr("src", menu.iconUrlUpdated);
                self.$refs['icon_menu'].hasImage = true;
                $("#menu_name").val(menu.nameUpdated);
                if (menu.typeFunctionMenuUpdated == "WEB_VIEW") {
                    $("#radio_type_webview").prop("checked", true);
                    self.typeFunction = WEBVIEW;
                    $("#option_link_app").addClass("hidden");
                    $("#option_webview").removeClass("hidden");
                    $("#option_link_function").addClass("hidden");

                    if (menu.typeUrlUpdated == "PDF") {
                        self.typeUrl = PDF;
                        $("#radio_type_pdf").prop("checked", true);
                        $("#pdf_file_form").removeClass("hidden");
                        $("#pdf_link").removeClass("hidden");
                        $("#pdf_link").attr("href", menu.urlUpdated);
                        $('#has_pdf').removeClass('hidden');
                        $(".change-current-pdf").removeClass("hidden");
                        $("#input_pdf").addClass("hidden");
                        $("#url_form").addClass("hidden");
                    } else {
                        self.typeUrl = LINK;
                        $("#radio_type_link").prop("checked", true);
                        $("#menu_url").val(menu.urlUpdated);
                    }
                } else if (menu.typeFunctionMenuUpdated == "LINK_APP") {
                    $("#radio_type_linkapp").prop("checked", true);
                    self.typeFunction = LINK_APP;
                    $("#option_webview").addClass("hidden");
                    $("#option_link_app").removeClass("hidden");
                    $("#url_android").val(menu.urlAndroidUpdated);
                    $("#url_chplay").val(menu.urlCHPlayUpdated);
                    $("#url_ios").val(menu.urlIOSUpdated);
                    $("#url_app_store").val(menu.urlAppstoreUpdated);
                    $("#option_link_function").addClass("hidden");
                } else if (menu.typeFunctionMenuUpdated == "COLUMN") {
                    $("#radio_type_column").prop("checked", true);
                    self.typeFunction = COLUMN;
                    self.typeUrl = LINK;
                    $("#option_link_app").addClass("hidden");
                    $("#option_webview").removeClass("hidden");
                    $("#list_type_url").addClass("hidden");
                    $("#option_link_function").addClass("hidden");
                    $("#menu_url").val(menu.urlUpdated);
                } else {
                    self.typeFunction = LINK_FUNCTION;
                    $('#select_link_function option[value=' + menu.function + ']').prop('selected', true);
                    $("#option_link_app").addClass("hidden");
                    $("#option_webview").addClass("hidden");
                    $("#option_link_function").removeClass("hidden");
                }
                if (menu.typeOpenUpdated == "BROWSER") {
                    self.typeOpen = OPEN_BROWSER;
                    $("#radio_link").prop("checked", true);
                } else {
                    self.typeOpen = OPEN_WEBVIEW;
                    $("#radio_webview").prop("checked", true);
                }
                if (menu.typeDisplayUpdated == "ICON") {
                    $("#radio_display_icon").prop("checked", true);
                } else {
                    if (menu.typeDisplayUpdated == "NONE") {
                        $("#radio_display_none").prop("checked", true);
                        $("#div_asset_image").addClass("hidden");
                        $("#div_title").addClass("hidden");
                        $("#div_choose_type_menu").addClass("hidden");
                        $("#type_display").css("margin-top", "20px");
                    } else {
                        $("#radio_display_image").prop("checked", true);
                    }
                }
            },
            disabledChooseTypeMenu: function () {
                $("input[name='type_function']").prop("disabled", true);
                $("#choose_type_menu div").css("cursor", "no-drop");
            },
            enabledChooseTypeMenu: function () {
                $("input[name='type_function']").prop("disabled", false);
                $("#choose_type_menu div").css("cursor", "default");
            },
            resetForm: function () {
                $(this.$refs['icon_menu'].$el).find("img").attr("src", "");
                this.$refs['icon_menu'].hasImage = false;
                $("#btn_delete_webview").addClass("hidden");
                $("#option_link_app").addClass("hidden");
                $("#option_webview").addClass("hidden");
                $("#pdf_file_form").addClass("hidden");
                $("#url_form").removeClass("hidden");
                $("#option_link_function").removeClass("hidden");
                $("#choose_type_menu").removeClass("hidden");
                $("#radio_type_link_function").prop("checked", true);
                $("#radio_type_link").prop("checked", true); // type link
                $("#radio_webview").prop("checked", true); // type open
                $("#radio_display_icon").prop("checked", true);
                $("#list_type_url").removeClass("hidden");
                $("#menu_name").val("");
                $("#menu_url").val("");
                $("#url_android").val("");
                $("#url_chplay").val("");
                $("#url_ios").val("");
                $("#url_app_store").val("");
                $("input[name='c-image-menu']").prop("checked", false);
                $("#div_asset_image").removeClass("hidden");
                $("#div_title").removeClass("hidden");
                $("#div_choose_type_menu").removeClass("hidden");
                $("#type_display").css("margin-top", "0px");
                this.validName = true;
                this.validNameLength = true;
                this.validUrl = true;
                this.validPdf = true;
                this.validUrlAndroid = true;
                this.validUrlAndroidLength = true;
                this.validUrlCHplay = true;
                this.validUrlCHplayLength = true;
                this.validUrlIos = true;
                this.validUrlIosLength = true;
                this.validUrlAppStore = true;
                this.validUrlAppStoreLength = true;
                this.isUpdate = false;
                this.$refs['pdf_file_uploader'].hasFile = false;
                this.isUpdate = false;
                this.typeFunction = LINK_FUNCTION;// (LINK_FUNCTION, WEBVIEW, LINK_APP, COLUMN)
                this.typeUrl = LINK;// (LINK, PDF)
                this.typeOpen = OPEN_WEBVIEW;// (WEBVIEW, BROWSER)
                this.enabledChooseTypeMenu();
                $('#select_link_function').prop('selectedIndex', 0);
            },
            validateForm: function () {
                //this.validateImage();
                this.validatePdf();
                this.validateName();
                this.validateNameLength();
                this.validateUrl();
                this.validateUrlAndroid();
                this.validateUrlAndroidLength();
                this.validateUrlCHplay();
                this.validateUrlCHplayLength();
                this.validateUrlIos();
                this.validateUrlIosLength();
                this.validateUrlAppStore();
                this.validateUrlAppStoreLength();
                return this.validPdf && this.validName && this.validNameLength && this.validUrl &&
                    this.validUrlAndroid && this.validUrlAndroidLength && this.validUrlCHplay && this.validUrlCHplayLength && this.validUrlIos &&
                    this.validUrlIosLength && this.validUrlAppStore && this.validUrlAppStoreLength;
            },
            validatePdf: function () {
                if (this.typeUrl != PDF || this.typeFunction != WEBVIEW) {
                    this.validPdf = true;
                } else {
                    if ($("#has_pdf").attr("class").includes("hidden")) {
                        if (this.$refs['pdf_file_uploader'].getSelectedFile() == undefined) {
                            this.validPdf = false;
                        } else {
                            this.validPdf = true;
                        }
                    } else {
                        this.validPdf = true;
                    }
                }
            },
            validateName: function () {
                let name = $("#menu_name").val();
                if (name === null || name === undefined || name.trim() === "") {
                    this.validName = false;
                } else {
                    this.validName = true;
                }
            },
            validateNameLength: function () {
                let name = $("#menu_name").val();
                if (name.length >= 255) {
                    this.validNameLength = false;
                } else {
                    this.validNameLength = true;
                }
            },
            validateUrl: function () {
                if (this.typeUrl != LINK || this.typeFunction == LINK_APP || this.typeFunction == LINK_FUNCTION) {
                    this.validUrl = true;
                } else {
                    let url = $("#menu_url").val();
                    if (url != undefined || url != '') {
                        let regExp = /((http|https):\/\/)([^#\&\?]*).*/;
                        let match = url.match(regExp);
                        if (match) {
                            this.validUrl = true;
                        } else {
                            this.validUrl = false;
                        }
                    } else {
                        this.validUrl = false;
                    }
                }
            },
            validateUrlAndroid: function () {
                if (this.typeFunction != LINK_APP) {
                    this.validUrlAndroid = true;
                } else {
                    let url = $("#url_android").val();
                    if (url === null || url === undefined || url.trim() === "") {
                        this.validUrlAndroid = false;
                    } else {
                        this.validUrlAndroid = true;
                    }
                }
            },
            validateUrlAndroidLength: function () {
                if (this.typeFunction != LINK_APP) {
                    this.validUrlAndroid = true;
                } else {
                    let url = $("#url_android").val();
                    if (url.length >= 255) {
                        this.validUrlAndroidLength = false;
                    } else {
                        this.validUrlAndroidLength = true;
                    }
                }
            },
            validateUrlCHplay: function () {
                if (this.typeFunction != LINK_APP) {
                    this.validUrlCHplay = true;
                } else {
                    let url = $("#url_chplay").val();
                    if (url === null || url === undefined || url.trim() === "") {
                        this.validUrlCHplay = false;
                    } else {
                        this.validUrlCHplay = true;
                    }
                }
            },
            validateUrlCHplayLength: function () {
                if (this.typeFunction != LINK_APP) {
                    this.validUrlCHplayLength = true;
                } else {
                    let url = $("#url_chplay").val();
                    if (url.length >= 255) {
                        this.validUrlCHplayLength = false;
                    } else {
                        this.validUrlCHplayLength = true;
                    }
                }
            },
            validateUrlIos: function () {
                if (this.typeFunction != LINK_APP) {
                    this.validUrlIos = true;
                } else {
                    let url = $("#url_ios").val();
                    if (url === null || url === undefined || url.trim() === "") {
                        this.validUrlIos = false;
                    } else {
                        this.validUrlIos = true;
                    }
                }
            },
            validateUrlIosLength: function () {
                if (this.typeFunction != LINK_APP) {
                    this.validUrlIosLength = true;
                } else {
                    let url = $("#url_ios").val();
                    if (url.length >= 255) {
                        this.validUrlIosLength = false;
                    } else {
                        this.validUrlIosLength = true;
                    }
                }
            },
            validateUrlAppStore: function () {
                if (this.typeFunction != LINK_APP) {
                    this.validUrlAppStore = true;
                } else {
                    let url = $("#url_app_store").val();
                    if (url === null || url === undefined || url.trim() === "") {
                        this.validUrlAppStore = false;
                    } else {
                        this.validUrlAppStore = true;
                    }
                }
            },
            validateUrlAppStoreLength: function () {
                if (this.typeFunction != LINK_APP) {
                    this.validUrlAppStoreLength = true;
                } else {
                    let url = $("#url_app_store").val();
                    if (url.length >= 255) {
                        this.validUrlAppStoreLength = false;
                    } else {
                        this.validUrlAppStoreLength = true;
                    }
                }
            },
            addMenu: function () {
                if ($('input[name="type_display"]:checked').val() == 3) {
                    let self = this;
                    let formData = new FormData();
                    let menuId = $("#menu_id").val();
                    if (menuId == null || menuId == "" || menuId == undefined) {
                    } else {
                        formData.append("id", menuId);
                    }
                    formData.append("name", "機能なし");
                    formData.append("menuType", self.position);
                    formData.append("typeOpen", self.typeOpen);
                    formData.append("typeUrl", self.typeUrl);
                    formData.append("typeDisplay", "3");
                    formData.append("typeFunction", self.typeFunction);
                    formData.append("urlAndroid", $("#url_android").val());
                    formData.append("urlChplay", $("#url_chplay").val());
                    formData.append("urlIos", $("#url_ios").val());
                    formData.append("urlAppStore", $("#url_app_store").val());
                    formData.append("linkFunction", $("#select_link_function").val());
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/menu/add",
                        data: formData,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        beforeSend: function () {
                            $("#btn_submit_add").attr('disabled', true);
                            self.$refs["loader"].show();
                        },
                        success: function (response) {
                            switch (response.status.message) {
                                case "SUCCESS": {
                                    $('html,body').animate({
                                        scrollTop: 0
                                    }, 300);
                                    window.alert.show("success", "更新しました。", 3000);
                                    setTimeout(function () {
                                        location.reload();
                                    }, 1000);
                                    break;
                                }
                                case "ERROR": {
                                    self.$refs["loader"].hide();
                                    break;
                                }
                                case "Menu name is existed !": {
                                    $('html,body').animate({
                                        scrollTop: 0
                                    }, 300);
                                    window.alert.show("error", "同一名称のメニューが存在します", 3000);

                                    self.$refs["loader"].hide();
                                    break;
                                }
                            }
                        }
                    })

                } else {
                    if (this.validateForm()) {
                        let self = this;
                        let formData = new FormData();
                        let assetImageUri = $('input[name="c-image-menu"]:checked').attr('image-uri');
                        if (self.$refs["icon_menu"].getSelectedFile() != null && self.$refs["icon_menu"].getSelectedFile() != undefined) {
                            formData.append("fileAttachment", self.$refs["icon_menu"].getSelectedFile());
                        } else if (assetImageUri != undefined) {
                            formData.append("assetImageUri", assetImageUri);
                        }
                        if (self.typeUrl == LINK) {
                            formData.append("url", $("#menu_url").val());
                        } else if (self.typeUrl == PDF) {
                            if ($("#has_pdf").attr("class").includes("hidden")) {
                                formData.append("pdfFile", self.$refs["pdf_file_uploader"].getSelectedFile());
                            } else {
                                formData.append("url", $("#pdf_link").attr('href'));
                            }

                        }
                        let menuId = $("#menu_id").val();
                        if (menuId == null || menuId == "" || menuId == undefined) {
                        } else {
                            formData.append("id", menuId);
                        }
                        formData.append("name", $("#menu_name").val());
                        formData.append("menuType", self.position);
                        formData.append("typeOpen", self.typeOpen);
                        formData.append("typeUrl", self.typeUrl);
                        formData.append("typeDisplay", $("input[name='type_display']:checked").val());
                        formData.append("typeFunction", self.typeFunction);
                        formData.append("urlAndroid", $("#url_android").val());
                        formData.append("urlChplay", $("#url_chplay").val());
                        formData.append("urlIos", $("#url_ios").val());
                        formData.append("urlAppStore", $("#url_app_store").val());
                        formData.append("linkFunction", $("#select_link_function").val());
                        $.ajax({
                            type: "POST",
                            url: "/api/v1/web/" + appId + "/menu/add",
                            data: formData,
                            contentType: false,
                            processData: false,
                            dataType: "json",
                            beforeSend: function () {
                                $("#btn_submit_add").attr('disabled', true);
                                self.$refs["loader"].show();
                            },
                            success: function (response) {
                                switch (response.status.message) {
                                    case "SUCCESS": {
                                        $('html,body').animate({
                                            scrollTop: 0
                                        }, 300);
                                        window.alert.show("success", "更新しました。", 3000);
                                        setTimeout(function () {
                                            location.reload();
                                        }, 1000);
                                        break;
                                    }
                                    case "ERROR": {
                                        self.$refs["loader"].hide();
                                        break;
                                    }
                                    case "Menu name is existed !": {
                                        $('html,body').animate({
                                            scrollTop: 0
                                        }, 300);
                                        window.alert.show("error", "同一名称のメニューが存在します", 3000);

                                        self.$refs["loader"].hide();
                                        break;
                                    }
                                }
                            }
                        })
                    }
                }
            }
        },
        mounted: function () {
            let self = this;
            $('.add-item').on('click', function () {
                self.position = $(this).attr("menu-type");
                $("#menu_id").val("")
                self.resetForm();
            })
            $("input[name='type_url']").on('change', function () {
                if (this.value == "1") {
                    self.typeUrl = LINK;
                    $("#pdf_file_form").addClass("hidden");
                    $("#url_form").removeClass("hidden");
                } else {
                    self.typeUrl = PDF;
                    $("#url_form").addClass("hidden");
                    $("#pdf_file_form").removeClass("hidden");
                }
            })
            $("input[name='type_display']").on('change', function () {
                if (this.value == "3") {
                    $("#div_asset_image").addClass("hidden");
                    $("#div_title").addClass("hidden");
                    $("#div_choose_type_menu").addClass("hidden");
                    $("#type_display").css("margin-top", "20px");
                } else {
                    $("#div_asset_image").removeClass("hidden");
                    $("#div_title").removeClass("hidden");
                    $("#div_choose_type_menu").removeClass("hidden");
                    $("#type_display").css("margin-top", "0px");
                }
            })
            $("input[name='type_function']").on('change', function () {
                if (this.value == "2") {
                    self.typeFunction = WEBVIEW;
                    $("#option_link_app").addClass("hidden");
                    $("#option_webview").removeClass("hidden");
                    $("#list_type_url").removeClass("hidden");
                    $("#option_link_function").addClass("hidden");
                    if ($("input[name='type_url']:checked").val() == 1) {
                        self.typeUrl = LINK;
                        $("#pdf_file_form").addClass("hidden");
                        $("#url_form").removeClass("hidden");
                    } else {
                        self.typeUrl = PDF;
                        $("#pdf_file_form").removeClass("hidden");
                        $("#url_form").addClass("hidden");
                    }
                } else if (this.value == "3") {
                    self.typeFunction = LINK_APP;
                    $("#option_webview").addClass("hidden");
                    $("#option_link_app").removeClass("hidden");
                    $("#option_link_function").addClass("hidden");
                } else if (this.value == "4") {
                    self.typeFunction = COLUMN;
                    self.typeUrl = LINK;
                    $("#option_link_app").addClass("hidden");
                    $("#option_webview").removeClass("hidden");
                    $("#list_type_url").addClass("hidden");
                    $("#option_link_function").addClass("hidden");
                    $("#pdf_file_form").addClass("hidden");
                    $("#url_form").removeClass("hidden");
                } else {
                    self.typeFunction = LINK_FUNCTION;
                    $("#option_link_function").removeClass("hidden");
                    $("#option_link_app").addClass("hidden");
                    $("#option_webview").addClass("hidden");
                }
            })
            $("input[name='open_with']").on('change', function () {
                if (this.value == "1") {
                    self.typeOpen = OPEN_WEBVIEW;
                } else {
                    self.typeOpen = OPEN_BROWSER;
                }
            })

            $(document).on('click', '#add_file_pdf', function () {
                $('#input_pdf').removeClass('hidden');
                $('#has_pdf').addClass('hidden');
            })

            $(self.$el).find(".file-input").change(function () {
                // self.validateImage();
                self.validatePdf();
            });

            $(document).on('click', 'input[type=radio][name=c-image-menu]', function () {
                if ($(this).attr('id') == checkImageId) {
                    $(this).prop('checked', false);
                    checkImageId = '';
                } else {
                    checkImageId = $(this).attr('id');
                }
                //self.validateImage();
            })

            $(document).on('click', ".detail", function () {
                let parentId = $(this).parent().parent().attr('id');
                let menuId = parentId.replace("menu-", "");
                $("#menu_id").val(menuId)
                jQuery.get("/api/v1/web/" + appId + "/menu/detail/" + menuId, function (response) {
                    self.resetForm();
                    self.updateForm(response.data);
                    $("#btn_delete_webview").removeClass("hidden");
                })
            })

            // bind function enum to select box
            jQuery.get("/api/v1/web/" + appId + "/menu/getFunctionEnum", function (response) {
                response.data.forEach(function (functionEnum) {
                    let japanNameOfFunction = convertFunctionEnglishNameToJapanName(functionEnum);
                    let html = '<option class="list-option-function" id="' + functionEnum + '" value="' + functionEnum + '">' + japanNameOfFunction + '</option>';
                    $("#select_link_function").append(html);
                })
            })
        }
    });

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

    // change english name of type function to japan name
    $('.type').each(function () {
        let englishName = $(this).text().trim();
        $(this).text(convertFunctionEnglishNameToJapanName(englishName));

    })

    // show image default
    jQuery.get("/api/v1/asset/images", function (response) {
        let htmlBuilder1 = '';
        let htmlBuilder2 = '';
        for (let i = 0; i < response.length; i++) {
            let data = response[i];
            let imageUrl = data.url;
            htmlBuilder1 += '<li><input type="radio" id="radio_image' + data.id + '" name="image-menu" image-uri="' + data.url + '"/>' +
                '<label for="radio_image' + data.id + '"><img src="' + imageUrl + '" /></label></li>';
            htmlBuilder2 += '<li><input type="radio" id="c_radio_image' + data.id + '" name="c-image-menu" image-uri="' + data.url + '"/>' +
                '<label for="c_radio_image' + data.id + '"><img src="' + imageUrl + '" /></label></li>';
        }
        $("#detail_function .upload-image").append(htmlBuilder1)
        $("#modal_add_menu .upload-image").append(htmlBuilder2)
    });


    $(".delete-webview").on('click', function () {
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/menu/delete/" + $("#menu_id").val(),
            success: function (response) {
                switch (response.status.code) {
                    case 2002: {
                        $('html,body').animate({
                            scrollTop: 0
                        }, 300);
                        window.alert.show("success", "削除しました。", 1200);
                        setTimeout(function () {
                            location.reload();
                        }, 1200);
                        break;
                    }
                    case 1012: {
                        $('html,body').animate({
                            scrollTop: 0
                        }, 300);
                        window.alert.show("error", "このメニューがアクティブ、削除できない。", 1200);
                        setTimeout(function () {
                            location.reload();
                        }, 1200);
                        break;
                    }
                }
            }
        })
    })
});

$(document).ready(function () {
    var appId = $("#app_id").val();
    var format = "YYYY/MM/DD HH:mm";
    pushNotifiation = new Vue({
        el: "#modal_add_push_notification",
        data: {
            validTitle: true,
            validTimePush: true,
            validSubTitle: true,
            validContent: true,
            validWebLink: true,
            validTitleLength: true,
            validSubTitleLength: true,
            validContentLength: true,
            validWebLinkLength: true,
            invalidMessage: "このフィールドは必須です。",
            invalidTitleLengthMessage: "100 文字以内で入力してください。",
            invalidSubTitleLengthMessage: "500 文字以内で入力してください。",
            invalidContentLengthMessage: "500 文字以内で入力してください。",
            invalidWebLinkLengthMessage: "500 文字以内で入力してください。",
            typePush: 1,
            pushNow: true,
            isClearImage: false,
            id: null,
            toNumberUser: 0,
            numberUserFound: 0,
        },
        methods: {
            validateTitle: function () {
                if (($("#title_input").val()).length != 0) {
                    this.validTitle = true;
                    if ($("#title_input").val().length > 100) {
                        this.validTitleLength = false;
                    } else {
                        this.validTitleLength = true;
                    }
                } else {
                    this.validTitle = false;
                }
            },
            validateSubTitle: function () {
                if (($("#short_description_input").val()).length != 0) {
                    this.validSubTitle = true;
                    if ($("#short_description_input").val().length > 500) {
                        this.validSubTitleLength = false;
                    } else {
                        this.validSubTitleLength = true;
                    }
                } else {
                    this.validSubTitle = false;
                }
            },
            validateContent: function () {
                if (this.typePush == 1) {
                    var value = CKEDITOR.instances["long_description_input"].getData();
                    if (value.length != 0) {
                        this.validContent = true;
                        if (value.length > 500) {
                            this.validContentLength = false;
                        } else {
                            this.validContentLength = true;
                        }
                    } else {
                        this.validContent = false;
                    }
                } else {
                    this.validContent = true;
                    this.validContentLength = true;
                }

            },
            validateWebLink: function () {
                if (this.typePush == 2) {
                    var value = $("#link_webview_input").val();
                    if (value.length != 0) {
                        this.validWebLink = true;
                        if (value.length > 500) {
                            this.validWebLinkLength = false;
                        } else {
                            this.validWebLinkLength = true;
                        }
                    } else {
                        this.validWebLink = false;
                    }
                } else {
                    this.validWebLink = true;
                    this.validWebLinkLength = true;
                }
            },
            validateTimePush: function () {
                if (this.pushNow) {
                    this.validTimePush = true;
                } else {
                    var value = $("#time_push").val();
                    if (value.length != 0) {
                        this.validTimePush = true;
                    } else {
                        this.validTimePush = false;
                    }
                }
            },
            validateForm: function () {
                this.validateTitle();
                this.validateSubTitle();
                this.validateContent();
                this.validateWebLink();
                this.validateTimePush();
                return this.validTitle && this.validTitleLength && this.validSubTitle && this.validSubTitleLength
                    && this.validContent && this.validContentLength && this.validWebLink && this.validWebLinkLength
                    && this.validTimePush;
            },
            addPushNotification: function () {
                if (this.validateForm()) {
                    var pushNotification = {
                        id: this.id,
                        typePush: this.typePush,
                        typePushUser: this.typePushUser,
                        pushNow: this.pushNow,
                        title: $("#title_input").val(),
                        statusPush: "PENDING",
                        shortDescription: $("#short_description_input").val(),
                        longDescription: CKEDITOR.instances["long_description_input"].getData(),
                        linkWebview: $("#link_webview_input").val(),
                        createdTime: moment(new Date()).format(format),
                        pushTime: moment($("#time_push").val()).format(format),
                        menuEntity: {id: $("#list_function option:selected").attr('id')},
                        toNumberUser: this.toNumberUser,
                    }
                    
                   var memberCodes = [];
             	   var storeIds = [];
             	   $(".checkbox_user_bookmark").each(function () {
                        if (this.checked) {
                     	   var memberCode = $(this).attr('id');
                     	   memberCodes.push(memberCode);
                        }
                    })
                    $(".store-selected").each(function() {
                 	  var storeId = $(this).attr('id');
                 	  storeIds.push(storeId)
                    })
                    
                    var formData = new FormData();
             	  if (memberCodes.length == 0) {
                  	if(storeIds.length == 0) {
                  		window.alert.show("error", "Please select a target store!", 2000);
                  		return;
                  	} else {
                  		if(storeIds.toString() == "all_store_selected" ) {
                  			formData.append("typePushToUserBookmarkStore", 1);
                  			formData.append("storeIds", 0);
                      	} else {
                      		formData.append("typePushToUserBookmarkStore", 1);
                  			formData.append("storeIds", storeIds.toString());
                      	}
                  	}
                 } else {
                	 formData.append("typePushToUserBookmarkStore", 2);
                	 formData.append("memberCodes", memberCodes.toString());
                 }
                    formData.append("image", this.$refs['push_notification_image'].getSelectedFile());
                    formData.append("pushNotification", new Blob([JSON.stringify(pushNotification)], {
                        type: "application/json"
                    }));
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/pushNotification/addAndPushToUserBookmarkStore",
                        data: formData,
                        processData: false,
                        contentType: false,
                        headers: {
                            "Content-Type": undefined
                        },
                        beforeSend: function () {
                            window.loader.show();
                        },
                        success: function (response) {
                            $("#push_notification_btn").prop("disabled", false);
                            window.loader.hide();
                            if (response.status.code === 4) {
                                window.alert.show("error", "プッシュ通知できません。 ", 1200);
                            } else {
                                window.alert.show("success", "プッシュ通知しました。 ", 1200);
                                setTimeout(function () {
                                    location.reload();
                                }, 1200)
                            }
                        }
                    });
                }
            }
        },
        mounted: function () {
            initCKEditor('long_description_input');
            var self = this;
            configOneDate('time_push')
            $("#add_push_notification").on('click', function () {
                self.resetForm();
            });
            $(".btn-view").on('click', function () {
                self.resetForm();
            });
            $("input[name='action_type_radio']").on('change', function () {
                if (this.value == 'in_app') {
                    displayCheckBoxInApp(null, self);
                } else if (this.value == 'web_view') {
                    displayCheckBoxWebview(null, self);
                } else {
                    displayCheckBoxLinkFunction(null, self);
                }
            });
            $("input[name='type_push']").on('change', function () {
                if (this.value == 'push_now') {
                    self.pushNow = true;
                    $("#time_push_group").addClass("hidden");
                } else {
                    self.pushNow = false;
                    $("#time_push_group").removeClass("hidden");
                }
            });
            $(".remove-image-icon").click(function () {
                if (self.$refs['push_notification_image'].hasImage == false) {
                    self.isClearImage = true;
                }
            })

            $(this.$el).find(".file-input").change(function () {
                if (self.$refs['push_notification_image'].hasImage == true) {
                    self.isClearImage = false;
                }
            });
            jQuery.get("/api/v1/web/" + appId + "/menu/getFunction", function (response) {
                response.data.forEach(function (menu) {
                    var isHasMenu = false;
                    var isHasMenuDetail = false;
                    var html = '<option class="list-option-function" id="' + menu.id + '" value="' + menu.function + '" name="' + menu.name + '">' + menu.name + '</option>';
                    $("#list_function option").each(function () {
                        if (menu.function != "COLUMN" && this.value == menu.function) {
                            isHasMenu = true;
                        }
                    })
                    if (!isHasMenu) {
                        $("#list_function").append(html);
                        $("#list_function option[value='WEB_VIEW']").remove();
                    }
                    $("#list_function_detail option").each(function () {
                        if (menu.function != "COLUMN" && this.value == menu.function) {
                            isHasMenuDetail = true;
                        }
                    })
                    if (!isHasMenuDetail) {
                        $("#list_function_detail").append(html);
                        $("#list_function_detail option[value='WEB_VIEW']").remove();
                    }

                })
            });
        }
    })

    function initCKEditor(element) {
        CKEDITOR.replace(element, {
            language: 'ja',
            height: 200,
            removePlugins: 'elementspath'
        })
        CKEDITOR.config.toolbar = [
            ['Styles', 'Format'],
            ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace', '-', 'Outdent', 'Indent', '-', 'Print'],
            ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Image', 'Table', '-', 'Link', 'Flash', 'Smiley', 'TextColor', 'BGColor', 'Source']
        ];
    }

});
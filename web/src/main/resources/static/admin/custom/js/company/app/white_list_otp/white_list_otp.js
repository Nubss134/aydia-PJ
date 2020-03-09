let listWhiteListOTP = {};
$(document).ready(function () {
    let appId = $("#app_id").val();
    let format = "YYYY/MM/DD HH:mm";
    //render list
    let columnDefinitions = [
        {"data": "phone", "orderable": true, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "otp", "defaultContent": "<i>データなし</i>"},
        {"data": "startTime", "defaultContent": "<i>データなし</i>"},
        {"data": "endTime", "defaultContent": "<i>データなし</i>"},
        {"data": "createdTime", "orderable": false, "defaultContent": "<i>データなし</i>"},
        {"data": "updatedTime", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
        {"data": "id", "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"}
    ];
    let getOTP = function (requestData, renderFunction) {
        let sortField = columnDefinitions[requestData.order[0].column].data;
        let sortDir = requestData.order[0].dir;
        let params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
            "sortField": sortField,
            "sortDir": sortDir,
            "keyword": $("#key_word").val()
        };
        window.loader.show();
        jQuery.get("/api/v1/web/" + appId + "/whiteListOTP/list", params, function (response) {
            let content = {
                "draw": requestData.draw,
                "recordsTotal": response.totalElements,
                "recordsFiltered": response.totalElements,
                "data": response.content
            };
            renderFunction(content);
            window.loader.hide();
        });
    };
    listWhiteListOTP.OTPTable = $("#white_list_otp_table").DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [10, 50, 100],
            [10, 50, 100]
        ],
        rowId: 'id',
        "ordering": true,
        "serverSide": true,
        "order": [4, "desc"],
        "searching": false,
        "columns": columnDefinitions,
        "ajax": function (data, callback) {
            getOTP(data, callback);
        },
        columnDefs: [
            {
                "render": function (data) {
                    return '<button style="margin-left: 10px" data-id="' + data + '" data-toggle="modal" data-target="#add_white_list_otp_modal" class="btn btn-sm btn-primary btn-detail-otp">詳細</button>' +
                        '<button style="margin-left: 10px" data-id="' + data + '" data-toggle="modal" data-target="#modal_delete_white_list_otp" class="btn btn-sm btn-danger btn_delete_member">削除</button>';
                },
                "targets": 6
            },
        ],
        "drawCallback": function () {
            $(".btn-detail-otp").click(function () {
                let id = $(this).data('id');
                $.get("/api/v1/web/" + appId + "/whiteListOTP/detail/" + id, function (response) {
                    OTPVue.resetForm();
                    OTPVue.updateForm(response);
                })
            });
            $(".btn_delete_member").on('click', function () {
                let id = $(this).data('id');
                $("#btn_submit_delete_member").on('click', function () {
                    $.get("/api/v1/web/" + appId + "/whiteListOTP/delete/" + id, function (response) {
                        if (response.status.code === 1000) {
                            window.alert.show('success', '削除しました。', 1500);
                            setInterval(function () {
                                location.reload();
                            }, 1500)
                        } else if (response.status.code === 4) {
                            window.alert.show('error', 'エラーが発生しました。しばらく待ってからもう一度お試してください。', 1500);
                        }
                    })
                })
            })
        }

    });

    $("#search_otp_by_key").on('click', function () {
        listWhiteListOTP.OTPTable.ajax.reload();
    });
    let OTPVue = new Vue({
        el: "#add_white_list_otp_modal",
        data: {
            id: null,
            phone: null,
            otp: null,
            validPhone: true,
            validPhoneLength: true,
            validOTP: true,
            validOTPLength: true,
            validStartTime: true,
            validEndTime: true,
            validTime: true,
            invalidMessage: "このフィールドは必須です",
            invalidPhoneLengthMessage: "11文字で入力してください。",
            invalidOTPLengthMessage: "6文字で入力してください",
            invalidTimeMessage: "開始時間は終了時間より早くしてください。"
        },
        methods: {
            resetForm() {
                this.id = null;
                this.phone = null;
                this.otp = null;
                this.validOTP = true;
                this.validOTPLength = true;
                this.validPhone = true;
                this.validPhoneLength = true;
                this.validStartTime = true;
                this.validEndTime = true;
                this.validTime = true;
            },
            updateForm(object) {
                this.id = object.id;
                this.phone = object.phone;
                this.otp = object.otp;
                $("#start_time").val(object.startTime);
                $("#end_time").val(object.endTime);
            },
            validatePhone: function () {
                if (this.phone == null || this.phone.trim().length === 0) {
                    this.validPhone = false;
                    this.validPhoneLength = true;
                } else {
                    this.validPhone = true;
                    this.validPhoneLength = this.phone.trim().length === 11;
                }
            },
            validateOTP: function () {
                if (this.otp == null || this.otp.trim().length === 0) {
                    this.validOTP = false;
                    this.validOTPLength = true;
                } else {
                    this.validOTP = true;
                    this.validOTPLength = this.otp.trim().length === 6;
                }
            },
            validateStartTime: function () {
                this.validStartTime = !($("#start_time").val() === null || $("#start_time").val().trim() === "");
            },
            validateEndTime: function () {
                this.validEndTime = !($("#end_time").val() === null || $("#end_time").val().trim() === "");
            },
            validateTime: function () {
                let startTime = $("#start_time").val().replace("/", "");
                let endTime = $("#end_time").val().replace("/", "");
                this.validTime = startTime < endTime;
            },
            validateForm: function () {
                this.validateOTP();
                this.validatePhone();
                this.validateStartTime();
                this.validateEndTime();
                this.validateTime();
                return this.validOTP && this.validOTPLength && this.validPhone && this.validPhoneLength && this.validStartTime
                    && this.validEndTime && this.validTime;
            },
            addWhiteListOTP: function () {
                if (this.validateForm()) {
                    let object = {
                        id: this.id,
                        phone: this.phone,
                        otp: this.otp,
                        startTime: moment($("#start_time").val()).format(format),
                        endTime: moment($("#end_time").val()).format(format)
                    };
                    $.ajax({
                        url: "/api/v1/web/" + appId + "/whiteListOTP/add",
                        data: object,
                        type: "POST",
                        success: function (response) {

                            if (response.status.code === 1000) {
                                $("#add_white_list_otp_modal").modal("hide");
                                window.alert.show('success', '登録しました。', 1500);
                                setTimeout(function () {
                                    location.reload();
                                }, 1500)
                            } else if (response.status.code === 4) {
                                window.alert.show('error', 'エラーが発生しました。しばらく待ってからもう一度お試してください。', 1500);
                            } else {
                                window.alert.show('error', '電話番号が存在していますした。', 1500);
                            }
                        },
                        error: function () {
                            window.alert.show('error', 'エラーが発生しました。しばらく待ってからもう一度お試してください。', 1500);
                        }
                    })
                }
            }

        },
        mounted: function () {
            let self = this;
            $(".btn-add-white-list-otp").on('click', function () {
                self.resetForm();
            });
            configOneDate('start_time');
            configOneDate('end_time');
        }
    });
});
$(document).ready(function () {
    var id_global;
    var managerVue = new Vue({
        el: "#modal_add_manager",
        data: {
            isUpdateMan: false,
            validNameUser: true,
            validNameUserLength: true,
            validEmailUser: true,
            validEmailUserType: true,
            validEmailUserLength: true,
            validPhoneUser: true,
            validPhoneUserType: true,
            validPhoneUserLength: true,
            validPassword: true,
            validPasswordLength: true,
            validEqualPassword: true,
            validCompany: true,

            invalidNameUserMessage: "このフィールドは必須です",
            invalidNameUserLengthMessage: "100 文字以内で入力してください。",
            invalidEmailUserMessage: "このフィールドは必須です",
            invalidEmailUserTypeMessage: "このフィールドのフォマットは正しくないです。",
            invalidEmailUserLengthMessage: "100 文字以内で入力してください。",
            invalidPhoneMessage: "このフィールドは必須です",
            invalidPhoneUserType: "このフィールドのフォマットは正しくないです",
            invalidPhoneLengthMessage: "20 文字以内で入力してください。",
            invalidPasswordMessage: "このフィールドは必須です",
            invalidPasswordLengthMessage: "パスワードは８文字から32文字まで入力ください",
            invalidEqualPasswordMessage: "パスワードと確認パスワードが一致しておりません。",
            invalidCompanyMessage: "このフィールドは必須です",
        },
        methods: {
            resetForm: function () {
                $("#manager_name").val("");
                $("#manager_email").val("");
                $("#manager_phone").val("");
                $("#manager_password").val("");
                $("#password_confirm").val("");
                $("#select_company").val("");

                this.validNameUser = true;
                this.validNameUserLength = true;
                this.validEmailUser = true;
                this.validEmailUserType = true;
                this.validEmailUserLength = true;
                this.validPhoneUser = true;
                this.validPhoneUserType = true;
                this.validPhoneUserLength = true;
                this.validPassword = true;
                this.validPasswordLength = true;
                this.validEqualPassword = true;
                this.validAddressCompany = true;
            },
            mounted: function () {

            },
            detailManager: function (data) {
                $("#manager_name").val(data.name),
                    $("#manager_email").val(data.email),
                    $("#manager_phone").val(data.phone),
                    $("#select_company").val(data.companyId);
            },
            validateForm: function () {
                this.validateNameUser();
                if(this.validNameUser){
                    this.validateNameUserLength();
                }
                this.validateEmailUser();
                if(this.validEmailUser){
                    this.validateEmailUserLength();
                    if(this.validEmailUserLength){
                        this.validateEmailUserType();
                    }
                }
                this.validatePhoneUser();
                if(this.validPhoneUser){
                    this.validatePhoneUserLength();
                    if(this.validPhoneUserLength){
                        this.validatePhoneUserType();
                    }
                }
                this.validatePassword();
                if(this.validPassword){
                    this.validatePasswordLength();
                    if(this.validPasswordLength){
                        this.validateEqualPassword();
                    }
                }
                this.validateCompany();
                return this.validNameUser && this.validNameUserLength && this.validEmailUserType && this.validEmailUser && this.validEmailUserLength && this.validPassword
                    && this.validPasswordLength && this.validEqualPassword && this.validPhoneUserType && this.validPhoneUser && this.validPhoneUserLength && this.validCompany;

            },
            validateNameUser: function () {
                var note = $("#manager_name").val();
                if (note === null || note === undefined || note.trim() === "") {
                    this.validNameUser = false;
                } else {
                    this.validNameUser = true;
                }
            },
            validateNameUserLength: function () {
                var note = $("#manager_name").val();
                if (note.length >= 100) {
                    this.validNameUserLength = false;
                } else {
                    this.validNameUserLength = true;
                }
            },
            validateEmailUser: function () {
                var note = $("#manager_email").val();
                if (note === null || note === undefined || note.trim() === "") {
                    this.validEmailUser = false;
                } else {
                    this.validEmailUser = true;
                }
            },

            validateEmailUserType: function () {
                var note = $("#manager_email").val();
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!regex.test(note)) {
                    this.validEmailUserType = false;
                } else {
                    this.validEmailUserType = true;
                }
            },
            validateEmailUserLength: function () {
                var note = $("#manager_email").val();
                if (note.length >= 100) {
                    this.validEmailUserLength = false;
                } else {
                    this.validEmailUserLength = true;
                }
            },
            validatePhoneUser: function () {
                var note = $("#manager_phone").val();
                if (note === null || note === undefined || note.trim() === "") {
                    this.validPhoneUser = false;
                } else {
                    this.validPhoneUser = true;
                }
            },
            validatePhoneUserType: function () {
                var note = $("#manager_phone").val();
                var regex = /^[0-9\-\(\)\s]+$/;
                if (!regex.test(note)) {
                    this.validPhoneUserType = false;
                } else {
                    this.validPhoneUserType = true;
                }
            },
            validatePhoneUserLength: function () {
                var note = $("#manager_phone").val();
                if (note.length >= 20) {
                    this.validPhoneUserLength = false;
                } else {
                    this.validPhoneUserLength = true;
                }
            },
            validatePassword: function () {
                var note = $("#manager_password").val();
                if (this.isUpdateMan) {
                    return true;
                } else {
                    if (note === null || note === undefined || note.trim() === "") {
                        this.validPassword = false;
                    } else {
                        this.validPassword = true;
                    }
                }
            },
            validatePasswordLength: function () {
                var note = $("#manager_password").val();
                if (this.isUpdateMan) {
                    if (note == "") {
                        return true;
                    }
                }
                if (note.length > 32 || note.length < 8) {
                    this.validPasswordLength = false;
                } else {
                    this.validPasswordLength = true;
                }
            },

            validateEqualPassword: function () {
                var password = $("#manager_password").val();
                var confirmPassword = $("#password_confirm").val();
                if (password != confirmPassword) {
                    this.validEqualPassword = false;
                } else {
                    this.validEqualPassword = true;
                }
            },
            validateCompany: function(){
                if($("#select_company").val()==null || $("#select_company").val() == undefined){
                    this.validCompany = false;
                }else{
                    this.validCompany = true;
                }
            },
            addOrUpdateManager: function (e) {
                e.preventDefault();
                if (!this.isUpdateMan) {
                    id_global = null;
                }
                if (this.validateForm()) {
                    var user = {
                        "name": $("#manager_name").val(),
                        "email": $("#manager_email").val(),
                        "phone": $("#manager_phone").val(),
                        "password": $("#manager_password").val(),
                        "companyId": $("#select_company").val(),
                        "id": id_global,
                    }
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        url: "/api/v1/web/user/add",
                        data: JSON.stringify(user),
                        error: function (xhr, ajaxOptions, thrownError) {
                        },
                        success: function (response) {
                            if (response.status.code == 2000) {
                                window.alert.show("success", "登録しました。", 1000);
                                $("#modal_add_manager").modal("hide");
                                setTimeout(function () {
                                    location.reload();
                                }, 1000);
                            } else if (response.status.code == 1) {
                                window.alert.show("error", "電子メールは存在します", 2000);

                            } else {
                                window.alert.show("error", "アカウントは既に存在します", 2000);
                            }
                        }
                    })
                }
            }
        }
    })

    $(document).on('click', ".detail_manager", function () {
        managerVue.resetForm();
        $("#manager_email").attr('disabled', true);
        managerVue.isUpdateMan = true;
        id_global = this.value;
        $.ajax({
            type: "GET",
            url: "/api/v1/web/user/getDetail?userId=" + id_global.toString(),
            success: function (data) {
                managerVue.detailManager(data);
            }
        })
    });
    $(document).on('click', "#add_manager_popup", function () {
        managerVue.isUpdateMan = false;
        $("#manager_email").attr('disabled', false);
        managerVue.resetForm();
    });
})
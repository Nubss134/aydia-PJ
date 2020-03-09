$(document).ready(function () {
    var companyVue = new Vue({
        el: "#modal_add_company",
        data: {
            validNameCompany: true,
            validNameCompanyLength: true,
            validPhoneCompany: true,
            validPhoneCompanyLength: true,
            validAddressCompany: true,
            validAddressCompanyLength: true,

            invalidNameCompanyMessage: "このフィールドは必須です",
            invalidNameCompanyLengthMessage: "100 文字以内で入力してください。",
            invalidPhoneCompanyMessage: "このフィールドは必須です",
            invalidPhoneCompanyLengthMessage: "100 文字以内で入力してください。",
            invalidAddressCompanyMessage: "このフィールドは必須です",
            invalidAddressCompanyLengthMessage: "100 文字以内で入力してください。",
        },
        methods: {
            resetForm: function () {
                $("#company_name").val("");
                $("#company_phone").val("");
                $("#company_address").val("");
                this.validNameCompany = true;
                this.validNameCompanyLength = true;
                this.validPhoneCompany = true;
                this.validPhoneCompanyLength = true;
                this.validAddressCompany = true;
                this.validAddressCompanyLength = true;
            },
            validateForm: function () {
                this.validateNameCompany();
                this.validateNameCompanyLength();
                this.validatePhoneCompany();
                this.validatePhoneCompanyLength();
                this.validateAddressCompany();
                this.validateAddressCompanyLength();

                return this.validNameCompany && this.validNameCompanyLength && this.validPhoneCompany &&
                    this.validPhoneCompanyLength && this.validAddressCompany && this.validAddressCompanyLength;
            },
            validateNameCompany: function () {
                var name = $("#company_name").val();
                if (name === null || name === undefined || name.trim() === "") {
                    this.validNameCompany = false;
                } else {
                    this.validNameCompany = true;
                }
            },
            validateNameCompanyLength: function () {
                var name = $("#company_name").val();
                if (name.length >= 100) {
                    this.validNameCompanyLength = false;
                } else {
                    this.validNameCompanyLength = true;
                }
            },
            validatePhoneCompany: function () {
                var name = $("#company_phone").val();
                if (name === null || name === undefined || name.trim() === "") {
                    this.validPhoneCompany = false;
                } else {
                    this.validPhoneCompany = true;
                }
            },
            validatePhoneCompanyLength: function () {
                var name = $("#company_phone").val();
                if (name.length >= 100) {
                    this.validPhoneCompanyLength = false;
                } else {
                    this.validPhoneCompanyLength = true;
                }
            },
            validateAddressCompany: function () {
                var name = $("#company_name").val();
                if (name === null || name === undefined || name.trim() === "") {
                    this.validAddressCompany = false;
                } else {
                    this.validAddressCompany = true;
                }
            },
            validateAddressCompanyLength: function () {
                var name = $("#company_address").val();
                if (name.length >= 100) {
                    this.validAddressCompany = false;
                } else {
                    this.validAddressCompanyLength = true;
                }
            },

            addCompany: function (e) {
                e.preventDefault();
                if (this.validateForm()) {
                    var company = {
                        "name": $("#company_name").val(),
                        "phoneNumber": $("#company_phone").val(),
                        "address": $("#company_address").val()
                    }
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        url: "/api/v1/web/company/add",
                        data: JSON.stringify(company),
                        error: function (xhr, ajaxOptions, thrownError) {
                        },
                        success: function (response) {
                            console.log(response);
                            if (response.status.code == 2000) {
                                window.alert.show("success", "登録しました。", 1000);
                                $("#modal_add_company").modal("hide");
                                setTimeout(function () {
                                    location.reload();
                                }, 1200)
                            } else {
                                window.alert.show("error", "アカウントは既に存在します", 2000);
                            }
                        }
                    })
                }
            }
        }
    })
})
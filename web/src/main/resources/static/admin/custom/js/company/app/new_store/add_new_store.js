/**
 *
 */
var AddStore = {};
var list_name = [];
var list_code = [];

var type = "ADD";
$(document).ready(function () {
    var appId = $("#app_id").val();
    var defaultCatalog;
    AddStore.saveStoreModal = {

        map: null,
        marker: null,
        infoWindow: null,
        store: {},

        createEmptyStore: function () {
            return {
                id: null,
                name: "",
                code: "",
                group_name : "",
                postalCode : "",
                phone_number: "",
                city: "",
                district: "",
                address: "",
                fax: "",
                date_work: "",
                date_off: "",
                nameHp1: "",
                addressHp1: "",
                nameHp2: "",
                addressHp2: "",
                parkingAddress: "",
                wifi: "",
                onlinePaying: "",
                refer: "",
                receptionTime2: "",
                dayOff2: "",
                fax2: "",
                phone2: "",
                faxReceive: "",
                latitude: 35.6107844,
                longtitude: 139.4074314,
                tagProducts: []
            };
        },
        show: function () {
            $("#add_store_modal").modal();
        },
        initChangePropertiesHandler: function () {
            var self = this;
            $("#address").blur(function () {
                var fullAddress = $(this).val() + " " + $("#district").val() + " " + $("#city").val();
                self.getPosition(fullAddress, function (position) {
                    self.store.address = $("#address").val();
                    self.store.latitude = position.lat();
                    self.store.longtitude = position.lng();
                });
            });

            $("#store_name").change(function () {
                self.store.name = $(this).val();
            });
            $("#phone_number").change(function () {
                self.store.phone_number = $(this).val();
            });

            $("#store_code").change(function () {
                self.store.code = $(this).val();
            });

            $("#date_off").change(function () {
                self.store.date_off = $(this).val();
            });

            $("#date_work").change(function () {
                self.store.date_work = $(this).val();
            });


            $("#tag_select").change(function () {
                self.store.tagProducts = [];
                var selectedEls = $("#tag_select").select2("data");

                var tagIds = [];
                for (var i = 0; i < selectedEls.length; i++) {
                    tagIds.push(selectedEls[i].id);
                }

                for (var i = 0; i < tagIds.length; i++) {
                    self.store.tagProducts.push({id: tagIds[i]});
                }
            });

        },
        initMap: function () {

            var self = this;
            this.initChangePropertiesHandler();
            this.map = MapUtils.createMap(document.getElementById('view_store_location'), 15, 21.03, 105.850);
            this.marker = new google.maps.Marker({
                map: self.map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                position: {lat: 21.032836, lng: 105.850138},
                icon: '/images/marker-green.png'
            });
            this.infoWindow = new google.maps.InfoWindow({
                content: "ここは店舗の位置です。"
            });
        },
        getPosition: function (address, callback) {
            var self = this;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var position = results[0].geometry.location;
                    self.map.setCenter(new google.maps.LatLng(position.lat(), position.lng()));
                    self.marker.setPosition({
                        lat: position.lat(),
                        lng: position.lng()
                    });
                    self.infoWindow.open(self.map, self.marker);
                    $("#latitude").val(position.lat());
                    $("#longtitude").val(position.lng());
                    callback(position);
                }
            });
        },
        initTagSelect: function (self) {
            $("#tag_select").select2({
                language: {
                    noResults: function (params) {
                        return "タグが見つかりません";
                    }
                },
                width: "100%",
                placeholder: "タグを選択してください。",
                onClose: function () {
                    self.store.tagProducts = [];
                    var selectedEls = $("#tag_select").select2("data");

                    var tagIds = [];
                    for (var i = 0; i < selectedEls.length; i++) {
                        tagIds.push(selectedEls[i].id);
                    }

                    for (var i = 0; i < tagIds.length; i++) {
                        self.store.tagProducts.push({id: tagIds[i]});
                    }
                }
            });
        },
        init: function () {
            var self = this;
            this.initMap();
            $.get("/api/v1/web/" + appId + "/tag/store_tag", function (tagProducts) {
                $("#tag_select").empty();
                for (var i = 0; i < tagProducts.length; i++) {
                    $("#tag_select").append("<option value='" + tagProducts[i].id + "'>" + tagProducts[i].name + "</option>");
                }
            });
            self.initTagSelect(self);
            self.setStore(self.createEmptyStore());

            $("#form_add_store").validate({
                errorElement: "p",
                errorClass: "error-message",
                focusInvalid: false,
                ignore: "",
                rules: {
                    name: {
                        required: true,
                        maxlength: 255
                    },
                    code: {
                        required: true,
                        maxlength: 100
                    },
                    group_name: {
                        required: true,
                        maxlength: 255
                    },
                    postalCode: {
                        required: true,
                        postalCode: true
                    },
                    phone_number: {
                        required: true,
                        phoneNumber: true,
                        maxlength: 30,
                    },
                    city: {
                        required: true
                    },
                    district: {
                        required: true
                    },
                    address: {
                        required: true,
                        maxlength: 255
                    },
                    fax: {
                        required: true,
                        maxlength: 255
                    },
                    date_work: {
                        required: true,
                        maxlength: 255
                    },
                    date_off: {
                        required: true,
                        maxlength: 255
                    },
                    nameHp1: {
                        required: true,
                        maxlength: 255
                    },
                    addressHp1: {
                        required: true,
                        maxlength: 255
                    },
                    nameHp2: {
                        required: true,
                        maxlength: 255
                    },
                    addressHp2: {
                        required: true,
                        maxlength: 255
                    },
                    parkingAddress: {
                        required: true,
                        maxlength: 255
                    },
                    wifi: {
                        required: true,
                        maxlength: 255
                    },
                    onlinePaying: {
                        required: true,
                        maxlength: 255
                    },
                    refer: {
                        required: true,
                        maxlength: 255
                    },
                    receptionTime2: {
                        required: true,
                        maxlength: 255
                    },
                    dayOff2: {
                        required: true,
                        maxlength: 255
                    },
                    fax2: {
                        required: true,
                        maxlength: 255
                    },
                    phone2: {
                        required: true,
                        maxlength: 255
                    },
                    faxReceive: {
                        required: true,
                        maxlength: 255
                    }
                },
                errorPlacement: function (error, element) {
                    $(element).before(error);
                },
                submitHandler: function (form, event) {
                    event.preventDefault();
                    var newStoreEntity = {
                        storeId : $("#store_id").val(),
                        storeName : $("#store_name").val(),
                        storeCode : $("#store_code").val(),
                        storeGroupName : $("#group_name").val(),
                        postalCode :$("#postalCode").val(),
                        city : {name : $("#city").val()},
                        district : {name : $("#district").val()},
                        address : $("#address").val(),
                        phone : $("#phone_number").val(),
                        fax : $("#fax").val(),
                        dateWork : $("#date_work").val(),
                        dateOff : $("#date_off").val(),
                        nameHp1 : $("#nameHp1").val(),
                        addressHp1 : $("#addressHp1").val(),
                        nameHp2 : $("#nameHp2").val(),
                        addressHp2 : $("#addressHp2").val(),
                        parkingAddress : $("#parkingAddress").val(),
                        wifi : $("#wifi").val(),
                        noSmoking : $("#noSmoking").val(),
                        onlinePaying : $("#onlinePaying").val(),
                        refer : $("#refer").val(),
                        receptionTime2 : $("#receptionTime2").val(),
                        dayOff2 : $("#dayOff2").val(),
                        fax2 : $("#fax2").val(),
                        phone2 : $("#phone2").val(),
                        faxReceive : $("#faxReceive").val(),
                        tagProducts : self.store.tagProducts,
                        longtitude : $("#longtitude").val(),
                        latitude : $("#latitude").val(),
                    }
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/newStore/add",
                        data: JSON.stringify(newStoreEntity),
                        contentType: "application/json",
                        beforeSend: function () {
                            window.loader.show();
                        },
                        success: function (response) {
                            window.loader.hide();
                            if(response.status.code == 1111){
                                window.alert.show("error", response.status.message, 3000);
                                return;
                            }
                            window.alert.show("success", "店舗を作成しました。", 3000);
                            newStoreTable.ajax.reload(null, false);
                            setTimeout(function () {
                                self.setStore(self.createEmptyStore());
                                $("#add_store_modal").modal("hide");
                            }, 1000);

                        },
                        error: function (response) {
                            window.loader.hide();
                            window.alert.show("error", "エラーが発生しました。しばらく待ってからもう一度お試してください。", 3000);
                            return;
                        }
                    });
                } // end submitHandler callback
            }); // end form validate

        }, // end init function
        setStore: function (store) {
            this.store = store;
            $("#store_id").val(store.storeId);
            $("#store_name").val(store.storeName);
            $("#store_code").val(store.storeCode);
            $("#group_name").val(store.storeGroupName);
            $("#postalCode").val(store.postalCode);
            $("#city").val(store.city.name);
            $("#district").val(store.district.name);
            $("#address").val(store.address);
            $("#phone_number").val(store.phone);
            $("#fax").val(store.fax);
            $("#date_work").val(store.dateWork);
            $("#date_off").val(store.dateOff);
            $("#nameHp1").val(store.nameHp1);
            $("#addressHp1").val(store.addressHp1);
            $("#nameHp2").val(store.nameHp2);
            $("#addressHp2").val(store.addressHp2);
            $("#parkingAddress").val(store.parkingAddress);
            $("#wifi").val(store.wifi);
            $("#noSmoking").val("" + store.noSmoking);
            $("#onlinePaying").val(store.onlinePaying);
            $("#refer").val(store.refer);
            $("#receptionTime2").val(store.receptionTime2);
            $("#dayOff2").val(store.dayOff2);
            $("#phone2").val(store.phone2);
            $("#fax2").val(store.fax2);
            $("#faxReceive").val(store.faxReceive);

            var tagIds = [];
            for (var i = 0; i < store.tagProducts.length; i++) {
                tagIds.push(store.tagProducts[i].id);
            }

            $("#tag_select").val(tagIds).change();

            if (store.id === null) {
                $("#catalog_link").val("");
            }

            this.map.setCenter(new google.maps.LatLng(store.latitude, store.longtitude));
            this.marker.setPosition(new google.maps.LatLng(store.latitude, store.longtitude));


        }

    }; // end addStoreModal object creation


    AddStore.saveStoreModal.init();

    $("#add_new_store_btn").click(function () {
        type = "ADD";
        $("#form_add_store").validate().resetForm();
        AddStore.saveStoreModal.show();
        AddStore.saveStoreModal.setStore(AddStore.saveStoreModal.createEmptyStore(defaultCatalog));
    });

    var findZip = function (zip) {
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "/getAddressFromZipCode",
            data: {zip:zip},
            error: function (xhr, ajaxOptions, thrownError) {
            },
            success: function (response) {
                switch (response.status.code) {
                    case 1013: {
                        $("#zip_code-invalid").removeClass("hidden");
                        $("#city").val("");
                        $("#district").val("");
                        break;
                    }
                    case 1000: {
                        $("#zip_code-invalid").addClass("hidden");
                        $("#city").val(response.data["city"].name);
                        $("#district").val(response.data["district"].name);
                        AddStore.saveStoreModal.store.city = response.data["city"].name;
                        AddStore.saveStoreModal.store.district = response.data["district"].name;
                        break;
                    }
                }
            }

        });
    }
    $("#postalCode").on('blur', function (e) {
        var validator = $("#form_add_store").validate();
        var validZipcode = validator.element("#postalCode");
        if (validZipcode) {
            findZip($("#postalCode").val());
        }

    });
});


$(document).ready(function() {
	var appId = $("#app_id").val();
	var update_Notification = new Vue({
        el: "#form_application_info",
        data: {
        	validIconImage:true,
        	validLogoImage:true,
        	validStartingImage:true,
            validName: true,
            validNameLength: true,
            validPolicy: true,
            validSubTitle: true,
            validSubTitleLength: true,
            validLanguage: true,
            validLanguageLength: true,
            validCategory: true,
            validCategoryLength: true,
            validDescription: true,
            validKeyword: true,
            validKeywordLength: true,
            validCopyright: true,
            validCopyrightLength: true,
            validIosKey: true,
            validIosKeyLength: true,
            validLinkChplay: true,
            validLinkChplayLength: true,
            validLinkAppstore: true,
            validLinkAppstoreLength: true,
            validSupportUrl: true,
            validSupportUrlLength: true,
            validContactInfoFirstName: true,
            validContactInfoFirstNameLength: true,
            validContactInfoLastName: true,
            validContactInfoLastNameLength: true,
            validContactInfoPhoneNumber: true,
            validContactInfoPhoneNumberLength: true,
            validContactInfoEmail: true,
            validContactInfoEmailLength: true,
            invalidIconImageMessage: "このフィールドは必須です",
            invalidLogoImageMessage: "このフィールドは必須です",
            invalidStartingImageMessage: "このフィールドは必須です",
            invalidNameMessage: "このフィールドは必須です",
            invalidNameLengthMessage : "500 文字以内で入力してください。",
            invalidPolicyMessage: "このフィールドは必須です",
            invalidSubTitleMessage: "このフィールドは必須です",
            invalidSubTitleLengthMessage : "500 文字以内で入力してください。",
            invalidLanguageMessage: "このフィールドは必須です",
            invalidLanguageLengthMessage: "100 文字以内で入力してください",
            invalidCategoryMessage : " このフィールドは必須です。",
            invalidCategoryLengthMessage: "500 文字以内で入力してください",
            invalidDescriptionMessage: "このフィールドは必須です",
            invalidKeywordMessage: "このフィールドは必須です",
            invalidKeywordLengthMessage: "500 文字以内で入力してください",
            invalidCopyrightMessage : "このフィールドは必須です",
            invalidCopyrightLengthMessage: "500 文字以内で入力してください",
            invalidIosKeyMessage: "このフィールドは必須です",
            invalidIosKeyLengthMessage: "500 文字以内で入力してください",
            invalidLinkChplayMessage : "このフィールドは必須です",
            invalidLinkChplayLengthMessage: "500 文字以内で入力してください",
            invalidLinkAppstoreMessage : "このフィールドは必須です",
            invalidLinkAppstoreLengthMessage: "500 文字以内で入力してください",
            invalidLinkAppstoreMessage : "このフィールドは必須です",
            invalidLinkAppstoreLengthMessage: "500 文字以内で入力してください",
            invalidSupportUrlMessage : "このフィールドは必須です",
            invalidSupportUrlLengthMessage: "500 文字以内で入力してください",
            invalidContactInfoFirstNameMessage : "このフィールドは必須です",
            invalidContactInfoFirstNameLengthMessage: "500 文字以内で入力してください",
            invalidContactInfoLastNameMessage : "このフィールドは必須です",
            invalidContactInfoLastNameLengthMessage: "500 文字以内で入力してください",
            invalidContactInfoEmailMessage : "このフィールドは必須です",
            invalidContactInfoEmailLengthMessage: "500 文字以内で入力してください",
            invalidContactInfoPhoneNumberMessage : "このフィールドは必須です",
            invalidContactInfoPhoneNumberLengthMessage: "500 文字以内で入力してください",
            isSigninRequired: true,
        },
        methods: {
            validateForm: function(){
            	this.validateIconImage();
            	this.validateLogoImage();
            	this.validateStartingImage();
                this.validateName();
                this.validateNameLength();
                this.validatePolicy();
                this.validateSubTitle();
                this.validateSubTitleLength();
                this.validateLanguage();
                this.validateLanguageLength();
                this.validateCategory();
                this.validateCategoryLength();
                this.validateDescription();
                this.validateKeyword();
                this.validateKeywordLength();
                this.validateCopyright();
                this.validateCopyrightLength();
                this.validateLinkChplay();
                this.validateLinkChplayLength();
                this.validateLinkAppstore();
                this.validateLinkAppstoreLength();
                this.validateSupportUrl();
                this.validateSupportUrlLength();
                this.validateContactInfoFirstName();
                this.validateContactInfoFirstNameLength();
                this.validateContactInfoLastName();
                this.validateContactInfoLastNameLength();
                this.validateContactInfoPhoneNumber();
                this.validateContactInfoPhoneNumberLength();
                this.validateContactInfoEmail();
                this.validateContactInfoEmailLength();
                return this.validIconImage && this.validLogoImage && this.validStartingImage &&this.validName && this.validNameLength && this.validPolicy
                && this.validSubTitle && this.validSubTitleLength && this.validLanguage && this.validLanguageLength
                && this.validCategory && this.validCategoryLength && this.validDescription && this.validKeyword
                && this.validKeywordLength && this.validCopyright && this.validCopyrightLength && this.validIosKey
                && this.validIosKeyLength && this.validLinkChplay && this.validLinkChplayLength && this.validLinkAppstore
                && this.validLinkAppstoreLength && this.validSupportUrl && this.validSupportUrlLength
                && this.validContactInfoFirstName && this.validContactInfoFirstNameLength 
                && this.validContactInfoLastName && this.validContactInfoLastNameLength
                && this.validContactInfoPhoneNumber && this.validContactInfoPhoneNumberLength 
                && this.validContactInfoEmail && this.validContactInfoEmailLength;
            },           
            validateIconImage: function() {
                if(this.$refs['app_icon'].hasImage) {
                    this.validIconImage = true;
                } else {
                    this.validIconImage = false;
                }
            },
            validateStartingImage: function() {
                if(this.$refs['starting_image_app'].hasImage) {
                    this.validStartingImage = true;
                } else {
                    this.validStartingImage = false;
                }
            },           
            validateLogoImage: function() {
                if(this.$refs['app_logo'].hasImage) {
                    this.validLogoImage = true;
                } else {
                    this.validLogoImage = false;
                }
            },
            validateName: function() {
                var name = $("#app_name").val();
                if(name === null || name === undefined || name.trim() ==="") {
                    this.validName = false;
                } else {
                    this.validName = true;
                }
            },
            validateNameLength: function() {
                var name = $("#app_name").val();
                if(name.length>=500) {
                    this.validNameLength = false;
                } else {
                    this.validNameLength = true;
                }
            },
            validatePolicy: function() {
            	 var policy = CKEDITOR.instances['policy'].getData();
                if(policy === null || policy === undefined || policy.trim() ==="") {
                    this.validPolicy = false;
                } else {
                    this.validPolicy = true;
                }
            },
            validateSubTitle: function() {
                var subTitle = $("#app_subtitle").val();
                if(subTitle === null || subTitle === undefined || subTitle.trim() ==="") {
                    this.validSubTitle = false;
                } else {
                    this.validSubTitle = true;
                }
            },
            validateSubTitleLength: function() {
            	  var subTitle = $("#app_subtitle").val();
                if(subTitle.length>=500) {
                    this.validSubTitleLength = false;
                } else {
                    this.validSubTitleLength = true;
                }
            },
            validateLanguage: function() {
                var language = $("#app_language").val();
                if(language === null || language === undefined || language.trim() ==="") {
                    this.validLanguage = false;
                } else {
                    this.validLanguage = true;
                }
            },
            validateLanguageLength: function() {
            	var language = $("#app_language").val();
                if(language.length>=100) {
                    this.validLanguageLength = false;
                } else {
                    this.validLanguageLength = true;
                }
            },
            validateCategory: function() {
                var category = $("#app_category").val();
                if(category === null || category === undefined || category.trim() ==="") {
                    this.validCategory = false;
                } else {
                    this.validCategory = true;
                }
            },
            validateCategoryLength: function() {
            	  var category = $("#app_category").val();
                if(category.length>=500) {
                    this.validCategoryLength = false;
                } else {
                    this.validCategoryLength = true;
                }
            },
            validateDescription: function() {
                var description =CKEDITOR.instances['description'].getData();
                if(description === null || description === undefined || description.trim() ==="") {
                    this.validDescription = false;
                } else {
                    this.validDescription = true;
                }
            },
            validateKeyword: function() {
                var keyword = $("#app_keyword").val();
                if(keyword === null || keyword === undefined || keyword.trim() ==="") {
                    this.validKeyword = false;
                } else {
                    this.validKeyword = true;
                }
            },
            validateKeywordLength: function() {
            	 var keyword = $("#app_keyword").val();
                if(keyword.length>=500) {
                    this.validKeywordLength = false;
                } else {
                    this.validKeywordLength = true;
                }
            },
            validateCopyright: function() {
                var copyright = $("#app_copyright").val();
                if(copyright === null || copyright === undefined || copyright.trim() ==="") {
                    this.validCopyright = false;
                } else {
                    this.validCopyright = true;
                }
            },
            validateCopyrightLength: function() {
            	 var copyright = $("#app_copyright").val();
                if(copyright.length>=255) {
                    this.validCopyrightLength = false;
                } else {
                    this.validCopyrightLength = true;
                }
            },
            validateLinkChplay: function() {
                var linkChplay = $("#app_link_chplay").val();
                if(linkChplay === null || linkChplay === undefined || linkChplay.trim() ==="") {
                    this.validLinkChplay = false;
                } else {
                    this.validLinkChplay = true;
                }
            },
            validateLinkChplayLength: function() {
            	 var linkChplay = $("#app_link_chplay").val();
                if(linkChplay.length>=255) {
                    this.validLinkChplayLength = false;
                } else {
                    this.validLinkChplayLength = true;
                }
            },
            validateLinkAppstore: function() {
                var linkAppstore = $("#app_link_appstore").val();
                if(linkAppstore === null || linkAppstore === undefined || linkAppstore.trim() ==="") {
                    this.validLinkAppstore = false;
                } else {
                    this.validLinkAppstore = true;
                }
            },
            validateLinkAppstoreLength: function() {
            	 var linkAppstore = $("#app_link_appstore").val();
                if(linkAppstore.length>=255) {
                    this.validLinkAppstoreLength = false;
                } else {
                    this.validLinkAppstoreLength = true;
                }
            },
            validateSupportUrl: function() {
                var supportUrl = $("#support_url").val();
                if(supportUrl === null || supportUrl === undefined || supportUrl.trim() ==="") {
                    this.validSupportUrl = false;
                } else {
                    this.validSupportUrl = true;
                }
            },
            validateSupportUrlLength: function() {
            	 var supportUrl = $("#support_url").val();
                if(supportUrl.length>=255) {
                    this.validSupportUrlLength = false;
                } else {
                    this.validSupportUrlLength = true;
                }
            },
            validateContactInfoFirstName: function() {
                var contactInfoFirstName = $("#app_contact_info_first_name").val();
                if(contactInfoFirstName === null || contactInfoFirstName === undefined ||contactInfoFirstName.trim() ==="") {
                    this.validContactInfoFirstName = false;
                } else {
                    this.validContactInfoFirstName = true;
                }
            },
            validateContactInfoFirstNameLength: function() {
            	 var contactInfoFirstName = $("#app_contact_info_first_name").val();
                if(contactInfoFirstName.length>=255) {
                    this.validContactInfoFirstNameLength = false;
                } else {
                    this.validContactInfoFirstNameLength = true;
                }
            },
            validateContactInfoLastName: function() {
                var contactInfoLastName = $("#app_contact_info_last_name").val();
                if(contactInfoLastName === null || contactInfoLastName === undefined ||contactInfoLastName.trim() ==="") {
                    this.validContactInfoLastName = false;
                } else {
                    this.validContactInfoLastName = true;
                }
            },
            validateContactInfoLastNameLength: function() {
            	 var contactInfoLastName = $("#app_contact_info_last_name").val();
                if(contactInfoLastName.length>=255) {
                    this.validContactInfoLastNameLength = false;
                } else {
                    this.validContactInfoLastNameLength = true;
                }
            },
            validateContactInfoPhoneNumber: function() {
                var contactInfoPhoneNumber = $("#app_contact_info_phone").val();
                if(contactInfoPhoneNumber === null || contactInfoPhoneNumber === undefined ||contactInfoPhoneNumber.trim() ==="") {
                    this.validContactInfoPhoneNumber = false;
                } else {
                    this.validContactInfoPhoneNumber = true;
                }
            },
            validateContactInfoPhoneNumberLength: function() {
            	 var contactInfoPhoneNumber = $("#app_contact_info_phone").val();
                if(contactInfoPhoneNumber.length>=255) {
                    this.validContactInfoPhoneNumberLength = false;
                } else {
                    this.validContactInfoPhoneNumberLength = true;
                }
            },
            validateContactInfoEmail: function() {
                var contactInfoEmail = $("#app_contact_info_email").val();
                if(contactInfoEmail === null || contactInfoEmail === undefined ||contactInfoEmail.trim() ==="") {
                    this.validContactInfoEmail = false;
                } else {
                    this.validContactInfoEmail = true;
                }
            },
            validateContactInfoEmailLength: function() {
            	 var contactInfoEmail = $("#app_contact_info_email").val();
                if(contactInfoEmail.length>=255) {
                    this.validContactInfoEmailLength = false;
                } else {
                    this.validContactInfoEmailLength = true;
                }
            }, 
            
            updateApp: function (e) {
                var self = this;
                e.preventDefault();
                if (this.validateForm()) {
                    var formData = new FormData();
                    formData.append("icon", self.$refs['app_icon'].getSelectedFile());
                    formData.append("logo", self.$refs['app_logo'].getSelectedFile());
                    formData.append("startingImage", self.$refs['starting_image_app'].getSelectedFile());
                    formData.append("description", CKEDITOR.instances['description'].getData());
                    formData.append("policy", CKEDITOR.instances['policy'].getData());
                    formData.append("name", $("#app_name").val());
                    formData.append("subTitle", $("#app_subtitle").val());
                    formData.append("language", $("#app_language").val());
                    formData.append("category", $("#app_category").val());
                    formData.append("keyword", $("#app_keyword").val());
                    formData.append("copyright", $("#app_copyright").val());
                    formData.append("iosKey", $("#app_iOS_file_key").val());
                    formData.append("IosFile", $("#uploaded_file_url").val());
                    formData.append("linkChplay", $("#app_link_chplay").val());
                    formData.append("linkAppstore", $("#app_link_appstore").val());
                    formData.append("supportUrl", $("#support_url").val());
                    formData.append("marketingUrl", $("#marketing_url").val());
                    formData.append("promotionalText", $("#promotional_text").val());
                    formData.append("appContactInfoFirstName", $("#app_contact_info_first_name").val());
                    formData.append("appContactInfoLastName", $("#app_contact_info_last_name").val());
                    formData.append("appContactInfoPhoneNumber", $("#app_contact_info_phone").val());
                    formData.append("appContactInfoEmail", $("#app_contact_info_email").val());
                    formData.append("isSigninRequired", self.isSigninRequired);
                    $("#btn_submit_add_app_info").prop("disabled",true);
                    window.loader.show();
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/app/update",
                        data: formData,
                        contentType:false,
                        processData: false,
                        dataType: "json",
                        success: function (response) {
                            window.loader.hide();
                            switch (response.status.code) {
                                case 1000: {
                                	window.alert.show("success",$("#success").html(), "2000");
                            	setTimeout(function(){
                        			$("#btn_submit_add_app_info").prop("disabled",false);
                        			location.reload();
                        	},2000)
                        	break;
                                }
                                case 1012: {
                                    window.alert.show("error", response.data, 3000);
                                    break;
                                }
                            }
                        }
                    })
                }
            }
        },
        mounted: function () {
            var self = this;
            $(this.$el).find(".file-input").change(function (e) {
                self.validateIconImage();
                self.validateLogoImage();
                self.validateStartingImage();
            });
            var iconUrl = $("#url_icon").val();
            if (iconUrl != null && iconUrl != '') {
            	 $(self.$refs['app_icon'].$el).find("img").attr("src",iconUrl);
                 self.$refs['app_icon'].hasImage = true;
            }
            
            var startingImage = $("#starting_image").val();
            if (startingImage != null && startingImage != '') {
            	 $(self.$refs['starting_image_app'].$el).find("img").attr("src",startingImage);
                 self.$refs['starting_image_app'].hasImage = true;
            }
            
            var logoUrl = $("#url_logo").val();
            if (logoUrl != null && logoUrl != '') {
            	 $(self.$refs['app_logo'].$el).find("img").attr("src",logoUrl);
                 self.$refs['app_logo'].hasImage = true;
            }
            
            $("#is_signin_required").on('change', function () {
                if (this.checked) {
                	self.isSigninRequired = true;
                } else {
                	self.isSigninRequired = false;
                }

            })
        },
    
	})
	 var ckPolicy = CKEDITOR.replace('policy',{
		 language: 'ja',
		 	height: 200,
		 	removePlugins: 'elementspath'
	 });
	var ckDescription = CKEDITOR.replace('description',{
		language: 'ja',
		 	height: 200,
		 	removePlugins: 'elementspath'
	 });
	CKEDITOR.config.toolbar = [
        ['Styles', 'Format', 'Font', 'FontSize'],
        ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace', '-', 'Outdent', 'Indent', '-', 'Print'],
        ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Image', 'Table', '-', 'Link', 'Flash', 'Smiley', 'TextColor', 'BGColor', 'Source']
    ];
	ckPolicy.on('instanceReady', function (evt) {
			var editor = evt.editor;
			editor.on("blur",function() {
				update_Notification.validatePolicy();
			})
			editor.on("change",function() {
				update_Notification.validatePolicy();
			})
		});
	ckDescription.on('instanceReady', function (evt) {
			var editor = evt.editor;
			editor.on("blur",function() {
				update_Notification.validateDescription();
			})
			editor.on("change",function() {
				update_Notification.validateDescription();
			})
		});
	   $("#choose_iOS_key_file_btn").click(function(){
	   		$("#sc_input_iOS_file").trigger("click");
	   });
	   
	   $("#sc_remove_file").on("click",function(){
		   $(this).addClass("hidden");
		   $("#sc_iOS_file_name").addClass("hidden");
			$("#iOS_download_link").removeClass("hidden");
		   $("#set_catalog_file_name").html("ファイル選択 ...");
		   
	   });
    
    $("#sc_input_iOS_file").change(function(){
		   
 	    var files = this.files;
 	  	
 	  	if(files.length > 0){
 	  		if(files[0].size > fileSize5MB){
				window.alert.show("error","ファイルの最大サイズは5MBです。" ,3000);
				return;
			}
 	  		$("#uploaded_file_name").html(files[0].name);
 	 	  	$("#sc_remove_file").removeClass("hidden");
 	 	  	
 	  		var formData = new FormData();
 	  		formData.append("files",files[0]);
 	  		
 	  		$.ajax({
 				type: "POST",
 				url: "/api/v1/upload",
 				data: formData,
 				processData: false,
 				contentType: false,
 				dataType: "json",
 				beforeSend : function() { window.loader.show(); },
 				error: function () { window.loader.hide(); },
 				success: function (response) { 
 					window.loader.hide();
 					$("#uploaded_file_url").val(response[0]);
 					$("#uploaded_file_name").val(files[0].name);
			 	  	$("#sc_iOS_file_name").html(files[0].name);
			 	  	$("#sc_iOS_file_name").removeClass("hidden");
			 	  	$("#sc_remove_file").removeClass("hidden");
			 	  	$("#iOS_download_link").addClass("hidden");
		 			
 				}
 	  		}); // end ajax
 	  	};
 	  	
   });// end change event attach.
    
})
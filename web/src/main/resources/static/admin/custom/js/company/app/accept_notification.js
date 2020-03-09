$(document).ready(function () {
	
    var appId = $("#app_id").val();
    
    // get list function 
    jQuery.get("/api/v1/web/" + appId + "/menu/getFunctionDifferentName", function (response) {
		response.data.forEach(function(menu){
			var html =  '<option class="list-option-function" id="function'+menu.id+'" value="'+menu.id+'" name="'+menu.name+'">'+menu.name+'</option>';
			var fillDataToSelectBox = function(typeAccept){				
				$("#list_function_"+typeAccept).append(html);
				$("#list_function_"+typeAccept +" option[value='WEB_VIEW']").remove();	
			}
			fillDataToSelectBox("pres");
			fillDataToSelectBox('ques');
	    })
	});
    
	// image button click event
    $('#choose_image_pres_btn').on('click', function () {
        $("#image_file_pres_input").click();
    });
    $('#choose_image_ques_btn').on('click', function () {
        $("#image_file_ques_input").click();
    });
   
	$('#weblink-pres-div, #weblink-ques-div, #function-pres-div, #function-ques-div').hide();
	
    // get config accept information 
    var fillDataToFormConfig  = function(typeAccept){
    	var url = (typeAccept==='pres') ? ("/api/v1/web/" + appId + "/acceptConfig/getConfigInfor?type=1") 
    			                        : ("/api/v1/web/" + appId + "/acceptConfig/getConfigInfor?type=2");   		
    	jQuery.get(url, function (configInfor) {
    	    if(configInfor != null){
    	    	$("#title_" + typeAccept +"_input").val(configInfor.title);
    	    	$("#short_description_"+ typeAccept + "_input").val(configInfor.shortDescription);
    	        $("input[name=config_"+ typeAccept+"_id]").val(configInfor.id);
    	        
    	        if (configInfor.typePush == 2){
    	    		$("input[name=action_type_radio_"+typeAccept+"]").val(["webview_"+ typeAccept]);
    	    		$("#web_link_" +typeAccept + "_input").val(configInfor.linkWebview);  
    	    	} else{
    	    		if(configInfor.typePush == 1){
        	    		$("input[name=action_type_radio_"+typeAccept+"]").val(["inapp_" + typeAccept]);
            	    	CKEDITOR.instances["long_description_" +typeAccept + "_input"].setData(configInfor.longDescription);
    	    		} else {
        	    		$("input[name=action_type_radio_"+typeAccept+"]").val(["link_function_"+ typeAccept]);
        	    		$("#list_function_"+ typeAccept).val(configInfor.menu.id);
    	    		}
    	    		if(configInfor.imageUrl != null && configInfor.imageUrl != ""){
    	    			$("#image_render_"+typeAccept).attr("src",configInfor.imageUrl);
    	    			$("#image_render_"+typeAccept).removeClass("hidden");
    	    		}
    	    	}
    	    	$('.'+typeAccept).change();
    	    }	
    	})
	};
    
	fillDataToFormConfig('pres');
	fillDataToFormConfig('ques');
	
	
	//radio value change event
	var radioChangeValueEvent= function(typeAccept){
		$('.'+typeAccept).on('change', function(){   
			  var selected_radio_value = $("input[name=action_type_radio_"+typeAccept+"]:checked").val();
			  if(selected_radio_value == 'inapp_'+typeAccept){
		          $('#image-'+typeAccept+'-div, #long-description-'+typeAccept+'-div').show();
			      $('#weblink-'+typeAccept+'-div, #function-'+typeAccept+'-div').hide();
			  } else if (selected_radio_value == 'webview_'+typeAccept){
		          $('#image-'+typeAccept+'-div, #function-'+typeAccept+'-div, #long-description-'+typeAccept+'-div').hide();
			      $('#weblink-'+typeAccept+'-div').show();
			  } else if (selected_radio_value == 'link_function_'+typeAccept){
		          $('#image-'+typeAccept+'-div, #function-'+typeAccept+'-div').show();
			      $('#long-description-'+typeAccept+'-div, #weblink-'+typeAccept+'-div').hide();
			  }
	    });
	}	
	radioChangeValueEvent('pres');
	radioChangeValueEvent('ques');
      
	
	//config CKEDITOR
    var initCKEDITOR = function(idTag){
	   CKEDITOR.replace(idTag, {
    	    language: 'ja',
		 	height: 150,
		 	removePlugins: 'elementspath' 
       })
       CKEDITOR.config.toolbar = [
            ['Styles', 'Format'],
            ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace', '-', 'Outdent', 'Indent', '-', 'Print'],
            ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Image', 'Table', '-', 'Link', 'Flash', 'Smiley', 'TextColor', 'BGColor', 'Source']
            ];
        $("#cke_1_bottom").addClass("hidden");
    }
    
    initCKEDITOR("long_description_ques_input");
    initCKEDITOR("long_description_pres_input");
    
    //render image after choosing
    function readURL(input, typeAccept) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            var imageInputFile = input.files[0];

            reader.onload = function (e) {
                $("#image_render_" + typeAccept).attr('src', e.target.result);
                $("#image_render_" + typeAccept).removeClass('hidden');
                $("#image_render_" + typeAccept).attr('title', imageInputFile.name );
                $(".btn-upload-image-"+typeAccept).removeAttr('id').attr("id", "remove_image_"+ typeAccept+ "_btn" );
                $("#remove_image_"+typeAccept+"_btn").html("写真削除");
            };
            reader.readAsDataURL(imageInputFile);
        }
    }
    
    $("#image_file_ques_input").on('change', function(){
    	readURL(this, 'ques');  
    });
    
    $("#image_file_pres_input").on('change', function(){
    	readURL(this, "pres");  
    })
    
    
    function removeImageAfterRender(typeAccept){  
        $("#image_render_" + typeAccept).attr('src', "");
        $("#image_render_" + typeAccept).addClass("hidden");
        $("#image_render_" + typeAccept).attr('title', "");
        $(".btn-upload-image-" + typeAccept ).removeAttr('id').attr("id", "choose_image_"+ typeAccept+ "_btn" )
        $("#choose_image_"+ typeAccept+"_btn").html("Choose image");
    }
    
    $(document).on('click','#remove_image_pres_btn',function(){
    	removeImageAfterRender('pres')
    });
    
    $(document).on('click','#remove_image_ques_btn',function(){
    	removeImageAfterRender('ques');
    });

    
    // get value input 
    var getConfigInformation = function(typeAccept){
    	var checkedRadio = $("input[name=action_type_radio_"+typeAccept+"]:checked").val();
    	var configInfor = {
    	    id: $("#config_" + typeAccept + "_id").val(),
    		title: $("#title_" + typeAccept +"_input").val(),
    	    shortDescription: $("#short_description_"+ typeAccept + "_input").val(),
    	    longDescription: CKEDITOR.instances["long_description_" +typeAccept + "_input"].getData(),
    	    linkWebview: $("#web_link_" +typeAccept + "_input").val(),
    	    typePush : 1, // 1: inapp, 2: webview, 3 function
    	    functionId: null,
    	    appId: appId,
    	    type: (typeAccept === "pres")? 1:2 
    	};
    	
    	if ( checkedRadio === "inapp_" + typeAccept) {
	    	configInfor.linkWebview = null;
	    	configInfor.functionName = null;
	    	configInfor.typePush = 1;
	    } else {
	    	configInfor.longDescription = null;
	    	configInfor.typePush = (checkedRadio === 'webview_'+typeAccept) ? 2 : 3;
	    }
	    if( checkedRadio === 'link_function_'+typeAccept){
	    	configInfor.functionId = $("#list_function_"+ typeAccept + " option:selected").val();
	    }	    
	    return configInfor;        
    }
    
    var submitFormConfig = function (typeAccept) {
   	    var checkedRadio = $("input[name=action_type_radio_"+typeAccept+"]:checked").val();
    	var idImageInputTag = $("#image_file_" + typeAccept + "_input")[0];
        var formData = new FormData();                    
        var configInfor = getConfigInformation(typeAccept);                      
    	if (idImageInputTag.files && idImageInputTag.files[0]) {
    	    var imageFile = idImageInputTag.files[0];
            if (checkedRadio === "inapp_" + typeAccept || checkedRadio ==="link_function_"+ typeAccept) {
                formData.append("imageFile", imageFile);
            }
    	}            	
        if(checkedRadio ==="link_function_" + typeAccept){
        	 formData.append("functionId", new Blob([configInfor.functionId], {
                 type: "application/json"
             }));
        }     
        
        formData.append("configInfor", new Blob([JSON.stringify(configInfor)], {
            type: "application/json"
        }));
        
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/acceptConfig/save",
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
            	$("#btn_submit_"+typeAccept).prop("disabled", false);
                window.loader.hide();
                if (response.status.code === 1011) {
                    window.alert.show("error", "まだ必要な情報を設定していません。。 ", 2000);
                } else {
                    window.alert.show("success", "プッシュ通知しました。 ", 2000);
                }
                setTimeout(function(){
                	location.reload();
                },1000)
            }
        });
        return false;
    }

      
    $("#form_pres").validate({
    	errorElement: "p",
        errorClass: "error-message",
        ignore: [],
        rules: {
            title_pres_input: {
                required: true,
                maxlength: 100
            },
            short_description_pres_input: {
                required: true,
                maxlength: 225
            },
            long_description_pres_input: {
            	check_ckEditor: true
            },
            web_link_pres_input: {
                required: {
                    depends: function() {
                    	return $("#webview_pres_radio").prop("checked");
                     }
                },
                validUrl: {
                    depends: function() {
                    	return $("#webview_pres_radio").prop("checked");
                     }
                },
                maxlength: 255
            }
        },
        messages: {},
        submitHandler: function (form) {
        	submitFormConfig("pres");
        	return false;
        }
        	
    });
    
    $("#form_ques").validate({
        errorElement: "p",
        errorClass: "error-message",
        ignore: "",
        rules: {
            title_ques_input: {
                required: true,
                maxlength: 100
            },
            short_description_ques_input: {
                required: true,
                maxlength: 225
            },
            long_description_ques_input: {
            	check_ckEditor: true
            },
            web_link_ques_input: {
                required: {
                    depends: function() {
                        return $("#webview_ques_radio").prop("checked");
                     }
                },
                validUrl: {
                    depends: function() {
                    	return $("#webview_ques_radio").prop("checked");
                     }
                },
                maxlength: 255
            }
        },
        messages: {},
        submitHandler: function (form) {
        	submitFormConfig("ques");
        	return false;
        }
    });
    
    $('#btn_submit_pres').on('click', function(){
        if ($("#form_pres").valid()) {
             $("#form_pres").submit();
         }
    });
    
    $('#btn_submit_ques').on('click', function(){
        if ($("#form_ques").valid()) {
             $("#form_ques").submit();
         }
    });
    
   
   // add method validate url include http/https using regex
    $.validator.addMethod('validUrl', function(value, element) {
       	var regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; 
       	    return regex.test(value);
        }, 'HTTP/HTTPSを含むリンクを入力してください。'); // 


    $.validator.addMethod("check_ckEditor",
        function (value, element) {
    	   var editorId = $(element).attr('id');
    	   var typeAccept = (editorId === "long_description_pres_input") ? "pres" : "ques";    	
    	   if($("#inapp_"+typeAccept+"_radio").prop("checked")) {
    		   return !(CKEDITOR.instances[editorId].getData() == '');
    	   }
           return true;
        }, "このフィールドは必須です。");
})
    
   




    

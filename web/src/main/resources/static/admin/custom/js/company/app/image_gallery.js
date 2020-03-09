$(document).ready(function() {
	
    var appId = $("#app_id").val();
    $('.btn-edit').on('click', function() {
      	 var parentId = $(this).attr('id');
      	 var imageId = parentId.replace("btn_edit_","");
      	 $("#modal_update_image").attr("image-id", imageId);
       })

    $(".container-slide").sortable();
    $(".container-slide" ).disableSelection();

   var form_update_image = new Vue({
        el: "#update_image",
        data: {},
        mounted: function() {
            var self = this;
        	$('.btn-edit').on('click', function() {
                var imageId = $("#modal_update_image").attr("image-id")
            jQuery.get("/api/v1/web/" + appId + "/imageGallery/" + imageId, function(response) {
                if (response != null && response != '') {
                        $(self.$refs['image-uploader2'].$el).find("img").attr("src",response.data.url)
                        $(self.$refs['image-uploader2'].$el).find("img").attr("id", 'image-' + response.data.id)
                        self.$refs['image-uploader2'].hasImage = true;
                        $("#image_title_update").val(response.data.title);
                }
            	});
        	 });
        },
        methods: {
        	updateImage: function(e) {
                var formData = new FormData();
                var self = this;
                
        		$("#update_required_image").addClass("hidden")
                var invalid = false;
               
                var image_uploader = self.$refs["image-uploader2"];

                if (image_uploader.hasFile || image_uploader.hasImage) {
                	formData.append("imageAttachment", image_uploader.getSelectedFile());
                }else{
                	$("#update_required_image").removeClass("hidden")
                	//window.alert.show("error","像が必須項目です。" ,3000);
                	invalid = true;
                }
                
                if (!validateInput("#image_title_update")) {
                    $("#update_required_title").removeClass("hidden")
                    invalid = true;
                }
                if (!validateLengthInputImage("#image_title_update")) {
                    $("#update_length_title").removeClass("hidden")
                    invalid = true;
                    }
                
                $("#image_title_update").on("blur", function () {
                    if (!validateInput("#image_title_update")) {
                        $("#update_required_title").removeClass("hidden");
                    } else $("#update_required_title").addClass("hidden");
                })
                $("#image_title").on("blur", function () {
                    if (!validateLengthInputImage("#image_title")) {
                        $("#update_length_title").removeClass("hidden");
                    } else $("#update_length_title").addClass("hidden");
                })
                
                 $('.btn-edit').on('click', function() {
               	 $("#update_required_title").addClass("hidden");
               	 $("#update_required_image").addClass("hidden");
              	});
                
                if (invalid) {
                	return;
                }
                
                $('.btn-edit').on('click', function () {
                    $("#modal_update_image").validate().resetForm();
                });
                
                formData.append("title", $("#image_title_update").val());
                console.log(formData.get("title"));
                $.ajax({
                    type: "POST",
                    url: "/api/v1/web/" + appId + "/imageGallery/update/" + $("#modal_update_image").attr("image-id"),
                    data: formData,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    beforeSend: function() {
                        $("#btn_submit_add").attr('disabled', true);
                        self.$refs["loader"].show();
                    },
                    success: function(response) {
                        window.alert.show("success","成功。" ,1200);
                        setTimeout(function() {
                            location.reload();
                        }, 1000);
                    }
                })
        }
        }
        
    })
   $(".switch input").change(function () {
	   var id = $(this).attr('id').replace("btn_switch_","");
       var active = $(this).attr("checked") == "checked";
       console.log( $(this).attr("checked"))
       var formData = new FormData();
       formData.append("status", active);
       $.ajax({
           type: "POST",
           url: "/api/v1/web/" + appId + "/imageGallery/" + id  + "/active",
           data: formData,
           contentType: false,
           processData: false,
           dataType: "json",
           beforeSend: function () {
               window.loader.show();
           },
           success: function () {
               window.loader.hide();
               window.alert.show("success", "成功", 1200);
           }
       })
   });
    
    var form_add_image = new Vue({
        el: "#add_image",
        data: {},
        methods: {
        	addImage: function(e) {
        		$("#required_image").addClass("hidden")
                var invalid = false;
        		
                var formData = new FormData();
                var self = this;
               
                var image_uploader = self.$refs["image-uploader1"];

                if (image_uploader.hasFile || image_uploader.hasImage) {
                	formData.append("imageAttachment", image_uploader.getSelectedFile());
                }else{
                	$("#required_image").removeClass("hidden")
                	//window.alert.show("error","像が必須項目です。" ,3000);
            		invalid = true;
                }
                
                	if (image_uploader.hasFile || image_uploader.hasImage) {
                        $("#required_image").addClass("hidden");
                    } else $("#required_image").removeClass("hidden");
                
                
                if (!validateInput("#image_title")) {
                    $("#required_title").removeClass("hidden")
                    invalid = true;
                }
                if (!validateLengthInputImage("#image_title")) {
                    $("#length_title").removeClass("hidden")
                    invalid = true;
                }
                
                $("#image_title").on("blur", function () {
                    if (!validateInput("#image_title")) {
                        $("#required_title").removeClass("hidden");
                    } else $("#required_title").addClass("hidden");
                })
                $("#image_title").on("blur", function () {
                    if (!validateLengthInputImage("#image_title")) {
                        $("#length_title").removeClass("hidden");
                    } else $("#length_title").addClass("hidden");
                })
                
                $('#add_image_btn').on('click', function() {
               	 $("#required_title").addClass("hidden");
               	 $("#required_image").addClass("hidden");
              	});
                
                if (invalid) {
                	return;
                }
                formData.append("title", $("#image_title").val());
                $.ajax({
                    type: "POST",
                    url: "/api/v1/web/" + appId + "/imageGallery/add",
                    data: formData,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    beforeSend: function() {
                        $("#btn_submit_add").attr('disabled', true);
                        self.$refs["loader"].show();
                    },
                    success: function(response) {
                        window.alert.show("success","成功。" ,2000);
                        setTimeout(function() {
                            location.reload();
                        }, 1000);
                    }
                })
            
        
        
        	}
        }
    })
    
    $(document).on("click", ".btn-delete", function() {
   	 var id = $(this).attr('id').replace("btn_delete_","");
   	 $(".btn-delete-slider").on('click',function(){
   		  $.ajax({
                 type: "POST",
                 url: "/api/v1/web/" + appId + "/imageGallery/delete/"+id,
                 success: function(response) {
                     window.alert.show("success","イメジを削除しました。" ,3000);
                     setTimeout(function() {
                         location.reload();
                     }, 1000);
                 }
             })
   	 });
    })

    // $("#save_order").on('click',function(){
    //     var listImage=[];
    //     $(".block-image").each(function(e){
    //         var imageId = $(this).attr('id')
    //         var step ={
    //             id:imageId,
    //             position: e+1
    //         }
    //         listImage.push(step);
    //     })
    //     $.ajax({
    //         type: "POST",
    //         data: JSON.stringify(listStep),
    //         contentType: "application/json",
    //         url: "/api/v1/app/"+appId+"/step/updateOrder",
    //         error: function (xhr, ajaxOptions, thrownError) {
    //         },
    //         success: function (response) {
    //             if(response.status.code==1000){
    //                 window.alert.show("success", "成功", 2000);
    //             }else{
    //                 window.alert.show("error", "失敗", 2000);
    //             }
    //         }
    //
    //     })
    // })

    
    	
})
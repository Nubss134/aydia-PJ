$(document).ready(function () {

	$(".content").sortable();
	$( ".content" ).disableSelection();
    var appId = $("#app_id").val();
	var image = new Vue({
	  el: "#app_image_using",
      data: {
	      validName: true,
	      validNameLength: true,
	      validContent: true,
	      validContentLength: true,
	      validImage:true,
	      invalidNameMessage: "このフィールドは必須です",
	      invalidNameLengthMessage: "255 文字以内で入力してください。",
	      invalidContentMessage: "このフィールドは必須です",
	      invalidContentLengthMessage: "255 文字以内で入力してください。",
	      invalidImageMessage:"このフィールドは必須です",
	      isUpdate: true,
	      hasImage:false,
	      position:0,
      },
	  methods: {
	    updateForm: function(image) {
	    	 var self = this;
	    	$("#image_id").val(image.id);
	        $("#image_name").val(image.title);
	        $("#image_content").val(image.description);
	        if (image != null && image != '' && image.url != null && image.url != '') {
                $(self.$refs['app_image_using'].$el).find("img").attr("src", image.url);
                self.$refs['app_image_using'].hasImage = true;
                self.hasImage=true;
            }
	    },
	    validateForm: function(){
	    	this.validateImage();
	        this.validateName();
	        this.validateNameLength();
	        this.validateContent();
	        this.validateContentLength();
	        return this.validImage && this.validName && this.validNameLength && this.validContent && this.validContentLength;
	    },
	    validateImage: function() {
	        if(this.hasImage) {
	            this.validImage = true;
	        } else {
	            this.validImage = false;
	        }
	    },
	    validateName: function() {
	        var name = $("#image_name").val();
	        if(name === null || name === undefined || name.trim() ==="") {
	            this.validName = false;
	        } else {
	            this.validName = true;
	        }
	    },
	    validateNameLength : function() {
	    	 var name = $("#image_name").val();
	        if(name.length>=255) {
	            this.validNameLength = false;
	        } else {
	            this.validNameLength = true;
	        }
	    },
	    validateContent : function() {
	        var content = $("#image_content").val();
	        if(content === null || content === undefined || content.trim() ==="") {
	            this.validContent = false;
	        } else {
	            this.validContent = true;
	        }
	    },
	    validateContentLength: function() {
	    	var content = $("#image_content").val();
	        if(content.length>=255) {
	            this.validContentLength = false;
	        } else {
	            this.validContentLength = true;
	        }
	    },
	    addImage: function (e) {
	        var self = this;
	        e.preventDefault();
	        if (this.validateForm()) {
	            var formData = new FormData();
	            formData.append("id", $("#image_id").val());
	            formData.append("image", self.$refs['app_image_using'].getSelectedFile());
	            formData.append("title", $("#image_name").val());
	            formData.append("description", $("#image_content").val());
	            $.ajax({
	                type: "POST",
	                url: "/api/v1/app/" + appId + "/imageUsing/update",
	                data: formData,
	                contentType:false,
	                processData: false,
	                dataType: "json",
	                beforeSend: function () {
	                    self.$refs["loader"].show();
	                },
	                success: function (response) {
	                	if(response.status.code==1000){
	                		self.updateForm(response.data);
	                		 window.alert.show("success", "成功", 3000);
	                		 self.$refs["loader"].hide();
	                	}
	                }
	            })
	        }
	    }
	  },
	  mounted: function () {
		  var self=this;
		  $.ajax({
	            type: "GET",
	            url: "/api/v1/app/"+appId+"/imageUsing",
	            error: function (xhr, ajaxOptions, thrownError) {
	            },
	            success: function (response) {
	            	self.updateForm(response);
	            }
		   })
		   
		   $(".remove-image-icon").on('click',function(){
			   self.hasImage=false;
		   })
		   
		   $(self.$el).find(".file-input").change(function (e) {
           	if( self.$refs['app_image_using'].hasImage == true){
           		self.hasImage=true;
           		self.validImage=true;
           	}else{
           		self.validImage=false;
           	}
           });
		   
	  }
	})



});
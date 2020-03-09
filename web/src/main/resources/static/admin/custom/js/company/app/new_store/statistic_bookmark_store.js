$(document).ready(function () {
	
	var appId = $("#app_id").val();
	
	var firstStoreId = $("#first_store_id").val();
	var firstStoreName = $("#first_store_name").val();
	var storeIds = []; 
	storeIds.push(firstStoreId); 
	
	
	var firstStoreSelected = '<span class="store-selected" id="'+firstStoreId+'" >'+firstStoreName+'<i class="fa fa-remove remove-store" id="'+firstStoreId+'"></i></span>';
	$("#group_store_selected").html(firstStoreSelected);
	$("#select_store option[id='"+firstStoreId+"']").prop("selected", true);
	
	$("#select_store").change(function() {
		var value = $(this).val();
		if (value == 'all') {
			$(".store-selected").remove();
			var storeSelected = '<span class="store-selected" id="all_store_selected">All<i class="fa fa-remove remove-store" id="0"></i></span>'
			$("#group_store_selected").html(storeSelected);
			storeIds = ['0'];
			StatisticBookmarkStoreTable.ajax.reload();
			$("#checkbox_all_user_bookmark").prop("checked", false);
		} else {
			if (validateStore(value)) {
				$("#all_store_selected").remove();
				var id = $("#select_store option:selected").attr('id');
				$('<span class="store-selected" id="'+id+'">'+value+'<i class="fa fa-remove remove-store" id="'+id+'"></i></span>').insertBefore($("#select_store"));
				storeIds= [];
				$(".store-selected").each(function () {
					var storeId = $(this).attr('id');
					storeIds.push(storeId);
					StatisticBookmarkStoreTable.ajax.reload();
					$("#checkbox_all_user_bookmark").prop("checked", false);
				});
			} else {
                window.alert.show("error", "This store has been selected", 1500);
            }
		}
	});
	
	 let validateStore = function (storeName) {
	        let boolean = true;
	        $(".store-selected").each(function () {
	            let text = $(this)[0].innerText;
	            if (text === storeName) {
	                boolean = false;
	            }
	        })
	        return boolean;
	    }
	
	$(document).on("click", ".remove-store", function() {
		var removeStoreId = $(this).attr('id');
		$(this).parent().remove();
		storeIds= [];
		$(".store-selected").each(function () {
			var storeId = $(this).attr('id');
			storeIds.push(storeId);
			StatisticBookmarkStoreTable.ajax.reload();
		});
	})
	
    jQuery.get("/api/v1/web/" + appId + "/newStore/getListStoreToStatistic", function (response) {
		response.data.forEach(function (store) {
			if(store.storeId != firstStoreId) {
				var html = '<option value="'+store.storeName+'" id="'+store.storeId+'">'+store.storeName+'</option>'
		        $("#select_store").append(html);
			}
        })
    });
	
	var getStoreBookmarkDto = function (requestData, renderFunction) {
		var sortField = "id";
        var sortDir = requestData.order[0].dir;
        var params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
            "sortField": sortField,
            "sortDir": sortDir,
            "storeIds" : storeIds.toString()
        };
        window.loader.show();

        jQuery.get("/api/v1/web/" + appId + "/newStore/statisticBookmarkStorePage", params, function (response) {
        	if (response !=null && response != "") {
        		var content = {
                        "draw": requestData.draw,
                        "recordsTotal": response.totalElements,
                        "recordsFiltered": response.totalElements,
                        "data": response.content
                    };
                    renderFunction(content);
        	} else {
        		var content = {
                        "draw": requestData.draw,
                        "recordsTotal": 0,
                        "recordsFiltered": 0,
                        "data": ""
                    };
                    renderFunction(content);
        	}
        	$("#number_user_bookmark").html(response.totalElements + "お気に入った会員")
        	$("#to_number_user").html(response.totalElements)
        	window.loader.hide();
        });
    };

    var columnDefinitions = [
            {"data": null, "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
            {"data": "storeName","orderable": true, "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
            {"data": "memberCode", "orderable": true, "defaultContent": "<i>データなし</i>"},
            {"data": "createdTime", "orderable": true, "defaultContent": "<i>データなし</i>"}
        ]
    ;

   StatisticBookmarkStoreTable = $("#statistic_bookmark_store_table").DataTable({
            "language": {
                "url": "/libs/new_data_table/js/ja.json"
            },
            "lengthMenu": [[10, 50, 100], [10, 50, 100]],
            rowId: 'id',
            "ordering": true,
            "order": [1, "asc"],
            "serverSide": true,
            "bFilter": false,
            "bInfo": true,
            "bLengthChange": true,
            "columns": columnDefinitions,
            "ajax": function (requestParams, callback) {
                getStoreBookmarkDto(requestParams, callback);
            },
            columnDefs: [
                {
                    "render": function (data) {
                        return '<label class="checkbox-container"><input type="checkbox" class="checkbox_user_bookmark" id="'+data.memberCode+'" value="' + data.storeName + '">' + '<span class="checkbox"></span></label>';
                    },
                    "targets": 0
                }],
                "drawCallback": function () {
                }
        });
	
//dl file csv userIds
   $("#checkbox_all_user_bookmark").change(function () {
       $(".checkbox_user_bookmark").prop('checked', $(this).prop("checked"));
   });
   
   $(document).on("click", "#btn_download_file_csv", function() {
	   var memberCodes = [];
	   var storeNames = [];
	   var storeIds = [];
	   $(".checkbox_user_bookmark").each(function () {
           if (this.checked) {
        	   storeNames.push($(this).val());
        	   var memberCode = $(this).attr('id');
        	   memberCodes.push(memberCode);
           }
       })
       
       $(".store-selected").each(function() {
    	  var storeId = $(this).attr('id');
    	  storeIds.push(storeId)
       })
	   
        if (memberCodes.length == 0) {
        	if(storeIds.length == 0) {
        		window.alert.show("error", "店舗を選択してください。", 2000);
        		return;
        	} else {
        		if(storeIds.toString() == "all_store_selected" ) {
            		let href = "/api/v1/web/" + appId + "/newStore/exportFileCSVMemberCode?typeDownload=1&storeIds=0";
                    downloadFile(href)
            	} else {
            		let href = "/api/v1/web/" + appId + "/newStore/exportFileCSVMemberCode?typeDownload=1&storeIds=" + storeIds.toString();
                    downloadFile(href)
            	}
        	}
       } else {
           let href = "/api/v1/web/" + appId + "/newStore/exportFileCSVMemberCode?typeDownload=2&memberCodes=" + memberCodes.toString() + "&storeNames=" + storeNames.toString();
           downloadFile(href)
       }
   });
   
   let downloadFile = function (url) {
       window.loader.show();
       let request = new XMLHttpRequest();
       request.open('GET', url, true);
       request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
       request.responseType = 'blob';

       request.onload = function () {
           let blob = this.response;
           let fileName = request.getResponseHeader("filename");
           if (window.navigator.msSaveOrOpenBlob) {
               window.navigator.msSaveBlob(blob, fileName);
           } else {
               let downloadLink = window.document.createElement('a');
               let contentTypeHeader = request.getResponseHeader("Content-Type");
               downloadLink.href = window.URL.createObjectURL(new Blob([blob], {type: contentTypeHeader}));
               downloadLink.download = fileName;
               document.body.appendChild(downloadLink);
               downloadLink.click();
               document.body.removeChild(downloadLink);
           }
           window.loader.hide();
       };
       request.send();
   }
   
});
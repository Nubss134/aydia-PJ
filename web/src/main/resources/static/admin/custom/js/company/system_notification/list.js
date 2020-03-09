SystemNoti= {};
var sizeSystemNoti = 10;
var keyword = "";

$(document).ready(function () {
	var format = "YYYY/MM/DD HH:mm";
      
    SystemNoti.renderSystemNoti = function (size, keyword) {
        var total;
        jQuery.get("/api/v1/web/system/notification/listForCompany?page=1" + "&size=" +size + "&keyword=" + keyword, function (response) {
            var total;
            if (response.data.totalElements % size == 0) {
                total = Math.floor(response.data.totalElements / size);
            } else {
                total = Math.floor(response.data.totalElements / size) + 1;
            }
            var visible;
            if (total < 10) {
                visible = total;
            } else {
                visible = 10;
            }
            $('#pagination').twbsPagination({
                totalPages: total == 0 ? 1 : total,
                visiblePages: visible,
                onPageClick: function (event, page) {
                	getListSystemNoti(page, sizeSystemNoti, keyword);
                }
            }).on('page', function (event, page) {
            });
        })

    }
    
    SystemNoti.renderSystemNoti(sizeSystemNoti, keyword);
    
    function getListSystemNoti(page, size, keyword) {
        $("#list_system_noti_wrapper .list_system_noti_item").remove();
        jQuery.get("/api/v1/web/system/notification/listForCompany?page=" + page + "&size=" + size + "&keyword=" + keyword, function (response) {
        	if (response.data.content.length != 0) {
                systemNotis = response.data.content;
                for (var i = 0; i < systemNotis.length; i++) {
                    var systemNoti = systemNotis[i];
                    var html = SystemNoti.createSystemNoti(systemNoti);
                    $("#list_system_noti_wrapper").append(html);
                }
            }
        });

    }
    
    $("#select_number_system_noti").change(function () {
        var size = $(this).val();
        var keyword = $("#input_search").val();
        var total;
        jQuery.get("/api/v1/web/system/notification/listForCompany?page=1" + "&size=" + size + "&keyword=" + keyword , function (response) {
        	
            var total;
            if (response.data.totalElements % size == 0) {
                total = Math.floor(response.data.totalElements / size);
            } else {
                total = Math.floor(response.data.totalElements / size) + 1;
            }
            var visible;
            if (total < 10) {
                visible = total;
            } else {
                visible = 10;
            }
            $("#list_system_noti_wrapper .list_system_noti_item").remove();
            if (response.data.content.length != 0) {
                systemNotis = response.data.content;
                for (var i = 0; i < systemNotis.length; i++) {
                    var systemNoti = systemNotis[i];
                    var html = SystemNoti.createSystemNoti(systemNoti);
                    $("#list_system_noti_wrapper").append(html);                           
                }
            }
            $('#pagination').twbsPagination('destroy');
            $('#pagination').twbsPagination({
                totalPages: total == 0 ? 1 : total,
                visiblePages: visible,
                onPageClick: function (event, page) {
                	getListSystemNoti(page, size, keyword);
                }
            }).on('page', function (event, page) {
            });
        })
        
    });
    
    SystemNoti.createSystemNoti = function (systemNoti) {
        var endTime;
        if (systemNoti.endTime.includes("9999")) {
            endTime = "無期限"
        } else {
            endTime = moment(systemNoti.endTime).format(format);
        }
        var listFileEntity = [];
        if (systemNoti.fileUploadSystemNotificationEntity != null) {
	        if (systemNoti.fileUploadSystemNotificationEntity.length != 0) {
	            systemNoti.fileUploadSystemNotificationEntity.forEach(function (e) {
	            	if (e.deleted == false) {
	            		var label = "<label class='selected-file'>" +
				                    "  <i class='fa fa-paperclip' style='margin-right: 10px'></i>" +
				                    "  <a href='/downloadSystemNotificationFile?id=" + e.fileUploadEntity.id + "' id='" + e.id + "' target='_blank'>" + e.fileUploadEntity.fileName + "</a>" +
				                    "</label>"
	                    listFileEntity.push(label)
	            	} 
	            })
	        }
        }
        var colorImportant = "";
        var labelImportant = "";
        if (systemNoti.type == 1) {
            colorImportant = systemNoti.color;
            labelImportant = "<span style='margin-left: 15px; padding: 7px; width: 50px;' class='badge badge-danger'>重要</span>"
        }

        return "<div class='list_system_noti_item' style='border-color: " + colorImportant + "' id='systemNoti_" + systemNoti.id + "'>" +
            "       <div class='info_wrapper' style='padding: 10px; '>" +
            "           <div data-toggle='collapse' data-target='#content_"+ systemNoti.id +"' style='border-bottom: solid 1px #cecece;margin-bottom: 10px; padding-bottom: 5px; cursor: pointer'>" +
            "               <span class='systemNoti-title' >" + systemNoti.title + "</span>" + labelImportant +
            "           </div>" +
            "		<div id='content_"+ systemNoti.id +"'>" +
            "           <div class='systemNoti-content' data-toggle='tooltip' data-placement='top' title='" + systemNoti.content + "'>" + systemNoti.content + "</div>" +
            "               <div style='display: flex'>" +
            "                   <div style='flex: 7'>" + replaceAll(listFileEntity.toString(),',','') + "</div>" +
            "                    <div style='flex:2;position: relative'>" +
            "                       <div style='color: #3B4351; font-style: italic;position: absolute; bottom: 0px; right: 0px;'>" +
            "                           <div class='notification-time systemNoti-start-time'>開始時間: " + moment(systemNoti.startTime).format(format) + "</div>" +
            "                           <div class='notification-time systemNoti-end-time'>終了時間: " + endTime + "</div>" +
            "                       </div>"+
            "                    </div>" +
            "               </div>" +
            "           </div>" +
            " 		</div>" +
            "   </div>";
    }
    
    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
    
    $("#btn_search").click(function() {
        var size = $("#select_number_system_noti option:selected").val();
        var keyword = $("#input_search").val();
        var total;
        jQuery.get("/api/v1/web/system/notification/listForCompany?page=1" + "&size=" + size + "&keyword=" + keyword , function (response) {
        	
            var total;
            if (response.data.totalElements % size == 0) {
                total = Math.floor(response.data.totalElements / size);
            } else {
                total = Math.floor(response.data.totalElements / size) + 1;
            }
            var visible;
            if (total < 10) {
                visible = total;
            } else {
                visible = 10;
            }
            $("#list_system_noti_wrapper .list_system_noti_item").remove();
            if (response.data.content.length != 0) {
                systemNotis = response.data.content;
                for (var i = 0; i < systemNotis.length; i++) {
                    var systemNoti = systemNotis[i];
                    var html = SystemNoti.createSystemNoti(systemNoti);
                    $("#list_system_noti_wrapper").append(html); 
                }
            }
            $('#pagination').twbsPagination('destroy');
            $('#pagination').twbsPagination({
                totalPages: total == 0 ? 1 : total,
                visiblePages: visible,
                onPageClick: function (event, page) {
                	getListSystemNoti(page, size, keyword);
                }
            }).on('page', function (event, page) {
            });
        })
        
    
    });  
 
})
;
	var MapUtils = {};
	MapUtils.createMap = function(renderElement,zoom,lat,lng){
	if(renderElement === undefined && zoom === undefined){
		console.error("Invalid param");
	}
	 var options = {
	            zoom : 14,
	            mapTypeId : 'Styled',
	            disableDefaultUI: true,
	            mapTypeControlOptions : {
	                mapTypeIds : [ 'Styled' ]
	            }
	 };
	 var styles =
	  [
	     {
	        stylers : [ {
	            hue : "#cccccc"
	        }, {
	            saturation : -100
	        }]
	    }, 
	    {
	        featureType : "road",
	        elementType : "geometry",
	        stylers : [ {
	            lightness : 100
	        }, {
	            visibility : "simplified"
	        }]
	    }, 
	    {
	        featureType : "road",
	        elementType : "labels",
	        stylers : [ {
	            visibility : "on"
	        }]
	    },
	    {
	        featureType: "poi",
	        stylers: [ {
	            visibility: "off"
	        }]
	    }
	  ];
	 
	  
	  var map = new google.maps.Map(renderElement, options);
  
	   var styledMapType = new google.maps.StyledMapType(styles, {
	   		 name : 'Styled'
	   });
	
	  map.mapTypes.set('Styled', styledMapType);
	  if(lat !== undefined && lng !== undefined){
		  map.setCenter(new google.maps.LatLng(lat,lng));
	  }
	 
	  map.setZoom(zoom);
	
	  return map;
	
	}
function success(position) {
  var s = document.querySelector('#status');
 
  if (s.className == 'success') {
    return;
  }
 
  s.innerHTML = "Here you are!!";
  s.className = 'success';
 
  var mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcanvas';
  mapcanvas.style.height = '400px';
  mapcanvas.style.width = '560px';
 
  document.querySelector('article').appendChild(mapcanvas);
 
  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeControl: false,
    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
 
  var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title:"You are here!"
  });
}
 
function error(msg) {
  var s = document.querySelector('#status');
  s.innerHTML = typeof msg == 'string' ? msg : "failed";
  s.className = 'fail';
 
  // console.log(arguments);
}
 
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  error('not supported');
}
function init(){
    
    var get_location = document.getElementById("get_location");
    get_location.addEventListener("click", getLocation, false);

}
function getLocation(e){
    navigator.geolocation.getCurrentPosition(gotPosition);
}

function gotPosition(obj){
    console.log(obj);
    var s = document.createElement("script");
    s.src = "https://api.foursquare.com/v2/venues/search?ll="+obj.coords.latitude+","+obj.coords.longitude+"&oauth_token=2C5ROCQKSS51O5LKBLWGFGIOYCKGBLAJBD5P53ANDCTVUHDP&v=20120327&callback=gotFoursquareData";
    console.log(s.src);
    console.log('testing 123');
    document.body.appendChild(s);
} 

function gotFoursquareData(json){
    console.log(json);
    var venuesDiv = document.getElementById("venues");
    var html = "";
    for (var i = 0; i < json.response.venues.length; i++){
        var venue = json.response.venues[i];
        html += "<div>"+venue.name+"</div>";
    }
    venuesDiv.innerHTML = html;
} 
   // get store.
   var map;
      var infowindow;

      function initialize() {
        var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
        
    
        
map = new google.maps.Map(document.getElementById('map'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: pyrmont,
          zoom: 15
        });


        var request = {
          location: pyrmont,
          radius: 500,
          types: ['store']
        };
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.search(request, callback);
      }

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      window.addEventListener("load", init, false);

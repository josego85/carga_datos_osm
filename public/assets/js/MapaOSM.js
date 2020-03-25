var mapa = null;

function cargarMapa()
{
	// Asuncion - Paraguay.
	var longitud = -57.6309129;
	var latitud = -25.2961407;
	var marcador = null;
	var zoom = 12;
	var minZoom = 6;
	var maxZoom = 18;

	mapa = new L.map('mapa',
    {
        center: [latitud, longitud],
        minZoom: minZoom,
		maxZoom: maxZoom,
		zoom: zoom,
        scrollWheelZoom: false,
        fullscreenControl: true,
        fullscreenControlOptions:
        {
            position: 'topleft'
        }
    });

	// Humanitarian Style.
	var url = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
	L.tileLayer(url,
	{
		maxZoom: 18,
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
          'OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
	}).addTo(mapa);
	
    marcador = new L.marker([latitud, longitud], {
		id: 'vendor', 
	    draggable: 'true'
	});
    mapa.addLayer(marcador);

    marcador.on("dragend", function(e) {
        var marker = e.target;
        var position = marker.getLatLng();
        var lat = position.lat;
        var lng = position.lng;
        var lat_lng = new L.LatLng(lat, lng);

        marker.setLatLng(lat_lng,
        {
            draggable: 'true'
        });
        mapa.panTo(lat_lng);

        document.getElementById('user_lat').value = lat;
        document.getElementById('user_lng').value = lng;
    });
}
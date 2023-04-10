import { useState, useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./MapBox.scss";
import "mapbox-gl/dist/mapbox-gl.css";
// import "mapbox-gl-controls/lib/controls.css";

mapboxgl.accessToken =
    "pk.eyJ1IjoibWFuam90dmlyZGkiLCJhIjoiY2xnNWdhY3o4MDJxdTNybnN6Yjhsd3JxZCJ9.Bu9GfHhm_CPCenoVbXASKg";

function MapBox({ postData }) {
    const mapContainer = useRef(null);
    // const map = useRef(null);
    const [lng, setLng] = useState(-87.65);
    const [lat, setLat] = useState(41.84);
    const [zoom, setZoom] = useState(10);
    const [geoData, setGeoData] = useState(true);

    console.log("single post data: ", postData);

    //initialize the map
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v11",
            center: [lng, lat],
            zoom: zoom,
        });

        // Create default markers
        const bounds = new mapboxgl.LngLatBounds();

        postData.imageInfo.map((image) => {
            if (image.latitude && image.longitude) {
                const marker = new mapboxgl.Marker().setLngLat([image.longitude, image.latitude]).addTo(map);
                const popup = new mapboxgl.Popup().setHTML("<h3>" + image.title + "</h3>");
                marker.setPopup(popup);

                // Set the marker's CSS property to 'pointer'
                marker.getElement().style.cursor = "pointer";

                //Extend the bounds object with each LngLat coordinate
                bounds.extend(marker.getLngLat());
            }
        });

        //Fit the map to the bounds of the markers
        if (Object.keys(bounds).length > 0) {
            map.fitBounds(bounds, {
                padding: 50,
            });
        } else {
            setGeoData(false);
        }
    }, []);
    //hello
    return (
        <>
            {geoData ? (
                <div className="map-content-container">
                    {/* <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div> */}
                    <div ref={mapContainer} className="map-container"></div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default MapBox;

import { useState, useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./MapBox.scss";
import "mapbox-gl/dist/mapbox-gl.css";

//Component to render map

//access token for Mapbox GL JS API
mapboxgl.accessToken =
    "pk.eyJ1IjoibWFuam90dmlyZGkiLCJhIjoiY2xnNWdhY3o4MDJxdTNybnN6Yjhsd3JxZCJ9.Bu9GfHhm_CPCenoVbXASKg";

function MapBox({ postData }) {
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(-123.14040382935566);
    const [lat, setLat] = useState(49.2991038327124);
    const [zoom, setZoom] = useState(10);
    const [geoData, setGeoData] = useState(true);

    //initialize the map
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v11",
            center: [lng, lat],
            zoom: zoom,
        });

        //Initialize bounds object; used to set map to bounds of the location data
        const bounds = new mapboxgl.LngLatBounds();

        // Create default markers
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
            return null; //only adding markers and not modifying original array, therefore returning null after markers/popups added
        });

        //Fit the map to the bounds of the markers; if no markers added, set geo data to false and no map is rendered
        if (Object.keys(bounds).length > 0) {
            map.fitBounds(bounds, {
                padding: 50,
            });
        } else {
            setGeoData(false);
        }
    }, []);

    return (
        <>
            {geoData ? (
                <div className="map-content-container">
                    <div ref={mapContainer} className="map-container"></div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default MapBox;

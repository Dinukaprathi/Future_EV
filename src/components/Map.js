import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon
const chargingStationIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2511/2511642.png", // Replace with your desired icon URL
    iconSize: [40, 40], // Adjust size of the icon
    iconAnchor: [20, 40], // Anchor point of the icon
    popupAnchor: [0, -40], // Position of the popup relative to the marker
});

const Map = () => {
    const sriLankaCenter = [7.8731, 80.7718]; // Coordinates for Sri Lanka

    // List of charging station locations
    const chargingStations = [
        { id: 1, name: "Colombo Charging Station", lat: 6.9271, lng: 79.8612 },
        { id: 2, name: "Kandy Charging Station", lat: 7.2906, lng: 80.6337 },
        { id: 3, name: "Galle Charging Station", lat: 6.0535, lng: 80.2210 },
        { id: 4, name: "Jaffna Charging Station", lat: 9.6615, lng: 80.0255 },
        { id: 5, name: "Trincomalee Charging Station", lat: 8.5874, lng: 81.2152 },
    ];

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <MapContainer center={sriLankaCenter} zoom={8} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {chargingStations.map((station) => (
                    <Marker
                        key={station.id}
                        position={[station.lat, station.lng]}
                        icon={chargingStationIcon}
                    >
                        <Popup>{station.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;

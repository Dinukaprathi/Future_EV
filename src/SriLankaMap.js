import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./Srilankamap.css"; // Import the external CSS file

// Custom marker icon for charging stations
const chargingStationIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2511/2511642.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

// Custom marker icon for user location
const userLocationIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/483/483354.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

// Distance calculation function
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Component for setting map view dynamically
const SetViewOnClick = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
        if (lat && lng) {
            map.setView([lat, lng], 10);
        }
    }, [lat, lng, map]);
    return null;
};

const SriLankaMap = () => {
    const sriLankaCenter = [7.8731, 80.7718];
    const chargingStations = [
        { id: 1, name: "Colombo Charging Station", lat: 6.9271, lng: 79.8612, chargerType: "Fast", estimatedTime: "40 minutes" },
        { id: 2, name: "Kandy Charging Station", lat: 7.2906, lng: 80.6337, chargerType: "Slow", estimatedTime: "6 hour" },
        { id: 3, name: "Galle Charging Station", lat: 6.0535, lng: 80.221, chargerType: "Fast", estimatedTime: "40 minutes" },
        { id: 4, name: "Jaffna Charging Station", lat: 9.6615, lng: 80.0255, chargerType: "Slow", estimatedTime: "6 hours" },
        { id: 5, name: "Trincomalee Charging Station", lat: 8.5874, lng: 81.2152, chargerType: "Fast", estimatedTime: "40 minutes" },
    ];

    const [userLocation, setUserLocation] = useState(null);
    const [selectedStation, setSelectedStation] = useState(null);
    const [distance, setDistance] = useState(null);
    const [route, setRoute] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error("Error fetching user location:", error);
            }
        );
    }, []);

    const handleMapClick = (event) => {
        const { lat, lng } = event.latlng;
        setUserLocation({ lat, lng });
    };

    const handleStationSelect = (station) => {
        setSelectedStation(station);
        if (userLocation) {
            const dist = calculateDistance(
                userLocation.lat,
                userLocation.lng,
                station.lat,
                station.lng
            );
            setDistance(dist.toFixed(2));
            fetchRoute(userLocation, station);
        }
    };

    const fetchRoute = (userLocation, station) => {
        const origin = `${userLocation.lat},${userLocation.lng}`;
        const destination = `${station.lat},${station.lng}`;
        const googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY";

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${googleMapsApiKey}`;

        axios
            .get(url)
            .then((response) => {
                if (response.data.routes.length > 0) {
                    const routeData = response.data.routes[0].overview_polyline.points;
                    const decodedRoute = decodePolyline(routeData);
                    setRoute(decodedRoute);
                }
            })
            .catch((error) => {
                console.error("Error fetching route from Google Maps API:", error);
            });
    };

    const decodePolyline = (encoded) => {
        let index = 0;
        const len = encoded.length;
        const decoded = [];
        let lat = 0;
        let lng = 0;

        while (index < len) {
            let shift = 0;
            let result = 0;
            let byte;

            do {
                byte = encoded.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            } while (byte >= 0x20);

            const dLat = result & 0x1f;
            lat += (dLat < 0x10 ? dLat : dLat - 0x20);
            shift = 0;

            do {
                byte = encoded.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            } while (byte >= 0x20);

            const dLng = result & 0x1f;
            lng += (dLng < 0x10 ? dLng : dLng - 0x20);

            decoded.push([lat / 1e5, lng / 1e5]);
        }
        return decoded;
    };

    const handleStartNavigation = () => {
        if (userLocation && selectedStation) {
            const startCoords = `${userLocation.lat},${userLocation.lng}`;
            const endCoords = `${selectedStation.lat},${selectedStation.lng}`;
            const url = `https://www.google.com/maps/dir/?api=1&origin=${startCoords}&destination=${endCoords}`;
            window.open(url, "_blank");
        }
    };

    return (
        <Box className="map-container">
            <Typography variant="h4" align="center" gutterBottom>
                Sri Lanka Map with Charging Stations
            </Typography>

            <MapContainer
                center={sriLankaCenter}
                zoom={8}
                className="map"
                whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
                onClick={handleMapClick}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
                        <Popup>Your Location</Popup>
                    </Marker>
                )}

                {chargingStations.map((station) => (
                    <Marker
                        key={station.id}
                        position={[station.lat, station.lng]}
                        icon={chargingStationIcon}
                        eventHandlers={{
                            click: () => handleStationSelect(station),
                        }}
                    >
                        <Popup>{station.name}</Popup>
                    </Marker>
                ))}

                {route && (
                    <Polyline
                        positions={route}
                        color="blue"
                        weight={4}
                        opacity={0.7}
                    />
                )}

                {selectedStation && (
                    <SetViewOnClick lat={selectedStation.lat} lng={selectedStation.lng} />
                )}
            </MapContainer>

            <Container className="station-info-container">
                {selectedStation && (
                    <Paper className="station-info-paper">
                        <Typography variant="h6" className="station-title">
                            {selectedStation.name}
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" className="station-info">
                                    <strong>Distance:</strong> {distance} km
                                </Typography>
                                <Typography variant="body1" className="station-info">
                                    <strong>Charger Type:</strong> {selectedStation.chargerType}
                                </Typography>
                                <Typography variant="body1" className="station-info">
                                    <strong>Estimated Charging Time:</strong> {selectedStation.estimatedTime}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleStartNavigation}
                                    className="navigation-button"
                                >
                                    Start Navigation
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
            </Container>
        </Box>
    );
};

export default SriLankaMap;

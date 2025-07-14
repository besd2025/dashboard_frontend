"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  Tooltip,
  LayersControl, // Ajoutez ceci
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

function FlyToOnSelect({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom, { duration: 1.5 });
    }
  }, [position, zoom, map]);
  return null;
}

function MapComponent({ data = [], onMarkerClick }) {
  const [geoData, setGeoData] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredHangars, setFilteredHangars] = useState([]);
  const [selectedHangar, setSelectedHangar] = useState(null);
  const [center, setCenter] = useState([-3.3896077, 29.9255829]);
  const mapRef = useRef();

  useEffect(() => {
    setMounted(true);
    fetch("/data/Burundi-map.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredHangars([]);
    } else {
      setFilteredHangars(
        data.filter((h) => h.name.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }, [search, data]);

  if (!mounted) return null;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Barre de recherche */}
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          top: 10,
          left: 10,
          width: 300,
        }}
      >
        <input
          type="text"
          placeholder="Rechercher un hangar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
        {filteredHangars.length > 0 && (
          <ul
            style={{
              background: "white",
              border: "1px solid #ccc",
              borderRadius: 4,
              margin: 0,
              padding: 0,
              listStyle: "none",
              maxHeight: 200,
              overflowY: "auto",
            }}
          >
            {filteredHangars.map((h, idx) => (
              <li
                key={idx}
                style={{ padding: 8, cursor: "pointer" }}
                onClick={() => {
                  setSelectedHangar(h);
                  setSearch("");
                  setFilteredHangars([]);
                }}
              >
                {h.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <MapContainer
        center={center}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        {selectedHangar && (
          <FlyToOnSelect
            position={[selectedHangar.latitude, selectedHangar.longitude]}
            zoom={15} // ou le zoom que vous souhaitez
          />
        )}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Carte Standard">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Vue Satellite">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </LayersControl.BaseLayer>
        </LayersControl>
        {/* Markers for each hangar */}
        {data.map((hangar, idx) => (
          <Marker
            key={idx}
            position={[hangar.latitude, hangar.longitude]}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              },
              click: () => {
                if (onMarkerClick) onMarkerClick(hangar);
              },
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -10]}
              opacity={1}
              permanent={false}
            >
              {hangar.name}
            </Tooltip>
          </Marker>
        ))}
        {geoData && (
          <GeoJSON
            data={geoData}
            style={() => ({ color: "none", fillOpacity: 0, opacity: 0.3 })}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default MapComponent;

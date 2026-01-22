import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getPhotoMetadata } from '../../hooks/useMetadata';
import L from 'leaflet';

// Fix for default marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const UrbanIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to handle map searching/flying
const MapController = ({ searchQuery, randomTrigger, photos }) => {
    const map = useMap();

    useEffect(() => {
        if (!searchQuery || !photos.length) return;

        const q = searchQuery.toLowerCase();
        const found = photos.find(p =>
            p.area.toLowerCase().includes(q) ||
            p.city.toLowerCase().includes(q)
        );

        if (found) {
            map.flyTo([found.gps.lat, found.gps.lng], 12, { duration: 2 });
        }
    }, [searchQuery, map, photos]);

    useEffect(() => {
        if (randomTrigger === 0 || !photos.length) return;

        const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
        if (randomPhoto) {
            map.flyTo([randomPhoto.gps.lat, randomPhoto.gps.lng], 14, {
                duration: 2.5,
                easeLinearity: 0.25
            });
        }
    }, [randomTrigger, map, photos]);

    return null;
};

const GlobalMapView = ({ searchQuery, randomTrigger }) => {
    const [dynamicPhotos, setDynamicPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Dynamically discover photos from the public directory
    // Note: We use the relative path from the perspective of this source file
    const photoModules = import.meta.glob('/public/assets/photos/*.{jpg,png,jpeg}');

    useEffect(() => {
        const loadPhotos = async () => {
            setIsLoading(true);
            const loadedMetadata = [];

            for (const path in photoModules) {
                // Use import.meta.env.BASE_URL to handle subfolder deployments like GitHub Pages
                const browserUrl = path.replace('/public', import.meta.env.BASE_URL).replace('//', '/');
                const metadata = await getPhotoMetadata(browserUrl);
                if (metadata) {
                    loadedMetadata.push(metadata);
                }
            }

            setDynamicPhotos(loadedMetadata);
            setIsLoading(false);
        };

        loadPhotos();
    }, []);

    const stats = useMemo(() => {
        const uniqueCities = new Set(dynamicPhotos.map(p => p.city));
        return {
            total: dynamicPhotos.length,
            cities: uniqueCities.size
        };
    }, [dynamicPhotos]);

    const groupedPhotos = useMemo(() => {
        const groups = {};
        dynamicPhotos.forEach(photo => {
            const key = `${photo.gps.lat.toFixed(4)},${photo.gps.lng.toFixed(4)}`;
            if (!groups[key]) {
                groups[key] = {
                    coords: [photo.gps.lat, photo.gps.lng],
                    city: photo.city,
                    photos: []
                };
            }
            groups[key].photos.push(photo);
        });
        return Object.values(groups);
    }, [dynamicPhotos]);

    if (isLoading) {
        return <div className="loading-overlay">Scanning cityscape fragments...</div>;
    }

    return (
        <div className="map-view-container" style={{ height: '100%', width: '100%' }}>
            <MapContainer
                center={[30, 0]}
                zoom={3}
                zoomControl={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                />

                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
                    className="map-labels-layer"
                    pane="markerPane"
                />

                <MapController searchQuery={searchQuery} randomTrigger={randomTrigger} photos={dynamicPhotos} />

                {groupedPhotos.map((group, idx) => (
                    <Marker
                        key={idx}
                        position={group.coords}
                        icon={UrbanIcon}
                    >
                        <Popup className="urban-popup">
                            <div className="map-popup-group">
                                <div
                                    className="popup-scroll-container"
                                    onWheel={(e) => e.stopPropagation()}
                                    onTouchStart={(e) => e.stopPropagation()}
                                >
                                    {group.photos.map((photo, pIdx) => (
                                        <div key={pIdx} className="popup-slide">
                                            <div className="image-placeholder">
                                                <img
                                                    src={photo.url}
                                                    alt={photo.area}
                                                    className="map-popup-image"
                                                    loading="lazy"
                                                    draggable="false"
                                                />
                                            </div>
                                            <div className="popup-meta">
                                                <h4 className="photo-title">{photo.area}</h4>
                                                <p className="photo-location">{photo.city}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {group.photos.length > 1 && (
                                    <div className="popup-count">
                                        Slide to view {group.photos.length} perspectives
                                    </div>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <div className="stats-overlay">
                <div className="stat-card">
                    <span className="stat-value">{stats.total}</span>
                    <span className="stat-label">Captures</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{stats.cities}</span>
                    <span className="stat-label">Cities</span>
                </div>
            </div>
        </div>
    );
};

export default GlobalMapView;


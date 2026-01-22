import exifr from 'exifr';

// Initialize cache from localStorage if available
const CACHE_KEY = 'urban_clicks_geo_cache';
let GEO_CACHE = new Map();

try {
    const saved = localStorage.getItem(CACHE_KEY);
    if (saved) {
        GEO_CACHE = new Map(JSON.parse(saved));
    }
} catch (e) {
    console.warn('Failed to load geo cache', e);
}

const saveCache = () => {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(GEO_CACHE.entries())));
    } catch (e) {
        console.warn('Failed to save geo cache', e);
    }
};

/**
 * Extracts EXIF and performs reverse geocoding with caching + English preference
 */
export const getPhotoMetadata = async (url) => {
    try {
        // 1. Parse EXIF
        const metadata = await exifr.parse(url, true);

        if (!metadata || !metadata.latitude || !metadata.longitude) {
            return null;
        }

        const lat = metadata.latitude;
        const lng = metadata.longitude;
        const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;

        let area = 'Unknown Area';
        let city = 'Unknown City';

        // 2. Check Cache
        if (GEO_CACHE.has(cacheKey)) {
            const cached = GEO_CACHE.get(cacheKey);
            area = cached.area;
            city = cached.city;
        } else {
            // 3. Fetch from Nominatim (Force English)
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=en`, {
                    headers: { 'User-Agent': 'UrbanClicks-App/1.0' }
                });

                if (!res.ok) throw new Error('Geocode failed');

                const data = await res.json();
                const addr = data.address;

                city = addr?.city || addr?.town || addr?.village || addr?.county || 'Unknown City';
                area = addr?.suburb || addr?.neighbourhood || addr?.commercial || addr?.road || addr?.district || 'Unknown Area';

                // Truncate if too long
                if (area.length > 25) area = area.substring(0, 22) + '...';

                // Save to cache
                GEO_CACHE.set(cacheKey, { area, city });
                saveCache();

                // Throttle slightly to be nice to the API if many misses occur
                await new Promise(r => setTimeout(r, 200));

            } catch (geocodeErr) {
                console.warn('Geocoding failed, using fallback', geocodeErr);
            }
        }

        return {
            url,
            gps: { lat, lng },
            area,
            city
        };
    } catch (error) {
        // Silent fail for individual photos to keep app running
        console.error('Error processing photo:', url, error);
        return null;
    }
};

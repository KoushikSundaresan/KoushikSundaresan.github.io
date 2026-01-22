import React, { useState } from 'react';
import GlobalMapView from './components/GlobalMap/GlobalMapView';
import { Search, Info, Sparkles } from 'lucide-react';
import './index.css';

function App() {
    const [showAbout, setShowAbout] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [randomTrigger, setRandomTrigger] = useState(0);

    const handleFeelingLucky = () => {
        setRandomTrigger(prev => prev + 1);
    };

    return (
        <div className="app-container">
            <header className="site-header glass">
                <div className="branding">
                    <h1>Urban Clicks</h1>
                    <p className="subtitle">organically captured real cityscapes and more...</p>
                </div>

                <div className="header-actions">
                    <div className="search-container">
                        <Search size={16} color="#888" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search cities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button
                        className="icon-btn highlight"
                        onClick={handleFeelingLucky}
                        title="I'm Feeling Lucky - Discover a city"
                    >
                        <Sparkles size={18} />
                    </button>

                    <button className="icon-btn" onClick={() => setShowAbout(true)} title="About Urban Clicks">
                        <Info size={18} />
                    </button>
                </div>
            </header>

            <main className="full-view">
                <GlobalMapView searchQuery={searchQuery} randomTrigger={randomTrigger} />
            </main>

            {showAbout && (
                <div className="about-overlay" onClick={() => setShowAbout(false)}>
                    <div className="about-modal glass cinematic-shadow" onClick={e => e.stopPropagation()}>
                        <h2>Urban Clicks</h2>
                        <p>A minimalist gallery exploring global urban environments through a geographic lens.</p>
                        <p>Every photo is organically captured to represent the true essence of cityscapes worldwide.</p>
                        <div style={{ fontSize: '13px', color: '#888', marginTop: '20px' }}>
                            Built with React & Leaflet • 2026
                        </div>
                        <button className="close-btn" onClick={() => setShowAbout(false)}>Close Journey</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";
import RoomCard from "../components/rooms/RoomCard";
import "./Home.css";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    filterRooms();
  }, [rooms, searchTerm, selectedType, maxPrice, sortBy]);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const res = await api.get("/rooms");
      setRooms(res.data || []);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  const filterRooms = () => {
    let filtered = [...rooms];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(room => 
        room.type?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Price filter
    filtered = filtered.filter(room => 
      room.pricePerNight <= maxPrice
    );

    // Sorting
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredRooms(filtered);
  };

  const roomTypes = ["all", ...new Set(rooms.map(r => r.type).filter(Boolean))];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading amazing rooms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Perfect <span className="highlight">Stay</span>
          </h1>
          <p className="hero-subtitle">
            Discover comfortable rooms at unbeatable prices. Book your next adventure today.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="filters-container">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label>Room Type</label>
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              {roomTypes.map(type => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Max Price: ₹{maxPrice}</label>
            <input
              type="range"
              min="0"
              max="1000000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="rooms-section">
        <div className="rooms-header">
          <h2>Available Rooms</h2>
          <p className="results-count">
            {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="no-results">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3>No rooms found</h3>
            <p>Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <div className="rooms-grid">
            {filteredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
import React from "react";

const Filters = ({
  searchTerm,
  selectedIndustry,
  selectedLocation,
  sortBy,
  setSearchTerm,
  setSelectedIndustry,
  setSelectedLocation,
  setSortBy,
  industries,
  locations,
}) => {
  return (
    <div
      className="
        flex flex-col md:flex-row gap-4 mb-8 
        p-4 rounded-xl
        bg-[#08111f] 
        border border-cyan-500/30
        shadow-[0_0_15px_rgba(0,255,255,0.2)]
      "
    >

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search company..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full md:w-1/3 p-3
          rounded-lg
          bg-[#020c1b] text-cyan-200 placeholder-cyan-400/40
          border border-cyan-500/30
          focus:outline-none focus:ring-2 focus:ring-cyan-500/70
          transition
        "
      />

      {/* Industry Dropdown */}
      <select
        value={selectedIndustry}
        onChange={(e) => setSelectedIndustry(e.target.value)}
        className="
          p-3 rounded-lg
          bg-[#020c1b] text-cyan-200
          border border-cyan-500/30
          focus:ring-2 focus:ring-cyan-500/70
          transition
        "
      >
        <option value="">All Industries</option>
        {industries.map((item, i) => (
          <option key={i} value={item}>{item}</option>
        ))}
      </select>

      {/* Location Dropdown */}
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="
          p-3 rounded-lg
          bg-[#020c1b] text-cyan-200
          border border-cyan-500/30
          focus:ring-2 focus:ring-cyan-500/70
          transition
        "
      >
        <option value="">All Locations</option>
        {locations.map((loc, i) => (
          <option key={i} value={loc}>{loc}</option>
        ))}
      </select>

      {/* Sort Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="
          p-3 rounded-lg
          bg-[#020c1b] text-cyan-200
          border border-cyan-500/30
          focus:ring-2 focus:ring-cyan-500/70
          transition
        "
      >
        <option value="">Sort By</option>
        <option value="name">Name (A → Z)</option>
        <option value="employees">Employees (Low → High)</option>
      </select>
    </div>
  );
};

export default Filters;
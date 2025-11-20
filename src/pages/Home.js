import React, { useState, useEffect } from "react";
import CompanyCard from "../components/CompanyCard";
import Filters from "../components/Filters";

const Home = () => {
  // basic states
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // load all companies from backend (API integration)
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/companies`);
        const data = await res.json();
        setCompanies(data);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err);
        setLoading(false);
      }
    };

    getData();
  }, []);

  // extract dropdown values
  const industries = [...new Set(companies.map((c) => c.industry))];
  const locations = [...new Set(companies.map((c) => c.location))];

  // filtering 
  let filteredList = companies;

  if (searchTerm) {
    filteredList = filteredList.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedIndustry) {
    filteredList = filteredList.filter(
      (c) => c.industry === selectedIndustry
    );
  }

  if (selectedLocation) {
    filteredList = filteredList.filter(
      (c) => c.location === selectedLocation
    );
  }

  if (sortBy === "name") {
    filteredList = [...filteredList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortBy === "employees") {
    filteredList = [...filteredList].sort(
      (a, b) => a.employees - b.employees
    );
  }

  // pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const shownItems = filteredList.slice(firstIndex, lastIndex);

  // Typing effect
  const headingText = "Company Directory";
  const [typedText, setTypedText] = useState("");

  // Heading's typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(headingText.slice(0, index));
      index++;
      if (index > headingText.length) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);


  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  return (
    <div
      className="
        min-h-screen p-6 font-mono text-cyan-300
        bg-[#020c1b]
        bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.12),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(0,255,255,0.12),transparent_55%)]
      "
    >
      <h1
  className="
    text-center 
    text-2xl sm:text-3xl md:text-4xl 
    font-bold mb-8 
    text-cyan-300 
    drop-shadow-[0_0_12px_#00faff]
    font-mono
  "
>
  <span>{typedText}</span>
  <span className="animate-pulse text-cyan-400">|</span>
</h1>



      {/* Filters Section */}
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        sortBy={sortBy}
        setSortBy={setSortBy}
        industries={industries}
        locations={locations}
      />

      {/* Loading Text */}
      {loading && (
        <p className="text-center text-lg text-cyan-400 animate-pulse">
          Loading companies...
        </p>
      )}


      {!loading && filteredList.length === 0 && (
        <p className="text-center text-red-400 text-lg drop-shadow">
          No matching companies found.
        </p>
      )}

      {/* Company Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {!loading &&
          shownItems.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
      </div>

      {/* Pagination Buttons */}
      {filteredList.length > itemsPerPage && (
        <div className="flex justify-center mt-10 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-5 py-2 border border-cyan-500 text-cyan-300 rounded-lg hover:bg-cyan-500/20 disabled:opacity-30"
          >
            ⬅ Prev
          </button>

          <span className="px-4 py-2 text-cyan-400 font-semibold">
            Page {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-5 py-2 border border-cyan-500 text-cyan-300 rounded-lg hover:bg-cyan-500/20 disabled:opacity-30"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
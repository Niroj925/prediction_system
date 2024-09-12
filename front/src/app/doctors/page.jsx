"use client";
import { useState,useEffect } from "react";
import styles from "./page.module.css";
import api from "@/component/api/api";
import AllDoctors from "@/component/allDoctors/allDoctors";


function Order() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const getProperties = async () => {
    const response = await api.get("/doctor");
    setDoctors(response.data);
  };

  useEffect(() => {
    getProperties();
  }, []);


  function searchByName(array, search) {
    const lowercaseQuery = search.toLowerCase();
    return array.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercaseQuery) 
    );
  }

  useEffect(() => {
    if (search.length > 0) {
      const filtered = searchByName(doctors, search);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [doctors, search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };


  return (
    <div className={styles.propertyContainer}>
      <div className={styles.heading}>
        <div className={styles.title}>
        <h2>Visit With Doctors</h2>
        </div>
        <div className={styles.searchBar}>
          <div className={styles.search}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            className={styles.searchInput}
            onChange={handleChange}
          />
        </div>
        </div>
        
      </div>

      <div className={styles.list}>
        {doctors &&
          filteredDoctors.map((doctor) => (
            <div className={styles.post} key={doctor.id}>
              <AllDoctors doctor={doctor} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Order;

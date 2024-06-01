"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import api from "@/component/api/api";
import AllDoctors from "@/component/allDoctors/allDoctors";
import { useSelector } from "react-redux";
import { setAccessToken } from "../redux/slicers/credentialSlice";
import useApi from "@/component/customeHook/fetch";
import { allDoctors } from "@/component/api/endpoint";
import { method } from "@/component/api/apimethod";

function Order() {
  const [isFetch,setIsFetch]=useState(true);
  const { data, isLoading, hasError, errorMessage} = useApi(allDoctors,method.get,null,isFetch);
  const [filteredDoctors, setFilteredDoctors] = useState(data);
  const [search, setSearch] = useState("");

  console.log('data:',data);
  function searchByName(array, search) {
    const lowercaseQuery = search.toLowerCase();
    return array.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercaseQuery)
    );
  }

  useEffect(() => {
    if (search.length > 0) {
      const filtered = searchByName(data, search);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(data);
    }
  }, [data, search]);

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
      {
        isLoading ? (
          <>
            <h1>Loading....</h1>
          </>
        ) : (
          <div className={styles.list}>
            {filteredDoctors &&
              filteredDoctors.map((doctor) => (
                <div className={styles.post} key={doctor.id}>
                  <AllDoctors doctor={doctor} />
                </div>
              ))}
          </div>
        )
      }
    </div>
  );
}

export default Order;

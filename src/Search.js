import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Spinner from "./Spinner";
import axios from "axios";
import "./App.css";
import ascArrow from "./Images/arrow.png";
import descArrow from "./Images/download.png";
import moment from "moment";

function Search() {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [select] = useState("select");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(query);
  };
  const searchCharacter = async () => {
    console.log("searching...");
    let queryString = "";
    const page = Math.floor(Math.random() * 19) + 1;

    if (search) {
      queryString = `?name=${search}`;
    } else {
      queryString = `?page=${page}`;
    }

    const result = await axios(
      `https://rickandmortyapi.com/api/character/${queryString}`
    );
    setData(result.data.results);
    setLoading(false);
  };

  useEffect(() => {
    searchCharacter();
  }, [search]);
  function compareAsc(a, b) {
    const bandA = a.id;
    const bandB = b.id;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  function compareDesc(a, b) {
    const bandA = a.id;
    const bandB = b.id;

    let comparison = 0;
    if (bandA < bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
  }
 
  const onChange = (e) => {
    const databyName = data || data.results;
    const maleData = databyName.filter((e) => e.gender === "Male");
    const femaleData = databyName.filter((e) => e.gender === "Female");
    if (e.target.value === "male") {
      setData(maleData);
    } else {
      setData(femaleData);
    }
  };
  const onChangeSpecies = (e) => {
    const databyName = data || data.results;
    const alienData = databyName.filter((e) => e.species === "Alien");
    const humanData = databyName.filter((e) => e.species === "Human");
    if (e.target.value === "alien") {
      setData(alienData);
    } else {
      setData(humanData);
    }
  };
  const sortByAscId = () => {
    const databyName = data || data.results;
    const filterData = databyName.sort(compareAsc);
    setData(filterData);
  };
  const sortByDescId = () => {
    const databyName = data || data.results;
    const filterData = databyName.sort(compareDesc);
    setData(filterData);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="results-wrapper">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="rick, morty..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        <div className="sorting">
          <div>
            <span>Sort by Id</span>
            <button onClick={(e) => sortByAscId(e)} style={{ padding: 5 }}>
              <img src={ascArrow} alt="Asecenidng order" />
            </button>
            <button
              type="button"
              onClick={(e) => sortByDescId(e)}
              style={{ padding: 5 }}
            >
              <img src={descArrow} alt="Descenidng order" />
            </button>
          </div>
          <div>
            <span>Sort by Gender</span>
            <select id="gender" onChange={onChange}>
              <option value="select">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <span>Sort by Species</span>
            <select id="species" onChange={onChangeSpecies}>
              <option value="select">Select</option>
              <option value="alien">Alien</option>
              <option value="human">Human</option>
            </select>
          </div>
        </div>
      </form>

      <div className="results">
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <div className="main-heading">
                <Link to={`/details/${item.id}`}>
                  <img alt={item.name} src={item.image} />
                  <div className="top-main">
                    <h2 className="name-heading">{item.name}</h2>
                    <span className="">id: {item.id}</span>&nbsp;&nbsp;
                    <span className="">
                      - created {moment(item.created).fromNow()}
                    </span>
                  </div>
                  <div className="bottom-main">
                    <div className="left-main">
                      <span className="">Status:</span>
                      <span className="status"> {item.status}</span>
                    </div>
                    <hr />
                    <div className="left-main">
                      <span className="">Species:</span>
                      <span className="species"> {item.species}</span>
                    </div>
                    <hr />
                    <div className="left-main">
                      <span className="">Gender:</span>
                      <span className="created"> {item.gender}</span>
                    </div>
                    <hr />
                    <div className="left-main">
                      <span className="">Origin:</span>
                      <span className="origin"> {item.origin.name}</span>
                    </div>
                    <hr />
                    <div className="left-main">
                      <span className="">Location:</span>
                      <span className="location"> {item.location.name}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;

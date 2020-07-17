import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import moment from 'moment';

function Details(route) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getCharacter = async () => {
    const result = await axios(
      `https://rickandmortyapi.com/api/character/${route.id}`
    );
    setData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getCharacter();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="results details">
    <ul>
        <li key={data.id}>
          <div className="main-heading">
              <img alt={data.name} src={data.image} />
              <div className="top-main">
                <h2 className="name-heading">{data.name}</h2>
                <span className="">id: {data.id}</span>&nbsp;&nbsp;
                <span className="">- created {moment(data.created).fromNow()}</span>
              </div>
              <div className="bottom-main">
                <div className="left-main">
                  <span className="">Status:</span>
                  <span className="status"> {data.status}</span>
                </div>
                <hr />
                <div className="left-main">
                  <span className="">Species:</span>
                  <span className="species"> {data.species}</span>
                </div>
                <hr />
                <div className="left-main">
                  <span className="">Gender:</span>
                  <span className="created"> {data.gender}</span>
                </div>
                <hr />
                <div className="left-main">
                  <span className="">Origin:</span>
                  <span className="origin"> {data.origin.name}</span>
                </div>
                <hr />
                <div className="left-main">
                  <span className="">Location:</span>
                  <span className="location"> {data.location.name}</span>
                </div>
              </div>
          </div>
        </li>
    </ul>
  </div>
  );
}

export default Details;

import React, { useState, useEffect } from "react";
//import Mockdata from "../Mockdata";
import Datatable from "./Datatable";

//require("es6-promise").polyfill();
//require("isomorphic-fetch");

export default function Filter() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchColumns, setSearchColumns] = useState(["firstName", "lastName"]);

 useEffect(() => {
        fetch('https://devmentor.live/api/examples/contacts?api_key=9092bdcb')
        //https://qvoca-bestquotes-v1.p.rapidapi.com/quote?api_key=3ef9eaa84dmsh53638891ed7cc49p1566ebjsn1d05b50b17ac"
            .then((response) => response.json())
            .then((json) => setData(json));
    }, []);

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  const columns = data[0] && Object.keys(data[0]);
  return (
    <div>
      <div>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        {columns &&
          columns.map((column) => (
            <label>
              <input
                type="checkbox"
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column);
                  setSearchColumns((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column]
                  );
                }}
              />
              {column}
            </label>
          ))}
      </div>
      <div>
        <Datatable data={search(data)} />
      </div>
    </div>
  );
}
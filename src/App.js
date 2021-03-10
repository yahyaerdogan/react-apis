import { useState, useEffect } from "react";
//import getApis from "./apis.json";
import Search from "./components/Search";
import ApiItem from "./components/ApiItem";
import Alert from "./components/Alert";

import "./style.scss";

function App() {
  const [search, setSearch] = useState("");
  const [apis, setApis] = useState([]);

  const bookmarkItems = [1, 2];

  useEffect(() => {
    fetch("https://5a2420853a6dd70012db4efc.mockapi.io/apis")
      .then((res) => res.json())
      .then((data) =>
        setApis(
          data.map((api) => {
            if (bookmarkItems.includes(api.id)) {
              api.bookmark = true;
            }
            return api;
          })
        )
      );
  }, []);

  const bookmarks = apis.filter((api) => api.bookmark === true);
  const filteredApis = apis.filter((api) =>
    api.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBookmark = (id) => {
    setApis(
      apis.map((api) => {
        if (api.id === id) {
          api.bookmark = !api.bookmark;
        }
        return api;
      })
    );
  };

  return (
    <div className="App">
      <h3>
        A collective list of free APIs for use in <br /> software and web
        development.
      </h3>
      <Search
        search={search}
        setSearch={setSearch}
        placeholder="Find development, games, images APIs"
      />
      <div className="container">
        <h4>Featured APIs of this week</h4>
        <div className="api-list">
          {filteredApis.map((api) => (
            <ApiItem toggleBookmark={toggleBookmark} key={api.id} data={api} />
          ))}
          {filteredApis.length === 0 && <Alert message="API not found." />}
        </div>
      </div>
      <div className="container">
        <h4>Your Bookmarks</h4>
        <div className="api-list">
          {bookmarks.map((api) => (
            <ApiItem toggleBookmark={toggleBookmark} key={api.id} data={api} />
          ))}
          {bookmarks.length === 0 && (
            <Alert message="There is no item on your bookmarks" />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

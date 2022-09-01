import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi(); // This object will be responsible for any and all communication with our app and spotify.

function App() {
  // const [token, setToken] = useState(null);

  const [{ user, token }, dispatch] = useDataLayerValue();

  // useEffect : Run code based oin a given condition
  useEffect(() => {
    //code
    const hash = getTokenFromUrl();
    window.location.hash = ""; // This will clear the access token from the url bar for security.

    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        // console.log(":person", user);

        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      // Pulling data from spotify to show playlist

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      // Pulling info from spotify discover weekly, "inside this needs a real playlist id"

      spotify.getPlaylist("4iMrZezcIiqVchnIo2yb7J").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
    }

    // console.log("This is the token", token);
  }, []);

  // console.log("This is new token", token);

  // console.log("Current user is", user);

  return (
    <div className="app">
      {/* If there is a token, render the player else render the login page */}

      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;

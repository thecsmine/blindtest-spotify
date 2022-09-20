/*global swal*/

import React, { useEffect } from "react";
import logo from "./logo.svg";
import loading from "./loading.svg";
import "./App.css";
import Sound from "react-sound";
import Button from "./Button";
import AlbumCover from "./AlbumCover";
import Swal from "sweetalert2";

const apiToken =
  "BQClQjtsZ-fiKKd3C3WfUUvay2iD0UuJaWejHjhRn8C3cc85p1KW3qISqCAb51YRstqZ0MyHogp03EwHlh95z3BC7WduSj-_npUOJlPJ8wqkoDUxGj3GZ78LI8-fjFBEoSSLd5eax2p8SkIt-dAnJoEP3bMa7WQyTyR-eiF4Mcqnb5f4nocIrWHbbA";

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const App = () => {
  const [tracks, setTracks] = React.useState([]);
  const [invalidAPI, setInvalidAPI] = React.useState(false);
  const [songsLoaded, setSongsLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch("https://api.spotify.com/v1/me/tracks", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + apiToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if ("error" in data) {
          setInvalidAPI(true);
          return;
        }
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
        setSongsLoaded(true);
        setTracks(shuffleArray(data.items));
      });
  }, []);

  const checkAnswer = (name) => {
    if (currentTrack.name === name) {
      Swal.fire({
        title: "Bravo 🥳",
        text: "Vous avez deviné la bonne musique :)",
        type: "success",
        confirmButtonText: "Continue playing",
        confirmButtonColor: "#33cc33",
      }).then(() => {
        setTracks(shuffleArray([...tracks]));
      });
    } else {
      Swal.fire({
        title: "Dommage 😥",
        text: "Vous n'avez pas deviné la bonne musique :(",
        type: "warning",
        confirmButtonText: "Try again",
        confirmButtonColor: "#cc3333",
      });
    }
  };

  const currentTrack = React.useMemo(() => {
    if (tracks && tracks.length > 0) return tracks[0].track;
    return null;
  }, [tracks]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
        {songsLoaded ? (
          <AlbumCover track={currentTrack} />
        ) : invalidAPI ? (
          <p>API Token is invalid.</p>
        ) : (
          <img src={loading} className="loading" alt="loading" />
        )}
      </div>
      <div className="App-buttons">
        {shuffleArray(tracks.slice(0, 3)).map((item, index) => {
          if (index < 3) {
            return (
              <Button
                key={item.track.name}
                onClick={() => checkAnswer(item.track.name)}
              >
                {item.track.name}
              </Button>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default App;

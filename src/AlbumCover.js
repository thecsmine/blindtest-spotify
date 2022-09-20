import React from "react";
import Sound from "react-sound";
import Button from "./Button";

const AlbumCover = (props) => {
  const [previewUrl, setPreviewUrl] = React.useState("");
  const [shouldPlay, setShouldPlay] = React.useState(false);

  React.useEffect(() => {
    if (props.track !== null) {
      console.log(props.track.preview_url);
      setPreviewUrl(props.track.preview_url);
    }
  }, [props]);

  return props.track !== null ? (
    <>
      <div className="cover">
        <img
          src={props.track.album.images[0].url}
          alt="track image"
          style={{ width: 300, height: 300 }}
        />
        <Button onClick={() => setShouldPlay(!shouldPlay)}>
          {shouldPlay ? "Pause" : "Play"}
        </Button>
      </div>
      <div className="progress-bar">
        <div
          style={
            shouldPlay
              ? {
                  width: "100%",
                  transition: "width linear 30s",
                }
              : { width: "0%", transition: "width 0s" }
          }
        ></div>
      </div>
      {shouldPlay ? (
        <>
          <Sound url={previewUrl} playStatus={Sound.status.PLAYING} />
        </>
      ) : null}
    </>
  ) : null;
};

export default AlbumCover;

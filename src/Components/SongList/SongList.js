import React, { useState, useEffect } from "react";
import "./SongList.scss";
import Modal from "../Modal/Modal";
import Select from "react-select";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [songDetails, setSongDetails] = useState("");

  const lengthConverter = (time) => {
    let sec_num = parseInt(time, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  };

  useEffect(() => {
    const fetchData = fetch("/chart", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        /*Origin: "http://localhost",
          "X-Requested-With": "XMLHttpRequest",*/
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("success");
        } else {
          console.log("not successful");
        }

        return res.json();
      })
      .then((data) => {
        //console.log(" ovo su podaci od apija: ", data.tracks);
        setSongs(data.tracks.data);
        //console.log("state: " + songs);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const ascendSort = (arr) => {
    arr.sort(function (a, b) {
      return a - b;
    });
  };

  const descendSort = (arr) => {
    arr.sort(function (a, b) {
      return b - a;
    });
  };

  const option = [
    { lengthAscending: ascendSort },
    { lengthDescending: descendSort },
  ];
  return (
    <>
      <Select options={option} placeholder="Sort by: " />
      <div className="songlist">
        {songs.map((song) => {
          return (
            <div
              className="songContainer"
              key={song.title}
              onClick={() => {
                setSongDetails(song);
                setIsOpen(!isOpen);
              }}
            >
              <div className="artistContainer">
                <span className="text">Artist:</span>
                <span>{song.artist.name}</span>
              </div>

              <div className="titleContainer">
                <span className="text">Song:</span>
                <span>{song.title}</span>
              </div>

              <div className="lengthContainer">
                <span className="text">Length:</span>
                <span>{lengthConverter(song.duration)}</span>
              </div>
            </div>
          );
        })}

        <Modal
          open={isOpen}
          number={songDetails.position}
          title={songDetails.title}
          artist={songDetails.artist}
          closeModal={() => setIsOpen(false)}
          length={lengthConverter(songDetails.duration)}
        ></Modal>
      </div>
    </>
  );
};

export default SongList;

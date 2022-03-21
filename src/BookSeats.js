import React, { useState } from "react";
import Seats from "./Seats";
import "./App.css";
let showSeats = false;
const getSeats = (rows, index) => {
  let i = 0;
  let j = index;
  let k = "A";
  const section = [];
  while (i < 7 && j <= rows) {
    if (k > "G") {
      k = "A";
      j++;
    }
    if (j < rows + 1) {
      section.push(j + k);
      k = String.fromCharCode(k.charCodeAt(0) + 1);
    }
  }
  return section;
};
const getLastRow = (rows, index) => {
  let i = 0;
  let j = index;
  let k = "A";
  const lastSection = [];
  while (i < 3 && k <= "C") {
    if (j > rows + 1) {
      lastSection.push(j + k);
      k = String.fromCharCode(k.charCodeAt(0) + 1);
    }
  }
  return lastSection;
};
export default function BookSeats() {
  const allRows = getSeats(11, "1");
  const lastRow = getLastRow(1, "12");
  let segment = allRows.concat(lastRow);
  const SEATS = [];
  while (segment.length) SEATS.push(segment.splice(0, 7));

  segment = allRows.concat(lastRow);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [availableSeats, setAvailableSeats] = useState([
    "1A",
    "1B",
    "1C",
    "1D",
    "1E",
    "2A",
    "2B",
    "2C",
    "2G",
    "3D",
    "3E",
    "4A",
    "4B",
    "4C",
    "4D",
    "4E",
    "4F",
    "4G",
    "5A",
    "5B",
    "6C",
    "6D",
    "6G",
    "7A",
    "7B",
    "7E",
    "8A",
    "8B",
    "8C",
    "8D",
    "8E",
    "8F",
    "8G",
    "9C",
    "9D",
    "9G",
    "10A",
    "10B",
    "10F",
    "10G",
    "11C",
    "11E",
    "11F",
    "11G",
    "12B",
  ]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookedStatus, setBookedStatus] = useState("");
  let booked = [];

  const confirmBooking = () => {
    let toBook = parseInt(numberOfSeats, 10);
    if (toBook > 7) {
      setBookedStatus("You cannot select more than 7 seats at a time ");
      return;
    }

    if (availableSeats.length < toBook || toBook === 0) {
      setBookedStatus("Entered Value is not applicable with Available seats ");
      return;
    }
    showSeats = true;

    if (availableSeats.length !== 0) {
      let flag = true;

      for (let row = 0; row < 12; row++) {
        let counter = 0;

        for (let col = 0; col < 7; col++) {
          if (availableSeats.includes(SEATS[row][col])) {
            counter++;

            booked.push(SEATS[row][col]);

            if (counter === toBook) {
              //updating ui and alloting seats

              flag = false;
              while (toBook--) {
                bookedSeats.push(booked.shift());
              }
              const newAvailable = availableSeats.filter(
                (seat) => !bookedSeats.includes(seat)
              );
              setAvailableSeats(newAvailable);
            }
          } else {
            counter = 0;
            booked = [];
          }
        }
      }

      if (flag === true) {
        //When all seats are not found in a single row
        const newAvailable = availableSeats.filter(
          (seat) => !bookedSeats.includes(seat)
        );
        setAvailableSeats(newAvailable);

        for (let i = 0; i < toBook; i++) {
          bookedSeats.push(availableSeats[i]);
        }
      }

      setBookedStatus("Following seats were booked : ");
      showSeats = true;
      bookedSeats.forEach((seat) => {
        setBookedStatus((prevState) => {
          return prevState + seat + " ";
        });
      });
      const newAvailable = availableSeats.filter(
        (seat) => !bookedSeats.includes(seat)
      );
      setAvailableSeats(newAvailable);
      setBookedSeats([]);
      setNumberOfSeats(0);
    } else {
      setBookedStatus("All Seats are filled");
    }
  };
  return (
    <div className="wrapper">
      <p>Select number of seats you would like to book</p>
      <input
        value={numberOfSeats}
        onChange={(e) => setNumberOfSeats(e.target.value)}
      />
      {showSeats && (
        <Seats
          value={segment}
          availableSeats={availableSeats}
          bookedSeats={bookedSeats}
        />
      )}
      {/* {showSeats && (
        <Seats
          value={lastRow}
          availableSeats={availableSeats}
          bookedSeats={bookedSeats}
        />
      )} */}
      {/* <button onClick={addBooking(numberOfSeats)}>Book Seats</button> */}

      <button onClick={confirmBooking}>Confirm Booking</button>

      <p>{bookedStatus}</p>
    </div>
  );
}

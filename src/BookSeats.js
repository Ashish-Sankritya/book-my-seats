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
  const optimumBooking = (optimumRow, toBook) => {
    let count = 0;
    let temp = [];
    for (let row = optimumRow; row < 12; row++) {
      for (let col = 0; col < SEATS[row].length; col++) {
        if (availableSeats.includes(SEATS[row][col])) {
          count++;
          temp.push(SEATS[row][col]);
          if (count === toBook) {
            let n = toBook;
            while (n--) {
              bookedSeats.push(temp.shift());
            }
            const newAvailable = availableSeats.filter(
              (seat) => !bookedSeats.includes(seat)
            );
            setAvailableSeats(newAvailable);
          }
        }
      }
    }
  };
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
      let flag2 = true;
      let optimumRow;
      let optimumCount = 0;

      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < SEATS[i].length; j++) {
          if (availableSeats.includes(SEATS[i][j])) {
            optimumCount++;
          }
        }
        ///
        if (optimumCount === parseInt(numberOfSeats, 10)) {
          optimumRow = i;
          flag2 = false;

          // call function
          optimumBooking(optimumRow, parseInt(numberOfSeats, 10));
        } else optimumCount = 0;
        if (!flag2) break;
      }
      //
      if (flag2) {
        for (let row = 0; row < 12; row++) {
          let counter = 0;

          for (let col = 0; col < SEATS[row].length; col++) {
            if (availableSeats.includes(SEATS[row][col])) {
              counter++;
              optimumCount++;

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
      }
      if (flag === true && flag2) {
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

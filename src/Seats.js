import React from "react";
export default function Seats(props) {
  const { bookedSeats, value, availableSeats } = props;

  let seatClass;
  return (
    <div className="section">
      {value.map((seat) => {
        let isAvailable = availableSeats.includes(seat);
        let isBooked = bookedSeats.includes(seat);
        if (!isAvailable) {
          seatClass = "disabled";
        } else {
          seatClass = "available";
        }
        if (isBooked) {
          seatClass = "booked";
        }
        return (
          <div className={seatClass} key={seat}>
            {seat}
          </div>
        );
      })}
    </div>
  );
}

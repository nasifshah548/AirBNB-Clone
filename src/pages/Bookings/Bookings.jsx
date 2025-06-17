import React from "react";
import PropTypes from "prop-types";
import "./Bookings.css";
import { DateTime } from "luxon";
import swal from "sweetalert";
import axios from "axios";
import { useSelector } from "react-redux";

const Bookings = ({ past, upcoming }) => {
  const { token } = useSelector((state) => state.auth);

  const formatDate = (dateStr) =>
    DateTime.fromISO(dateStr).toLocaleString(DateTime.DATE_MED);

  const cancelBooking = async (bid, location) => {
    const cancelReservation = await swal({
      text: `Are you sure you want to cancel your trip to ${location}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (cancelReservation) {
      try {
        const url = `${window.apiHost}/reservation/cancel`;
        const data = { token, bid };

        const resp = await axios.post(url, data);

        if (resp.data.msg === "cancelled") {
          swal({ title: "Cancelled", icon: "success" });
        } else {
          swal({ title: "Error cancelling reservation", icon: "error" });
        }
      } catch (error) {
        console.error("Error cancelling booking:", error);
        swal({ title: "Request failed", icon: "error" });
      }
    }
  };

  // Render function for bookings
  const renderBookings = (bookings, type) =>
    bookings.map((booking, i) => {
      const dates = `${formatDate(booking.checkIn)} - ${formatDate(
        booking.checkOut
      )}`;

      return (
        <tr key={i} className="booking-row">
          <td>
            {booking.status === "confirmed" && type === "past"
              ? "complete"
              : booking.status}
          </td>
          <td>
            <div className="booking-detail">{dates}</div>
            <div className="booking-detail">{booking?.venueData?.title}</div>
            <div className="booking-detail">{booking?.venueData?.location}</div>
          </td>
          <td>
            <div className="booking-detail">
              Confirmation #: {booking?.conf}
            </div>
            <div className="booking-detail">
              {booking?.numberOfGuests} Guests, {booking?.totalNights} Nights
            </div>
            <div className="booking-detail">
              ${booking?.pricePerNight} per night
            </div>
            <div className="booking-detail">${booking?.totalPrice} Total</div>
          </td>
          <td>
            <div className="booking-detail pointer">Print Reservation</div>
            {type === "upcoming" && booking?.status !== "cancelled" && (
              <div
                onClick={() =>
                  cancelBooking(booking.id, booking?.venueData?.location)
                }
                className="booking-detail pointer red-text"
              >
                Cancel Confirmation
              </div>
            )}
          </td>
        </tr>
      );
    });

  return (
    <div className="bookings-container">
      {upcoming?.length > 0 && (
        <>
          <h5>Upcoming Bookings</h5>
          <table className="booking">
            <thead>
              <tr>
                <th>Status</th>
                <th>Dates and location</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderBookings(upcoming, "upcoming")}</tbody>
          </table>
        </>
      )}

      {past?.length > 0 && (
        <>
          <h5>Past Bookings</h5>
          <table className="booking">
            <thead>
              <tr>
                <th>Status</th>
                <th>Dates and location</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderBookings(past, "past")}</tbody>
          </table>
        </>
      )}

      {upcoming.length === 0 && past.length === 0 && <p>No bookings found.</p>}
    </div>
  );
};

Bookings.propTypes = {
  past: PropTypes.array.isRequired,
  upcoming: PropTypes.array.isRequired,
};

export default Bookings;

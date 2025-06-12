import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../../utility/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { DateTime } from "luxon";
import "./PaymentSuccess.css";

// Add icon to FontAwesome library (optional with newer versions)
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faLongArrowAltRight);

const PaymentSuccess = () => {
  const { stripeToken } = useParams();
  const auth = useSelector((state) => state.auth);
  const [reservationDetails, setReservationDetails] = useState({});
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const fetchSuccessData = async () => {
      try {
        const response = await axios.post(`${window.apiHost}/payment/success`, {
          stripeToken,
          token: auth.token,
        });
        setReservationDetails(response.data.reservationDetails);
      } catch (error) {
        console.error("Error fetching payment success data:", error);
      } finally {
        setWaiting(false);
      }
    };

    fetchSuccessData();
  }, [stripeToken, auth.token]);

  if (waiting) {
    return <Spinner />;
  }

  const rd = reservationDetails;
  const vd = rd.venueData;

  return (
    <div className="reservation-success row">
      <h1 className="col m12 center">Start Packing!</h1>
      <div className="resv-details col s8 offset-s2">
        <div className="confirmed col m12 row">
          <FontAwesomeIcon
            icon="long-arrow-alt-right"
            size="1x"
            color="#ED0000"
          />
          Confirmed: {rd.diffDays} nights in {vd.location}
          <div className="header-text">
            <div>Booked by: {auth.email}</div>
            <div>{DateTime.now().toFormat("MMMM dd, yyyy")}</div>
          </div>
        </div>

        <div className="confirmed-detail row">
          <div className="col m5">
            <div className="bordered col">
              <div className="col m12 upper">
                <div className="left">Check in</div>
                <div className="right">Check out</div>
              </div>
              <div className="col m12 lower">
                <div className="left">
                  {DateTime.fromISO(rd.checkIn).toFormat("MMM dd, yyyy")}
                </div>
                <div className="right">
                  {DateTime.fromISO(rd.checkOut).toFormat("MMM dd, yyyy")}
                </div>
              </div>
              <div className="col m12 title-text">{vd.title}</div>
              <div className="col m12 details">{vd.details}</div>
            </div>
          </div>

          <div className="col m7">
            <div className="bordered col">
              <div className="col m12 upper charges">
                <div className="charges-text col m12">Charges</div>
                <div className="row col m12">
                  <div className="left">
                    ${rd.pricePerNight} x {rd.diffDays} days
                  </div>
                  <div className="right">${rd.totalPrice}</div>
                </div>
                <div className="row col m12">
                  <div className="left">Discount</div>
                  <div className="right">$0</div>
                </div>
                <div className="row col m12 total">
                  <div className="left">TOTAL</div>
                  <div className="right">${rd.totalPrice}</div>
                </div>
              </div>
              <div className="col m12 row">
                To review or make changes to your reservation in the future,
                visit your <Link to="/account">account page</Link>.
              </div>
              <div className="col m12 resv-image">
                <img src={vd.imageUrl} alt="Venue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

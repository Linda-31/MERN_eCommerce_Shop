// new
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || { totalAmount: 0 }
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateField, setStateField] = useState("");
  const [pincode, setPincode] = useState("");
  const { orderId } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("gpay");


  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  useEffect(() => {
    const token = getCookieValue("token");
    if (!token) return;

    try {
      const user = JSON.parse(atob(token));
      const userId = user._id;

      if (!userId) {
        console.error("User ID not found in token");
        return;
      }

      axios.get(`http://localhost:4000/api/users/${userId}`)
        .then((res) => {
          const userData = res.data;

          if (userData.deliveryAddress) {
            setName(userData.deliveryAddress.fullName || "");
            setAddress(userData.deliveryAddress.address || "");
            setCity(userData.deliveryAddress.city || "");
            setStateField(userData.deliveryAddress.state || "");
            setPincode(userData.deliveryAddress.pincode || "");
          }
        })
        .catch((err) => console.error("Error fetching delivery address:", err));
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }, []);

  useEffect(() => {
    if (paymentMethod !== "gpay") return;

    const loadGPayButton = () => {
      if (!window.google) return;

      const paymentsClient = new window.google.payments.api.PaymentsClient({
        environment: "TEST",
      });

      const isReadyToPayRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["VISA", "MASTERCARD"],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "example",
                gatewayMerchantId: "exampleMerchantId",
              },
            },
          },
        ],
      };

      paymentsClient.isReadyToPay(isReadyToPayRequest)
        .then((response) => {
          if (response.result) {
            const container = document.getElementById("gpay-container");
            container.innerHTML = "";

            const button = paymentsClient.createButton({
              onClick: () => {
                const paymentDataRequest = {
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: isReadyToPayRequest.allowedPaymentMethods,
                  transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPrice: totalAmount.toString(),
                    currencyCode: "INR",
                    countryCode: "IN",
                  },
                  merchantInfo: {
                    merchantId: "12345678901234567890",
                    merchantName: "Dress Shopping",
                  },
                };

                paymentsClient.loadPaymentData(paymentDataRequest)
                  .then((paymentData) => {
                    console.log("Google Pay Success:", paymentData);
                    toast.success("Google Pay payment success!");
                    navigate("/Success", { state: { orderId } });
                  })
                  .catch((err) => console.error("Google Pay Failed:", err));
              },
            });

            container.appendChild(button);
          }
        })
        .catch((err) => console.error(err));
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://pay.google.com/gp/p/js/pay.js";
      script.async = true;
      script.onload = loadGPayButton;
      document.body.appendChild(script);
    } else {
      loadGPayButton();
    }
  }, [paymentMethod, totalAmount, navigate, orderId]);


  const handleSaveAddress = async () => {
    try {
      const token = getCookieValue("token");
      if (!token) return toast.error("User not logged in");

      const user = JSON.parse(atob(token));
      const userId = user._id;

      const deliveryAddress = {
        fullName: name,
        address,
        city,
        state: stateField,
        pincode,
      };

      await axios.put(
        `http://localhost:4000/api/users/${userId}/delivery-address`,
        { deliveryAddress }
      );

      toast.success("Delivery address updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update address");
    }
  };
 
  return (
    <div style={{
      backgroundColor: '#e6f0fa', minHeight: "90vh",
      width: "100%",
    }}>
      <div className="container" style={{ marginTop: "9rem", maxWidth: "600px" }}>
        <Toaster position="bottom-right" richColors />
        <h3 className="mb-4">Payment</h3>
        <p>Total Amount: <strong>₹{totalAmount?.toFixed(2)}</strong></p>


        <form >
          <h5 className="mb-3">Add Delivery Address</h5>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="mb-3 d-flex gap-3">
            <input type="text" className="form-control" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <input type="text" className="form-control" placeholder="State" value={stateField} onChange={(e) => setStateField(e.target.value)} />
            <input type="text" className="form-control" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSaveAddress}
          >
            Save Changes
          </button>

        </form>

        <hr className="my-4" />

        <div className="mb-3">
          <h5>Payment Method</h5>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="gpay"
              value="gpay"
              checked={paymentMethod === "gpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="gpay">
              Google Pay
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="card"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="card">
              Credit / Debit Card
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="netbanking"
              value="netbanking"
              checked={paymentMethod === "netbanking"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="netbanking">
              Net Banking
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="cod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="cod">
              Cash on Delivery
            </label>
          </div>
        </div>
        {paymentMethod === "gpay" && <div id="gpay-container" className="mb-4"></div>}

        {paymentMethod === "netbanking" && (
          <div className="mb-4">
            <h6>Select Your Bank:</h6>
            <select className="form-select">
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="axis">Axis Bank</option>
              <option value="pnb">Indian Overseas Bank</option>
            </select>
            <button
              className="btn btn-dark mt-4"
              style={{ fontSize: "16px", fontWeight: "600", padding: "10px 20px" }}
              onClick={() => toast.success("Netbanking payment initiated!")}
            >
              Pay with Netbanking
            </button>
          </div>
        )}
        {paymentMethod === "cod" && (
          <div className="mb-4 mt-4">
            <button className="btn btn-dark" style={{
              fontSize: "18px", fontWeight: "400",
              padding: "5px 20px",
              borderRadius: "5px"
            }} onClick={() => toast.success("Order placed with Cash on Delivery!")}>
              Checkout
            </button>


          </div>
        )} 
       
{paymentMethod === "card" && (
  <div className="mb-4" style={{ marginTop: "1rem", maxWidth: "400px" }}>
    <StripeCheckout
      stripeKey="pk_test_51QDOQMEJjow2uAPKioatoIZwZjZ96BsTQqxFAK0CYzujCXojVDAKJDxneRl9Ix1d0LWetkpRgYUrT364XfcoM0dz00Ks4PujG6"// Replace with your Stripe test key
      token={(token) => {
        console.log("Stripe Token:", token);
        toast.success("Card payment submitted!");
        navigate("/Success", { state: { orderId } });
      }}
      amount={totalAmount * 100} 
      name="Dress Shopping"
      description={`Total Amount: ₹${totalAmount}`}
      currency="INR"
      email={getCookieValue("token") ? JSON.parse(atob(getCookieValue("token"))).email : ""}
      panelLabel="Pay Now"
    >
      <button
        className="btn btn-dark"
        style={{ fontSize: "16px", fontWeight: "600", padding: "10px 20px" }}
      >
        Pay with Card
      </button>
    </StripeCheckout>
  </div>
)}
      </div>
    </div>
  );
}

export default Payment;




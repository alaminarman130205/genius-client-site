import React, { useContext } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const Checkout = () => {
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = `${form.first.value} ${form.second.value}`;
    const email = user?.email || "unregistered";
    const message = form.message.value;
    const phone = form.phone.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };
    fetch("https://genius-client-site-server.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          form.reset();
          alert("ordered placed successfully");
          navigate(from, { replace: true });
        }
      })
      .then((error) => console.error(error));
  };

  return (
    <div>
      <h1 className=" text-4xl"> You are about to ordered {title}</h1>
      <h1 className="text-3xl">Price : {price}</h1>
      <form onSubmit={handlePlaceOrder} action="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            name="first"
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full"
          />
          <input
            name="second"
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full"
          />
          <input
            name="phone"
            type="text"
            placeholder="Your Phone"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            defaultValue={user?.email}
            readOnly
          />
        </div>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          name="message"
          id=""
          cols="30"
          rows="10"
          placeholder="place your message"
        ></textarea>
        <br />
        <input
          className="btn btn-info md:ml-96"
          type="submit"
          value="Place your order"
        />
      </form>
    </div>
  );
};

export default Checkout;

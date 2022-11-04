import React from "react";
import { Link } from "react-router-dom";

const ServiceCart = ({ service }) => {
  const { _id, img, price, title } = service;
  return (
    <div>
      <div className="card w-96 bg-base-100">
        <figure className="px-10 pt-10">
          <img src={img} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <p className="text-2xl text-orange-500 font-bold">${price}</p>
          <div className="card-actions">
            <Link to={`/checkout/${_id}`}>
              <button className="btn btn-primary">Buy Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCart;

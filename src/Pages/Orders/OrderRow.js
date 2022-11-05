import React, { useEffect, useState } from "react";

const OrderRow = ({ order, handleDelete, handleUpdate }) => {
  const { _id, serviceName, price, customer, email, phone, service, status } =
    order;
  const [orderService, setOrderService] = useState({});

  useEffect(() => {
    fetch(`https://genius-client-site-server.vercel.app/services/${service}`)
      .then((res) => res.json())
      .then((data) => setOrderService(data));
  }, [service]);

  return (
    <tr>
      <th></th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {orderService?.img && <img src={orderService.img} alt="img" />}
            </div>
          </div>
          <div>
            <div className="font-bold">{customer}</div>
            <div className="text-sm opacity-50">{phone}</div>
          </div>
        </div>
      </td>
      <td>
        {serviceName}
        <br />
        <span className="badge badge-ghost badge-sm">{email}</span>
      </td>
      <td>
        <button className="btn btn-ghost btn-xs">{price}</button>
      </td>
      <th>
        <button onClick={() => handleDelete(_id)} className="btn btn-outline">
          X
        </button>
        <button
          onClick={() => handleUpdate(_id)}
          className="btn btn-ghost btn-xs"
        >
          {status ? status : "pending"}
        </button>
      </th>
    </tr>
  );
};

export default OrderRow;

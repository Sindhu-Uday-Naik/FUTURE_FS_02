
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function OrderConfirmation() {
  const { state } = useLocation();
  const orderId = state?.orderId;

  return (
    <div className="p-6">
      <div className="mx-auto max-w-xl rounded bg-white p-6 text-center shadow">
        <h1 className="text-2xl font-bold">Thank you!</h1>
        <p className="mt-2">Your order has been placed successfully.</p>
        {orderId && <p className="mt-1 text-sm text-gray-600">Order ID: <b>{orderId}</b></p>}
        <Link to="/" className="mt-4 inline-block rounded-md bg-amber-400 px-4 py-2 text-gray-900">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

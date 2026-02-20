import React from "react";
import { Button, Table } from "react-bootstrap";
import { useGetOrdersQuery } from "../redux/slices/orderApiSlice";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

function OrderListScreen() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1 className="fw-bold">Orders</h1>
      <Table striped bordered hover responsive className="table-sm text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className="btn-sm" variant="light">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default OrderListScreen;

import { useState } from "react";
import { Modal, Form, Button, Card } from "react-bootstrap";
import { editProduct } from "../data/api";

import React from "react";

export default function UpdateProductModal({ data, onHide }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(data.name);
  const [category, setCategory] = useState(data.category);
  const [amount, setAmount] = useState(data.amount);
  const [amountUnit, setAmountUnit] = useState(data.amountUnit);
  

  async function handleUpdateProduct(e) {
    e.preventDefault();
    editProduct(
      data._id,
      name,
      category,
      amount,
      amountUnit,
      data.companyName,
      data.companyId
    )
      .then((response) => {
        setShow(false);
        onHide();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    setShow(false);
  }

  return (
    <div>
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        Update
      </Button>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <div>
          <Card
            style={{
              width: "18rem",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: "150px",
              borderRadius: "20px",
            }}
          >
            <p
              className="xxl bold"
              style={{ marginTop: "15px", textAlign: "center" }}
            >
              Update
            </p>
            <Form onSubmit={handleUpdateProduct} style={{ padding: "20px" }}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Product Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="number"
                  placeholder="Product Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Amount Unit"
                  value={amountUnit}
                  onChange={(e) => setAmountUnit(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                className="mb-2"
                variant="outline-warning"
                type="submit"
                style={{ width: "100%" }}
                onClick={(e) => {
                  handleUpdateProduct(e);
                }}
              >
                Update
              </Button>
              <div className="modal-action">
                <a
                  className="btn"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Close
                </a>
              </div>
            </Form>
          </Card>
        </div>
      </Modal>
    </div>
  );
}

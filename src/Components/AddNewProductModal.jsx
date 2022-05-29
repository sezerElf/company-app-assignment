import { useState } from "react";
import { Modal, Form, Button, Card } from "react-bootstrap";
import { createProduct } from "../data/api";

export default function AddNewProductModal({ onHide, companyId }) {
  const [show, setShow] = useState(false);
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState("");
  const [pAmount, setPAmount] = useState("");
  const [amountUnit, setAmountUnit] = useState("");
  // const [company, setCompany] = useState("");

  async function handleCreateProduct(e) {
    e.preventDefault();
    console.log(companyId);
    createProduct(pName, pCategory, pAmount, amountUnit, null, companyId)
      .then((response) => {
        setShow(false);
        onHide();
      })
      .catch((error) => {
        alert("Eklenemedi : " + error.response.data.message);
      });
  }

  return (
    <div>
      <Button
        className="mb-2"
        variant="outline-warning"
        type="submit"
        style={{ width: "100%" }}
        onClick={() => {
          setShow(true);
        }}
      >
        Add New Product
      </Button>
      <Modal show={show} onHide={onHide}>
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
              Add Product
            </p>
            <Form onSubmit={handleCreateProduct} style={{ padding: "20px" }}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Product Category"
                  value={pCategory}
                  onChange={(e) => setPCategory(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="number"
                  placeholder="Product Amount"
                  value={pAmount}
                  onChange={(e) => setPAmount(e.target.value)}
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
              >
                Add
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

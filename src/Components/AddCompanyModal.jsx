import React from "react";
import { useState } from "react";
import { Modal, Form, Button, Card } from "react-bootstrap";
import { createCompany } from "../data/api";

export default function AddCompanyModal({onHide}) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [legalNumber, setLegalNumber] = useState("");
  const [incorporationCountry, setIncorporationCountry] = useState("");
  const [website, setWebsite] = useState("");

  async function handleCreateCompany(e) {
    e.preventDefault();

    createCompany(name, legalNumber, incorporationCountry, website)
      .then((response) => {
        setShow(false);
        onHide()
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
        Add New Company
      </Button>
      <Modal
        show={show}
        onHide={onHide}
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
              Add Company
            </p>
            <Form style={{ padding: "20px" }} onSubmit={handleCreateCompany}>
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
                  placeholder="Legal Number"
                  value={legalNumber}
                  onChange={(e) => setLegalNumber(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Incorporation Country"
                  value={incorporationCountry}
                  onChange={(e) => setIncorporationCountry(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
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

import React from "react";
import { useState } from "react";
import { Modal, Form, Button, Card } from "react-bootstrap";
import { editCompany } from "../data/api";

export default function UpdateCompanyModal({ data, onHide }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(data.name);
  const [legalNumber, setLegalNumber] = useState(data.legalNumber);
  const [incorporationCountry, setIncorporationCountry] = useState(
    data.country
  );
  const [website, setWebsite] = useState(data.webSite);

  async function handleUpdateCompany(e) {
    e.preventDefault();
    editCompany(data._id, name, legalNumber, incorporationCountry, website)
      .then((response) => {
        setShow(false);
        onHide();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <div>
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        Edit
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
            <Form style={{ padding: "20px" }} onSubmit={handleUpdateCompany}>
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

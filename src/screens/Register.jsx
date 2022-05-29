import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { register } from "../data/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault();
    if (password == againPassword) {
      register(name, email, password)
        .then((response) => {
          console.log(response);
          // routing
        
         navigate('/')
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
    } else {
      alert("Lütfen Aynı Parolayı giriniz");
    }
  }

  return (
    <div style={{}}>
      <Card
        style={{
          width: "18rem",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "150px",
          borderRadius: "20px",
        }}
      >
        <p style={{ marginTop: "15px", textAlign: "center" }}>Register</p>
        <Form style={{ padding: "20px" }} onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Again Password"
              value={againPassword}
              onChange={(e) => setAgainPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            className="mb-2"
            variant="outline-warning"
            type="submit"
            style={{ width: "100%" }}
          >
            Üye Ol
          </Button>
        </Form>
      </Card>
    </div>
  );
}

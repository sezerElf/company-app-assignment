import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../data/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    login(email, password)
      .then((response) => {
        alert("Giriş Başarılı Hoşgeldin : "+response.data.name);
        global.localStorage.setItem("isLogin","true")
        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
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
        <p style={{ marginTop: "15px", textAlign: "center" }}>Login</p>
        <Form style={{ padding: "20px" }} onSubmit={handleLogin}>
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
          <Button
            className="mb-2"
            variant="outline-warning"
            type="submit"
            style={{ width: "100%" }}
          >
            Giriş Yap
          </Button>{" "}
          <Button
            className="mb-2"
            variant="outline-warning"
            style={{ width: "100%" }}
            onClick={()=>{
              navigate("/register");
            }}
          >
            Üye Ol
          </Button>
        </Form>
      </Card>
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Row, Col, Container, Table } from "react-bootstrap";

import { getDashboard } from "../data/api";
export default function Home() {
  const [productCount, setProductcount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    var isLogin= global.localStorage.getItem("isLogin")
    if(!isLogin){
      navigate('/login')
    }
    getDashboard()
      .then((response) => {
        setCompanies(response.data.companies);
        console.log(response.data.companies);
        setProducts(response.data.products);
        setProductcount(response.data.productCount);
        setCompanyCount(response.data.companyCount);
      })
      .catch((error) => {
        alert("Hata servise erişilemiyor : " + error.response.data.message);
      });
  }, []);

  function LastCompaines() {
    return (
      <div className="mt-5">
        <Card>
          <Card.Header>
            <Row>
              <Col className="mt-12">
                <Card.Title> Son Eklenen Şirketler</Card.Title>
              </Col>

              <Col className="right">
                <Card.Link href="/companies">Tümünü Gör</Card.Link>
              </Col>
            </Row>
          </Card.Header>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Company Legal Number</th>
                <th>Incorporation Country </th>
                <th>webSite </th>
                <th>Details</th>
              </tr>
            </thead>
            {companies.map((data) => {
              return (
                <tbody key={data._id}>
                  <tr>
                    <td>{data.name}</td>
                    <td>{data.legalNumber}</td>
                    <td>{data.country}</td>
                    <td>{data.webSite}</td>
                    <td>
                      <Card.Link href={"/products?cid=" + data._id}>
                        Details
                      </Card.Link>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </Card>
      </div>
    );
  }
  function LastProducts() {
    return (
      <div className="mt-5">
        <Card>
          <Card.Header>
            <Row>
              <Col className="mt-12">
                <Card.Title> Son Eklenen Ürünler</Card.Title>
              </Col>

              <Col className="right">
                <Card.Link href="/products">Tümünü Gör</Card.Link>
              </Col>
            </Row>
          </Card.Header>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Category</th>
                <th>Product Amount</th>
                <th>Amount Unit </th>
                <th>Company</th>
              </tr>
            </thead>
            {products.map((data) => {
              return (
                <tbody key={data._id}>
                  <tr>
                    <td>{data.name}</td>
                    <td>{data.category}</td>
                    <td>{data.amount}</td>
                    <td>{data.amountUnit}</td>
                    <td>{data.companyName}</td>
                 
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex" style={{ marginTop: "15px", marginLeft: "15px" }}>
        <Container>
          <h2
            className="Header"
            style={{ marginTop: "15px", marginLeft: "15px" }}
          >
            Şirketler Projesine Hoşgeldiniz.
          </h2>
          <Row>
            <Col>
              <Card className="mb-4">
                <Card.Header>Company Count</Card.Header>
                <Card.Body>
                  <Card.Title>{companyCount}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mb-2">
                <Card.Header>Product Count</Card.Header>
                <Card.Body>
                  <Card.Title>{productCount}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <LastCompaines />
            </Col>
            <Col>
              <LastProducts />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

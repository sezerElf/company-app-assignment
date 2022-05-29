import React from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddNewProductModal from "../Components/AddNewProductModal";
import UpdateProductModal from "../Components/UpdateProductModal";
import { useLocation } from "react-router-dom";
import { getProducts, getAllProducts, deleteProduct } from "../data/api";

export default function Products() {
  const [addNewProductModalShow, setAddNewProductModalShow] = useState(false);
  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [companyId, setCompanyId] = useState("");

  const search = useLocation().search;
  useEffect(() => {
    const params = new URLSearchParams(search);
    const cid = params.get("cid");
    if (cid) {
      console.log(cid);
      setCompanyId(cid);
      getProducts(cid)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } else {
      getAllProducts()
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  }, []);

  function onCreateHide() {
    if (companyId != "") {
      getProducts(companyId)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } else {
      getAllProducts()
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  }

  function removeProduct(data) {
    deleteProduct(data._id)
      .then((root) => {
        getAllProducts()
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <div className="mt-5">
      <Card
        style={{ padding: "50px", marginRight: "120px", marginLeft: "120px" }}
      >
        <AddNewProductModal
          show={addNewProductModalShow}
          setShow={setAddNewProductModalShow}
          onHide={onCreateHide}
          companyId={companyId}
        />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Product Amount</th>
              <th>Amount Unit </th>
              <th>Company</th>
              <th>Edit</th>
              <th>Remove</th>
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
                  <td>
                    <UpdateProductModal
                      data={data}
                      show={updateProductModal}
                      setShow={setUpdateProductModal}
                      onHide={onCreateHide}
                    />
                  </td>
                  <td>
                    <Button onClick={() => removeProduct(data)}>Remove</Button>
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

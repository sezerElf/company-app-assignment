import React, { useEffect, useState } from "react";
import { Table, Button, Card } from "react-bootstrap";
import AddCompanyModal from "../Components/AddCompanyModal";
import UpdateCompanyModal from "../Components/UpdateCompanyModal";
import { getCompanies, deleteCompany } from "../data/api";

export default function Companies() {
  const [addNewCompanyModalShow, setAddNewCompanyModalShow] = useState(false);
  const [updateCompanyModalShow, setUpdateCompanyModalShow] = useState(false);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies()
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  function onCreateHide() {
    getCompanies()
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
  function removeCompany(data) {
    deleteCompany(data._id)
      .then((root) => {
        getCompanies()
          .then((response) => {
            setCompanies(response.data);
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
        <AddCompanyModal
          show={addNewCompanyModalShow}
          setShow={setAddNewCompanyModalShow}
          onHide={onCreateHide}
          
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Company Legal Number</th>
              <th>Incorporation Country </th>
              <th>webSite </th>
              <th>Details</th>
              <th>Edit</th>
              <th>Remove</th>
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
                  <td><Button>Details</Button></td>
                  <td>
                    <UpdateCompanyModal
                      show={updateCompanyModalShow}
                      setShow={setUpdateCompanyModalShow}
                      data={data}
                      onHide={onCreateHide}
                    />
                  </td>
                  <td>
                    <Button onClick={() => removeCompany(data)}>Remove</Button>
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

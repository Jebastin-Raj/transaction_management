import React from "react";
import "./Header.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header({ isTransaction = false, isShow = true }) {
  return (
    <Navbar expand="lg" className="navBar">
      <Navbar.Brand href="/">Transaction Management</Navbar.Brand>
      {isShow && (
        <span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle" />
          <Navbar.Collapse id="basic-navbar-nav" className="collapse">
            <Nav className="nav">
              {isTransaction ? (
                <div>
                  <Link className="allLink" to={"/addTransaction"}>
                    Add Transactions
                  </Link>
                </div>
              ) : (
                <div>
                  <Link className="allLink" to={"allTransaction"}>
                    Show All Transactions
                  </Link>
                  <Link className="editLink" to={"editTransaction"}>
                    Edit Transactions
                  </Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </span>
      )}
    </Navbar>
  );
}

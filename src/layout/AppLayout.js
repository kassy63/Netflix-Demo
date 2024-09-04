import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchByKeyword = (event) => {
    event.preventDefault();
    // url 바꿔주기
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src="https://www.cnet.com/a/img/resize/2e08fe8c87b8fa9541eb2b6f6e52acddea604893/hub/2021/10/27/b9314549-ed4c-4a8c-b535-5ff46a21c758/screen-shot-2021-10-27-at-3-56-32-pm.png?auto=webp&fit=crop&height=675&width=1200"
              alt="netflix"
              style={{ width: "100px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">
                홈
              </Nav.Link>
              <Nav.Link as={Link} to="/movies">
                영화
              </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="outline-danger" type="submit">
                <AiOutlineSearch />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;

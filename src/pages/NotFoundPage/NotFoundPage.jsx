// import React from "react";

// const NotFoundPage = () => {
//   return (
//     <div>
//       <>NotFoundPage</>
//     </div>
//   );
// };

// export default NotFoundPage;
import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Container>
        <h1 style={{ fontSize: "6rem", fontWeight: "bold" }}>Oops!</h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScp42YAT5fDOkKrWoa8w8xvysIDo2MKoL-dg&s"
          alt="404 Not Found"
          style={{ width: "100%", maxWidth: "400px", margin: "20px 0" }}
        />
        <p>연결하려는 페이지를 찾을 수 없습니다.</p>
        <Button variant="danger" as={Link} to="/">
          홈으로 돌아가기
        </Button>
      </Container>
    </div>
  );
};

export default NotFoundPage;

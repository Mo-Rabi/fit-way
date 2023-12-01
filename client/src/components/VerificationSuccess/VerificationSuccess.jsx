import React from "react";
import styles from "./VerificationSuccess.module.css";
import LightLogo from "../assets/images/logo-light.png";
import { Link } from "react-router-dom";
export default function VerificationSuccess() {
  return (
    <div style={{ marginTop: 100, marginBottom: 50 }}>
      <table
        cellPadding={0}
        cellSpacing={0}
        style={{
          fontFamily: "Nunito, sans-serif",
          fontSize: 15,
          fontWeight: 400,
          maxWidth: 600,
          border: "none",
          margin: "0 auto",
          borderRadius: 6,
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 0 3px rgba(60, 72, 88, 0.15)",
        }}
      >
        <thead>
          <th scope="col" className="text-center">
            <img src={LightLogo} width={200} />
          </th>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                color: "#161c2d",
                fontSize: 18,
                fontWeight: 600,
              }}
            ></td>
          </tr>
          <tr>
            <td style={{ padding: "15px 24px 15px", color: "#8492a6" }}>
              You account has been verified successfully!🎉
            </td>
          </tr>
          <tr>
            <td style={{ padding: "15px 24px" }}>
              <Link
                to={"/trainers/login"}
                style={{
                  padding: "8px 20px",
                  outline: "none",
                  textDecoration: "none",
                  fontSize: 16,
                  letterSpacing: "0.5px",
                  transition: "all 0.3s",
                  fontWeight: 600,
                  borderRadius: 6,
                  backgroundColor: "#2f55d4",
                  border: "1px solid #2f55d4",
                  color: "#ffffff",
                }}
              >
                Login now!
              </Link>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "15px 24px 0", color: "#8492a6" }}>
              Click on the Login button above to log into your account! ✅
            </td>
          </tr>
          <tr>
            <td style={{ padding: "15px 24px 15px", color: "#8492a6" }}>
              Fitway <br /> Support Team
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "16px 8px",
                color: "#8492a6",
                backgroundColor: "#f8f9fc",
                textAlign: "center",
              }}
            >
              Mostafa Rabi © Fitway 2023
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

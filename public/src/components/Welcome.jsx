import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataString = localStorage.getItem(
          process.env.REACT_APP_LOCALHOST_KEY
        );
        if (dataString) {
          const data = JSON.parse(dataString);
          setUserName(data.username);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  text-align: center;
  padding: 1rem;

  img {
    height: 20rem;
    max-width: 100%;

    @media screen and (max-width: 768px) {
      height: 15rem;
    }

    @media screen and (max-width: 480px) {
      height: 10rem;
    }
  }

  h1 {
    font-size: 2rem;

    @media screen and (max-width: 768px) {
      font-size: 1.5rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 1.25rem;
    }
  }

  h3 {
    font-size: 1.5rem;

    @media screen and (max-width: 768px) {
      font-size: 1.25rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 1rem;
    }
  }

  span {
    color: #4e0eff;
  }
`;

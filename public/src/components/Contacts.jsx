import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataString = localStorage.getItem(
          process.env.REACT_APP_LOCALHOST_KEY
        );
        if (dataString) {
          const data = JSON.parse(dataString);
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;

      @media screen and (max-width: 768px) {
        height: 1.5rem;
      }

      @media screen and (max-width: 480px) {
        height: 1.2rem;
      }
    }
    h3 {
      color: white;
      text-transform: uppercase;

      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }

      @media screen and (max-width: 480px) {
        font-size: 0.75rem;
      }
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    padding: 0 1rem;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      @media screen and (max-width: 768px) {
        padding: 0.3rem;
        gap: 0.75rem;
      }

      @media screen and (max-width: 480px) {
        padding: 0.2rem;
        gap: 0.5rem;
      }

      .avatar {
        img {
          height: 3rem;

          @media screen and (max-width: 768px) {
            height: 2.5rem;
          }

          @media screen and (max-width: 480px) {
            height: 2rem;
          }
        }
      }

      .username {
        h3 {
          color: white;

          @media screen and (max-width: 768px) {
            font-size: 1rem;
          }

          @media screen and (max-width: 480px) {
            font-size: 0.75rem;
          }
        }
      }
    }

    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 0 1rem;

    @media screen and (max-width: 768px) {
      gap: 1.5rem;
      padding: 0 0.5rem;
    }

    @media screen and (max-width: 480px) {
      gap: 1rem;
      padding: 0 0.25rem;
    }

    .avatar {
      img {
        height: 4rem;

        @media screen and (max-width: 768px) {
          height: 3.5rem;
        }

        @media screen and (max-width: 480px) {
          height: 3rem;
        }
      }
    }

    .username {
      h2 {
        color: white;

        @media screen and (max-width: 768px) {
          font-size: 1.25rem;
        }

        @media screen and (max-width: 480px) {
          font-size: 1rem;
        }
      }
    }
  }
`;

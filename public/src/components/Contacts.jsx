import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { BsChevronDown } from "react-icons/bs"; // Import Chevron Down icon
import Logout from "./Logout";

export default function Contacts({ contacts, changeChat }) {
  const [currentUser, setCurrentUser] = useState(null); // State to store current user data
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataString = localStorage.getItem(
          process.env.REACT_APP_LOCALHOST_KEY
        );
        if (dataString) {
          const data = JSON.parse(dataString);
          setCurrentUser(data); // Set current user data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Container>
      <div className="header">
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h3>Chatify</h3>
        </div>
        {currentUser && ( // Check if currentUser is defined
          <div className="dropdown-container">
            <div className="dropdown-toggle" onClick={toggleDropdown}>
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <BsChevronDown className="dropdown-icon" />
            </div>
            {dropdownOpen && (
              <div className="dropdown-content">
                <div className="option" onClick={toggleDropdown}>
                  {currentUser.username}
                </div>
                <div className="option" onClick={toggleDropdown}>
                  <Logout />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="contacts">
        {contacts.map((contact, index) => (
          <div
            key={contact._id}
            className={`contact ${index === currentSelected ? "selected" : ""}`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                alt=""
              />
            </div>
            <div className="username">
              {contact._id === currentUser?._id ? ( // Check if contact is current user
                <div className="dropdown-toggle" onClick={toggleDropdown}>
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <BsChevronDown className="dropdown-icon" />
                </div>
              ) : (
                <h3>{contact.username}</h3>
              )}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background-color: #080420;
  overflow: hidden;
  padding: 1rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem; /* Reduced gap between logo and Chatify */
    padding: 1rem 0;

    .brand {
      display: flex;
      align-items: center;
      gap: 0.5rem; /* Further reduced gap between logo and Chatify */
      img {
        height: 2rem;
      }
      h3 {
        color: white;
        text-transform: uppercase;
        font-size: 1.25rem;
        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }
        @media screen and (max-width: 480px) {
          font-size: 0.75rem;
        }
      }
    }

    .dropdown-container {
      position: relative;
      .dropdown-toggle {
        display: flex;
        align-items: center;
        gap: 0.5rem; /* Adjust gap between avatar and icon */
        cursor: pointer;
        .avatar {
          img {
            height: 2rem; /* Adjusted avatar size */
          }
        }
        .dropdown-icon {
          color: white;
          font-size: 1.5rem; /* Adjust icon size */
        }
      }

      .dropdown-content {
        position: absolute;
        top: 3rem; /* Adjust the top position of dropdown */
        right: 0;
        width: 150px; /* Adjust width of dropdown */
        background-color: #0d0d30;
        border-radius: 0.5rem;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        .option {
          padding: 1rem;
          color: white;
          cursor: pointer;
          &:hover {
            background-color: #9a86f3;
          }
        }
      }
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    overflow: auto;
    max-height: calc(
      100vh - 250px
    ); /* Adjust max-height based on other UI components */

    &::-webkit-scrollbar {
      width: 0.2rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ffffff39;
      border-radius: 1rem;
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

      .avatar {
        img {
          height: 2rem; /* Adjusted avatar size */
        }
      }

      .username {
        h3 {
          color: white;
          font-size: 1rem;
          @media screen and (max-width: 768px) {
            font-size: 0.75rem;
          }
        }
      }

      &:hover {
        background-color: #9a86f3;
      }

      &.selected {
        background-color: #9a86f3;
      }
    }
  }
`;

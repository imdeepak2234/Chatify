import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    const newMessage = msg + emojiObject.emoji;
    setMsg(newMessage);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.trim().length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  background-color: #080420;
  padding: 1rem;

  @media screen and (min-width: 720px) {
    grid-template-columns: auto 1fr auto; /* Adjust column layout for wider screens */
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }

      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;

          &-thumb {
            background-color: #9a86f3;
          }
        }

        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }

        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }

        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    background-color: #ffffff34;
    border-radius: 2rem;
    padding: 0.5rem;
    margin-left: 1rem;

    input {
      flex: 1;
      height: 100%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::placeholder {
        color: #d1d1d1;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.5rem;
      margin-left: 0.5rem;
      border-radius: 50%;
      background-color: #9a86f3;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;

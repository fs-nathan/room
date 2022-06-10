/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { get, isEmpty, isEqual } from 'lodash'
import React from 'react'
import styled from 'styled-components'

const ListWrapper = styled.div`
  z-index: 2;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  overflow-y: auto;
  position: absolute;
  top: 90px;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  @media only screen and (max-width: 600px) {
    width: calc(90vw);
    left: calc(5vw);
    height: calc(100vh - 90px - 40px);
  }
  @media only screen and (min-width: 600px) {
    width: 540px;
    left: calc(50vw - 270px);
    height: calc(100vh - 90px - 60px);
  }
  background-color: transparent;

  .chat-bubble {
    padding: 10px 14px;
    background: #f6f6f6;
    margin: 5px;
    border-radius: 5px;
    position: relative;
    width: auto;
    margin-bottom: 10px;
    overflow-wrap: break-word;
    text-align: left;
  }
  .chat-bubble:after {
    content: '';
    position: absolute;
    top: 100%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom: 0;
  }
  .chat-bubble--left:after {
    left: 0;
    border-top-color: #f6f6f6;
    border-bottom: 0;
    border-left: 0;
  }
  .chat-bubble--right:after {
    right: 0;
    border-top-color: #5db075;
    border-bottom: 0;
    border-right: 0;
  }
  .chat-bubble.chat-bubble--left {
    border-bottom-left-radius: 0;
  }
  .chat-bubble.chat-bubble--right {
    background: #5db075;
    border-bottom-right-radius: 0;
    color: #fff;
  }
  .chat-bubble-system {
    padding: 10px 14px;
    background: #f6f6f6;
    border-radius: 5px;
    position: relative;
    width: auto;
    margin-bottom: 10px;
    overflow-wrap: break-word;
    font-size: 10px;
    border-radius: 1.375rem;
    margin: 5px !important;
    text-align: center;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: ${(props) => {
    const { message } = props
    if (isEmpty(message.sender)) return 'center'
    if (isEqual(message.sender, props.me)) return 'flex-end'
    return 'flex-start'
  }};

  .message-sender {
    margin-left: 5px;
    font-size: 10px;
    text-align: left;
  }
`

const MessageWrapper = styled.div``

const getClassNameForMessage = (sender, me) => {
  if (isEmpty(sender)) return 'chat-bubble-system'
  if (isEqual(sender, me)) return 'chat-bubble chat-bubble--right'
  return 'chat-bubble chat-bubble--left'
}

function List({ messages, me, roomId }) {
  return (
    <ListWrapper id="messages-list">
      {messages.map((msg) => (
        <Row
          key={get(msg, '_id') + Math.floor(1000 + Math.random() * 9000)}
          message={msg}
          me={me}
          id={get(msg, '_id')}
        >
          <div style={{ marginBottom: 10 }}>
            {!isEmpty(msg.sender) && !isEqual(msg.sender, me) && (
              <div className="message-sender">{msg.sender}</div>
            )}
            <MessageWrapper className={getClassNameForMessage(msg.sender, me)}>
              {msg.message}
            </MessageWrapper>
          </div>
        </Row>
      ))}
    </ListWrapper>
  )
}

export default List

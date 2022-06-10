/* eslint-disable react/prop-types */
import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
  z-index: 5;
  background-color: #f6f6f6;
  border: #e8e8e8;

  border-radius: 1.375rem;
  margin: 0 auto 0 auto;
  position: absolute;
  bottom: 10px;
  @media only screen and (max-width: 600px) {
    width: calc(90vw);
    left: calc(5vw);
    height: 40px;
  }
  @media only screen and (min-width: 600px) {
    width: 540px;
    left: calc(50vw - 270px);
    height: 60px;
  }

  .message-input {
    background: transparent;
    border: none;
    outline: none !important;
    height: 100%;
    width: calc(100% - 40px);
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box; /* Firefox, other Gecko */
    box-sizing: border-box; /* Opera/IE 8+ */
    resize: none;
    font-size: 15px;
    margin: 0 40px 0 0;
    color: #444;
    border-radius: 1.375rem;
    padding-top: 10px;
    padding-bottom: 0;
    padding-right: 0 !important;
    padding-left: 15px;
    display: inline-block;
    vertical-align: middle;
  }
  .message-submit {
    position: absolute;

    right: 5px;
    background-color: #5db075;
    border: none;
    color: #fff;

    text-transform: uppercase;
    line-height: 1;

    outline: none !important;
    transition: background 0.2s ease;
    cursor: pointer;

    padding: 0;
    @media only screen and (max-width: 600px) {
      width: 30px;
      height: 30px;
      top: 5px;
      border-radius: 15px;
      font-size: 18px;
    }
    @media only screen and (min-width: 600px) {
      width: 40px;
      height: 40px;
      top: 10px;
      border-radius: 20px;
      font-size: 24px;
    }
  }

  .message-submit:disabled {
    opacity: 0.5;
  }
`

export default function MessageButton(props) {
  const [value, setValue] = useState('')
  return (
    <ButtonWrapper {...props}>
      <textarea
        type="text"
        value={value}
        className="message-input"
        placeholder="Message here ..."
        onChange={(e) => {
          setValue(e.target.value)
        }}
      ></textarea>
      <button
        type="submit"
        className="message-submit"
        disabled={isEmpty(value)}
        onClick={() => {
          if (props.onSubmit) props.onSubmit(value)
          setValue('')
        }}
      >
        &uarr;
      </button>
    </ButtonWrapper>
  )
}

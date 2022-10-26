import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import styled, { keyframes } from "styled-components";
import { ScreenWidth } from "../utils/styled";
// import { useModalContext } from "../context/modal/modalContext";
// import { ModalActionType } from "../context/modal/modalReducer";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: rgb(0, 0, 0, 0.9);
  position: absolute;
  width: 100vw;
  top: 0;
  /* z-index: 9999; */
  z-index: 9999999999; // TODO: remove this

  @media only screen and (max-width: ${ScreenWidth.TABLET}px) {
    padding: 15px;
  }
`;

const Logo = styled.h1`
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  & > span:nth-child(1) {
    font-size: 1.4rem;
    margin-right: 7px;

    @media only screen and (max-width: 450px) {
      font-size: 1.8rem;
    }
  }

  & > span:nth-child(2) {
    color: white;
    font-size: 1.2rem;
    font-weight: 500;

    @media only screen and (max-width: 450px) {
      display: none;
    }
  }
`;

const Menubar = styled.div`
  display: flex;
  align-items: center;
`;

const Twitter = styled.a`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;

  &:hover {
    color: #1f9cea;
    transform: scale(1.25) rotate(18deg);
  }
`;

const bubbleAnimation = keyframes`
  20% {
    opacity: 1;
    transform: scale(1) translateX(1px) translateY(-10px);
  }
  80% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: scale(0.75) translateX(5px) translateY(-20px);
  }
`;
const smallBubbleAnimation = keyframes`
  20% {
    opacity: 1;
    transform: scale(1) translateX(1px) translateY(-10px);
  }
  45% {
    opacity: 0.5;
  }
  65% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: scale(0.75) translateX(-5px) translateY(-20px);
  }
`;
const insideBubbleAnimation = keyframes`
  0% {
    transform: scale(0);
    background: rgba(0, 0, 0, 0);
  }
  100% {
    transform: scale(1);
    background: rgba(0, 0, 0, 1);
  }
`;
const badgeAnimation = keyframes`
  0% {
    transform: scale(0);
    background: #f73c01;
  }
  100% {
    transform: scale(3);
    background: transparent;
  }
`;
const WhatsNew = styled.a`
  /* color: rgba(255, 255, 255, 0.6); */
  color: white;
  font-size: 1rem;
  margin-right: 18px;
  cursor: pointer;
  position: relative;

  &:hover {
    color: white;
  }

  & > span.badge {
    background: #f73c01;
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    top: -2px;
    left: -8px;
    z-index: 9999;
  }
  & > span.bubble {
    position: absolute;
    top: -3px;
    left: -4.5px;
    z-index: 99999;
    transform-origin: 2.5px 7px;

    /* Rotation Transform Origin Debug */
    /* &::before {
      content: "";
      position: absolute;
      background: white;
      height: 12px;
      width: 1px;
      top: -5.5px;
      left: -18px;
      transform: translateX(20px);
    } */

    & > span:nth-child(1) {
      width: 3px;
      height: 3px;
      border-radius: 40%;
      display: block;
      position: absolute;
      background: #f73c01;
      opacity: 0;

      animation-delay: 0.2s;
      animation-name: ${smallBubbleAnimation};
      animation-duration: 1s;
      animation-iteration-count: 1;
      animation-timing-function: ease-out;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
    }

    & > span:nth-child(2) {
      width: 5px;
      height: 5px;
      border-radius: 40%;
      display: block;
      background: #f73c01;
      position: absolute;
      transform: translateX(2px) translateY(-1px);
      opacity: 0;

      animation-delay: 0.2s;
      animation-name: ${bubbleAnimation};
      animation-duration: 1s;
      animation-iteration-count: 1;
      animation-timing-function: ease-out;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
    }
  }
  & > span.insideBubble::before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;

    animation-name: ${insideBubbleAnimation};
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
  }
  & > span.animatedBadge {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    top: -2px;
    left: -8px;

    animation-name: ${badgeAnimation};
    animation-duration: 1.25s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
  }
  & > span.disabled {
    display: none;
  }
`;

const Navbar = () => {
  const [playSplashAnimation, setPlaySplashAnimation] = useState(false);
  const animatedBadgeRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    badgeRef.current?.addEventListener("animationend", () => {
      badgeRef.current?.classList.add("disabled");
    });
  }, [playSplashAnimation]);

  return (
    <NavbarContainer>
      <Logo>
        <span>🦄</span> <span>UniswapCalculator</span>
      </Logo>
      <Menubar>
        <WhatsNew
          onClick={() => {
            setPlaySplashAnimation(true);
          }}
        >
          What's New
          {playSplashAnimation && (
            <>
              <span className="bubble">
                <span />
                <span />
              </span>
              <span
                className="bubble"
                style={{
                  transform: "rotate(60deg)",
                }}
              >
                <span />
                <span />
              </span>
              <span
                className="bubble"
                style={{
                  transform: "rotate(120deg)",
                }}
              >
                <span />
                <span />
              </span>
              <span
                className="bubble"
                style={{
                  transform: "rotate(180deg)",
                }}
              >
                <span />
                <span />
              </span>
              <span
                className="bubble"
                style={{
                  transform: "rotate(240deg)",
                }}
              >
                <span />
                <span />
              </span>
              <span
                className="bubble"
                style={{
                  transform: "rotate(300deg)",
                }}
              >
                <span />
                <span />
              </span>
            </>
          )}
          <span
            ref={badgeRef}
            className={`badge ${playSplashAnimation ? "insideBubble" : ""}`}
          />
          <span
            ref={animatedBadgeRef}
            className={`animatedBadge ${playSplashAnimation ? "disabled" : ""}`}
          />
        </WhatsNew>
        <Twitter
          href="https://twitter.com/uniswapdotfish"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Twitter>
      </Menubar>
    </NavbarContainer>
  );
};

export default Navbar;

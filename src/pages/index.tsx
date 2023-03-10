import React from "react";
import styled from "styled-components";
import { Br, H2, Heading } from "../common/components/atomic";
import CorrelationChart from "../containers/CorrelationChart";
import Footer from "../containers/Footer";
import EstimatedFees from "../containers/EstimatedFees";
import Header from "../containers/Header";
import Navbar from "../containers/navbar/Navbar";
import LiquidityPositionChart from "../containers/LiquidityPositionChart";
import SelectPairModal, {
  SelectPair,
} from "../containers/select-pair/SelectPairModal";
import Setting from "../containers/setting/Setting";
import { ScreenWidth } from "../utils/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FeedbackButton } from "../common/components/atomic";
import { useAppContext } from "../context/app/appContext";
import {
  faArrowRight,
  faBug,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getCurrentNetwork } from "../common/network";
import ImpermanentLossModal from "../containers/ImpermanentLossModal";
import CreatePositionModal from "../containers/CreatePositionModal";
import TopPosition from "../containers/TopPosition";
import { Link } from "gatsby";

const BodyContainer = styled.div`
  max-width: 900px;
  margin: auto;
  padding-top: 100px;

  @media only screen and (max-width: ${ScreenWidth.TABLET}px) {
    margin: auto 15px;
    padding-top: 85px;
  }
`;
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 7fr;
  grid-gap: 25px;
  margin-top: 25px;

  @media only screen and (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-gap: 15px;
  }
`;
const LandingContainer = styled.div`
  max-width: 750px;
  margin: auto;
  padding-top: 80px;

  display: grid;
  grid-template-columns: 5fr 370px;
  grid-gap: 25px;
  margin-top: 25px;

  & > .select-pair {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    position: relative;
  }

  @media only screen and (max-width: ${ScreenWidth.TABLET}px) {
    margin: auto 15px;
    padding-top: 85px;
  }
`;
const Landing = styled.div`
  & p {
    color: #bbb;
  }

  & .uniswap-foundation {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    margin-top: 20px;
    font-size: 0.875rem;

    & img {
      height: 50px;
      margin-right: 12px;
      transform: translateY(2px);
    }
  }

  & .top-pools {
    display: block;
    color: #bbb;
    cursor: pointer;
    font-size: 0.875rem;
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.175);
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    text-decoration: none;
    transition: 0.3s;
    margin-top: 18px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    & > div:nth-child(1) {
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
  & .calculator {
    color: #bbb;
    font-size: 0.875rem;
    padding: 16px;

    & svg {
      margin-left: 5px;
    }
  }
`;

function App() {
  const { state } = useAppContext();

  return (
    <>
      <SelectPairModal />
      <ImpermanentLossModal />
      <CreatePositionModal />

      <FeedbackButton
        onClick={() => {
          const app_context = {
            token0: state.token0?.id,
            token1: state.token1?.id,
            chain: getCurrentNetwork().id,
            pool: state.pool?.id,
            depositAmount: state.depositAmountValue,
            priceRange: state.priceRangeValue,
            mostActivePrice: state.priceAssumptionValue,
          };
          if (process.env.NODE_ENV === "development") {
            return console.log({ app_context });
          }
          window.freddyWidget.setOptions({
            custom_fields: {
              app_context: JSON.stringify(app_context),
            },
          });
          window.freddyWidget.show();
        }}
      >
        <FontAwesomeIcon icon={faBug} />
      </FeedbackButton>

      <Navbar />

      {!state.pool && (
        <LandingContainer>
          <Landing>
            <H2>Welcome to Uniswap.fish</H2>
            <p>
              Uniswap.fish is an all-in-one workspace for Uniswap liquidity
              providers — calculate, discover, analyze, manage & track
              positions, and more.
            </p>

            <div>
              <Heading style={{ marginTop: 20 }}>How do I get started?</Heading>
              <Link className="top-pools" to="/pools">
                <div>
                  Top Pools{" "}
                  <FontAwesomeIcon
                    style={{ marginLeft: 5 }}
                    icon={faExternalLinkAlt}
                  />
                </div>
                <div>Explore top pools with Pool Overview feature</div>
              </Link>
              <div className="calculator">
                If you already have the pool in mind, select the pool on the
                Uniswap Calculator
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>

            <a
              className="uniswap-foundation"
              target="_blank"
              href="https://twitter.com/UniswapFND"
            >
              <img src="/uniswap-foundation.png" />
              <span>
                Sponsored by
                <br />
                Uniswap Foundation
              </span>
            </a>
          </Landing>
          <div className="select-pair">
            <SelectPair />
          </div>
        </LandingContainer>
      )}

      {state.pool && (
        <BodyContainer>
          <Header />
          <ContentContainer>
            <div>
              <EstimatedFees />
              <Br />
              <Setting />
            </div>
            <div>
              <LiquidityPositionChart />
              <Br />
              <CorrelationChart />
            </div>
          </ContentContainer>

          <Br />
          <TopPosition />
        </BodyContainer>
      )}

      <Footer />
    </>
  );
}

export default App;
export { Head } from "../common/components/Head";

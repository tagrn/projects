import React from "react";
import { useHistory } from "react-router-dom";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

function Home() {
  const history = useHistory();

  const startFlanetButton = (event) => {
    if (
      sessionStorage.getItem(
        `firebase:authUser:${process.env.REACT_APP_FIREBASE_APIKEY}:[DEFAULT]`
      )
    ) {
      history.push("/blockcoding");
    } else {
      history.push("/signin");
    }
  };

  const user = JSON.parse(
    sessionStorage.getItem(
      `firebase:authUser:${process.env.REACT_APP_FIREBASE_APIKEY}:[DEFAULT]`
    )
  );

  return (
    <div className="Home">
      <div className="fixAppBackgroundDuplicate">
        <img src={`${process.env.PUBLIC_URL}/img/star.png`} className="first" />
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/img/home_block_1.png`}
        className="homepageTransitionDesign1"
        alt="home_block"
      />
      <img
        src={`${process.env.PUBLIC_URL}/img/home_block_2.png`}
        className="homepageTransitionDesign2"
        alt="home_block"
      />
      <img
        src={`${process.env.PUBLIC_URL}/img/home_block_3.png`}
        className="homepageTransitionDesign3"
        alt="home_block"
      />
      <img
        src={`${process.env.PUBLIC_URL}/img/home_block_4.png`}
        className="homepageTransitionDesign4"
        alt="home_block"
      />
      <div className="startFlanetButton">
        <h1>FlaNET</h1>
        <br />
        <br />
        <DoubleArrowIcon
          className="dubbleArrowIconStyle"
          onClick={(event) => {
            startFlanetButton(event);
          }}
        />
        {(function () {
          if (user) return <div>블록코딩 Go!Go!</div>;
          else return <div>로그인부터 Go!Go!</div>;
        })()}
      </div>
      <div className="startFlanetButtonDefault"></div>
    </div>
  );
}

export default Home;

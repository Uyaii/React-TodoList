/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Typed from "typed.js";
import "../css/landingPage.css";

const LandingPage = () => {
  const typingEffectElement = useRef(null);
  useEffect(() => {
    const typed = new Typed(typingEffectElement.current, {
      strings: [
        "Welcome To Todoly!!!",
        "A Place To Boost Your Productivity",
        "Come Join The Fun",
      ],
      typeSpeed: 40,
      backSpeed: 50,
      loop: true,
      showCursor:false
    });
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div className="landing">
      <span ref={typingEffectElement} className="typingEffect" />

      <p>
        Organize Your Day, Conquer Your Goals: Your Ultimate Productivity Hub
        Starts Here!
      </p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default LandingPage;

import React, { useState, useRef, useEffect } from "react";

type component = {
  date: string;
  mamber: {
    X: string[];
    Y: string[];
    Z: string[];
    A: string[];
    B: string[];
    C: string[];
    D: string[];
  };
};

type Props = {
  user: string;
};

function UserSet(props: Props) {
  return <div className="userset"></div>;
}
export default UserSet;

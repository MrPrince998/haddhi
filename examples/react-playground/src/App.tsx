/* @jsxRuntime classic */
import React from "react";
import { Haddhi } from "haddhi";

export default function App() {
  return (
    <div>
      <Haddhi
        loading={true}
        variant="wave"
        baseColor="#e5e7eb"
        highlightColor="#ffffff"
        duration={1.2}
        delay={200}
        radius={10}
        ariaLabel="Loading profile"
      >
        <div>
          <div>wdawd</div>
          <div>Hello Haddhi</div>
          <p>sda</p>
          <div>dfaf</div>
          <button>Click me</button>
          <div>
            <div>dfaf</div>
            <button>Click me</button>
          </div>
        </div>
      </Haddhi>
    </div>
  );
}

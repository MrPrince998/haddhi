/* @jsxRuntime classic */
import React from "react";
import { Haddhi } from "@haddhi/react";
export default function App() {
  return (
    <div>
      <Haddhi
        loading={true}
        variant="auto"
        animation="wave"
        baseColor="#e5e7eb"
        highlightColor="#ffffff"
        duration={1.2}
        delay={200}
        preset="comment"
        radius={10}
        ariaLabel="Loading profile"
      >
        <div>
          <div>Hello Haddhi</div>
        </div>
      </Haddhi>
    </div>
  );
}

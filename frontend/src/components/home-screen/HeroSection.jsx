import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="text-center flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-5xl font-bold">UniChance</h1>
          </div>
          <div>
            <p className="text-2xl">Predict your chances at</p>
            <p className="text-2xl">the world's best universities.</p>
          </div>
        </div>
        <div>
          <button className="btn btn-success">Get Started</button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

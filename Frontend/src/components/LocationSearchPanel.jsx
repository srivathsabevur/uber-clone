import React from "react";

const LocationSearchPanel = ({
  setPanelOpen,
  setVehiclePanel,
  suggestions = [],
  setPickup,
  setDestination,
  activeField,
}) => {
  const location = [
    "Minim enim commodo amet consequat est officia occaecat anim quis voluptate irure officia.",
    "Laboris voluptate pariatur tempor ullamco aute Lorem labore commodo ullamco dolore.",
    "Voluptate officia irure aute consectetur culpa cupidatat est anim enim aliquip nostrud laborum anim.",
    "Cupidatat mollit Lorem commodo Lorem dolore elit adipisicing quis culpa veniam sit.",
  ];

  const handleSuggestion = (loc) => {
    if (activeField === "pickup") {
      setPickup(loc);
    } else if (activeField === "destination") {
      setDestination(loc);
    }
  };

  return (
    <div>
      {suggestions.map((loc, index) => {
        return (
          <div
            onClick={() => handleSuggestion(loc.description)}
            key={index}
            className="flex items-center py-3 px-2 rounded-lg border-2 border-gray-50 active:border-black justify-start gap-4 my-2"
          >
            <h2 className="bg-[#eee] h-8 w-12 flex justify-center items-center rounded-full">
              <i className="ri-map-pin-fill text-xl"></i>
            </h2>
            <h4 className="font-medium">{loc.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;

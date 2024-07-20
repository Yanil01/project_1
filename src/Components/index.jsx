import React, { useState } from "react";
import data from "./data"; // Assuming data is imported correctly
import "./style.css"; // Import your CSS file for styling

export default function Accordian() {
  // State to manage whether multi-selection mode is enabled
  const [multiSelectionEnabled, setMultiSelectionEnabled] = useState(false);

  // State to keep track of selected items
  const [selectedItems, setSelectedItems] = useState([]);

  // Function to toggle accordion item selection
  const toggleAccordion = (index) => {
    if (multiSelectionEnabled) {
      // Toggle selection in multi-selection mode
      if (selectedItems.includes(index)) {
        setSelectedItems(selectedItems.filter((item) => item !== index)); // Deselect if already selected
      } else {
        setSelectedItems([...selectedItems, index]); // Select if not already selected
      }
    } else {
      // Single-selection mode: toggle only the clicked item
      if (selectedItems.includes(index)) {
        setSelectedItems([]); // Deselect if already selected
      } else {
        setSelectedItems([index]); // Select the clicked item
      }
    }
  };

  // Function to toggle multi-selection mode
  const toggleMultiSelection = () => {
    setMultiSelectionEnabled(!multiSelectionEnabled); // Toggle multi-selection mode
    setSelectedItems([]); // Clear selected items when switching modes
  };

  // Function to check if an item is selected
  const isItemSelected = (index) => {
    return selectedItems.includes(index);
  };

  return (
    <div className="wrapper">
      <div className="accordian">
        {/* Button to toggle multi-selection mode */}
        <button onClick={toggleMultiSelection}>
          {multiSelectionEnabled
            ? "Disable Multi-Selection"
            : "Enable Multi-Selection"}
        </button>

        {/* Mapping through data to render accordion items */}
        {data && data.length > 0 ? (
          data.map((dataItem, index) => (
            <div
              className={`item ${isItemSelected(index) ? "selected" : ""}`}
              key={index}
              onClick={() => toggleAccordion(index)} // Toggle item selection on click
            >
              {/* Title of the accordion item */}
              <div className="title">
                <h3>{dataItem.question}</h3>
                <span>{isItemSelected(index) ? "-" : "+"}</span>{" "}
                {/* Toggle icon based on selection */}
              </div>

              {/* Content of the accordion item (shown if selected) */}
              {isItemSelected(index) && (
                <div className="content">
                  <p>{dataItem.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}

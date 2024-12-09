import React, { useState } from "react";

const TimePicker = () => {
  const [pickupTime, setPickupTime] = useState("");

  const handleChange = (e: { target: any }) => {
    // Your handleChange function
    console.log(e.target.value);
  };

  const amOptions = [
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
  ];

  const pmOptions = [
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  return (
    <div>
      <select
        value={pickupTime}
        onChange={(e) => {
          const value = e.target.value;
          setPickupTime(value); // Update the pickup time state
          handleChange({
            target: { name: "pickupTime", value },
          });
        }}
        className="custom-select"
      >
        <option value="">{`Select Time`}</option>

        {/* AM Times */}
        <optgroup label="AM">
          {amOptions.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </optgroup>

        {/* PM Times */}
        <optgroup label="PM">
          {pmOptions.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

export default TimePicker;

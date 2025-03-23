"use client";
import Image from "next/image";
import { useState, useEffect } from 'react';

const Main = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for "Yes" confirmation pop-up
  const [showYesPopup, setShowYesPopup] = useState(false); // State for "Yes" success pop-up
  const [showNoPopup, setShowNoPopup] = useState(false); // State for "No" pop-up

  // Detect if the device is touch-enabled
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  const moveButton = () => {
    const randomX = Math.random() * 200 - 100; // Random X position between -100 and 100
    const randomY = Math.random() * 200 - 100; // Random Y position between -100 and 100
    setPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    setShowConfirmation(true); // Show "Yes" confirmation pop-up
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      setShowConfirmation(false); // Hide "Yes" confirmation pop-up
      setShowYesPopup(true); // Show "Yes" success pop-up
    } else {
      setShowNoPopup(true); // Show "No" pop-up
    }
  };

  const closeYesPopup = () => {
    setShowYesPopup(false); // Close "Yes" success pop-up
  };

  const closeNoPopup = () => {
    setShowNoPopup(false); // Close "No" pop-up
  };

  const handleNoClick = () => {
    if (isTouchDevice) {
      setShowNoPopup(true); // Show "No" pop-up directly on mobile
    } else {
      moveButton(); // Move the button on non-touch devices
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-md w-full text-center border-2 border-pink-300 relative">
        {/* GIF positioned above the question */}
        <div className="flex justify-center mb-4">
          <Image
            src="/images/ask.gif"
            alt="Ask GIF"
            width={160} // Adjust as needed
            height={160} // Adjust as needed
            className="w-20 h-20 sm:w-40 sm:h-40"
          />

        </div>

        <h2 className="text-2xl font-bold text-pink-600">Would you like to go on a date with me today?</h2>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleYesClick}
            className="bg-pink-500 text-white px-6 py-2 rounded-full shadow-md transition transform hover:scale-105 hover:bg-pink-600"
          >
            Yes! 💖
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full shadow-md transition transform hover:scale-105 hover:bg-gray-400"
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            onMouseEnter={!isTouchDevice ? moveButton : undefined} // Move on hover for non-touch devices
            onClick={handleNoClick} // Handle click for both touch and non-touch devices
          >
            No 😢
          </button>
        </div>

        {/* Confirmation Pop-up for "Yes" */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-2 border-pink-300 w-full max-w-sm mx-4">
              {/* GIF positioned above the text */}
              <div className="flex justify-center">
                <Image
                  src="/images/pliss.gif"
                  alt="Please GIF"
                  width={160}
                  height={160} 
                  className="w-20 h-20 sm:w-24 sm:h-24 mb-4 bg-transparent"
                />
              </div>
              <h3 className="text-xl font-bold text-pink-600">Are you sure?</h3>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={() => handleConfirmation(true)} // Show "Yes" success pop-up
                  className="bg-pink-500 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full shadow-md transition transform hover:scale-105 hover:bg-pink-600"
                >
                  Yes, I'm sure! 💖
                </button>
                <button
                  onClick={() => handleConfirmation(false)} // Show "No" pop-up
                  className="bg-gray-300 text-gray-700 px-4 py-2 sm:px-6 sm:py-2 rounded-full shadow-md transition transform hover:scale-105 hover:bg-gray-400"
                >
                  No 😢
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pop-up for "Yes" success */}
        {showYesPopup && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-2 border-pink-300 w-full max-w-sm mx-4">
              {/* GIF for "Yes" success pop-up */}
              <div className="flex justify-center">
                <Image
                  src="/images/yes.gif"
                  alt="Yes GIF"
                  width={160} // Adjust as needed
                  height={160} 
                  className="w-20 h-20 sm:w-24 sm:h-24 mb-4 bg-transparent"
                />
              </div>
              <h3 className="text-xl font-bold text-pink-600">Yay! 💖</h3>
              <p className="text-gray-700 mt-2">Let's make it a special day!</p>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={closeYesPopup}
                  className="bg-pink-500 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full shadow-md transition transform hover:scale-105 hover:bg-pink-600"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pop-up for "No" */}
        {showNoPopup && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-2 border-pink-300 w-full max-w-sm mx-4">
              {/* GIF for "No" pop-up */}
              <div className="flex justify-center">
                <Image
                  src="/images/no.gif"
                  alt="No GIF"
                  width={160} // Adjust as needed
                  height={160} 
                  className="w-20 h-20 sm:w-24 sm:h-24 mb-4 bg-transparent"
                />
              </div>
              <h3 className="text-xl font-bold text-pink-600">Oh no! 😢</h3>
              <p className="text-gray-700 mt-2">Please reconsider!</p>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={closeNoPopup}
                  className="bg-pink-500 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full shadow-md transition transform hover:scale-105 hover:bg-pink-600"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
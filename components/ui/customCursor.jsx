import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("VIEW");

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      cursor.style.setProperty("--mouse-x", `${e.clientX}px`);
      cursor.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    const handleShow = (e) => {
      setText(e.detail || "VIEW");
      setIsVisible(true);
    };

    const handleHide = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("showCustomCursor", handleShow);
    window.addEventListener("hideCustomCursor", handleHide);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("showCustomCursor", handleShow);
      window.removeEventListener("hideCustomCursor", handleHide);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isVisible ? "active" : ""}`}
      >
        <div className="cursor-content">
          <span className="cursor-text">{text}</span>
          <svg
            className="cursor-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .custom-cursor {
          position: fixed;
          left: 0;
          top: 0;
          width: 80px;
          height: 80px;
          pointer-events: none;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;

          transform: translate3d(
              calc(var(--mouse-x) - 50%),
              calc(var(--mouse-y) - 50%),
              0
            )
            scale(0);

          transition:
            transform 0.15s cubic-bezier(0.23, 1, 0.32, 1),
            opacity 0.2s ease;
          opacity: 0;
        }

        .custom-cursor.active {
          transform: translate3d(
              calc(var(--mouse-x) - 50%),
              calc(var(--mouse-y) - 50%),
              0
            )
            scale(1);
          opacity: 1;
        }

        .cursor-content {
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .cursor-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: black;
          margin-bottom: 2px;
        }

        .cursor-icon {
          width: 14px;
          height: 14px;
          color: black;
        }
      `}</style>
    </>
  );
}

import React from "react";

export default function ProjectSingleVideo({ link, poster }) {
  return (
    <video
      src={link}
      poster={poster}
      className="container max-w-full max-h-full w-auto h-auto object-contain"
      autoPlay
      loop
      muted
      playsInline
      disablePictureInPicture
    >
      Il tuo browser non supporta il tag video.
    </video>
  );
}

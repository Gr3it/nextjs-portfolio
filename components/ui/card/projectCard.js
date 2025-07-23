import Image from "next/image";
import React from "react";

function ProjectCard({ title, description, tag, color = "black" }) {
  return (
    <div
      className="w-[22rem]"
      style={{
        color: color,
      }}
    >
      <h2 className="text-center text-3xl font-bold mb-4">{title}</h2>
      <p className="text-left text-base font-normal whitespace-pre-wrap mb-2">
        {description}
      </p>
      <small className="text-left text-xs font-medium opacity-40 block">
        {tag}
      </small>
    </div>
  );
}

export default function ProjectCardWrapper(props) {
  return (
    <div className="ml-48 w-full max-w-screen-2xl px-8">
      <div className="w-[22rem] flex flex-col justify-center items-center">
        <Image
          className="remove-rotation"
          src="/galeone.png"
          width={200}
          height={200}
          alt="Galeon"
        />
        <ProjectCard {...props} />
      </div>
    </div>
  );
}

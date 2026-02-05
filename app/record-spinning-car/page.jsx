"use client";

import React, { useRef, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MinimalCanvas } from "@/components/3D/core/minimalCanvas";
import { Car } from "@/models/vehicles/Car";

export default function Page() {
  const [recording, setRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <div className="h-72 w-2xl relative border border-gray-800 rounded-lg overflow-hidden bg-slate-900">
        <MinimalCanvas gl={{ preserveDrawingBuffer: true }}>
          <SpinningCar
            recording={recording}
            setRecording={setRecording}
            onProgress={setProgress}
            onStatus={setStatus}
          />
        </MinimalCanvas>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => setRecording(true)}
          disabled={recording}
          className={`px-8 py-3 rounded-full font-bold uppercase transition ${
            recording ? "bg-gray-700 text-gray-400" : "bg-red-600 text-white"
          }`}
        >
          {recording ? `${status}` : "Genera Video Loop"}
        </button>
        {progress > 0 && (
          <div className="w-64 bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-red-600 h-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        {status && <p className="text-sm text-gray-400">{status}</p>}
      </div>
    </div>
  );
}

function SpinningCar({ recording, setRecording, onProgress, onStatus }) {
  const carRef = useRef(null);
  const { gl } = useThree();

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const startTimeRef = useRef(0);
  const recordingStartedRef = useRef(false);

  const FPS = 60;
  const RADIUS = 3;
  const SPEED = 4;
  const DURATION = (2 * Math.PI) / SPEED + 0.1;

  const startRecording = useCallback(() => {
    try {
      const stream = gl.domElement.captureStream(FPS);
      const options = {
        mimeType: "video/webm;codecs=vp9",
        videoBitsPerSecond: 500000,
      };

      // Fallback se VP9 non è supportato
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = "video/webm;codecs=vp8";
      }

      const recorder = new MediaRecorder(stream, options);

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `car-animation-${Date.now()}.webm`;
        a.click();

        // Cleanup
        URL.revokeObjectURL(url);
        chunksRef.current = [];
        mediaRecorderRef.current = null;
        recordingStartedRef.current = false;
        setRecording(false);
        onProgress(0);
        onStatus("✓ Video salvato!");

        setTimeout(() => onStatus(""), 3000);
      };

      recorder.onerror = (e) => {
        console.error("Errore MediaRecorder:", e);
        onStatus("❌ Errore durante la registrazione");
        setRecording(false);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      startTimeRef.current = performance.now();
      recordingStartedRef.current = true;

      onStatus("🔴 Registrazione...");
      console.log("Registrazione avviata:", options.mimeType);
    } catch (error) {
      console.error("Errore avvio registrazione:", error);
      onStatus("❌ Impossibile avviare registrazione");
      setRecording(false);
    }
  }, [gl, setRecording, onStatus]);

  useFrame((state) => {
    if (!carRef.current) return;
    if (recording && !recordingStartedRef.current) {
      startRecording();
    }

    if (recording && recordingStartedRef.current) {
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      const progressPercent = Math.min((elapsed / DURATION) * 100, 100);
      onProgress(Math.round(progressPercent));

      if (elapsed >= DURATION) {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state === "recording"
        ) {
          mediaRecorderRef.current.stop();
          onStatus("⏳ Finalizzazione...");
        }
      }
    }

    const currentTime = state.clock.getElapsedTime();
    const currentAngle = currentTime * -SPEED;

    carRef.current.position.set(
      Math.cos(currentAngle) * RADIUS,
      Math.sin(currentTime * 4) * 0.02,
      Math.sin(currentAngle) * RADIUS,
    );
    carRef.current.rotation.y = -currentAngle + Math.PI;
  });

  return (
    <group position={[0, 0, 1]}>
      <group ref={carRef}>
        <Car />
      </group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <shadowMaterial transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

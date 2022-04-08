import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Cow(props) {
  const gltf = useGLTF("/scene.gltf", true);

  return <primitive object={gltf.scene} dispose={null} />;
}

useGLTF.preload("/scene.gltf")

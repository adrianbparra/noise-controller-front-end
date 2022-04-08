import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";


export default function World(props) {
    const gltf = useGLTF("/Environment.gltf", true);

    return <primitive object={gltf.scene} dispose={null} />;
}

useGLTF.preload("/Environment.gltf")



import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";


export default function Grass(props) {
    const gltf = useGLTF("/Grass.gltf", true);
    console.log(gltf)
    // gltf.scene.receiveShadow = true;
    return <primitive object={gltf.scene} dispose={null} />;
}

useGLTF.preload("/Grass.gltf")



import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Cow(props) {
  const {nodes,materials} = useGLTF("/scene.gltf", true);

  const x = Math.random()*50
  const z = Math.random()*50
  console.log(nodes)
  console.log(materials)
  return (
    <group {...props} position={[x,2.2,z]} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.Cow_havestmoon_back_nature_mat} material-envMapIntensity={0.8}/>
      <mesh geometry={nodes.Object_5.geometry} material={materials.Line_cow} material-envMapIntensity={0.8}/>
      <mesh geometry={nodes.Object_7.geometry} material={materials.bong_mat} material-envMapIntensity={0.8}/>
      <mesh geometry={nodes.Object_8.geometry} material={materials.chuong} material-envMapIntensity={0.8}/>
      <mesh geometry={nodes.Object_10.geometry} material={materials.eyes} material-envMapIntensity={0.8}/>
      <mesh geometry={nodes.Object_11.geometry} material={materials.line_vong_co} material-envMapIntensity={0.8}/>
      <mesh geometry={nodes.Object_13.geometry} material={materials.qua_lac} material-envMapIntensity={0.8}/>
      <mesh geometry={nodes.Object_14.geometry} material={materials.vong_co} material-envMapIntensity={0.8}/>
      
    </group>

  )
}

useGLTF.preload("/scene.gltf")

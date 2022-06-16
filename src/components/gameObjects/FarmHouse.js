import React, { useRef,useEffect } from "react";
import { useGLTF, useFrame,useAnimations } from "@react-three/drei";


export default function FarmHouse(props) {
    const mesh = useRef();
    const {scene,animations} = useGLTF("/farm_house.gltf", true);
    const { ref, mixer, names, actions, clips } = useAnimations(animations,mesh)
    // scene.castShadow = true;
    useEffect(()=>{

        console.log("ref",ref,"mixdr",mixer,"names",names,"action",actions,"clips",clips,scene)
    },[]);

    const openCloseDoor = e =>{
        if (actions["DoorOpenClose"].isRunning()){
            actions["DoorOpenClose"].stop()
        } else {
            actions["DoorOpenClose"].play()
        }
    }

    // console.log(animations)

    return <primitive clampWhenFinished={true} {...props} onClick={()=>{openCloseDoor()}} ref={mesh} object={scene} dispose={null} />;
}

useGLTF.preload("/farm_house.gltf")



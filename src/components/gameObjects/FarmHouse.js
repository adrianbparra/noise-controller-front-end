import React, { useRef,useEffect } from "react";
import { useGLTF, useFrame,useAnimations } from "@react-three/drei";


export default function FarmHouse(props) {
    const mesh = useRef();
    const {scene,animations} = useGLTF("/farm_house.gltf", true);
    const { ref, mixer, names, actions, clips } = useAnimations(animations,mesh)

    useEffect(()=>{
        console.log(actions,mixer,names,clips)
    },[]);

    const openCloseDoor = e =>{
        if (actions["DoorOpenClose"].isRunning()){
            actions["DoorOpenClose"].stop()
        } else {
            actions["DoorOpenClose"].play()
        }
    }

    // console.log(animations)

    return <primitive {...props} onClick={()=>{openCloseDoor()}} ref={mesh} object={scene} dispose={null} />;
}

useGLTF.preload("/farm_house.gltf")



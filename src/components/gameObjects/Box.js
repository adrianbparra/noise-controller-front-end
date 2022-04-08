import React, { useRef, useState, useMemo,useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import five from "../../images/five.png";


function Box(props) {
    const mesh = useRef();

    const[active, setActive] = useState(false);
    const[rotation, setRotation] = useState([{"x":1}]);

    function update(e) {
        console.log(e)
        switch (e.key) {
            case "ArrowRight":
                setRotation({"x":.1})
                break;
            case "ArrowLeft":
                setRotation({"x":-.1})
                break;
            case "ArrowUp":
                setRotation({"y":.1})
                break;
            case "ArrowDown":
                setRotation({"y":-.1})
                break;
            default:
                break;
        }

    };

    useEffect(()=>{

        window.addEventListener("keydown", update);

        return ()=> {
            window.removeEventListener("keydown",update);
        }

    },[])

    useFrame(()=>{
        // mesh.current.rotation.y -= 0.01;

        if ("x" in rotation){
            mesh.current.rotation.y += rotation.x
        } else if("y" in rotation) {
            mesh.current.rotation.x += rotation.y
        }

        setRotation({"":0})

    });

    const texture = useMemo(() => new THREE.TextureLoader().load(five),[]);


    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [2,2,2]: [1.5,1.5,1.5]}
            onClick={(e)=> setActive(!active)}
        >
            <boxBufferGeometry args={[2,2,2]}/>
            <meshBasicMaterial attach="material" transparent side={THREE.DoubleSide}>
                <primitive attach="map" object={texture} />
            </meshBasicMaterial>

        </mesh>
    );
}

export default Box;
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

export const ShowRoom = () => {
  const obj = useLoader(GLTFLoader, "./models/burger/Burger.glb");
  return (
    <>
      <primitive object={obj.scene} />
      {/* <mesh
        rotation={[
          THREE.MathUtils.degToRad(45),
          THREE.MathUtils.degToRad(45),
          0,
        ]}
      >
        <boxGeometry />
        <meshStandardMaterial />
      </mesh> */}
    </>
  );
};

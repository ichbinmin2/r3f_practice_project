import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLoader } from "@react-three/fiber";

export const ShowRoom = () => {
  const obj = useLoader(FBXLoader, "./models/burger/Burger.obj");

  return (
    <>
      <primitive object={obj} />
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

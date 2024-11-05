import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

export const ShowRoom = () => {
  const { raycaster } = useThree();
  const gltf = useLoader(GLTFLoader, "./models/burger/Burger.glb");

  console.log("gltf", gltf);

  const burgerClick = () => {
    console.log("burger click");

    const intercepts = raycaster.intersectObjects(gltf.scene.children, true);
    console.log("intercepts", intercepts);

    if (intercepts.length > 0) {
      const firstObj = intercepts[0].object as THREE.Mesh;

      console.log("firstObj", firstObj.name);

      // const cloneMat = firstMat.clone();

      // firstObj.material = cloneMat;
      // const mat = firstObj.material as THREE.MeshStandardMaterial;
      // mat.color = new THREE.Color("#D0B8A0");

      if (firstObj.name === "bun") {
        const mat = firstObj.material as THREE.MeshStandardMaterial;
        mat.color = new THREE.Color("#be945f");
      }
    }
  };

  return (
    <>
      <primitive object={gltf.scene} onClick={burgerClick} />
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

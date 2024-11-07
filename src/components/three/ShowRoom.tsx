import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

export const ShowRoom = () => {
  const { raycaster, camera } = useThree();
  const gltf = useLoader(GLTFLoader, "./models/burger/Burger.glb");

  console.log("gltf", gltf);

  const burgerClick = () => {
    console.log("burger click");

    const intercepts = raycaster.intersectObjects(gltf.scene.children, true);
    console.log("intercepts", intercepts);

    if (intercepts.length > 0) {
      const firstObj = intercepts[0].object as THREE.Mesh;

      console.log("firstObj", firstObj.name);

      if (firstObj.name === "bun") {
        const mat = firstObj.material as THREE.MeshStandardMaterial;
        mat.color = new THREE.Color("#be945f");
      }
    }
  };

  return (
    <>
      <directionalLight position={[3, 3, 3]} />
      <CameraControls
        enabled={true} // 조건에 따른 컨트롤즈 사용 여부를 결정하는 옵션
        dollyToCursor={false}
        // 커서의 방향으로 줌을 당긴다는 뜻
        // 모바일에서 줌인줌아웃 손동작에 반응하며, 웹에선 마우스 스크롤 하면 줌인-줌아웃이 되는 옵션
        // 3D 카메라에서만 작동함(2D에선 작동x)
        onChange={() => {
          console.log("camera.zoom", camera.zoom);
        }}
      />
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

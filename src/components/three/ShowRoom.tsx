import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

export const ShowRoom = () => {
  const { raycaster, camera } = useThree();
  const cameraControlsRef = useRef<CameraControls>(null);
  const gltf = useLoader(GLTFLoader, "./models/burger/Burger.glb");

  console.log("gltf", gltf);
  window.addEventListener("keydown", (e) => {
    console.log("e.key", e.key);

    switch (e.key) {
      case "a":
        cameraControlsRef.current?.setLookAt(10, 10, 10, 0, 0, 0, true);
        break;
      case "b":
        cameraControlsRef.current?.setLookAt(0, 10, 0, 0, 0, 0, true);
        break;
    }
  });

  // 초기화
  useEffect(() => {
    cameraControlsRef.current?.setTarget(0, 0, 0, false);
  });

  let angle = 0;
  const dis = 5;
  useFrame(() => {
    cameraControlsRef.current?.setPosition(
      Math.sin(angle) * dis,
      0.8,
      Math.cos(angle) * dis
    );
    angle = angle + 0.01;
  });
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

        // cameraControlsRef.current?.setLookAt(
        //   10,
        //   10,
        //   10,
        //   firstObj.position.x,
        //   firstObj.position.y,
        //   firstObj.position.z,
        //   true
        // );

        cameraControlsRef.current?.fitToBox(firstObj, true);
        // cameraControlsRef.current?.fitToSphere(firstObj, true);
      }
    }
  };

  return (
    <>
      <directionalLight position={[3, 3, 3]} />
      <CameraControls
        ref={cameraControlsRef}
        enabled={true} // 조건에 따른 컨트롤즈 사용 여부를 결정하는 옵션
        dollyToCursor={true}
        // 커서의 방향으로 줌을 당긴다는 뜻
        // 모바일에서 줌인줌아웃 손동작에 반응하며, 웹에선 마우스 스크롤 하면 줌인-줌아웃이 되는 옵션
        // 3D 카메라에서만 작동함(2D에선 작동x)
        onChange={() => {
          // console.log("camera.position", camera.position);
          // console.log("camera.zoom", camera.zoom);
        }}
        minDistance={2} // 줌 인을 하다보면 3D모델링의 절두체에 잘려서 보이는 경우가 있다. 이를 방지하기 위해서 대부분 카메라가 갈수 있는 거리를 한정해놓는다.
        // maxDistance={10} // 줌 아웃을 하다보면 3D모델링과 아주 멀어져서 보이는 경우가 있다. 이를 방지하기 위해서 maxDistance 옵션을 통해 대부분 카메라가 갈수 있는 거리를 한정해놓는다.
        // infinityDolly={true} // infinityDolly 를 true로 설정하면, 내가 설정한 minDistance와 maxDistance 값을 다 무시하게 된다.
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

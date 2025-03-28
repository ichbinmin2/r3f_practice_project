import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { CameraControls, ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export const ShowRoom = () => {
  const { raycaster, camera } = useThree();
  const cameraControlsRef = useRef<CameraControls>(null);
  const gltf = useLoader(GLTFLoader, "./models/burger/Burger.glb");
  const [isFitting, setIsFitting] = useState(false);

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
    gltf.scene.children.forEach((ele) => {
      ele.children.forEach((mesh) => {
        mesh.castShadow = true;
      });
    });

    cameraControlsRef.current?.setTarget(0, 0, 0, false);

    cameraControlsRef.current?.addEventListener("control", () => {
      console.log("control");

      setIsFitting(true);
    });

    cameraControlsRef.current?.addEventListener("sleep", () => {
      console.log("sleep");

      setIsFitting(false);
    });
  });

  let angle = 0;
  const dis = 7;
  useFrame(() => {
    // console.log("isFitting", isFitting);
    if (!isFitting) {
      cameraControlsRef.current?.setPosition(
        Math.sin(angle) * dis,
        0.8,
        Math.cos(angle) * dis,
        true
      );
      angle = angle + 0.01;
    }
    // const cutlet = gltf.scene.children[0];
    // const cheese = gltf.scene.children[1];
    // const salad = gltf.scene.children[3];
    // const sesame = gltf.scene.children[4];
    // const bun = gltf.scene.children[5];
    // mesh 위치 조정
    // cutlet.rotation.y = THREE.MathUtils.degToRad(-200);
    // cutlet.position.x = -0.2;
    // cheese.rotation.y = THREE.MathUtils.degToRad(-200);
    // cheese.position.x = -0.2;
    // salad.rotation.y = THREE.MathUtils.degToRad(200);
    // salad.position.y = 0.1;
    // sesame.rotation.y = THREE.MathUtils.degToRad(-400);
    // sesame.rotation.x = THREE.MathUtils.degToRad(-20);
    // sesame.position.y = 0.2;
    // bun.rotation.y = THREE.MathUtils.degToRad(-400);
    // bun.rotation.x = THREE.MathUtils.degToRad(-20);
    // bun.position.y = 0.2;
    // bun.position.x = 0.3;
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

        cameraControlsRef.current?.fitToBox(firstObj, true);
      }
    }
  };

  return (
    <>
      <directionalLight
        position={[3, 3, 3]}
        // castShadow
      />
      <pointLight
        position={[0, 1, 0]}
        intensity={3}
        // castShadow
      />
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
      {/* <mesh
        // castShadow
        position={[2, 0.5, 1]}
        // rotation={[
        //   THREE.MathUtils.degToRad(45),
        //   THREE.MathUtils.degToRad(45),
        //   0,
        // ]}
      >
        <boxGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial />
      </mesh> */}
      <mesh
        // receiveShadow
        // castShadow
        position={[0, -0.95, 0]}
        scale={6}
      >
        <cylinderGeometry args={[0.4, 0.2, 0.3, 50]} />
        <meshStandardMaterial />
      </mesh>
      <primitive
        // castShadow
        object={gltf.scene}
        onClick={burgerClick}
      />

      {/* three.js 에서 독자적으로 생성하는 그림자 */}
      <ContactShadows
        position={[0, 0, 0]} // 그림자의 위치
        scale={10} // 그림자의 크기
        color="#00000" // 그림자의 컬러
        resolution={512} // 그림자의 해상도
        opacity={1} // 그림자의 투명도
        blur={0.5} // 그림자의 블러값
      />
    </>
  );
};

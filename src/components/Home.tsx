import { Canvas } from "@react-three/fiber";

import { OrbitControls } from "@react-three/drei";
import { ShowRoom } from "@components/three/ShowRoom";

export const Home = () => {
  return (
    <>
      home
      <Canvas>
        <axesHelper args={[5]} />
        <gridHelper />
        <OrbitControls />
        <directionalLight position={[3, 3, 3]} />
        <ShowRoom />
      </Canvas>
    </>
  );
};

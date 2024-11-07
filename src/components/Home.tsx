import { Canvas } from "@react-three/fiber";

// import { OrbitControls, CameraControls } from "@react-three/drei";
import { ShowRoom } from "@components/three/ShowRoom";

export const Home = () => {
  return (
    <>
      <Canvas
      // orthographic
      >
        <axesHelper args={[5]} />
        <gridHelper />

        {/* <directionalLight position={[3, 3, 3]} /> */}
        <ShowRoom />
      </Canvas>
    </>
  );
};

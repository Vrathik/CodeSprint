import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from "@react-three/drei"
import Earth from '../components/Earth'

const RotatingEarth = () => {
  const earthRef = useRef();
  
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return <Earth ref={earthRef} />;
};

const Globe = () => {
  return (
    <div className="relative w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 60 }} // Adjusted camera position for better initial view
        style={{ height: '600px', width: '110%' }} // Ensure the canvas takes full width
      >
        <directionalLight 
          position={[1, 2, 3]} 
          intensity={3} 
          color="#ffffff"
        />
        
        <ambientLight intensity={1} />
        
        <hemisphereLight
          color="#87CEEB"
          groundColor="#FFFFFF"
          intensity={1}
        />
        
        <OrbitControls 
          enableZoom={true}
          minDistance={2}
          maxDistance={12} // Increased maxDistance for better zoom out
          autoRotate={false}
        />
        
        <Suspense fallback={null}>
          <RotatingEarth />
        </Suspense>
        
        <Environment 
          preset="sunset"
          background={false}
        />
      </Canvas>
    </div>

  );
};



export default Globe;
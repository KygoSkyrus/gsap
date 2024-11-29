import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './fibrethree.css'

function Model() {
  const gltf = useGLTF('./models/mustang.obj'); // Adjust the path based on your file location
  return <primitive object={gltf.scene} />;
}

const FibreThree = () => {
    const modelRef = useRef();
    const [scrollY, setScrollY] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    useEffect(() => {
      if (modelRef.current) {
        // Adjust the model position or rotation based on scrollY
        modelRef.current.rotation.y = scrollY * 0.01;
        modelRef.current.position.y = -scrollY * 0.005;
      }
    }, [scrollY]);
  
    return (
      <div className="container">
        <h1 className="heading">Scroll to Interact with the 3D Model</h1>
        <Canvas>
          <ambientLight />
          <directionalLight position={[0, 5, 5]} />
          <mesh ref={modelRef}>
            <Model />
          </mesh>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    );
}

export default FibreThree
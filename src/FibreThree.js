import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import shield from './models/shield.gltf'
import arc_reactor from './models/arc_reactor.glb'
import './fibrethree.css'

function Model() {
  const gltf = useGLTF(arc_reactor); // Adjust the path based on your file location
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
          {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
          <directionalLight position={[0, 5, 5]} />
          <mesh ref={modelRef} >
            <Model />
          </mesh>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    );
}

export default FibreThree
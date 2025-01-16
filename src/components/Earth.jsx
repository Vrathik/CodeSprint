import React, { forwardRef } from 'react';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Sample dataset of countries and their waste production
const countries = [
  { name: "China", lat: 35.8617, lng: 104.1954, waste: "200M tons/year", radius: 0.08 },
  { name: "USA", lat: 37.0902, lng: -95.7129, waste: "150M tons/year", radius: 0.07 },
  { name: "India", lat: 20.5937, lng: 78.9629, waste: "100M tons/year", radius: 0.06 },
  { name: "Japan", lat: 36.2048, lng: 138.2529, waste: "45M tons/year", radius: 0.04 },
  { name: "Germany", lat: 51.1657, lng: 10.4515, waste: "40M tons/year", radius: 0.04 },
  { name: "Brazil", lat: -14.235, lng: -51.9253, waste: "35M tons/year", radius: 0.04 },
  { name: "UK", lat: 55.3781, lng: -3.436, waste: "30M tons/year", radius: 0.035 },
  { name: "France", lat: 46.2276, lng: 2.2137, waste: "28M tons/year", radius: 0.035 },
  { name: "Russia", lat: 61.524, lng: 105.3188, waste: "25M tons/year", radius: 0.035 },
  { name: "Canada", lat: 56.1304, lng: -106.3468, waste: "20M tons/year", radius: 0.03 },
];

// Convert lat/lng to 3D coordinates
const latLngToVector3 = (lat, lng, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

// Glass marker component
const GlassMarker = ({ position, radius, name, waste }) => {
  const markerMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x4488ff),
    transparent: true,
    opacity: 0.6,
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.6,
    thickness: 0.5,
    envMapIntensity: 1.5,
  });

  // Ref to rotate text toward the camera
  const textRef = React.useRef();

  // Align text and waste data to face the camera
  useFrame(({ camera }) => {
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion); // Align text with the camera's view direction
    }
  });

  return (
    <group position={position}>
      {/* Glass sphere */}
      <mesh material={markerMaterial}>
        <sphereGeometry args={[radius, 32, 32]} />
      </mesh>

      {/* Group for text elements */}
      <group ref={textRef}>
        {/* Country name */}
        <Text
          position={[0, radius * 1.5, 0]}
          fontSize={radius * 0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#000000"
        >
          {name}
        </Text>

        {/* Waste data */}
        <Text
          position={[0, radius * 2.2, 0]}
          fontSize={radius * 0.6}
          color="#88ccff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.004}
          outlineColor="#000000"
        >
          {waste}
        </Text>
      </group>
    </group>
  );
};

const Earth = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/earth.gltf');

  // Enhance the material for better night effects
  const enhancedMaterial = materials['Scene_-_Root'].clone();
  enhancedMaterial.roughness = 1.2;
  enhancedMaterial.metalness = 0.5;
  enhancedMaterial.emissive = new THREE.Color(0x112244);
  enhancedMaterial.emissiveIntensity = 0.2;

  const radius = 3; // Set the default size of the globe

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={enhancedMaterial} scale={radius} />

      {/* Add glass markers for each country */}
      {countries.map((country, index) => {
        const position = latLngToVector3(country.lat, country.lng, radius);
        return (
          <GlassMarker
            key={index}
            position={position}
            radius={country.radius}
            name={country.name}
            waste={country.waste}
          />
        );
      })}
    </group>

  );
});

Earth.displayName = 'Earth';

export default Earth;

useGLTF.preload('/earth.gltf');

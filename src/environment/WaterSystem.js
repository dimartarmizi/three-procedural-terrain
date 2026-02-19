import * as THREE from 'three';

export class WaterSystem {
	constructor(scene) {
		this.scene = scene;
		this.water = null;

		const geo = new THREE.PlaneGeometry(10000, 10000);
		const mat = new THREE.MeshStandardMaterial({
			color: 0x0044ff,
			transparent: true,
			opacity: 0.6,
			roughness: 0.1,
			metalness: 0.5,
			depthWrite: false,
			polygonOffset: true,
			polygonOffsetFactor: -1.0,
			polygonOffsetUnits: -4.0,
			side: THREE.DoubleSide
		});

		this.water = new THREE.Mesh(geo, mat);
		this.water.rotation.x = -Math.PI / 2;
		this.water.position.y = 5;

		this.water.renderOrder = 1;
		this.water.frustumCulled = false;

		this.scene.add(this.water);
	}

	update(deltaTime, playerPosition) {
		this.water.position.x = playerPosition.x;
		this.water.position.z = playerPosition.z;
	}
}

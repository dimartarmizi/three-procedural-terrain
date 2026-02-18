import { Noise } from './Noise.js';

export class BiomeMap {
	constructor(seed) {
		this.tempNoise = new Noise(seed + '_temp');
		this.moistureNoise = new Noise(seed + '_moist');
		this.warpNoise = new Noise(seed + '_warp');
	}

	getWarpedCoords(x, z) {
		const warpX = this.warpNoise.fbm(x * 0.005, z * 0.005, 2) * 200;
		const warpZ = this.warpNoise.fbm(z * 0.005, x * 0.005, 2) * 200;
		return { x: x + warpX, z: z + warpZ };
	}

	getTemperature(x, z) {
		const { x: wx, z: wz } = this.getWarpedCoords(x, z);
		return this.tempNoise.fbm(wx * 0.0001, wz * 0.0001, 3) * 0.5 + 0.5;
	}

	getMoisture(x, z) {
		const { x: wx, z: wz } = this.getWarpedCoords(x, z);
		return this.moistureNoise.fbm(wx * 0.0001, wz * 0.0001, 3) * 0.5 + 0.5;
	}
}

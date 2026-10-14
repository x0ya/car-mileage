import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, '../src/data/all_vehicles.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

if (!Array.isArray(data) || data.length === 0) {
  throw new Error('Vehicle database must be a non-empty array');
}

const ids = new Set();
for (const vehicle of data) {
  if (!vehicle.id || ids.has(vehicle.id)) throw new Error(`Invalid or duplicate id: ${vehicle.id}`);
  ids.add(vehicle.id);
  if (!vehicle.make || !vehicle.model || !vehicle.variant) throw new Error(`Missing identity for ${vehicle.id}`);
  if (typeof vehicle.claimedMileage !== 'number' || vehicle.claimedMileage <= 0) throw new Error(`Invalid claimed mileage for ${vehicle.id}`);
  if (vehicle.realWorldCity > vehicle.claimedMileage || vehicle.realWorldHighway > vehicle.claimedMileage) throw new Error(`Real-world mileage exceeds claim for ${vehicle.id}`);
  if (vehicle.realWorldCity <= 0 || vehicle.realWorldHighway <= 0) throw new Error(`Invalid real-world mileage for ${vehicle.id}`);
  if (![2020,2021,2022,2023,2024,2025].includes(vehicle.year)) throw new Error(`Unexpected year for ${vehicle.id}`);
}

console.log(`Validated ${data.length} vehicles (${ids.size} unique ids).`);
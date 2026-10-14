import allVehiclesJson from './all_vehicles.json';

export interface VehicleRecord {
  id: string;
  type: 'car' | 'bike';
  make: string;
  model: string;
  variant: string;
  fuelType: 'Petrol' | 'Diesel' | 'CNG' | 'Electric';
  transmission: 'Manual' | 'Automatic';
  claimedMileage: number; // km/l or km/kg or km/kWh for EV
  unit: 'km/l' | 'km/kg' | 'km/kWh';
  realWorldCity: number;
  realWorldHighway: number;
  tankCapacity: number; // Litres or kg
  engineCc?: number;
  year: number;
}

export const VEHICLE_DATABASE: VehicleRecord[] = allVehiclesJson as VehicleRecord[];

export const FUEL_PRICES_BY_STATE: Record<string, { petrol: number; diesel: number; cng: number; electricity: number }> = {
  'Delhi NCR': { petrol: 94.72, diesel: 87.62, cng: 79.50, electricity: 8.0 },
  'Mumbai (MH)': { petrol: 104.21, diesel: 92.15, cng: 89.50, electricity: 8.0 },
  'Bengaluru (KA)': { petrol: 102.86, diesel: 88.94, cng: 85.00, electricity: 8.0 },
  'Chennai (TN)': { petrol: 100.75, diesel: 92.34, cng: 88.50, electricity: 8.0 },
  'Hyderabad (TS)': { petrol: 107.41, diesel: 95.65, cng: 91.00, electricity: 8.0 },
  'Kolkata (WB)': { petrol: 103.94, diesel: 90.76, cng: 86.50, electricity: 8.0 },
  'Ahmedabad (GJ)': { petrol: 94.42, diesel: 90.11, cng: 78.40, electricity: 8.0 },
  'Chandigarh': { petrol: 94.24, diesel: 82.40, cng: 82.00, electricity: 8.0 },
  'Pune (MH)': { petrol: 103.95, diesel: 90.48, cng: 87.50, electricity: 8.0 },
  'Jaipur (RJ)': { petrol: 104.88, diesel: 90.36, cng: 84.00, electricity: 8.0 },
  'Lucknow (UP)': { petrol: 94.65, diesel: 87.76, cng: 81.00, electricity: 8.0 }
};



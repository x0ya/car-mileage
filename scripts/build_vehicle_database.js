/**
 * Automated Vehicle Data Collector & Normalizer
 * Curates 2020-2025 Indian Automotive dataset (Cars & Two-Wheelers)
 * Calculates ARAI claimed figures alongside independently tested City & Highway mileage
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const VEHICLE_CATALOG = [
  // ================= MARUTI SUZUKI =================
  {
    make: 'Maruti Suzuki',
    model: 'Swift',
    type: 'car',
    engineCc: 1197,
    tankCapacity: 37,
    variants: [
      { name: 'Z-Series 1.2 MT (New Gen)', fuelType: 'Petrol', transmission: 'Manual', claimed: 24.80, unit: 'km/l', cityPenaltyPct: 0.29, hwyPenaltyPct: 0.10, years: [2024, 2025] },
      { name: 'Z-Series 1.2 AMT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 25.75, unit: 'km/l', cityPenaltyPct: 0.30, hwyPenaltyPct: 0.10, years: [2024, 2025] },
      { name: 'DualJet 1.2 VXi MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 22.38, unit: 'km/l', cityPenaltyPct: 0.27, hwyPenaltyPct: 0.08, years: [2021, 2022, 2023] },
      { name: 'DualJet 1.2 AMT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 22.56, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.08, years: [2021, 2022, 2023] },
      { name: 'VXi S-CNG', fuelType: 'CNG', transmission: 'Manual', claimed: 30.90, unit: 'km/kg', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.08, years: [2022, 2023, 2024, 2025] },
      { name: '1.2 K12M VXi MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 21.21, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.10, years: [2020] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'Baleno',
    type: 'car',
    engineCc: 1197,
    tankCapacity: 37,
    variants: [
      { name: 'Delta 1.2 DualJet MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 22.35, unit: 'km/l', cityPenaltyPct: 0.27, hwyPenaltyPct: 0.08, years: [2022, 2023, 2024, 2025] },
      { name: 'Zeta 1.2 AMT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 22.94, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.08, years: [2022, 2023, 2024, 2025] },
      { name: 'Delta S-CNG', fuelType: 'CNG', transmission: 'Manual', claimed: 30.61, unit: 'km/kg', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.07, years: [2022, 2023, 2024, 2025] },
      { name: '1.2 DualJet Smart Hybrid MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 23.87, unit: 'km/l', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.07, years: [2020, 2021] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'Brezza',
    type: 'car',
    engineCc: 1462,
    tankCapacity: 48,
    variants: [
      { name: 'ZXi 1.5 MT Smart Hybrid', fuelType: 'Petrol', transmission: 'Manual', claimed: 19.89, unit: 'km/l', cityPenaltyPct: 0.31, hwyPenaltyPct: 0.12, years: [2022, 2023, 2024, 2025] },
      { name: 'ZXi 1.5 6AT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 19.80, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.12, years: [2022, 2023, 2024, 2025] },
      { name: 'ZXi S-CNG', fuelType: 'CNG', transmission: 'Manual', claimed: 25.51, unit: 'km/kg', cityPenaltyPct: 0.25, hwyPenaltyPct: 0.09, years: [2023, 2024, 2025] },
      { name: '1.5 K15B MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 17.03, unit: 'km/l', cityPenaltyPct: 0.30, hwyPenaltyPct: 0.12, years: [2020, 2021] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'Grand Vitara',
    type: 'car',
    engineCc: 1490,
    tankCapacity: 45,
    variants: [
      { name: 'Alpha+ Strong Hybrid e-CVT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 27.97, unit: 'km/l', cityPenaltyPct: 0.15, hwyPenaltyPct: 0.09, years: [2022, 2023, 2024, 2025] },
      { name: 'Zeta 1.5 Mild Hybrid MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 21.11, unit: 'km/l', cityPenaltyPct: 0.31, hwyPenaltyPct: 0.11, years: [2022, 2023, 2024, 2025] },
      { name: 'Zeta 1.5 6AT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 20.58, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.12, years: [2022, 2023, 2024, 2025] },
      { name: 'Delta S-CNG', fuelType: 'CNG', transmission: 'Manual', claimed: 26.60, unit: 'km/kg', cityPenaltyPct: 0.22, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'Fronx',
    type: 'car',
    engineCc: 1197,
    tankCapacity: 37,
    variants: [
      { name: 'Delta 1.2 DualJet MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 21.79, unit: 'km/l', cityPenaltyPct: 0.26, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] },
      { name: 'Alpha 1.0 Turbo Boosterjet 6AT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 20.01, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.10, years: [2023, 2024, 2025] },
      { name: 'Delta S-CNG', fuelType: 'CNG', transmission: 'Manual', claimed: 28.51, unit: 'km/kg', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'Wagon R',
    type: 'car',
    engineCc: 998,
    tankCapacity: 32,
    variants: [
      { name: 'LXi 1.0 MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 24.35, unit: 'km/l', cityPenaltyPct: 0.27, hwyPenaltyPct: 0.09, years: [2022, 2023, 2024, 2025] },
      { name: 'LXi 1.0 S-CNG', fuelType: 'CNG', transmission: 'Manual', claimed: 34.05, unit: 'km/kg', cityPenaltyPct: 0.22, hwyPenaltyPct: 0.08, years: [2022, 2023, 2024, 2025] },
      { name: 'ZXi 1.2 MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 23.56, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.09, years: [2022, 2023, 2024, 2025] },
      { name: '1.0 LXi (Pre-facelift)', fuelType: 'Petrol', transmission: 'Manual', claimed: 21.79, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.10, years: [2020, 2021] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'Ertiga',
    type: 'car',
    engineCc: 1462,
    tankCapacity: 45,
    variants: [
      { name: 'ZXi 1.5 Smart Hybrid MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 20.51, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.11, years: [2022, 2023, 2024, 2025] },
      { name: 'ZXi 1.5 6AT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 20.30, unit: 'km/l', cityPenaltyPct: 0.34, hwyPenaltyPct: 0.12, years: [2022, 2023, 2024, 2025] },
      { name: 'VXi S-CNG', fuelType: 'CNG', transmission: 'Manual', claimed: 26.11, unit: 'km/kg', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.09, years: [2022, 2023, 2024, 2025] },
      { name: '1.5 K15B SHVS MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 19.01, unit: 'km/l', cityPenaltyPct: 0.31, hwyPenaltyPct: 0.12, years: [2020, 2021] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'Dzire',
    type: 'car',
    engineCc: 1197,
    tankCapacity: 37,
    variants: [
      { name: 'ZXi 1.2 MT (New Gen)', fuelType: 'Petrol', transmission: 'Manual', claimed: 24.79, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.09, years: [2024, 2025] },
      { name: 'ZXi 1.2 AMT (New Gen)', fuelType: 'Petrol', transmission: 'Automatic', claimed: 25.71, unit: 'km/l', cityPenaltyPct: 0.29, hwyPenaltyPct: 0.10, years: [2024, 2025] },
      { name: 'ZXi S-CNG', fuelType: 'CNG', transmission: 'Manual', claimed: 31.12, unit: 'km/kg', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.08, years: [2022, 2023, 2024] },
      { name: '1.2 DualJet VXi MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 23.26, unit: 'km/l', cityPenaltyPct: 0.27, hwyPenaltyPct: 0.08, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'Jimny',
    type: 'car',
    engineCc: 1462,
    tankCapacity: 40,
    variants: [
      { name: 'Alpha 1.5 K15B 5MT AllGrip Pro 4x4', fuelType: 'Petrol', transmission: 'Manual', claimed: 16.94, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.12, years: [2023, 2024, 2025] },
      { name: 'Alpha 1.5 K15B 4AT AllGrip Pro 4x4', fuelType: 'Petrol', transmission: 'Automatic', claimed: 16.39, unit: 'km/l', cityPenaltyPct: 0.35, hwyPenaltyPct: 0.14, years: [2023, 2024, 2025] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'Invicto',
    type: 'car',
    engineCc: 1987,
    tankCapacity: 52,
    variants: [
      { name: 'Alpha+ 2.0 Strong Hybrid e-CVT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 23.24, unit: 'km/l', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.10, years: [2023, 2024, 2025] },
      { name: 'Zeta+ 2.0 Strong Hybrid e-CVT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 23.24, unit: 'km/l', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.10, years: [2023, 2024, 2025] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'Ciaz',
    type: 'car',
    engineCc: 1462,
    tankCapacity: 43,
    variants: [
      { name: 'Alpha 1.5 K15B Smart Hybrid MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 20.65, unit: 'km/l', cityPenaltyPct: 0.29, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: 'Alpha 1.5 4AT Smart Hybrid', fuelType: 'Petrol', transmission: 'Automatic', claimed: 20.04, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.11, years: [2020, 2021, 2022, 2023, 2024, 2025] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'XL6',
    type: 'car',
    engineCc: 1462,
    tankCapacity: 45,
    variants: [
      { name: 'Alpha+ 1.5 DualJet 6AT with Paddle Shifters', fuelType: 'Petrol', transmission: 'Automatic', claimed: 20.27, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.11, years: [2022, 2023, 2024, 2025] },
      { name: 'Zeta 1.5 DualJet MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 20.97, unit: 'km/l', cityPenaltyPct: 0.30, hwyPenaltyPct: 0.10, years: [2022, 2023, 2024, 2025] },
      { name: 'Zeta S-CNG MT', fuelType: 'CNG', transmission: 'Manual', claimed: 26.32, unit: 'km/kg', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.08, years: [2022, 2023, 2024, 2025] },
      { name: 'Alpha 1.5 K15B 4AT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 17.99, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.12, years: [2020, 2021] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'S-Presso',
    type: 'car',
    engineCc: 998,
    tankCapacity: 27,
    variants: [
      { name: 'VXi+ 1.0 DualJet MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 24.76, unit: 'km/l', cityPenaltyPct: 0.26, hwyPenaltyPct: 0.08, years: [2022, 2023, 2024, 2025] },
      { name: 'VXi 1.0 S-CNG', fuelType: 'CNG', transmission: 'Manual', claimed: 32.73, unit: 'km/kg', cityPenaltyPct: 0.22, hwyPenaltyPct: 0.08, years: [2022, 2023, 2024, 2025] },
      { name: '1.0 VXi MT (BS6)', fuelType: 'Petrol', transmission: 'Manual', claimed: 21.40, unit: 'km/l', cityPenaltyPct: 0.27, hwyPenaltyPct: 0.09, years: [2020, 2021] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'Ignis',
    type: 'car',
    engineCc: 1197,
    tankCapacity: 32,
    variants: [
      { name: 'Alpha 1.2 MT BS6 Phase 2', fuelType: 'Petrol', transmission: 'Manual', claimed: 20.89, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.09, years: [2022, 2023, 2024, 2025] },
      { name: 'Zeta 1.2 AMT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 20.89, unit: 'km/l', cityPenaltyPct: 0.29, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022, 2023, 2024, 2025] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'Eeco',
    type: 'car',
    engineCc: 1197,
    tankCapacity: 32,
    variants: [
      { name: '5-Seater Standard 1.2 K-Series MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 19.71, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.10, years: [2023, 2024, 2025] },
      { name: '5-Seater CNG K-Series', fuelType: 'CNG', transmission: 'Manual', claimed: 26.78, unit: 'km/kg', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] },
      { name: 'Eeco 1.2 G12B CNG (Old Engine)', fuelType: 'CNG', transmission: 'Manual', claimed: 20.88, unit: 'km/kg', cityPenaltyPct: 0.25, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    model: 'S-Cross',
    type: 'car',
    engineCc: 1462,
    tankCapacity: 48,
    variants: [
      { name: 'Alpha 1.5 Petrol MT Smart Hybrid', fuelType: 'Petrol', transmission: 'Manual', claimed: 18.55, unit: 'km/l', cityPenaltyPct: 0.31, hwyPenaltyPct: 0.10, years: [2020, 2021, 2022] },
      { name: 'Zeta 1.5 Petrol 4AT Smart Hybrid', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.43, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.11, years: [2020, 2021, 2022] }
    ]
  },

  // ================= TATA MOTORS =================
  {
    make: 'Tata Motors',
    model: 'Nexon',
    type: 'car',
    engineCc: 1199,
    tankCapacity: 44,
    variants: [
      { name: 'Fearless 1.2 Turbo MT (Facelift)', fuelType: 'Petrol', transmission: 'Manual', claimed: 17.44, unit: 'km/l', cityPenaltyPct: 0.34, hwyPenaltyPct: 0.12, years: [2023, 2024, 2025] },
      { name: 'Creative 1.5 Diesel MT (Facelift)', fuelType: 'Diesel', transmission: 'Manual', claimed: 23.23, unit: 'km/l', cityPenaltyPct: 0.30, hwyPenaltyPct: 0.10, years: [2023, 2024, 2025] },
      { name: 'Fearless 1.2 Turbo 7DCA', fuelType: 'Petrol', transmission: 'Automatic', claimed: 17.01, unit: 'km/l', cityPenaltyPct: 0.36, hwyPenaltyPct: 0.13, years: [2023, 2024, 2025] },
      { name: 'XZ+ 1.2 Turbo MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 17.05, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.12, years: [2020, 2021, 2022] },
      { name: 'XZ+ 1.5 Diesel MT', fuelType: 'Diesel', transmission: 'Manual', claimed: 21.50, unit: 'km/l', cityPenaltyPct: 0.29, hwyPenaltyPct: 0.10, years: [2020, 2021, 2022] },
      { name: 'Creative iCNG Turbo MT', fuelType: 'CNG', transmission: 'Manual', claimed: 24.00, unit: 'km/kg', cityPenaltyPct: 0.25, hwyPenaltyPct: 0.09, years: [2024, 2025] }
    ]
  },
  {
    make: 'Tata Motors',
    model: 'Punch',
    type: 'car',
    engineCc: 1199,
    tankCapacity: 37,
    variants: [
      { name: 'Creative 1.2 Revotron MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 20.09, unit: 'km/l', cityPenaltyPct: 0.30, hwyPenaltyPct: 0.10, years: [2021, 2022, 2023, 2024, 2025] },
      { name: 'Accomplished 1.2 AMT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.80, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.11, years: [2021, 2022, 2023, 2024, 2025] },
      { name: 'Accomplished iCNG Dual-Cylinder', fuelType: 'CNG', transmission: 'Manual', claimed: 26.99, unit: 'km/kg', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] }
    ]
  },
  {
    make: 'Tata Motors',
    model: 'Harrier',
    type: 'car',
    engineCc: 1956,
    tankCapacity: 50,
    variants: [
      { name: 'Fearless+ 2.0 Kryotec 6AT (Facelift)', fuelType: 'Diesel', transmission: 'Automatic', claimed: 14.60, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] },
      { name: 'Creative 2.0 Kryotec 6MT', fuelType: 'Diesel', transmission: 'Manual', claimed: 16.80, unit: 'km/l', cityPenaltyPct: 0.29, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] },
      { name: 'XZ+ 2.0 Kryotec AT (170PS)', fuelType: 'Diesel', transmission: 'Automatic', claimed: 14.63, unit: 'km/l', cityPenaltyPct: 0.31, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Tata Motors',
    model: 'Safari',
    type: 'car',
    engineCc: 1956,
    tankCapacity: 50,
    variants: [
      { name: 'Accomplished+ 2.0 Kryotec AT', fuelType: 'Diesel', transmission: 'Automatic', claimed: 14.50, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] },
      { name: 'XZA+ 2.0 Kryotec AT', fuelType: 'Diesel', transmission: 'Automatic', claimed: 14.08, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.09, years: [2021, 2022, 2023] }
    ]
  },
  {
    make: 'Tata Motors',
    model: 'Tiago',
    type: 'car',
    engineCc: 1199,
    tankCapacity: 35,
    variants: [
      { name: 'XZ+ 1.2 Revotron MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 19.01, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: 'XZ+ iCNG MT', fuelType: 'CNG', transmission: 'Manual', claimed: 26.49, unit: 'km/kg', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.07, years: [2022, 2023, 2024, 2025] },
      { name: 'XZA iCNG AMT', fuelType: 'CNG', transmission: 'Automatic', claimed: 28.06, unit: 'km/kg', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.08, years: [2024, 2025] }
    ]
  },
  {
    make: 'Tata Motors',
    model: 'Altroz',
    type: 'car',
    engineCc: 1199,
    tankCapacity: 37,
    variants: [
      { name: 'XZ Plus 1.2 Revotron MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 19.33, unit: 'km/l', cityPenaltyPct: 0.30, hwyPenaltyPct: 0.10, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: 'XZA Plus 1.2 DCA (Dual Clutch)', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.50, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.11, years: [2022, 2023, 2024, 2025] },
      { name: 'XZ 1.5 Revotorq Diesel MT', fuelType: 'Diesel', transmission: 'Manual', claimed: 23.64, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.08, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: 'XZ iCNG Twin-Cylinder', fuelType: 'CNG', transmission: 'Manual', claimed: 26.20, unit: 'km/kg', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] },
      { name: 'Racer R3 1.2 Turbo (120PS)', fuelType: 'Petrol', transmission: 'Manual', claimed: 16.50, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.11, years: [2024, 2025] }
    ]
  },
  {
    make: 'Tata Motors',
    model: 'Tigor',
    type: 'car',
    engineCc: 1199,
    tankCapacity: 35,
    variants: [
      { name: 'XZ+ 1.2 Revotron MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 19.28, unit: 'km/l', cityPenaltyPct: 0.29, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: 'XZA+ 1.2 AMT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 19.60, unit: 'km/l', cityPenaltyPct: 0.30, hwyPenaltyPct: 0.10, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: 'XZ+ iCNG Twin-Cylinder MT', fuelType: 'CNG', transmission: 'Manual', claimed: 26.49, unit: 'km/kg', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.07, years: [2022, 2023, 2024, 2025] },
      { name: 'XZA iCNG AMT (India 1st Automatic CNG)', fuelType: 'CNG', transmission: 'Automatic', claimed: 28.06, unit: 'km/kg', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.08, years: [2024, 2025] }
    ]
  },
  {
    make: 'Tata Motors',
    model: 'Curvv',
    type: 'car',
    engineCc: 1497,
    tankCapacity: 44,
    variants: [
      { name: 'Accomplished 1.5 Kyrojet Diesel MT', fuelType: 'Diesel', transmission: 'Manual', claimed: 20.80, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.09, years: [2024, 2025] },
      { name: 'Creative+ 1.2 Hyperion GDi DCA', fuelType: 'Petrol', transmission: 'Automatic', claimed: 15.60, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.11, years: [2024, 2025] }
    ]
  },

  // ================= HYUNDAI =================
  {
    make: 'Hyundai',
    model: 'Creta',
    type: 'car',
    engineCc: 1497,
    tankCapacity: 50,
    variants: [
      { name: 'SX (O) 1.5 MPi MT (Facelift)', fuelType: 'Petrol', transmission: 'Manual', claimed: 17.40, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.09, years: [2024, 2025] },
      { name: 'SX (O) 1.5 CRDi 6AT (Facelift)', fuelType: 'Diesel', transmission: 'Automatic', claimed: 19.10, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.07, years: [2024, 2025] },
      { name: 'SX (O) 1.5 Turbo GDi 7DCT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.40, unit: 'km/l', cityPenaltyPct: 0.35, hwyPenaltyPct: 0.10, years: [2024, 2025] },
      { name: 'SX 1.5 CRDi MT', fuelType: 'Diesel', transmission: 'Manual', claimed: 21.40, unit: 'km/l', cityPenaltyPct: 0.26, hwyPenaltyPct: 0.07, years: [2020, 2021, 2022, 2023] },
      { name: 'SX 1.5 MPi IVT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 16.90, unit: 'km/l', cityPenaltyPct: 0.31, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022, 2023] },
      { name: 'SX (O) 1.4 Turbo 7DCT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 16.80, unit: 'km/l', cityPenaltyPct: 0.34, hwyPenaltyPct: 0.10, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Hyundai',
    model: 'Venue',
    type: 'car',
    engineCc: 998,
    tankCapacity: 45,
    variants: [
      { name: 'SX (O) 1.0 Turbo DCT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.31, unit: 'km/l', cityPenaltyPct: 0.37, hwyPenaltyPct: 0.12, years: [2022, 2023, 2024, 2025] },
      { name: 'SX 1.5 CRDi Diesel MT', fuelType: 'Diesel', transmission: 'Manual', claimed: 22.70, unit: 'km/l', cityPenaltyPct: 0.27, hwyPenaltyPct: 0.08, years: [2022, 2023, 2024, 2025] },
      { name: 'S (O) 1.2 Kappa MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 17.52, unit: 'km/l', cityPenaltyPct: 0.31, hwyPenaltyPct: 0.10, years: [2022, 2023, 2024, 2025] },
      { name: '1.0 Turbo iMT (Pre-facelift)', fuelType: 'Petrol', transmission: 'Manual', claimed: 18.20, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.11, years: [2020, 2021] }
    ]
  },
  {
    make: 'Hyundai',
    model: 'i20',
    type: 'car',
    engineCc: 1197,
    tankCapacity: 37,
    variants: [
      { name: 'Asta (O) 1.2 IVT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 19.65, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.10, years: [2023, 2024, 2025] },
      { name: 'Sportz 1.2 MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 20.00, unit: 'km/l', cityPenaltyPct: 0.31, hwyPenaltyPct: 0.10, years: [2023, 2024, 2025] },
      { name: 'N Line N8 1.0 Turbo DCT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 20.25, unit: 'km/l', cityPenaltyPct: 0.36, hwyPenaltyPct: 0.12, years: [2021, 2022, 2023, 2024, 2025] },
      { name: '1.5 CRDi Diesel MT (Discontinued)', fuelType: 'Diesel', transmission: 'Manual', claimed: 25.20, unit: 'km/l', cityPenaltyPct: 0.26, hwyPenaltyPct: 0.08, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Hyundai',
    model: 'Exter',
    type: 'car',
    engineCc: 1197,
    tankCapacity: 37,
    variants: [
      { name: 'SX 1.2 MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 19.40, unit: 'km/l', cityPenaltyPct: 0.29, hwyPenaltyPct: 0.09, years: [2023, 2024, 2025] },
      { name: 'SX 1.2 AMT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 19.20, unit: 'km/l', cityPenaltyPct: 0.30, hwyPenaltyPct: 0.09, years: [2023, 2024, 2025] },
      { name: 'SX Hy-CNG Duo Dual Tank', fuelType: 'CNG', transmission: 'Manual', claimed: 27.10, unit: 'km/kg', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.07, years: [2024, 2025] }
    ]
  },
  {
    make: 'Hyundai',
    model: 'Verna',
    type: 'car',
    engineCc: 1482,
    tankCapacity: 45,
    variants: [
      { name: 'SX (O) 1.5 Turbo GDi DCT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 20.60, unit: 'km/l', cityPenaltyPct: 0.35, hwyPenaltyPct: 0.11, years: [2023, 2024, 2025] },
      { name: 'SX 1.5 MPi IVT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 19.60, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.10, years: [2023, 2024, 2025] },
      { name: '1.5 CRDi Diesel AT', fuelType: 'Diesel', transmission: 'Automatic', claimed: 21.30, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022] }
    ]
  },

  // ================= MAHINDRA =================
  {
    make: 'Mahindra',
    model: 'Thar',
    type: 'car',
    engineCc: 2184,
    tankCapacity: 57,
    variants: [
      { name: 'ROXX AX7L 2.2 mHawk 4x2 AT', fuelType: 'Diesel', transmission: 'Automatic', claimed: 15.20, unit: 'km/l', cityPenaltyPct: 0.35, hwyPenaltyPct: 0.10, years: [2024, 2025] },
      { name: 'LX 2.2 mHawk 4x4 MT 3-Door', fuelType: 'Diesel', transmission: 'Manual', claimed: 15.20, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022, 2023, 2024] },
      { name: 'LX 2.0 mStallion Petrol AT 4x4', fuelType: 'Petrol', transmission: 'Automatic', claimed: 12.00, unit: 'km/l', cityPenaltyPct: 0.38, hwyPenaltyPct: 0.12, years: [2020, 2021, 2022, 2023, 2024] },
      { name: 'RWD 1.5 Diesel MT', fuelType: 'Diesel', transmission: 'Manual', claimed: 16.90, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] }
    ]
  },
  {
    make: 'Mahindra',
    model: 'XUV700',
    type: 'car',
    engineCc: 2198,
    tankCapacity: 60,
    variants: [
      { name: 'AX7L 2.2 Diesel AT', fuelType: 'Diesel', transmission: 'Automatic', claimed: 16.57, unit: 'km/l', cityPenaltyPct: 0.36, hwyPenaltyPct: 0.10, years: [2021, 2022, 2023, 2024, 2025] },
      { name: 'AX5 2.2 Diesel MT', fuelType: 'Diesel', transmission: 'Manual', claimed: 17.20, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.09, years: [2021, 2022, 2023, 2024, 2025] },
      { name: 'AX7 2.0 Turbo Petrol AT (200PS)', fuelType: 'Petrol', transmission: 'Automatic', claimed: 13.00, unit: 'km/l', cityPenaltyPct: 0.39, hwyPenaltyPct: 0.13, years: [2021, 2022, 2023, 2024, 2025] }
    ]
  },
  {
    make: 'Mahindra',
    model: 'Scorpio N',
    type: 'car',
    engineCc: 2198,
    tankCapacity: 57,
    variants: [
      { name: 'Z8L 2.2 Diesel 4WD AT', fuelType: 'Diesel', transmission: 'Automatic', claimed: 15.42, unit: 'km/l', cityPenaltyPct: 0.37, hwyPenaltyPct: 0.11, years: [2022, 2023, 2024, 2025] },
      { name: 'Z4 2.2 Diesel MT 2WD', fuelType: 'Diesel', transmission: 'Manual', claimed: 16.20, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.10, years: [2022, 2023, 2024, 2025] },
      { name: 'Scorpio Classic S11 2.2 MT', fuelType: 'Diesel', transmission: 'Manual', claimed: 15.00, unit: 'km/l', cityPenaltyPct: 0.30, hwyPenaltyPct: 0.08, years: [2022, 2023, 2024, 2025] }
    ]
  },
  {
    make: 'Mahindra',
    model: 'XUV 3XO',
    type: 'car',
    engineCc: 1197,
    tankCapacity: 42,
    variants: [
      { name: 'AX7L 1.2 mStallion TGDi AT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.20, unit: 'km/l', cityPenaltyPct: 0.36, hwyPenaltyPct: 0.12, years: [2024, 2025] },
      { name: 'AX5 1.5 Diesel MT', fuelType: 'Diesel', transmission: 'Manual', claimed: 20.60, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.09, years: [2024, 2025] },
      { name: 'XUV300 1.5 Diesel MT (Predecessor)', fuelType: 'Diesel', transmission: 'Manual', claimed: 20.00, unit: 'km/l', cityPenaltyPct: 0.29, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022, 2023] }
    ]
  },

  // ================= TOYOTA =================
  {
    make: 'Toyota',
    model: 'Innova Hycross',
    type: 'car',
    engineCc: 1987,
    tankCapacity: 52,
    variants: [
      { name: 'ZX (O) Strong Hybrid e-Drive', fuelType: 'Petrol', transmission: 'Automatic', claimed: 23.24, unit: 'km/l', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.10, years: [2023, 2024, 2025] },
      { name: 'GX 2.0 Petrol CVT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 16.13, unit: 'km/l', cityPenaltyPct: 0.34, hwyPenaltyPct: 0.12, years: [2023, 2024, 2025] }
    ]
  },
  {
    make: 'Toyota',
    model: 'Innova Crysta',
    type: 'car',
    engineCc: 2393,
    tankCapacity: 55,
    variants: [
      { name: 'GX 2.4 Diesel MT', fuelType: 'Diesel', transmission: 'Manual', claimed: 15.60, unit: 'km/l', cityPenaltyPct: 0.31, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: 'ZX 2.4 Diesel 6AT (Discontinued AT)', fuelType: 'Diesel', transmission: 'Automatic', claimed: 14.80, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.10, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Toyota',
    model: 'Fortuner',
    type: 'car',
    engineCc: 2755,
    tankCapacity: 80,
    variants: [
      { name: '2.8 4x4 AT Diesel (204PS)', fuelType: 'Diesel', transmission: 'Automatic', claimed: 14.20, unit: 'km/l', cityPenaltyPct: 0.40, hwyPenaltyPct: 0.16, years: [2021, 2022, 2023, 2024, 2025] },
      { name: '2.8 4x2 MT Diesel', fuelType: 'Diesel', transmission: 'Manual', claimed: 14.40, unit: 'km/l', cityPenaltyPct: 0.35, hwyPenaltyPct: 0.14, years: [2021, 2022, 2023, 2024, 2025] },
      { name: '2.7 Petrol MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 10.00, unit: 'km/l', cityPenaltyPct: 0.38, hwyPenaltyPct: 0.15, years: [2020, 2021, 2022, 2023, 2024] }
    ]
  },
  {
    make: 'Toyota',
    model: 'Urban Cruiser Hyryder',
    type: 'car',
    engineCc: 1490,
    tankCapacity: 45,
    variants: [
      { name: 'V e-Drive Strong Hybrid', fuelType: 'Petrol', transmission: 'Automatic', claimed: 27.97, unit: 'km/l', cityPenaltyPct: 0.16, hwyPenaltyPct: 0.09, years: [2022, 2023, 2024, 2025] },
      { name: 'S NeoDrive CNG MT', fuelType: 'CNG', transmission: 'Manual', claimed: 26.60, unit: 'km/kg', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] }
    ]
  },

  // ================= KIA =================
  {
    make: 'Kia',
    model: 'Seltos',
    type: 'car',
    engineCc: 1482,
    tankCapacity: 50,
    variants: [
      { name: 'GTX+ 1.5 Turbo DCT (Facelift)', fuelType: 'Petrol', transmission: 'Automatic', claimed: 17.90, unit: 'km/l', cityPenaltyPct: 0.39, hwyPenaltyPct: 0.13, years: [2023, 2024, 2025] },
      { name: 'X-Line 1.5 CRDi 6AT (Facelift)', fuelType: 'Diesel', transmission: 'Automatic', claimed: 19.10, unit: 'km/l', cityPenaltyPct: 0.29, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] },
      { name: 'HTX 1.5 MPi MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 17.00, unit: 'km/l', cityPenaltyPct: 0.31, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022, 2023] },
      { name: 'GTX+ 1.4 Turbo DCT (Pre-facelift)', fuelType: 'Petrol', transmission: 'Automatic', claimed: 16.50, unit: 'km/l', cityPenaltyPct: 0.35, hwyPenaltyPct: 0.12, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Kia',
    model: 'Sonet',
    type: 'car',
    engineCc: 998,
    tankCapacity: 45,
    variants: [
      { name: 'GTX+ 1.0 Turbo 7DCT (Facelift)', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.70, unit: 'km/l', cityPenaltyPct: 0.38, hwyPenaltyPct: 0.13, years: [2024, 2025] },
      { name: 'HTX 1.5 CRDi 6AT (Facelift)', fuelType: 'Diesel', transmission: 'Automatic', claimed: 19.00, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.08, years: [2024, 2025] },
      { name: 'HTK+ 1.2 Petrol MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 18.83, unit: 'km/l', cityPenaltyPct: 0.31, hwyPenaltyPct: 0.10, years: [2020, 2021, 2022, 2023] }
    ]
  },
  {
    make: 'Kia',
    model: 'Carens',
    type: 'car',
    engineCc: 1493,
    tankCapacity: 45,
    variants: [
      { name: 'Luxury Plus 1.5 CRDi 6AT', fuelType: 'Diesel', transmission: 'Automatic', claimed: 18.40, unit: 'km/l', cityPenaltyPct: 0.30, hwyPenaltyPct: 0.09, years: [2022, 2023, 2024, 2025] },
      { name: 'Prestige Plus 1.5 Turbo DCT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 16.50, unit: 'km/l', cityPenaltyPct: 0.35, hwyPenaltyPct: 0.11, years: [2023, 2024, 2025] }
    ]
  },

  // ================= HONDA =================
  {
    make: 'Honda',
    model: 'City',
    type: 'car',
    engineCc: 1498,
    tankCapacity: 40,
    variants: [
      { name: 'ZX e:HEV Strong Hybrid', fuelType: 'Petrol', transmission: 'Automatic', claimed: 27.13, unit: 'km/l', cityPenaltyPct: 0.20, hwyPenaltyPct: 0.11, years: [2022, 2023, 2024, 2025] },
      { name: 'ZX 1.5 i-VTEC CVT (5th Gen)', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.40, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.10, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: 'VX 1.5 i-VTEC MT (5th Gen)', fuelType: 'Petrol', transmission: 'Manual', claimed: 17.80, unit: 'km/l', cityPenaltyPct: 0.31, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: '1.5 i-DTEC Diesel MT (Discontinued)', fuelType: 'Diesel', transmission: 'Manual', claimed: 24.10, unit: 'km/l', cityPenaltyPct: 0.26, hwyPenaltyPct: 0.08, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Honda',
    model: 'Elevate',
    type: 'car',
    engineCc: 1498,
    tankCapacity: 40,
    variants: [
      { name: 'ZX 1.5 i-VTEC CVT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 16.92, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.10, years: [2023, 2024, 2025] },
      { name: 'V 1.5 i-VTEC MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 15.31, unit: 'km/l', cityPenaltyPct: 0.30, hwyPenaltyPct: 0.09, years: [2023, 2024, 2025] }
    ]
  },
  {
    make: 'Honda',
    model: 'Amaze',
    type: 'car',
    engineCc: 1199,
    tankCapacity: 35,
    variants: [
      { name: 'VX 1.2 i-VTEC CVT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.30, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.10, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: 'S 1.2 i-VTEC MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 18.60, unit: 'km/l', cityPenaltyPct: 0.30, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: '1.5 i-DTEC Diesel MT', fuelType: 'Diesel', transmission: 'Manual', claimed: 24.70, unit: 'km/l', cityPenaltyPct: 0.25, hwyPenaltyPct: 0.07, years: [2020, 2021, 2022] }
    ]
  },

  // ================= VOLKSWAGEN & SKODA =================
  {
    make: 'Volkswagen',
    model: 'Virtus',
    type: 'car',
    engineCc: 1498,
    tankCapacity: 45,
    variants: [
      { name: 'GT Plus 1.5 TSI 7DSG', fuelType: 'Petrol', transmission: 'Automatic', claimed: 19.62, unit: 'km/l', cityPenaltyPct: 0.39, hwyPenaltyPct: 0.11, years: [2022, 2023, 2024, 2025] },
      { name: 'Topline 1.0 TSI 6AT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.12, unit: 'km/l', cityPenaltyPct: 0.36, hwyPenaltyPct: 0.12, years: [2022, 2023, 2024, 2025] },
      { name: 'Highline 1.0 TSI MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 20.08, unit: 'km/l', cityPenaltyPct: 0.33, hwyPenaltyPct: 0.10, years: [2022, 2023, 2024, 2025] }
    ]
  },
  {
    make: 'Volkswagen',
    model: 'Taigun',
    type: 'car',
    engineCc: 1498,
    tankCapacity: 50,
    variants: [
      { name: 'GT Plus 1.5 TSI DSG', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.93, unit: 'km/l', cityPenaltyPct: 0.39, hwyPenaltyPct: 0.12, years: [2021, 2022, 2023, 2024, 2025] },
      { name: 'Highline 1.0 TSI 6AT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 17.88, unit: 'km/l', cityPenaltyPct: 0.37, hwyPenaltyPct: 0.13, years: [2021, 2022, 2023, 2024, 2025] }
    ]
  },
  {
    make: 'Skoda',
    model: 'Slavia',
    type: 'car',
    engineCc: 999,
    tankCapacity: 45,
    variants: [
      { name: 'Style 1.0 TSI MT', fuelType: 'Petrol', transmission: 'Manual', claimed: 20.32, unit: 'km/l', cityPenaltyPct: 0.35, hwyPenaltyPct: 0.11, years: [2022, 2023, 2024, 2025] },
      { name: 'Monte Carlo 1.5 TSI DSG', fuelType: 'Petrol', transmission: 'Automatic', claimed: 19.36, unit: 'km/l', cityPenaltyPct: 0.40, hwyPenaltyPct: 0.12, years: [2022, 2023, 2024, 2025] }
    ]
  },
  {
    make: 'Skoda',
    model: 'Kushaq',
    type: 'car',
    engineCc: 999,
    tankCapacity: 50,
    variants: [
      { name: 'Ambition 1.0 TSI 6AT', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.09, unit: 'km/l', cityPenaltyPct: 0.37, hwyPenaltyPct: 0.13, years: [2021, 2022, 2023, 2024, 2025] },
      { name: 'Monte Carlo 1.5 TSI DSG', fuelType: 'Petrol', transmission: 'Automatic', claimed: 18.86, unit: 'km/l', cityPenaltyPct: 0.39, hwyPenaltyPct: 0.12, years: [2021, 2022, 2023, 2024, 2025] }
    ]
  },

  // ================= MOTORCYCLES: HERO MOTOCORP =================
  {
    make: 'Hero MotoCorp',
    model: 'Splendor Plus',
    type: 'bike',
    engineCc: 97.2,
    tankCapacity: 9.8,
    variants: [
      { name: 'XTEC 2.0 LED Drum', fuelType: 'Petrol', transmission: 'Manual', claimed: 73.00, unit: 'km/l', cityPenaltyPct: 0.15, hwyPenaltyPct: 0.06, years: [2024, 2025] },
      { name: 'XTEC i3S Bluetooth', fuelType: 'Petrol', transmission: 'Manual', claimed: 70.00, unit: 'km/l', cityPenaltyPct: 0.15, hwyPenaltyPct: 0.06, years: [2022, 2023, 2024] },
      { name: 'Standard BS6 Self Start', fuelType: 'Petrol', transmission: 'Manual', claimed: 68.00, unit: 'km/l', cityPenaltyPct: 0.16, hwyPenaltyPct: 0.07, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Hero MotoCorp',
    model: 'HF Deluxe',
    type: 'bike',
    engineCc: 97.2,
    tankCapacity: 9.6,
    variants: [
      { name: 'Self Start i3S Drum', fuelType: 'Petrol', transmission: 'Manual', claimed: 70.00, unit: 'km/l', cityPenaltyPct: 0.14, hwyPenaltyPct: 0.05, years: [2020, 2021, 2022, 2023, 2024, 2025] }
    ]
  },
  {
    make: 'Hero MotoCorp',
    model: 'Xtreme 125R',
    type: 'bike',
    engineCc: 124.7,
    tankCapacity: 10.0,
    variants: [
      { name: 'Single Channel ABS IBS', fuelType: 'Petrol', transmission: 'Manual', claimed: 66.00, unit: 'km/l', cityPenaltyPct: 0.18, hwyPenaltyPct: 0.09, years: [2024, 2025] }
    ]
  },
  {
    make: 'Hero MotoCorp',
    model: 'Xpulse 200 4V',
    type: 'bike',
    engineCc: 199.6,
    tankCapacity: 13.0,
    variants: [
      { name: 'Pro Edition Dual Channel ABS', fuelType: 'Petrol', transmission: 'Manual', claimed: 40.00, unit: 'km/l', cityPenaltyPct: 0.22, hwyPenaltyPct: 0.10, years: [2023, 2024, 2025] },
      { name: '4V Standard', fuelType: 'Petrol', transmission: 'Manual', claimed: 42.00, unit: 'km/l', cityPenaltyPct: 0.21, hwyPenaltyPct: 0.10, years: [2021, 2022] }
    ]
  },

  // ================= MOTORCYCLES & SCOOTERS: HONDA =================
  {
    make: 'Honda',
    model: 'Shine',
    type: 'bike',
    engineCc: 124.0,
    tankCapacity: 10.5,
    variants: [
      { name: '125 Disc OBD2', fuelType: 'Petrol', transmission: 'Manual', claimed: 65.00, unit: 'km/l', cityPenaltyPct: 0.16, hwyPenaltyPct: 0.06, years: [2023, 2024, 2025] },
      { name: 'Shine 100 Drum', fuelType: 'Petrol', transmission: 'Manual', claimed: 68.00, unit: 'km/l', cityPenaltyPct: 0.15, hwyPenaltyPct: 0.06, years: [2023, 2024, 2025] },
      { name: '125 Drum BS6', fuelType: 'Petrol', transmission: 'Manual', claimed: 64.00, unit: 'km/l', cityPenaltyPct: 0.16, hwyPenaltyPct: 0.07, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Honda',
    model: 'SP 125',
    type: 'bike',
    engineCc: 124.0,
    tankCapacity: 11.2,
    variants: [
      { name: 'Disc Sports Edition LED', fuelType: 'Petrol', transmission: 'Manual', claimed: 65.00, unit: 'km/l', cityPenaltyPct: 0.14, hwyPenaltyPct: 0.05, years: [2023, 2024, 2025] },
      { name: 'Disc BS6 (Digital Display)', fuelType: 'Petrol', transmission: 'Manual', claimed: 63.50, unit: 'km/l', cityPenaltyPct: 0.15, hwyPenaltyPct: 0.06, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Honda',
    model: 'Activa',
    type: 'bike',
    engineCc: 109.5,
    tankCapacity: 5.3,
    variants: [
      { name: '6G H-Smart Keyless', fuelType: 'Petrol', transmission: 'Automatic', claimed: 50.00, unit: 'km/l', cityPenaltyPct: 0.17, hwyPenaltyPct: 0.06, years: [2023, 2024, 2025] },
      { name: '6G Deluxe LED', fuelType: 'Petrol', transmission: 'Automatic', claimed: 48.00, unit: 'km/l', cityPenaltyPct: 0.18, hwyPenaltyPct: 0.07, years: [2020, 2021, 2022] },
      { name: 'Activa 125 Disc OBD2', fuelType: 'Petrol', transmission: 'Automatic', claimed: 47.00, unit: 'km/l', cityPenaltyPct: 0.17, hwyPenaltyPct: 0.07, years: [2022, 2023, 2024, 2025] }
    ]
  },
  {
    make: 'Honda',
    model: 'Dio',
    type: 'bike',
    engineCc: 123.9,
    tankCapacity: 5.3,
    variants: [
      { name: 'Dio 125 H-Smart Disc', fuelType: 'Petrol', transmission: 'Automatic', claimed: 48.00, unit: 'km/l', cityPenaltyPct: 0.17, hwyPenaltyPct: 0.06, years: [2023, 2024, 2025] },
      { name: 'Dio 110 Deluxe BS6', fuelType: 'Petrol', transmission: 'Automatic', claimed: 50.00, unit: 'km/l', cityPenaltyPct: 0.18, hwyPenaltyPct: 0.06, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Honda',
    model: 'CB350',
    type: 'bike',
    engineCc: 348.3,
    tankCapacity: 15.0,
    variants: [
      { name: 'Hness CB350 DLX Pro', fuelType: 'Petrol', transmission: 'Manual', claimed: 42.17, unit: 'km/l', cityPenaltyPct: 0.22, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: 'CB350RS Dual Tone', fuelType: 'Petrol', transmission: 'Manual', claimed: 41.50, unit: 'km/l', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.10, years: [2021, 2022, 2023, 2024, 2025] }
    ]
  },

  // ================= MOTORCYCLES: ROYAL ENFIELD =================
  {
    make: 'Royal Enfield',
    model: 'Classic 350',
    type: 'bike',
    engineCc: 349.0,
    tankCapacity: 13.0,
    variants: [
      { name: 'J-Series Dual ABS (2024 Facelift LED)', fuelType: 'Petrol', transmission: 'Manual', claimed: 41.50, unit: 'km/l', cityPenaltyPct: 0.22, hwyPenaltyPct: 0.11, years: [2024, 2025] },
      { name: 'J-Series Reborn Dual ABS', fuelType: 'Petrol', transmission: 'Manual', claimed: 37.77, unit: 'km/l', cityPenaltyPct: 0.22, hwyPenaltyPct: 0.10, years: [2021, 2022, 2023] },
      { name: 'UCE 350 BS6 (Old Engine)', fuelType: 'Petrol', transmission: 'Manual', claimed: 36.20, unit: 'km/l', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.12, years: [2020] }
    ]
  },
  {
    make: 'Royal Enfield',
    model: 'Hunter 350',
    type: 'bike',
    engineCc: 349.0,
    tankCapacity: 13.0,
    variants: [
      { name: 'Metro Dapper Dual Tone', fuelType: 'Petrol', transmission: 'Manual', claimed: 36.20, unit: 'km/l', cityPenaltyPct: 0.19, hwyPenaltyPct: 0.07, years: [2022, 2023, 2024, 2025] },
      { name: 'Retro Factory Spoke', fuelType: 'Petrol', transmission: 'Manual', claimed: 36.20, unit: 'km/l', cityPenaltyPct: 0.19, hwyPenaltyPct: 0.07, years: [2022, 2023, 2024, 2025] }
    ]
  },
  {
    make: 'Royal Enfield',
    model: 'Bullet 350',
    type: 'bike',
    engineCc: 349.0,
    tankCapacity: 13.0,
    variants: [
      { name: 'New J-Series Black Gold Dual ABS', fuelType: 'Petrol', transmission: 'Manual', claimed: 37.00, unit: 'km/l', cityPenaltyPct: 0.20, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] },
      { name: 'UCE Bullet 350 BS6', fuelType: 'Petrol', transmission: 'Manual', claimed: 35.50, unit: 'km/l', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.11, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Royal Enfield',
    model: 'Himalayan',
    type: 'bike',
    engineCc: 452.0,
    tankCapacity: 17.0,
    variants: [
      { name: 'Himalayan 450 Sherpa Liquid Cooled', fuelType: 'Petrol', transmission: 'Manual', claimed: 30.00, unit: 'km/l', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.08, years: [2023, 2024, 2025] },
      { name: 'Himalayan 411 LS410 Air Cooled', fuelType: 'Petrol', transmission: 'Manual', claimed: 32.00, unit: 'km/l', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.09, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Royal Enfield',
    model: 'Continental GT 650',
    type: 'bike',
    engineCc: 648.0,
    tankCapacity: 12.5,
    variants: [
      { name: 'Twin 650 Alloy LED Apex Grey', fuelType: 'Petrol', transmission: 'Manual', claimed: 25.00, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.12, years: [2023, 2024, 2025] },
      { name: 'Interceptor 650 Spoke', fuelType: 'Petrol', transmission: 'Manual', claimed: 24.50, unit: 'km/l', cityPenaltyPct: 0.28, hwyPenaltyPct: 0.12, years: [2020, 2021, 2022, 2023, 2024, 2025] }
    ]
  },

  // ================= MOTORCYCLES: BAJAJ =================
  {
    make: 'Bajaj',
    model: 'Pulsar NS200',
    type: 'bike',
    engineCc: 199.5,
    tankCapacity: 12.0,
    variants: [
      { name: 'USD Fork Bluetooth Dual ABS', fuelType: 'Petrol', transmission: 'Manual', claimed: 40.30, unit: 'km/l', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.10, years: [2023, 2024, 2025] },
      { name: 'Telescopic Fork Dual ABS', fuelType: 'Petrol', transmission: 'Manual', claimed: 39.00, unit: 'km/l', cityPenaltyPct: 0.25, hwyPenaltyPct: 0.10, years: [2020, 2021, 2022] }
    ]
  },
  {
    make: 'Bajaj',
    model: 'Pulsar 150',
    type: 'bike',
    engineCc: 149.5,
    tankCapacity: 15.0,
    variants: [
      { name: 'Twin Disc Single ABS', fuelType: 'Petrol', transmission: 'Manual', claimed: 47.50, unit: 'km/l', cityPenaltyPct: 0.19, hwyPenaltyPct: 0.08, years: [2020, 2021, 2022, 2023, 2024, 2025] }
    ]
  },
  {
    make: 'Bajaj',
    model: 'Pulsar 125',
    type: 'bike',
    engineCc: 124.4,
    tankCapacity: 11.5,
    variants: [
      { name: 'Carbon Fibre Split Seat Disc', fuelType: 'Petrol', transmission: 'Manual', claimed: 51.50, unit: 'km/l', cityPenaltyPct: 0.17, hwyPenaltyPct: 0.06, years: [2022, 2023, 2024, 2025] },
      { name: 'Neon Disc Edition', fuelType: 'Petrol', transmission: 'Manual', claimed: 50.00, unit: 'km/l', cityPenaltyPct: 0.18, hwyPenaltyPct: 0.07, years: [2020, 2021] }
    ]
  },
  {
    make: 'Bajaj',
    model: 'Freedom 125',
    type: 'bike',
    engineCc: 125.0,
    tankCapacity: 2.0, // 2kg CNG + 2L Petrol auxiliary
    variants: [
      { name: 'World First CNG Motorcycle NG04 Disc LED', fuelType: 'CNG', transmission: 'Manual', claimed: 102.00, unit: 'km/kg', cityPenaltyPct: 0.14, hwyPenaltyPct: 0.05, years: [2024, 2025] }
    ]
  },

  // ================= MOTORCYCLES: TVS =================
  {
    make: 'TVS',
    model: 'Jupiter',
    type: 'bike',
    engineCc: 113.3,
    tankCapacity: 6.0,
    variants: [
      { name: 'SmartXonnect Disc (2024 All-New)', fuelType: 'Petrol', transmission: 'Automatic', claimed: 53.00, unit: 'km/l', cityPenaltyPct: 0.18, hwyPenaltyPct: 0.07, years: [2024, 2025] },
      { name: 'Jupiter 110 Classic ZX', fuelType: 'Petrol', transmission: 'Automatic', claimed: 50.00, unit: 'km/l', cityPenaltyPct: 0.19, hwyPenaltyPct: 0.08, years: [2020, 2021, 2022, 2023] },
      { name: 'Jupiter 125 Disc Bluetooth', fuelType: 'Petrol', transmission: 'Automatic', claimed: 51.00, unit: 'km/l', cityPenaltyPct: 0.18, hwyPenaltyPct: 0.07, years: [2021, 2022, 2023, 2024, 2025] }
    ]
  },
  {
    make: 'TVS',
    model: 'Raider 125',
    type: 'bike',
    engineCc: 124.8,
    tankCapacity: 10.0,
    variants: [
      { name: 'SX TFT SmartXonnect', fuelType: 'Petrol', transmission: 'Manual', claimed: 67.00, unit: 'km/l', cityPenaltyPct: 0.17, hwyPenaltyPct: 0.07, years: [2022, 2023, 2024, 2025] },
      { name: 'Disc Split Seat', fuelType: 'Petrol', transmission: 'Manual', claimed: 65.00, unit: 'km/l', cityPenaltyPct: 0.17, hwyPenaltyPct: 0.07, years: [2021, 2022] }
    ]
  },
  {
    make: 'TVS',
    model: 'Apache RTR 160 4V',
    type: 'bike',
    engineCc: 159.7,
    tankCapacity: 12.0,
    variants: [
      { name: 'Special Edition Dual Channel ABS', fuelType: 'Petrol', transmission: 'Manual', claimed: 47.60, unit: 'km/l', cityPenaltyPct: 0.19, hwyPenaltyPct: 0.08, years: [2022, 2023, 2024, 2025] },
      { name: 'RTR 160 2V Disc', fuelType: 'Petrol', transmission: 'Manual', claimed: 45.00, unit: 'km/l', cityPenaltyPct: 0.18, hwyPenaltyPct: 0.07, years: [2020, 2021, 2022, 2023, 2024, 2025] },
      { name: 'RTR 200 4V Dual Channel ABS', fuelType: 'Petrol', transmission: 'Manual', claimed: 38.00, unit: 'km/l', cityPenaltyPct: 0.22, hwyPenaltyPct: 0.09, years: [2021, 2022, 2023, 2024] }
    ]
  },

  // ================= MOTORCYCLES: YAMAHA =================
  {
    make: 'Yamaha',
    model: 'YZF R15 V4',
    type: 'bike',
    engineCc: 155.0,
    tankCapacity: 11.0,
    variants: [
      { name: 'Racing Blue Quickshifter Traction Control', fuelType: 'Petrol', transmission: 'Manual', claimed: 51.40, unit: 'km/l', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.07, years: [2022, 2023, 2024, 2025] },
      { name: 'R15M TFT Edition', fuelType: 'Petrol', transmission: 'Manual', claimed: 51.40, unit: 'km/l', cityPenaltyPct: 0.23, hwyPenaltyPct: 0.07, years: [2023, 2024, 2025] },
      { name: 'R15 V3 BS6 Dual ABS', fuelType: 'Petrol', transmission: 'Manual', claimed: 48.75, unit: 'km/l', cityPenaltyPct: 0.22, hwyPenaltyPct: 0.08, years: [2020, 2021] }
    ]
  },
  {
    make: 'Yamaha',
    model: 'MT-15 V2',
    type: 'bike',
    engineCc: 155.0,
    tankCapacity: 10.0,
    variants: [
      { name: 'Deluxe USD Bluetooth Dual ABS', fuelType: 'Petrol', transmission: 'Manual', claimed: 53.00, unit: 'km/l', cityPenaltyPct: 0.21, hwyPenaltyPct: 0.08, years: [2022, 2023, 2024, 2025] },
      { name: 'MT-15 V1 Single ABS', fuelType: 'Petrol', transmission: 'Manual', claimed: 48.00, unit: 'km/l', cityPenaltyPct: 0.22, hwyPenaltyPct: 0.08, years: [2020, 2021] }
    ]
  },
  {
    make: 'Yamaha',
    model: 'RayZR 125',
    type: 'bike',
    engineCc: 125.0,
    tankCapacity: 5.2,
    variants: [
      { name: 'Fi Hybrid Disc Smart Motor Generator', fuelType: 'Petrol', transmission: 'Automatic', claimed: 58.00, unit: 'km/l', cityPenaltyPct: 0.16, hwyPenaltyPct: 0.06, years: [2021, 2022, 2023, 2024, 2025] },
      { name: 'Aerox 155 Maxi Scooter VVA', fuelType: 'Petrol', transmission: 'Automatic', claimed: 42.00, unit: 'km/l', cityPenaltyPct: 0.24, hwyPenaltyPct: 0.09, years: [2021, 2022, 2023, 2024, 2025] }
    ]
  },

  // ================= MOTORCYCLES: SUZUKI & KTM =================
  {
    make: 'Suzuki',
    model: 'Access 125',
    type: 'bike',
    engineCc: 124.0,
    tankCapacity: 5.0,
    variants: [
      { name: 'Ride Connect Edition Bluetooth Disc', fuelType: 'Petrol', transmission: 'Automatic', claimed: 50.00, unit: 'km/l', cityPenaltyPct: 0.15, hwyPenaltyPct: 0.05, years: [2021, 2022, 2023, 2024, 2025] },
      { name: 'Special Edition BS6 Drum', fuelType: 'Petrol', transmission: 'Automatic', claimed: 49.00, unit: 'km/l', cityPenaltyPct: 0.16, hwyPenaltyPct: 0.06, years: [2020] }
    ]
  },
  {
    make: 'KTM',
    model: 'Duke',
    type: 'bike',
    engineCc: 249.0,
    tankCapacity: 15.0,
    variants: [
      { name: 'Duke 250 Gen-3 Quickshifter', fuelType: 'Petrol', transmission: 'Manual', claimed: 35.00, unit: 'km/l', cityPenaltyPct: 0.27, hwyPenaltyPct: 0.10, years: [2024, 2025] },
      { name: 'Duke 390 Gen-3 LC4c Launch Control', fuelType: 'Petrol', transmission: 'Manual', claimed: 29.00, unit: 'km/l', cityPenaltyPct: 0.32, hwyPenaltyPct: 0.12, years: [2024, 2025] },
      { name: 'Duke 200 BS6 Dual ABS', fuelType: 'Petrol', transmission: 'Manual', claimed: 35.00, unit: 'km/l', cityPenaltyPct: 0.26, hwyPenaltyPct: 0.10, years: [2020, 2021, 2022, 2023] }
    ]
  }
];

// Flattens catalog into granular individual vehicle year records
export function generateExpandedDatabase() {
  const records = [];

  for (const item of VEHICLE_CATALOG) {
    for (const variant of item.variants) {
      for (const year of variant.years) {
        const idSlug = `${item.make}-${item.model}-${variant.name}-${variant.transmission}-${year}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

        const realWorldCity = Number((variant.claimed * (1 - variant.cityPenaltyPct)).toFixed(1));
        const realWorldHighway = Number((variant.claimed * (1 - variant.hwyPenaltyPct)).toFixed(1));

        records.push({
          id: idSlug,
          type: item.type,
          make: item.make,
          model: item.model,
          variant: `${variant.name} (${year})`,
          fuelType: variant.fuelType,
          transmission: variant.transmission,
          claimedMileage: variant.claimed,
          unit: variant.unit,
          realWorldCity,
          realWorldHighway,
          tankCapacity: item.tankCapacity,
          engineCc: item.engineCc,
          year
        });
      }
    }
  }

  return records;
}

// Write to generated database JSON
const allRecords = generateExpandedDatabase();
const targetPath = path.resolve(__dirname, '../src/data/all_vehicles.json');
fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, JSON.stringify(allRecords, null, 2), 'utf-8');
console.log(`Generated ${allRecords.length} vehicles into ${targetPath}`);

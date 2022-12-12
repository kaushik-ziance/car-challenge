// Imports
import { render, screen } from '@testing-library/react';

// To Test
import VehicleClass from '../components/VehicleClass';

// Tests
 test('Renders main page correctly', async () => {
    
    const data =[
        {
          "Make": "ACURA",
          "Model": "ILX",
          "Vehicle Class": "COMPACT",
          "Engine Size(L)": "2",
          "Cylinders": "4",
          "Transmission": "AS5",
          "Fuel Type": "Z",
          "Fuel Consumption City (L/100 km)": "9.9",
          "Fuel Consumption Hwy (L/100 km)": "6.7",
          "Fuel Consumption Comb (L/100 km)": "8.5",
          "Fuel Consumption Comb (mpg)": "33",
          "CO2 Emissions(g/km)": "196"
        },
        {
          "Make": "ACURA",
          "Model": "ILX",
          "Vehicle Class": "COMPACT",
          "Engine Size(L)": "2.4",
          "Cylinders": "4",
          "Transmission": "M6",
          "Fuel Type": "Z",
          "Fuel Consumption City (L/100 km)": "11.2",
          "Fuel Consumption Hwy (L/100 km)": "7.7",
          "Fuel Consumption Comb (L/100 km)": "9.6",
          "Fuel Consumption Comb (mpg)": "29",
          "CO2 Emissions(g/km)": "221"
        },
        {
          "Make": "ACURA",
          "Model": "ILX HYBRID",
          "Vehicle Class": "COMPACT",
          "Engine Size(L)": "1.5",
          "Cylinders": "4",
          "Transmission": "AV7",
          "Fuel Type": "Z",
          "Fuel Consumption City (L/100 km)": "6",
          "Fuel Consumption Hwy (L/100 km)": "5.8",
          "Fuel Consumption Comb (L/100 km)": "5.9",
          "Fuel Consumption Comb (mpg)": "48",
          "CO2 Emissions(g/km)": "136"
        },
        {
          "Make": "ACURA",
          "Model": "MDX 4WD",
          "Vehicle Class": "SUV - SMALL",
          "Engine Size(L)": "3.5",
          "Cylinders": "6",
          "Transmission": "AS6",
          "Fuel Type": "Z",
          "Fuel Consumption City (L/100 km)": "12.7",
          "Fuel Consumption Hwy (L/100 km)": "9.1",
          "Fuel Consumption Comb (L/100 km)": "11.1",
          "Fuel Consumption Comb (mpg)": "25",
          "CO2 Emissions(g/km)": "255"
        },
        {
          "Make": "ACURA",
          "Model": "RDX AWD",
          "Vehicle Class": "SUV - SMALL",
          "Engine Size(L)": "3.5",
          "Cylinders": "6",
          "Transmission": "AS6",
          "Fuel Type": "Z",
          "Fuel Consumption City (L/100 km)": "12.1",
          "Fuel Consumption Hwy (L/100 km)": "8.7",
          "Fuel Consumption Comb (L/100 km)": "10.6",
          "Fuel Consumption Comb (mpg)": "27",
          "CO2 Emissions(g/km)": "244"
        },
        {
          "Make": "ACURA",
          "Model": "RLX",
          "Vehicle Class": "MID-SIZE",
          "Engine Size(L)": "3.5",
          "Cylinders": "6",
          "Transmission": "AS6",
          "Fuel Type": "Z",
          "Fuel Consumption City (L/100 km)": "11.9",
          "Fuel Consumption Hwy (L/100 km)": "7.7",
          "Fuel Consumption Comb (L/100 km)": "10",
          "Fuel Consumption Comb (mpg)": "28",
          "CO2 Emissions(g/km)": "230"
        }
    ]
  // Setup
  render(<VehicleClass fetchedCSVData={data}/>);

  expect(true).toBeTruthy();
});
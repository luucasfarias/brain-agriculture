'use client'

import { useFarmer } from "@/contexts/farmer-context"
import { Farmer } from "@/data/types/farmer";
import { Box, Card } from "@radix-ui/themes"
import Chart from "react-google-charts";

export default function PieChartCrops() {
  const { farmers } = useFarmer()

  const options = {
    title: "Culturas",
  };

  const extractCropData = (farmersData: Farmer[]): [string, string | number][] => {
    const cropCountMap = new Map<string, number>();

    farmersData.forEach((farmer) => {
      farmer.crops.forEach((crop) => {
        const { value } = crop;
        cropCountMap.set(value, (cropCountMap.get(value) || 0) + 1);
      });
    });

    const sortedCropCountArray: [string, number][] = Array.from(cropCountMap.entries()).sort(
      (a, b) => b[1] - a[1]
    );

    return sortedCropCountArray;
  };

  const cropData = extractCropData(farmers);

  const top5CropData = cropData.slice(0, 5);

  const chartData: [string, string | number][] = [['Crop', 'Number of Farms'], ...top5CropData];

  return (
    <div>
      <Box height="9" pt="8">
        <Card >
          <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width={"100%"}
            height={"360px"}
          />
        </Card>
      </Box>
    </div>
  )
}
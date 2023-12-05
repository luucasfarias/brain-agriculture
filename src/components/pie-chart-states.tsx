'use client'

import { useFarmer } from "@/contexts/farmer-context"
import { Box, Card } from "@radix-ui/themes"
import Chart from "react-google-charts";

export default function PieChartStates() {
  const { farmers } = useFarmer()

  const options = {
    title: "Fazendas por estado",
  };

  function generateChartData(): [string, string | number][] {
    const stateCountMap = new Map<string, number>()

    farmers.forEach((farmer) => {
      const { state } = farmer;
      stateCountMap.set(state, (stateCountMap.get(state) || 0) + 1)
    });

    const stateCountArray: [string, number][] = Array.from(stateCountMap)
    const chartData: [string, string | number][] = [["State", ""]]

    stateCountArray.forEach(([state, count]) => {
      chartData.push([state, count])
    })

    return chartData
  }

  return (
    <div>
      <Box height="9" pt="8">
        <Card >
          <Chart
            chartType="PieChart"
            data={generateChartData()}
            options={options}
            width={"100%"}
            height={"360px"}
          />
        </Card>
      </Box>
    </div>
  )
}
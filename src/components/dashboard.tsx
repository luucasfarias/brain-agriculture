'use client'

import { Box, Card, Flex, Grid, Text } from "@radix-ui/themes"
import { Grid2X2, LandPlot, Tractor } from "lucide-react"
import Chart from "react-google-charts";
import { TableFarmers } from "./table";
import { Farmer } from "@/data/types/farmer";
import { useFarmer } from "@/contexts/farmer-context";
import { useEffect } from "react";
import PieChartStates from "./pie-chart-states";
import PieChartCrops from "./pie-chart-crops";

interface DashboardProps {
  dataFarmers: Farmer[]
}


export default function Dashboard({ dataFarmers }: DashboardProps) {
  const { farmers, updateFarmers } = useFarmer()

  useEffect(() => {
    updateFarmers(dataFarmers)
  }, [])

  function totalFarms() {
    return farmers.length
  }

  function totalAreaFarms() {
    let total = farmers.reduce((accumulator, object) => {
      return accumulator + object.totalFarmArea
    }, 0)

    return total
  }

  function totalUsedAreaFarms() {
    let total = farmers.reduce((accumulator, object) => {
      return accumulator + (object.totalVegetationArea + object.totalArableArea)
    }, 0)

    return total
  }

  return (
    <>
      <Grid columns="3" gap="3" width="auto">
        <Box height="9">
          <Card >
            <Flex gap="3" align="center" justify="between">
              <Text as="div" size="3" weight="medium">Total de fazendas</Text>
              <div className="bg-blue-500 p-1 rounded-md">
                <Tractor size={20} color="#fcfcfc" />
              </div>
            </Flex>
            <Flex gap="3" align="center" justify="center" pt="2">
              <Text as="div" size="6" weight="bold">{totalFarms()}</Text>
            </Flex>
          </Card>
        </Box>
        <Box height="9">
          <Card >
            <Flex gap="3" align="center" justify="between">
              <Text as="div" size="3" weight="medium">Área total de fazendas em hectares</Text>
              <div className="bg-purple-500 p-1 rounded-md">
                <LandPlot size={20} color="#fcfcfc" />
              </div>
            </Flex>
            <Flex gap="3" align="center" justify="center" pt="2">
              <Text as="div" size="6" weight="bold">{totalAreaFarms()}</Text>
            </Flex>
          </Card>
        </Box>
        <Box height="9">
          <Card >
            <Flex gap="3" align="center" justify="between">
              <Text as="div" size="3" weight="medium">Área total de uso do solo</Text>
              <div className="bg-green-500 p-1 rounded-md">
                <Grid2X2 size={20} color="#fcfcfc" />
              </div>
            </Flex>
            <Flex gap="3" align="center" justify="center" pt="2">
              <Text as="div" size="6" weight="bold">{totalUsedAreaFarms()}</Text>
            </Flex>
          </Card>
        </Box>

        <PieChartCrops />

        <PieChartStates />

        <Box height="9" pt="8">
          <Card >
            <TableFarmers />
          </Card>
        </Box>
      </Grid>
    </>
  )
}
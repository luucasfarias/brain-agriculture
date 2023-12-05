'use client'

import { Farmer } from '@/data/types/farmer'
import { ReactNode, createContext, useContext, useState } from 'react'

interface FarmerContextType {
  farmers: Farmer[]
  addFarmer: (farmer: Farmer) => void
  updateFarmers: (farmer: Farmer[]) => void
}

const FarmerContext = createContext({} as FarmerContextType)

export function FarmerProvider({ children }: { children: ReactNode }) {
  const [farmers, setFarmers] = useState<Farmer[]>([])

  function addFarmer(farmer: Farmer) {
    setFarmers([...farmers, farmer])
  }

  function updateFarmers(farmer: Farmer[]) {
    setFarmers(farmer)
  }

  return (
    <FarmerContext.Provider value={{ farmers: farmers, addFarmer, updateFarmers }}>
      {children}
    </FarmerContext.Provider>
  )
}

export const useFarmer = () => useContext(FarmerContext)

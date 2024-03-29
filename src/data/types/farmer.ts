export interface Farmer {
  id: number
  name: string
  nameFarm: string
  cpf_cnpj: string
  city: string
  state: string
  crops: Crop[]
  totalFarmArea: number
  totalArableArea: number
  totalVegetationArea: number
}

export interface Crop {
  value: string
  label: string
}
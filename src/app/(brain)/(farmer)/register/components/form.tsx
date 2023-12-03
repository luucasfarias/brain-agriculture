"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { z } from "zod";

const optionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const farmFormSchema = z.object({
  name: z.string()
    .min(3, { message: 'Este campo deve ter no minimo 3 letras.' })
    .regex(/^([a-z]+)$/i, { message: 'Este campo aceita somente letras.' })
    .transform((value) => value.toLowerCase()),
  nameFarm: z.string()
    .min(3, { message: 'Este campo deve ter no minimo 3 letras.' })
    .regex(/^([a-z]+)$/i, { message: 'Este campo aceita somente letras.' })
    .transform((value) => value.toLowerCase()),
  city: z.string()
    .min(3, { message: 'Este campo deve ter no minimo 3 letras.' })
    .regex(/^([a-z]+)$/i, { message: 'Este campo aceita somente letras.' })
    .transform((value) => value.toLowerCase()),
  state: z.string(),
  crops: z.array(optionSchema),
  totalFarmArea: z.coerce.number(),
  totalArableArea: z.coerce.number(),
  totalVegetationArea: z.coerce.number(),
})

type FarmFormData = z.infer<typeof farmFormSchema>



const stateSchema = z.object({
  selectedOptions: z.array(optionSchema),
});

export function FormFarmer(props: any) {
  // const [state, setState] = useState(stateSchema.parse({ selectedOptions: [] }));

  const [state, setState] = useState(farmFormSchema.parse({ name: '', crops: [] }));

  const options = [
    { label: "Café", value: "coffee" },
    { label: "Caféy", value: "coffeey" },
    { label: "Caféx", value: "coffeex" },
  ];

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FarmFormData>({
    resolver: zodResolver(farmFormSchema),
    defaultValues: {
      name: '',
      nameFarm: '',
      city: '',
      state: '',
      crops: [],
      totalFarmArea: 0,
      totalArableArea: 0,
      totalVegetationArea: 0,
    },
  })

  async function handleRegister(data: FarmFormData) {
    console.log(data);
  }

  // function handleSelectChange(selectedValues: any) {
  //   setState(stateSchema.parse({ selectedOptions: selectedValues }));
  //   console.log(selectedValues);
  // };

  function handleSelectChange(selectedValues: any) {
    setState(farmFormSchema.parse({ crops: selectedValues }))
    // setState(stateSchema.parse({ selectedOptions: selectedValues }));
    console.log(selectedValues);
  };

  return (
    <div>
      <span>Props: {props.test}</span>
      <form className="w-full mt-8" onSubmit={handleSubmit(handleRegister)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nome do produtor
            </label>
            <input
              {...register('name', { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
            />
            {
              errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )
            }
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nome da fazenda
            </label>
            <input
              {...register('nameFarm', { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Fazenda brilho do sol"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Cidade
            </label>
            <input
              {...register('city', { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Estado
            </label>
            <div className="relative">
              <select
                {...register('state')}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option>New Mexico</option>
                <option>Missouri</option>
                <option>Texas</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Culturas plantadas
            </label>
            <div className="relative">
              <MultiSelect
                options={options}
                value={state.crops}
                onChange={handleSelectChange}
                labelledBy="Select"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Área total em hectares da fazenda
            </label>
            <input
              {...register('totalFarmArea')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              placeholder="Jane" />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Área total agricultavel hectares
            </label>
            <input
              {...register('totalArableArea')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Jane" />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Área total de vegatação hectares
            </label>
            <input
              {...register('totalVegetationArea')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Jane" />
          </div>
        </div>

        <Button type="submit" color="blue" disabled={isSubmitting}>Salvar</Button>
      </form>
    </div>
  )
}
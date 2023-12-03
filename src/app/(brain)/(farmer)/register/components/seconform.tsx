"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { z } from "zod";
import { Farmer } from "@/data/types/farmer";
import { MaskedCpfCnpj } from "@/components/masked-cpf-cnpj";

interface FormProps {
  data: Farmer
}

const optionSchema = z.object({
  value: z.string(),
  label: z.string(),
})

const stateSchema = z.object({
  name: z.string(),
  selectedOptions: z.array(optionSchema),
  nameFarm: z.string(),
  cpf_cnpj: z.string(),
  city: z.string(),
  state: z.string(),
  totalFarmArea: z.coerce.number(),
  totalArableArea: z.coerce.number(),
  totalVegetationArea: z.coerce.number(),
})

const dataMock = {
  "id": 2,
  "name": "Jose da silva",
  "nameFarm": "Fazenda sol",
  "cpf_cnpj": "555.555.552-12",
  "city": "Anapolis",
  "state": "Goias",
  "totalFarmArea": "2000000",
  "totalArableArea": "32424234",
  "totalVegetationArea": "32424234",
  "crops": [
    {
      "name": "Algodão"
    },
    {
      "name": "Café"
    },
    {
      "name": "Milho"
    },
    {
      "name": "Soja"
    },
    {
      "name": "Cana de açucar"
    }
  ]
}

export function SeconFormFarmer({ data }: FormProps) {
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isCnpj, setIsCnpj] = React.useState(false);

  const [state, setState] = useState(stateSchema.parse({
    name: data.name,
    selectedOptions: [],
    nameFarm: '',
    cpf_cnpj: '',
    city: '',
    state: '',
    totalFarmArea: 0,
    totalArableArea: 0,
    totalVegetationArea: 0,
  }));

  const options = [
    { label: "Café", value: "coffee" },
    { label: "Caféy", value: "coffeey" },
    { label: "Caféx", value: "coffeex" },
  ];

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  function handleInputChangeCpfCnpj(event: any) {
    const inputValue = event.target.value.replace(/\D/g, '');

    setCpfCnpj(inputValue);

    setIsCnpj(inputValue.length > 11);

    // Validação de CPF
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    // Validação de CNPJ
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    console.log('cpf', cpfRegex.test(inputValue) || cnpjRegex.test(inputValue));

    setIsValid(cpfRegex.test(inputValue) || cnpjRegex.test(inputValue));
    setState({ ...state, cpf_cnpj: cpfCnpj })
  };

  function applyMask() {
    console.log('valor: ', cpfCnpj)

    const valorNum = cpfCnpj.replace(/\D/g, '');

    const mascara = valorNum.length <= 11 ? '999.999.999-99' : '99.999.999/9999-99'
    return mascara
  }

  function handleSelectChange(selectedValues: any) {
    setState((prev) => ({ ...prev, selectedOptions: selectedValues }));
  };

  function onhandleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    // Faça algo com os dados do formulário, como enviar para um servidor
    console.log('Dados do formulário:', state);
  };

  const addNewFarmer = async () => {
    console.log('ola');

    try {
      const response = await fetch('http://localhost:3001/farmers', {
        method: 'POST',
        body: JSON.stringify(dataMock),
        headers: {
          'content-type': 'application/json'
        }
      })
      console.log('after post: ', response)
      if (response.ok) {
        console.log('success: ', response);
      } else {
        console.log('Opps! some error occurred: ', response);
      }
    } catch (error) {
      console.error(error)

    }
  }

  return (
    <div>
      <form onSubmit={addNewFarmer} className="w-full mt-8">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nome do produtor
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-first-name"
              type="text"
              name="name"
              value={state.name}
              onChange={handleInputChange}

            />

          </div>

          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nome da fazenda
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-first-name"
              type="text"
              name="nameFarm"
              value={state.nameFarm}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              CPF ou CNPJ
            </label>

            <MaskedCpfCnpj type="text" name="cpf_cnpj" value={cpfCnpj} onChange={handleInputChangeCpfCnpj} mask={applyMask()} />
            {/* <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-first-name"
              type="text"
              name="cpf_cnpj"
              value={cpfCnpj}
              onChange={handleInputChangeCpfCnpj}
              style={{ borderColor: isValid ? 'initial' : 'red' }}
            />
            {!isValid && <p style={{ color: 'red' }}>CPF ou CNPJ inválido.</p>} */}
            {!isValid && <p style={{ color: 'red' }}>CPF ou CNPJ inválido.</p>}
          </div>

        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Cidade
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-first-name"
              type="text"
              name="city"
              value={state.city}
              placeholder="Digite seu nome"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Estado
            </label>

            <div className="relative">
              <select
                className="shadow block appearance-none w-full border text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline" id="grid-state">
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

            <MultiSelect
              options={options}
              value={state.selectedOptions}
              onChange={handleSelectChange}
              labelledBy="Selecione"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Área total em hectares da fazenda
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-first-name"
              type="text"
              name="totalFarmArea"
              value={state.totalFarmArea}
              placeholder="Digite seu nome"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Área total agricultavel hectares
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-first-name"
              type="text"
              name="totalArableArea"
              value={state.totalArableArea}
              placeholder="Digite seu nome"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Área total de vegatação hectares
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-first-name"
              type="text"
              name="totalVegetationArea"
              value={state.totalVegetationArea}
              placeholder="Digite seu nome"
              onChange={handleInputChange}
            />
          </div>
        </div>


        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}
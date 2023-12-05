'use client'
import { useFarmer } from "@/contexts/farmer-context";
import { Farmer } from "@/data/types/farmer";
import { STATES_DATA } from "@/data/utils/states-data";
import { Button, Flex } from "@radix-ui/themes";
import { ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { MultiSelect } from "react-multi-select-component";
import { toast } from "react-toastify";
import InputMask from 'react-input-mask';
import { overrideStrings } from "@/data/utils/override-string";

type FormProps = {
  data?: Farmer
  id?: number
}

export default function NewForm({ data, id }: FormProps) {
  const [documento, setDocumento] = useState('CPF')
  const [validDocument, setValidDocument] = useState(true)
  const [errorArea, setErrorArea] = useState(false)
  const { addFarmer } = useFarmer()

  const states = STATES_DATA
  const requiredField = 'Este campo é obrigatório'
  const cropsOptions = [
    { label: "Café", value: "cafe" },
    { label: "Soja", value: "soja" },
    { label: "Milho", value: "milho" },
    { label: "Algodão", value: "algodao" },
    { label: "Cana de açucar", value: "cana de acucar" },
    { label: "Eucalipto", value: "eucalipto" },
  ];

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Farmer>(
    {
      defaultValues: data
    }
  )

  function dynamicLabel() {
    if (id) {
      return 'editar'
    }

    return 'cadastrar'
  }

  async function requestNewFarmer(data: Farmer) {
    try {
      const response = await fetch('http://localhost:3001/farmers', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      })

      if (response.ok) {
        toast('Cadastro realizado com sucesso!', { theme: 'light', type: 'success' })
        addFarmer(data)
        reset();
      } else {
        toast('Ops! Algo deu errado com esta transação, tente novamente.', { theme: 'light', type: 'error' });
      }
    } catch (error) {
      console.error(error)
      reset();
    }
  }

  async function handleNewFarmer(data: Farmer) {
    console.log('data', data);

    // if (documento === 'CPF') {
    //   const cpfIsValid = validateCPF(data.cpf_cnpj);
    //   setValidDocument(cpfIsValid)
    // } else {
    //   const cnpjIsValid = validateCNPJ(data.cpf_cnpj);
    //   setValidDocument(cnpjIsValid)
    // }

    requestNewFarmer(data)
  }

  async function requestEditFarmer(id: number, data: Farmer) {
    try {
      const response = await fetch(`http://localhost:3001/farmers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      })

      if (response.ok) {
        toast('Edição realizada com sucesso!', { theme: 'light', type: 'success' })
      } else {
        toast('Ops! Algo deu errado com esta transação, tente novamente.', { theme: 'light', type: 'error' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit: SubmitHandler<Farmer> = async (data: Farmer) => {
    if (!id) {
      handleNewFarmer(data)
      return;
    }

    requestEditFarmer(id, data)
  }

  const overrideStringsMultiselect = overrideStrings

  return (
    <div className="isolate bg-white px-6 py-2 sm:py-4 lg:px-8">
      <Link href="/">
        <Flex gap="1">
          <ArrowLeft size={20} color="#0d0c0c" />
          Voltar
        </Flex>
      </Link>

      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80c2ff] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl capitalize">
          {dynamicLabel()} produtor
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Preencha os campos para {dynamicLabel()} produtor rural.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nome do produtor
            </label>
            <div className="mt-2.5">
              <input
                {...register("name", {
                  required: requiredField,
                  minLength: {
                    value: 5,
                    message: "Nome precisa ter pelo menos 5 caracteres",
                  },
                })}
                type="text"
                name="name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors?.name && (
                <span className="text-red-700">{errors.name.message}</span>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              CPF ou CNPJ
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0  flex items-center">
                <select
                  onChange={(e) => setDocumento(e.target.value)}
                  id="country"
                  name="document"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-2 pr-2 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option value="CPF">CPF</option>
                  <option value="CNPJ">CNPJ</option>
                </select>
              </div>
              <Controller
                {...register('cpf_cnpj', { required: true })}
                control={control}
                name="cpf_cnpj"
                render={({ field: { onChange, value } }) => (
                  <InputMask
                    className="shadow appearance-none border rounded w-full py-2 pr-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="cpf_cnpj"
                    value={value}
                    onChange={onChange}
                    mask={documento === 'CPF' ? '999.999.999-99' : '99.999.999/9999-99'}
                  ></InputMask>
                )}
              />

            </div>
            {errors?.cpf_cnpj && (
              <span className="text-red-700">{errors.cpf_cnpj.message}</span>
            )}

            {!validDocument && (
              <span className="text-red-700">Este documento nao é valido</span>
            )}

          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nome da fazenda
            </label>
            <div className="mt-2.5">
              <input
                {...register('nameFarm', { required: requiredField, })}
                type="text"
                name="nameFarm"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors?.nameFarm && (
                <span className="text-red-700">{errors.nameFarm.message}</span>
              )}
            </div>
          </div>
          <div className="mt-2.5">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Cidade
            </label>
            <div className="mt-2.5">
              <input
                {...register('city', { required: requiredField })}
                type="text"
                name="city"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors?.city && (
                <span className="text-red-700">{errors.city.message}</span>
              )}
            </div>
          </div>
          <div className="mt-2.5">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Estados
            </label>
            <div className="mt-2.5">
              <select
                {...register('state', { required: requiredField })}
                name="state"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {
                  states.map((state, index) => {
                    return (
                      <option key={index} value={state.acronym}>{state.name}</option>
                    )
                  })
                }
              </select>
              {errors?.city && (
                <span className="text-red-700">{errors.city.message}</span>
              )}
            </div>
          </div>
          <div className="mt-2.5">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Area total da fazenda
            </label>

            <div className="mt-2.5">
              <input
                {...register('totalFarmArea', { required: requiredField, setValueAs: (value) => Number(value) })}
                type="number"
                name="totalFarmArea"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              {errors?.totalFarmArea && (
                <span className="text-red-700">{errors.totalFarmArea.message}</span>
              )}
            </div>
          </div>
          <div className="mt-2.5">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Area total agricultavel
            </label>

            <div className="mt-2.5">
              <input
                {...register('totalArableArea', { required: requiredField, setValueAs: (value) => Number(value) })}
                type="number"
                name="totalArableArea"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors?.totalArableArea && (
                <span className="text-red-700">{errors.totalArableArea.message}</span>
              )}
            </div>
          </div>
          <div className="mt-2.5">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Area total de vegetação
            </label>

            <div className="mt-2.5">
              <input
                {...register('totalVegetationArea', { required: requiredField, setValueAs: (value) => Number(value) })}
                type="number"
                name="totalVegetationArea"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors?.totalVegetationArea && (
                <span className="text-red-700">{errors.totalVegetationArea.message}</span>
              )}
            </div>
          </div>
          <div className="mt-2.5">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Plantações (culturas)
            </label>

            <div className="mt-2.5">
              <Controller
                {...register('crops', { required: requiredField })}
                control={control}
                name="crops"
                render={({ field: { onChange, value } }) => (
                  <MultiSelect
                    options={cropsOptions}
                    value={value ? value : []}
                    onChange={onChange}
                    labelledBy=""
                    overrideStrings={overrideStringsMultiselect}
                  />
                )}
              />
              {errors?.crops && (
                <span className="text-red-700">{errors.crops.message}</span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-3">
          {
            errorArea && (
              <span className="text-red-700">A area total da fazenda nao pode ser menor que a soma das areas agricultaveis</span>
            )
          }
        </div>
        <div className="mt-10">
          <Button type="submit" size="3" className="block w-full rounded-md capitalize cursor-pointer px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm bg-blue-500 disabled:pointer-events-none hover:bg-blue-700 hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            disabled={isSubmitting || !isValid}>
            {dynamicLabel()}
          </Button>
        </div>
      </form>
    </div>
  )
}
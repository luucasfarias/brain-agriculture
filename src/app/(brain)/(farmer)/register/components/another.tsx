"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@radix-ui/themes";
import { useForm, SubmitHandler } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { z, ZodType } from "zod";

interface FormValues {
  name: string;
  selectedOptions: string[];
}

const schema: ZodType<FormValues> = z.object({
  name: z.string().min(1).max(50),
  selectedOptions: z.array(z.string()),
})

export function AnotherForm(props: any) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const options = [
    { label: "Café", value: "coffee" },
    { label: "Caféy", value: "coffeey" },
    { label: "Caféx", value: "coffeex" },
  ];

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Faça algo com os dados do formulário, como enviar para um servidor
  };


  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nome:
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
            id="name"
            type="text"
            {...register('name')}
            placeholder="Digite seu nome"
          />
          {errors.name && <p className="text-red-500 text-xs italic">Campo obrigatório</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Selecione:</label>
          <select
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.selectedOptions ? 'border-red-500' : ''}`}
            {...register('selectedOptions')}
            onChange={(e) => setValue('selectedOptions', Array.from(e.target.selectedOptions).map(opt => opt.value))}
            multiple
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.selectedOptions && <p className="text-red-500 text-xs italic">Campo obrigatório</p>}
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
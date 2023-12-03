/* eslint-disable @next/next/no-async-client-component */
'use client'

import React, { useState, useEffect } from "react"
import { TableFarmers } from "@/components/table"
import { api } from "@/data/api"
import { Farmer } from "@/data/types/farmer"
import { Button, Flex, Heading } from "@radix-ui/themes"
import { UserPlus } from "lucide-react"
import { useRouter } from 'next/router'

const getFarmers = async (): Promise<Farmer[]> => {
  const response = await fetch('http://localhost:3001/farmers')
  return response.json()
}


export default async function ListFarmers() {
  const farmersData = await getFarmers()

  async function onRe() {
    console.log('remove');
  }

  const onRemove = async (id: number) => {
    console.log('aqui: ', id);
    try {
      const response = await fetch(`http://localhost:3001/farmers/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
      if (response.ok) {
        console.log(response);
        // router.replace(router.asPath)
        console.log('Removido com sucesso');

      } else {
        console.log('Opps! some error occurred: ', response);
      }
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <div>
      <Flex direction="row" justify="between" align="center" className="mt-8">
        <Heading>
          Produtores cadastrados
        </Heading>

        <Button size="3" color="blue" className="cursor-pointer">
          <UserPlus />
          Adicionar novo produtor
        </Button>
      </Flex>

      <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
        <input type="text" name="search" id="" placeholder="Buscar" className="border-sky-100" />
      </Flex>

      <Flex direction="row" className="mt-4">
        <TableFarmers data={farmersData} onAction={onRemove} />
      </Flex>
    </div>
  )
}
import { z } from 'zod'
import type { NextRequest } from 'next/server';
import data from '../data.json';

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { searchParams } = request.nextUrl

  const query = z.string().parse(searchParams.get('q'))

  const farmer = data.farmers.filter((item) => {
    return item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  })

  return Response.json(farmer)
}

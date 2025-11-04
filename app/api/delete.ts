import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'products.json')

export async function POST(req: NextRequest) {
  const { id } = await req.json()
  let data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : []
  data = data.filter((p: any) => p.id !== id)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  return NextResponse.json({ success: true })
}
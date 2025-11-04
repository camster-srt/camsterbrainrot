import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'products.json')

export async function GET() {
  try {
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]'
    return NextResponse.json(JSON.parse(data))
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read products' }, { status: 500 })
  }
}
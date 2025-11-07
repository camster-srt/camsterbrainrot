import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ ok: false, message: 'Server not configured' }, { status: 500 });
    }

    if (password === adminPassword) {
      // success
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({ ok: false, message: 'Invalid password' }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'Bad request' }, { status: 400 });
  }
}
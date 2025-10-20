import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    if (!payload?.receiver || !payload?.subject || !payload?.body) {
      return NextResponse.json(
        { ok: false, error: 'Missing receiver/subject/body' },
        { status: 400 }
      );
    }
    const res = await fetch('https://psinv.net/api/sendemail.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const raw = await res.text();
    if (!res.ok) {
      return NextResponse.json({ ok: false, status: res.status, body: raw }, { status: res.status });
    }
    try {
      const json = JSON.parse(raw);
      return NextResponse.json({ ok: true, response: json });
    } catch {
      return NextResponse.json({ ok: true, response: raw });
    }
  } catch (err: any) {
    console.error('send-email proxy error:', err);
    return NextResponse.json({ ok: false, error: err?.message || 'Unknown error' }, { status: 500 });
 }
}
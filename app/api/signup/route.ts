import { NextResponse, type NextRequest } from 'next/server';
import { processSignup, signupSchema } from '@/lib/signup';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = signupSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        issues: parsed.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
      },
      { status: 400 },
    );
  }

  const ipAddress = clientIp(req);
  const userAgent = req.headers.get('user-agent') ?? undefined;

  try {
    const result = await processSignup(parsed.data, { ipAddress, userAgent });
    return NextResponse.json(result, { status: result.status === 'created' ? 201 : 200 });
  } catch (err) {
    console.error('[POST /api/signup] failed', err);
    return NextResponse.json(
      { error: 'Signup failed. Please try again in a moment.' },
      { status: 500 },
    );
  }
}

function clientIp(req: NextRequest): string | undefined {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim();
  return req.headers.get('x-real-ip') ?? undefined;
}

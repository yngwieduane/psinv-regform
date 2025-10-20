// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ALLOWED_MIME = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'];
const MAX_BYTES = 2 * 1024 * 1024;
const MAX_W = 800;
const MAX_H = 400;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files?.length) {
      return NextResponse.json({ success: false, error: 'No files uploaded' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || req.nextUrl.origin);

    const saved: Array<{ name: string; path: string; fullPath: string }> = [];

    for (const file of files) {
      // Basic validations
      if (!ALLOWED_MIME.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: `“${file.name}” must be SVG, PNG, JPG or GIF.` },
          { status: 415 }
        );
      }
      if (file.size > MAX_BYTES) {
        return NextResponse.json(
          { success: false, error: `“${file.name}” is too large (${Math.ceil(file.size / 1024)} KB). Max 2048 KB.` },
          { status: 413 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Dimension validations for raster images
      if (file.type !== 'image/svg+xml') {
        const meta = await sharp(buffer).metadata();
        const w = meta.width ?? 0;
        const h = meta.height ?? 0;
        if (w > MAX_W || h > MAX_H) {
          return NextResponse.json(
            { success: false, error: `“${file.name}” is ${w}×${h}. Max ${MAX_W}×${MAX_H}px.` },
            { status: 400 }
          );
        }
      }
      const safeBase = file.name.replace(/[/\\?%*:|"<>]/g, '_').replace(/\s+/g, '_');
      const ext = path.extname(safeBase) || '';
      const base = path.basename(safeBase, ext);
      let candidate = `${base}${ext}`;
      let i = 1;
      while (fs.existsSync(path.join(uploadDir, candidate))) {
        candidate = `${base}_${i}${ext}`;
        i += 1;
      }

      const filePath = path.join(uploadDir, candidate);
      fs.writeFileSync(filePath, buffer);

      saved.push({
        name: candidate,
        path: `/uploads/${candidate}`,
        fullPath: `${baseUrl}/uploads/${candidate}`,
      });
    }

    return NextResponse.json({ success: true, files: saved }, { status: 200 });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}

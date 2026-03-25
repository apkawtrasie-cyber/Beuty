import { createWriteStream } from "fs";
import { deflateSync } from "zlib";
import { mkdirSync } from "fs";

function writePNG(filePath, size, bgR, bgG, bgB, fgR, fgG, fgB) {
  const width = size;
  const height = size;

  // Build raw RGBA rows
  const rawRows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 4); // filter byte + RGBA per pixel
    row[0] = 0; // filter type: None
    for (let x = 0; x < width; x++) {
      const cx = Math.abs(x - width / 2);
      const cy = Math.abs(y - height / 2);
      // Draw a centred square "R" lettermark area (inner 50%)
      const inInner = cx < width * 0.22 && cy < height * 0.22;
      row[1 + x * 4 + 0] = inInner ? fgR : bgR;
      row[1 + x * 4 + 1] = inInner ? fgG : bgG;
      row[1 + x * 4 + 2] = inInner ? fgB : bgB;
      row[1 + x * 4 + 3] = 255;
    }
    rawRows.push(row);
  }
  const raw = Buffer.concat(rawRows);
  const compressed = deflateSync(raw);

  function crc32(buf) {
    const table = [];
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[i] = c;
    }
    let crc = 0xffffffff;
    for (const byte of buf) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }

  function chunk(type, data) {
    const typeBytes = Buffer.from(type, "ascii");
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const crcInput = Buffer.concat([typeBytes, data]);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(crcInput));
    return Buffer.concat([len, typeBytes, data, crcBuf]);
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdr = chunk("IHDR", ihdrData);
  const idat = chunk("IDAT", compressed);
  const iend = chunk("IEND", Buffer.alloc(0));

  const png = Buffer.concat([sig, ihdr, idat, iend]);

  mkdirSync("public", { recursive: true });
  createWriteStream(filePath).end(png);
  console.log(`✓ ${filePath} (${size}×${size})`);
}

// Alabaster bg (#FDF8F5), Taupe fg (#8E735B)
writePNG("public/icon-192.png", 192, 0xfd, 0xf8, 0xf5, 0x8e, 0x73, 0x5b);
writePNG("public/icon-512.png", 512, 0xfd, 0xf8, 0xf5, 0x8e, 0x73, 0x5b);

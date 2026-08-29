/**
 * Khmer Heritage — Media Validator (KH-018)
 * Magic bytes detection, MIME consistency checks, SHA-256 calculation & integrity verification.
 */

import { createHash } from 'crypto';
import type { ControlledPilotMediaType } from './types.ts';

export interface ValidationResult {
  isValid: boolean;
  magicBytesVerified: boolean;
  detectedMime: string;
  detectedFormat: string;
  sha256: string;
  bytes: number;
  error?: string;
}

export function computeSha256(buffer: Buffer): string {
  return createHash('sha256').update(buffer).digest('hex');
}

/**
 * Detect MIME and file format from buffer magic bytes.
 */
export function detectMagicBytes(buffer: Buffer): { mime: string; format: string; verified: boolean } {
  if (!buffer || buffer.length === 0) {
    return { mime: 'application/octet-stream', format: 'unknown', verified: false };
  }

  // JPEG: FF D8 FF
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { mime: 'image/jpeg', format: 'jpeg', verified: true };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { mime: 'image/png', format: 'png', verified: true };
  }

  // WebP: RIFF .... WEBP
  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return { mime: 'image/webp', format: 'webp', verified: true };
  }

  // TIFF Little-Endian: 49 49 2A 00 ("II*.")
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x49 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x2a &&
    buffer[3] === 0x00
  ) {
    return { mime: 'image/tiff', format: 'tiff', verified: true };
  }

  // TIFF Big-Endian: 4D 4D 00 2A ("MM.*")
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x4d &&
    buffer[1] === 0x4d &&
    buffer[2] === 0x00 &&
    buffer[3] === 0x2a
  ) {
    return { mime: 'image/tiff', format: 'tiff', verified: true };
  }

  // PDF: %PDF- (25 50 44 46)
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46
  ) {
    return { mime: 'application/pdf', format: 'pdf', verified: true };
  }

  // Ogg / Opus: OggS (4F 67 67 53)
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x4f &&
    buffer[1] === 0x67 &&
    buffer[2] === 0x67 &&
    buffer[3] === 0x53
  ) {
    return { mime: 'audio/ogg', format: 'ogg', verified: true };
  }

  // MP3 with ID3v2 tag: ID3 (49 44 33)
  if (buffer.length >= 3 && buffer[0] === 0x49 && buffer[1] === 0x44 && buffer[2] === 0x33) {
    return { mime: 'audio/mpeg', format: 'mp3', verified: true };
  }

  // MP3 sync frame (FF FB, FF F3, FF F2, FF E3)
  if (
    buffer.length >= 2 &&
    buffer[0] === 0xff &&
    (buffer[1] === 0xfb || buffer[1] === 0xf3 || buffer[1] === 0xf2 || buffer[1] === 0xe3)
  ) {
    return { mime: 'audio/mpeg', format: 'mp3', verified: true };
  }

  // MP4 / MOV: offset 4 'ftyp' or 'moov'
  if (buffer.length >= 8) {
    const ftyp = buffer.toString('ascii', 4, 8);
    if (ftyp === 'ftyp' || ftyp === 'moov' || ftyp === 'wide' || ftyp === 'mdat') {
      return { mime: 'video/mp4', format: 'mp4', verified: true };
    }
  }

  // GLTF Binary (.glb): 67 6C 54 46 ('glTF')
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x67 &&
    buffer[1] === 0x6c &&
    buffer[2] === 0x54 &&
    buffer[3] === 0x46
  ) {
    return { mime: 'model/gltf-binary', format: 'glb', verified: true };
  }

  // GLTF JSON (.gltf): starts with JSON object containing asset/scene
  if (buffer.length >= 20) {
    const textPreview = buffer.subarray(0, Math.min(buffer.length, 512)).toString('utf8').trim();
    if (textPreview.startsWith('{') && (textPreview.includes('"asset"') || textPreview.includes('"scenes"'))) {
      return { mime: 'model/gltf+json', format: 'gltf', verified: true };
    }
  }

  return { mime: 'application/octet-stream', format: 'unknown', verified: false };
}

/**
 * Check if the detected MIME is consistent with the declared media type.
 */
export function isMimeCompatibleWithMediaType(
  mime: string,
  mediaType: ControlledPilotMediaType
): boolean {
  switch (mediaType) {
    case 'image':
      return mime.startsWith('image/') || mime === 'image/jpeg' || mime === 'image/png' || mime === 'image/webp' || mime === 'image/tiff';
    case 'audio':
      return mime.startsWith('audio/') || mime === 'audio/ogg' || mime === 'audio/mpeg' || mime === 'audio/mp3';
    case 'video':
      return mime.startsWith('video/') || mime === 'video/mp4' || mime === 'video/webm';
    case 'document':
      return mime === 'application/pdf' || mime === 'application/octet-stream';
    case 'three_d':
      return (
        mime.startsWith('model/') ||
        mime === 'model/gltf+json' ||
        mime === 'model/gltf-binary' ||
        mime === 'application/json' ||
        mime === 'application/octet-stream'
      );
    default:
      return false;
  }
}

/**
 * Full buffer validator for downloaded assets.
 */
export function validateMediaBuffer(
  buffer: Buffer,
  declaredMediaType: ControlledPilotMediaType,
  expectedChecksum?: string,
  declaredContentType?: string
): ValidationResult {
  const sha256 = computeSha256(buffer);
  const magic = detectMagicBytes(buffer);

  if (expectedChecksum && sha256.toLowerCase() !== expectedChecksum.toLowerCase()) {
    return {
      isValid: false,
      magicBytesVerified: magic.verified,
      detectedMime: magic.mime,
      detectedFormat: magic.format,
      sha256,
      bytes: buffer.length,
      error: `Checksum mismatch: expected ${expectedChecksum}, got ${sha256}`,
    };
  }

  // Check magic bytes consistency
  let detectedMime = magic.mime;
  if (!magic.verified && declaredContentType) {
    // Fall back to declared content type if magic bytes were not identifiable (e.g. some text/json gltf streams)
    detectedMime = declaredContentType.split(';')[0].trim();
  }

  const isCompatible = isMimeCompatibleWithMediaType(detectedMime, declaredMediaType);
  if (!isCompatible && magic.verified) {
    return {
      isValid: false,
      magicBytesVerified: magic.verified,
      detectedMime,
      detectedFormat: magic.format,
      sha256,
      bytes: buffer.length,
      error: `MIME type ${detectedMime} is incompatible with media type ${declaredMediaType}`,
    };
  }

  return {
    isValid: true,
    magicBytesVerified: magic.verified,
    detectedMime,
    detectedFormat: magic.format,
    sha256,
    bytes: buffer.length,
  };
}

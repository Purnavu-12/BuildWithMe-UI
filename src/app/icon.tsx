import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505' }}>
      <div style={{ width: 34, height: 34, display: 'flex', position: 'relative' }}>
        {[[-2, 10], [14, 10], [6, 2], [22, 18]].map(([left, top], index) => (
          <div key={index} style={{ position: 'absolute', left, top, width: index > 1 ? 10 : 18, height: index > 1 ? 10 : 18, border: '2px solid #f4f1e8', background: index === 1 ? '#f4f1e8' : '#050505', transform: 'rotate(45deg)' }} />
        ))}
      </div>
    </div>,
    size,
  );
}

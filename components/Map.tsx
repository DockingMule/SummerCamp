import React from 'react';

export default function Map({ url }: { url?: string }) {
  return (
    <iframe
      style={{
        width: '100%',
        height: '100%',
        border: 0,
      }}
      src={url}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
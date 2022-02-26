import React from 'react';

const url = 'https://aod-rfi.akamaized.net/rfi/francais/audio/jff/'
  + '{YEAR}{MONTH}/journal_francais_facile_20h00_-_20h10_gmt_{YEAR}{MONTH}{DAY}.mp3';

/**
 * In the night, until 20:00, the new url does not exist. So, we'll generate 2 links
 */
const today = new Date();
const srcToday = url
  .replaceAll('{YEAR}', today.getFullYear())
  .replaceAll('{MONTH}', today.getMonth() + 1)
  .replaceAll('{DAY}', today.getDate());

const yesterday = new Date(today.setDate(today.getDate() - 1));
const srcYesterday = url
  .replaceAll('{YEAR}', yesterday.getFullYear())
  .replaceAll('{MONTH}', yesterday.getMonth() + 1)
  .replaceAll('{DAY}', yesterday.getDate());

export const Component = () => (
  <audio controls preload="metadata" style={{ width: '100%' }}>
    <source src={srcToday} />
    <source src={srcYesterday} />
      Your browser does not support the audio element.
  </audio>
);

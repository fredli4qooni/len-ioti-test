// src/utils/coordinateConverter.ts

/**
 * @typedef {object} DMSOutput
 * @property {number} deg - Degrees
 * @property {number} min - Minutes
 * @property {number} sec - Seconds
 * @property {string} dir - Direction (N, S, E, W)
 */

/**
 * Mengonversi koordinat dari format Degrees, Minutes, Seconds (DMS) ke Decimal Degrees (DD).
 * @param {number} deg - Nilai derajat.
 * @param {number} min - Nilai menit.
 * @param {number} sec - Nilai detik.
 * @param {string} dir - Arah mata angin ('N', 'S', 'E', 'W').
 * @returns {number} Nilai koordinat dalam format Decimal Degrees.
 */
export const dmsToDd = (deg: number, min: number, sec: number, dir: string): number => {
  let dd = deg + min / 60 + sec / 3600;

  // Jika arahnya Selatan atau Barat, buat nilainya negatif
  if (dir === 'S' || dir === 'W') {
    dd = dd * -1;
  }
  return dd;
};

/**
 * Mengonversi koordinat dari format Decimal Degrees (DD) ke Degrees, Minutes, Seconds (DMS).
 * @param {number} dd - Nilai koordinat dalam format Decimal Degrees.
 * @param {'lat' | 'lon'} type - Tipe koordinat, apakah 'lat' (latitude) atau 'lon' (longitude).
 * @returns {string} Koordinat dalam format string DMS (contoh: "90° 0' 0" N").
 */
export const ddToDms = (dd: number, type: 'lat' | 'lon'): string => {
  const absolute = Math.abs(dd);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.round((minutesNotTruncated - minutes) * 60);

  let direction = '';
  if (type === 'lon') {
    direction = dd >= 0 ? 'E' : 'W';
  } else {
    direction = dd >= 0 ? 'N' : 'S';
  }

  return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
};
import { dmsToDd, ddToDms } from './coordinateConverter';

describe('dmsToDd', () => {
  it('should convert North latitude correctly', () => {
    // Cth dari soal: 49°30'10" N -> 49.50278°
    expect(dmsToDd(49, 30, 10, 'N')).toBeCloseTo(49.50278, 5);
  });

  it('should convert South latitude correctly', () => {
    // Cth kebalikan: 49°30'10" S -> -49.50278°
    expect(dmsToDd(49, 30, 10, 'S')).toBeCloseTo(-49.50278, 5);
  });

  it('should convert East longitude correctly', () => {
    // Cth dari soal: 123°30'20" W. tes versi Timur.
    expect(dmsToDd(123, 30, 20, 'E')).toBeCloseTo(123.50556, 5);
  });

  it('should convert West longitude correctly', () => {
    // Cth dari soal: 123°30'20" W -> -123.50556°
    expect(dmsToDd(123, 30, 20, 'W')).toBeCloseTo(-123.50556, 5);
  });

  it('should handle zero values', () => {
    expect(dmsToDd(0, 0, 0, 'N')).toBe(0);
  });
});

describe('ddToDms', () => {
  it('should convert positive latitude (North) to DMS string', () => {
    // Cth dari soal: 49.50278° -> 49° 30' 10" N
    expect(ddToDms(49.50278, 'lat')).toBe("49° 30' 10\" N");
  });

  it('should convert negative latitude (South) to DMS string', () => {
    expect(ddToDms(-8.65, 'lat')).toBe("8° 39' 0\" S"); // Cth: Kuta, Bali
  });

  it('should convert positive longitude (East) to DMS string', () => {
    expect(ddToDms(115.17, 'lon')).toBe("115° 10' 12\" E"); // Cth: Kuta, Bali
  });

  it('should convert negative longitude (West) to DMS string', () => {
    // Cth dari soal: -123.50556° -> 123° 30' 20" W
    expect(ddToDms(-123.50556, 'lon')).toBe("123° 30' 20\" W");
  });
});
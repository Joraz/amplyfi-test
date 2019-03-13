const colors: string[] = [
  '#5FCFA8',
  '#F8BD30',
  '#47443A',
  '#573C2C',
  '#9D4640',
];

export function getColors(length: number): string[] {
  const returnColors: string[] = [];
  for (let i = 0; i < length; i++) {
    returnColors.push(colors[i % colors.length]);
  }

  return returnColors;
}

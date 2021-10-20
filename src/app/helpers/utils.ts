export function GetEnumByIndex(enumElement: any, enumIdx: number): string | number {
  let enumValue = '';

  Object.keys(enumElement)
    .some((element, idx: number) => idx === enumIdx ? enumValue = enumElement[element] : false)
  return enumValue;
}

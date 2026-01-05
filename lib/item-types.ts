export const COLLECTIONS = [
  'artificial-flowers',
  'artificial-green-plants',
  'bonsai',
  'hanging-greenery',
  'decor-accessories',
] as const

export type CollectionType = typeof COLLECTIONS[number]

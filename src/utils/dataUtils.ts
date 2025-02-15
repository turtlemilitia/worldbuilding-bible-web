import { TCanHaveImages, TImage } from '@/types'

export const filterOutArrays = (data: object): Partial<object> => {
  return Object.keys(data).reduce((result, key) => {
    if (!Array.isArray(data[key as keyof object])) {
      return { ...result, [key]: data[key as keyof object] }
    }
    return result
  }, {})
}

export const filterOnlyArrays = (data: object): { [key: string]: object[] } => {
  return Object.keys(data).reduce((result, key) => {
    if (Array.isArray(data[key as keyof object])) {
      return { ...result, [key]: data[key as keyof object] }
    }
    return result
  }, {})
}

export const readyDataForRequest = <T extends object> (data: T): {
  [key: string]: number | string | string[]
} => {
  return Object.fromEntries(Object.entries(data).map(([key, item]) => {
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      return [key, item.id]
    } else if (Array.isArray(item)) {
      return [
        key, item
          .filter((item) => item?.id)
          .map((item) => item.id),
      ]
    } else {
      return [key, item]
    }
  }))
}

export const filterDataByKeys = (baseData: object, dataToFilter: object): any =>
  Object.keys(baseData)
    .filter(key => key in dataToFilter)
    .reduce((acc: object, key) => {
      acc[key as keyof object] = dataToFilter[key as keyof object]
      return acc
    }, {})

export const mapPlural = (singular: string) => {
  switch (singular) {
    case 'currency':
      return 'currencies'
    case 'deity':
      return 'deities'
    case 'species':
      return 'species'
    case 'story':
      return 'stories'
    case 'compendium':
      return 'compendia'
    default:
      return `${singular}s`
  }
}
export const mapSingular = (singular: string) => {
  switch (singular) {
    case 'currencies':
      return 'currency'
    case 'deities':
      return 'deity'
    case 'species':
      return 'species'
    case 'stories':
      return 'story'
    case 'compendia':
      return 'compendium'
    default:
      return singular.slice(0, -1)
  }
}

export const getImageForEntity = (entity: TCanHaveImages, type: 'cover' | 'profile'): TImage | undefined => {
  return entity?.images
    ?.find(image => image.pivot?.type?.name.toLowerCase() === type)
}

export const fixId = (id: string | number | 'new'): number | undefined => {
  return (id === 'new' || !id) ? undefined : Number(id)
}
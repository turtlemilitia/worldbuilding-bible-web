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

export const readyDataForRequest = <T extends object> (data: T): { [key: string]: number | string | string[] } => {
  return Object.fromEntries(Object.entries(data).map(([key, item]) => {
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      return [key, item.id]
    } else if (Array.isArray(item)) {
      return [key, item
        .filter((item) => item?.slug)
        .map((item) => item.slug)]
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
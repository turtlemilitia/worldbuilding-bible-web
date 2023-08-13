type hasChildrenOrParent = {
  id: number;
  parent?: hasChildrenOrParent;
  children?: hasChildrenOrParent[]
}

export const createNestedArray = <T extends hasChildrenOrParent> (data: T[]): T[] => {

  const childrenMapper = (item: T): T => {
    return {
      ...item,
      children: data
        .filter((potentialKid) => potentialKid.parent?.id === item.id)
        .map(childrenMapper)
    }
  }

  return data
    .map(childrenMapper)
    .filter(item => !item.parent)
}

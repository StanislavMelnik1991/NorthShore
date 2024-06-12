interface Item {
  id: string | number;
}

export function removeDuplicates<T extends Item>(items: T[]): T[] {
  const uniqueItems = new Map<string | number, T>();

  items.forEach((item) => {
    if (!uniqueItems.has(item.id)) {
      uniqueItems.set(item.id, item);
    }
  });

  return Array.from(uniqueItems.values());
}

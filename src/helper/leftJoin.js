const leftJoin = (objArr1, objArr2, key1, key2) => objArr1.map(
    anObj1 => ({
        ...objArr2.find(
            anObj2 => anObj1[key1] === anObj2[key2]
        ),
        ...anObj1
    })
);

const dynamicMerge = (sourceArray, targetArray, sourceKey, targetKey, mergeKey) => {
    return sourceArray.map((sourceItem) => {
      const matchedItem = targetArray.find(
        (targetItem) => targetItem[targetKey] === sourceItem[sourceKey]
      );
      return {
        ...sourceItem,
        [mergeKey]: matchedItem ? matchedItem.khmer_name : "Unknown",
      };
    });
};
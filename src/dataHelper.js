function binarySearchMT(arr, x)
{   
    let l = 0;
    let r = arr.length - 1;
    let mid;

    while (r >= l) {
         mid = l + Math.floor((r - l) / 2);
        if (arr[mid]["measurementTime"] == x)
            return true;
        if (arr[mid]["measurementTime"]  > x)
            r = mid - 1;  
        else
            l = mid + 1;
    }
  
    return false;
}
 const getBunkers = (bunkerDatas)=>{
    const bunkers = new Set()
    for (let index = 0; index < bunkerDatas.length; index++) {
        const element = JSON.stringify(bunkerDatas[index].bunker);

        if(bunkers.has(element))
            continue;
        bunkers.add(element)
    }
    return  bunkers;
}
export const getBunkerDatasbyBunker=(bunkerDatas)=>{
    const bunkers=getBunkers(bunkerDatas)
    const bunkerDataByBunker = {};


  for (const bunker of bunkers) {
    bunkerDataByBunker[bunker] = [];
  }

  for (const bunkerData of bunkerDatas) {
    const bunkerKey = JSON.stringify(bunkerData.bunker);

    const mtExist = binarySearchMT(bunkerDataByBunker[bunkerKey],bunkerData["measurementTime"])
    if(mtExist){
     continue
    }
    const newFormData={
        bunkerName:bunkerData['bunker']['name'],
        amount:bunkerData['amount'],
        measurementTime:bunkerData["measurementTime"]
    }
    bunkerDataByBunker[bunkerKey].push(newFormData);
  }

  return bunkerDataByBunker;
}
const getExtractionScales=(extractionScaleDatas)=>{
    const extractionScales = new Set()
    for (let index = 0; index < extractionScaleDatas.length; index++) {
        const element = JSON.stringify(extractionScaleDatas[index].extractionScale);
        if(extractionScales.has(element))
            continue;
        extractionScales.add(element)
    }
    return extractionScales
}
export const getExtractionScaleDatasbyExtractionScale=(extractionScaleDatas)=>{
    const extractionScales=getExtractionScales(extractionScaleDatas)
    const esDataByEs = {};


  for (const es of extractionScales) {
    esDataByEs[es] = [];
  }

  for (const extractionScaleData of extractionScaleDatas) {
    const esKey = JSON.stringify(extractionScaleData['extractionScale']);
    const mtExist = binarySearchMT(esDataByEs[esKey],extractionScaleData["measurementTime"])
   if(mtExist){
    continue
   }
    const newFormData={
        extractionScaleName:extractionScaleData['extractionScale']['name'],
        amount:extractionScaleData['amount'],
        measurementTime:extractionScaleData["measurementTime"],
        deviation:extractionScaleData["deviationFromTarget"]
    }
    esDataByEs[esKey].push(newFormData);
  }

  return esDataByEs;
}
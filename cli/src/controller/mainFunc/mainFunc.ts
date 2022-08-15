/* eslint-disable @typescript-eslint/no-unused-expressions */
export async function delay(ms: number) {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
}

export async function newSavedArr(arr: Array<Object>,newBody: IPeople) : Promise<Array<any>>  {
  let newArray = [arr];
  newBody.participation = Number(newBody.participation)
  newBody.id = JSON.stringify(Math.random());
  newArray[0].push(newBody);
  newArray =  await Promise.resolve(newArray);

  return newArray[0]
}

export async function newDeletedArr(id: string,oldBody : Array<IPeople>) : Promise<Array<IPeople>> {
  // eslint-disable-next-line array-callback-return
  let newBody = oldBody.filter((obj) => {return obj.id !== id})
  newBody =  await Promise.resolve(newBody);

  return newBody;
}

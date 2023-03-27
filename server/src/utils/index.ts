export function delay(time: number, val?: any) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(val);
    }, time);
  });
}

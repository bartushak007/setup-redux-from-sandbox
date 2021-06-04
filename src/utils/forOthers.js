export function fetchSimulator(fakeData) {
  return new Promise((rs, rj) => {
    setTimeout(() => {
      if (`${Math.random()}`.slice(2) % 2 === 0) {
        rs(fakeData || [1, 2, 3, 4, 5, 6]);
      } else rj("wery bad");
    }, 1000);
  });
}

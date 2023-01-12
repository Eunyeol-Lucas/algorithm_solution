function hashStringToInt(s, tableSize) {
  let hash = 17;
  for (let i = 0; i < s.length; i++) {
    hash = (13 * hash * s.charCodeAt(i)) % tableSize;
    return hash;
  }
}

class HashTabel {
  constructor() {
    this.table = new Array(71);
  }
  setItem = (key, value) => {
    const idx = hashStringToInt(key, this.table.length);
    if (this.table[idx]) {
      this.table[idx].push([key, value]);
    } else {
      this.table[idx] = [[key, value]];
    }
  };
  getItem = (key) => {
    const idx = hashStringToInt(key, this.table.length);
    if (!this.table[idx]) return null;
    return this.table[idx].find((el) => el[0] === key)[1];
  };
}

function solution() {
  function findParent(parent, x) {
    if (parent[x] != x) {
      return findParent(parent, parent[x]);
    }
    return parent[x];
  }

  function unionParent(parent, a, b) {
    const a = findParent(parent, a);
    const b = findParent(parent, b);
    if (a < b) parent[b] = a;
    else parent[a] = b;
  }
}

input = open('input.txt', 'rt').read().rstrip().split('\n')

def dfs1(current, parent):
    subtrees[current] = 1
    for i in range(len(graph[current])):
        child = graph[current][i][0]
        if child != parent:
            dfs1(child, current)
            subtrees[current] += subtrees[child]

n = int(input[0])
graph = [[] for _ in range(n+1)]
subtrees = [0 for _ in range(n+1)]
for i in range(1, n):
    x, y, t = map(int, input[i].split())
    graph[x].append((y,t))
    graph[y].append((x,t))
dfs1(1,1)

print(subtrees)
import math
from collections import deque

input = open('input.txt', 'rt').read().rstrip().split('\n')

N, L, R = list(map(int, input[0].split()))
populations = list(map(lambda x: list(map(int, x.split())), input[1:]))
directions = [(0,1), (1,0), (0, -1), (-1, 0)]

dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]

def isBetweenStandard (a,b):
  difference = abs(a - b)
  if L <= difference <= R:
    return True
  return False

def bfs(i, j):
    dq = deque()
    dq.append((i, j))
    visit[i][j] = True
    union = [(i, j)]
    count = populations[i][j]
    while dq:
        x, y = dq.popleft()
        for nx, ny in directions:
            if nx < 0 or nx >= N or ny < 0 or ny >= N or visit[nx][ny]: continue
            if isBetweenStandard(populations[nx][ny], populations[x][y]):
                union.append((nx, ny))
                visit[nx][ny] = True
                dq.append((nx, ny))
                count += populations[nx][ny]
    for x, y in union:
        populations[x][y] = math.floor(count / len(union))
    return len(union)
    
def bfs(i, j):
    dq = deque()
    dq.append((i, j))
    visit[i][j] = True
    union = [(i, j)]
    count = populations[i][j]   
        
    while dq:
        x, y = dq.popleft()
        for d in range(4):
            nx = x + dx[d]
            ny = y + dy[d]
            if nx < 0 or ny < 0 or nx >= N or ny >= N:
                continue
            if visit[nx][ny]:
                continue
            if L <= abs(populations[nx][ny] - populations[x][y]) <= R:  
                union.append((nx, ny))
                visit[nx][ny] = True
                dq.append((nx, ny))
                count += populations[nx][ny]
    
    for x, y in union:
        populations[x][y] = math.floor(count / len(union))

    return len(union)

answer = 0    
while True:   
    visit = [[False] * N for _ in range(N)]
    flag = False  
    
    for i in range(N):
        for j in range(N):
            if not visit[i][j]:
                if bfs(i, j) > 1:
                    flag = True
    if not flag:   
        break
    answer += 1

print(answer)
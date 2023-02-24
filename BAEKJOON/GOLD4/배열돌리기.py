from itertools import permutations
from copy import deepcopy

input = open("input.txt", "rt").read().rstrip().split("\n")

N, M, K = list(map(int, input[0].split()))
arr = [list(map(int, i.split())) for i in input[1:N+1]]
rcs = [list(map(int, i.split())) for i in input[N+1:]]

answer = 1e9
for perm in permutations(rcs, K):
    copied_arr = deepcopy(arr)
    for r,c,s in perm:
        r -= 1
        c -= 1
        for i in range(s, 0, -1):
            tmp = copied_arr[r-i][c+i]
            copied_arr[r-i][c-i+1:c+i+1] = copied_arr[r-i][c-i:c+i] # ->
            for row in range(r-i, r+i): # ⬆️
                copied_arr[row][c-i] = copied_arr[row+1][c-i]
            copied_arr[r+i][c-i:c+i] = copied_arr[r+i][c-i+1:c+i+1] # <-
            for row in range(r+i, r-i, -1): # ⬇️
                copied_arr[row][c+i] = copied_arr[row-1][c+i]
            copied_arr[r-i+1][c+i] = tmp
    for row in copied_arr:
        answer = min(answer, sum(row))
    
print(answer)



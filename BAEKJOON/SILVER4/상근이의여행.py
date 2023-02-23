# input = open('input.txt', 'rt').read().rstrip().split('\n')

# # def solution(n, m, schedule):
# #     graph = [[] for _ in range(n+1)]
# #     for i in range(m):
# #         a, b = schedule[i]
# #         graph[a].append(b)
# #         graph[b].append(a)
# #     print(graph)
# #     pass

# T = int(input[0])
# idx = 1
# for _ in range(T):
#     N, M = map(int, input[idx].split())
#     # schedule = list(map(lambda x : list(map(int, x.split(' '))), input[idx+1: idx+1+N]))
#     idx += N + 1
#     print(N-1)

input = open('input.txt', 'rt').read().rstrip().split('\n')

T = int(input[0])
idx = 1
for _ in range(T):
    N, M = map(int, input[idx].split())
    idx += M + 1
    print(N-1)
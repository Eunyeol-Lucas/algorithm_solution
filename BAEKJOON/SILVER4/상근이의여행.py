input = open('input.txt', 'rt').read().rstrip().split('\n')

T = int(input[0])
idx = 1
for _ in range(T):
    N, M = map(int, input[idx].split())
    idx += M + 1
    print(N-1)
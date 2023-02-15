input = map(int, open('input.txt', 'rt').read().split('\n')[0].split(' '))
N, r, c = input
 
def solution(N, r, c):
  if N == 1 :
    return 2 * r + c
  size = 2 ** (N-1)
  # 1사분면
  if r < size and c < size:
    return solution(N-1, r, c)
  # 2사분면
  elif r < size and c >= size:
    return size ** 2 + solution(N-1, r, c - size)
  # 3사분면
  elif r >= size and c < size:
    return size ** 2 * 2 + solution(N-1, r - size, c)
  # 4사분면
  else:
    return size ** 2 * 3 + solution(N-1, r - size, c - size)
    
print(solution(N, r, c))
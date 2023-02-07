import sys
input = sys.stdin.readline

pr = open(0).read().rstrip().split('\n')

N, M = map(int, pr[0].split())

# dict의 프로퍼티로 이름-인덱스, 인덱스-이름 순으로 저장
dict = {}
for i in range(N):
  name = input().rstrip()
  dict[name] = i+1
  dict[str(i+1)] = name

for _ in range(M):
  m = input().rstrip()
  print(dict[m])
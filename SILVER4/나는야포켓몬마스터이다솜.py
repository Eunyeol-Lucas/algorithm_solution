# dict의 프로퍼티로 이름-인덱스, 인덱스-이름 순으로 저장
pr = open('input.txt', 'rt').read().rstrip().split('\n')
N, M = map(int, pr[0].split())

# 이름과 순서를 쌍으로 딕셔너리에 추가
_dic = dict(zip(pr[1:N+1], range(1, N+1)))
answer = []
for x in pr[N+1:]:
  # x가 문자일 경우 포켓몬 이름이므로 숫자를, 아닐 경우 포켓몬 이름을 추가
  answer.append(str(_dic[x]) if x.isalpha() else pr[int(x)])
print('\n'.join(answer))


# dict = dict(zip(pr[1:N+1], range(1, N+1)))

# print('\n'.join(map(lambda x: str(dict[x]) if x.isalpha() else pr[int(x)], pr[N+1:])))
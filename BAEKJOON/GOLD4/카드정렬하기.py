import heapq

input = list(map(int, open("input.txt", "rt").read().rstrip().split("\n")))
N = input[0]
arr = input[1:]

def solution(arr):
    heapq.heapify(arr)
    answer = 0
    while len(arr) > 1:
        _min = heapq.heappop(arr)
        _second_min = heapq.heappop(arr)
        tmp = _min +_second_min
        answer += tmp
        heapq.heappush(arr, tmp)
    return answer

print(solution(arr))
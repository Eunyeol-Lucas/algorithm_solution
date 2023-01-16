N, C = map(int, input().split())
_list = sorted([int(input()) for _ in range(N)])

def solution(arr):
    answer = 0
    left, right = 1, arr[-1] - arr[0]
    while left <= right:
        mid = (left + right) // 2
        current = arr[0]
        cnt = 1

        for i in range(1, N):
            if arr[i] >= current + mid:
                cnt += 1
                current = arr[i]
        if cnt >= C:
            left = mid + 1
            answer = mid
        else:
            right = mid - 1
    
    return answer

print(solution(_list))

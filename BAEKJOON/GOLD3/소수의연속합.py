# 유형: 투포인터

input = int(open('input.txt', 'rt').read())

def set_arr(n):
    # 인덱스에 따라 소수 여부를 기록하는 배열
    primes = [False, False] + [True] * (n-1)
    # 소수들의 누적합 저장
    arr = [0]
    for i in range(2, n+1):
        # 소수일 경우 누적합 배열에 저장
        if primes[i]:
            arr.append(arr[-1] + i)
            # 소수의 배수는 소수가 아니므로 n까지 소수가 아님을 체크
            j = 2
            while i * j <= n:
                primes[i*j] = False
                j += 1
    return arr
def solution(n):
    answer = 0
    arr = set_arr(n)
    # 투포인터
    left, right = 0, 1
    while right < len(arr):
        # 연속된 값이여야 하므로, 누적합 배열을 오른쪽으로 이동시키며 왼쪽 배열의 값을 빼줌
        cum_sum = arr[right] - arr[left]
        if cum_sum == n:
            answer += 1
            left += 1
        elif cum_sum < n:
            right += 1
        else:
            left += 1
    
            
    print(answer)
    
solution(input)

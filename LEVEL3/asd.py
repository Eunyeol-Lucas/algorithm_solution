def solution(stones, k):
  start = 0
  end = 200000000
  while start <= end:
    mid = (start+end) // 2
    cnt = 0
    for x in stones:
      if x <= mid:
        cnt += 1
      else:
        cnt = 0
    if cnt > k:
      break
    if cnt == k:
      end = mid - 1
    else:
      start = mid + 1
  return start
from itertools import permutations

def is_valid_move(maze, x, y):
    return 0 <= x < 4 and 0 <= y < 4 and maze[y][x] != 0

# Replace with the dumped maze values
maze = [
    [1, 0, 1, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 14]  # Exit at (3,3)
]

# BFS to find the shortest path
from collections import deque

def bfs():
    queue = deque([((0, 0), [])])  # Start at (0,0) with empty path
    directions = [(0, -1, '1'), (0, 1, '2'), (-1, 0, '3'), (1, 0, '4')]  # Up, Down, Left, Right
    
    while queue:
        (x, y), path = queue.popleft()
        
        if (x, y) == (3, 3):  # Found exit
            return ''.join(path)
        
        for dx, dy, move in directions:
            new_x, new_y = x + dx, y + dy
            if is_valid_move(maze, new_x, new_y):
                queue.append(((new_x, new_y), path + [move]))
                maze[new_y][new_x] = 0  # Mark as visited
    
    return None

solution = bfs()
print("Correct Move Sequence:", solution)

class Board:
    def __init__(self):
        self.board = [' ' for _ in range(9)]

    def display(self):
        print(f"""
        {self.board[0]} | {self.board[1]} | {self.board[2]}
        ---------
        {self.board[3]} | {self.board[4]} | {self.board[5]}
        ---------
        {self.board[6]} | {self.board[7]} | {self.board[8]}
        """)

    def update(self, position, mark):
        if self.board[position] == ' ':
            self.board[position] = mark
            return True
        return False

    def is_winner(self, mark):
        combos = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ]
        return any(all(self.board[i]==mark for i in combo) for combo in combos)

    def is_full(self):
        return ' ' not in self.board

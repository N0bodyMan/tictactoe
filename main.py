from game.board import Board
from game.player import Player

def main():
    print("Добро пожаловать в Крестики-нолики!")
    board = Board()
    player1 = Player("Игрок 1", "X")
    player2 = Player("Игрок 2", "O")
    current_player = player1

    while True:
        board.display()
        move = current_player.get_move()
        if board.update(move, current_player.mark):
            if board.is_winner(current_player.mark):
                board.display()
                print(f"Поздравляем! {current_player.name} победил!")
                break
            elif board.is_full():
                board.display()
                print("Ничья!")
                break
            current_player = player2 if current_player == player1 else player1
        else:
            print("Эта позиция уже занята. Попробуйте снова.")

if __name__ == "__main__":
    main()

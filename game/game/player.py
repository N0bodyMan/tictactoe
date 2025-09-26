class Player:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

    def get_move(self):
        while True:
            try:
                pos = int(input(f"{self.name} ({self.mark}), выберите позицию (0-8): "))
                if 0 <= pos <= 8:
                    return pos
                else:
                    print("Неверная позиция! Попробуйте снова.")
            except ValueError:
                print("Введите число от 0 до 8.")

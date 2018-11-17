import random

print("Rock...")
print("Paper...")
print("Scissors...")

player = input("Player, make your move:").lower()

rand_num = random.randint(0, 2)
if rand_num == 0:
    computer = "rock"
elif rand_num == 1:
    computer = "paper"
else:
    computer = "scissors"

print(f"computer plays {computer}")

if player == computer:
    print("It's a tie!")
elif player == "rock":
    if computer == "scissors":
        print("player wins!")
    if computer == "paper":
        print("computer wins!")
elif player == "paper":
    if computer == "rock":
        print("player wins!")
    if computer == "scissors":
        print("computer wins!")
elif player == "scissors":
    if computer == "paper":
        print("player wins!")
    if computer == "rock":
        print("computer wins!")

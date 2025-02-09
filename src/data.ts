export const codingChallenges = [
  {
    id: 1,
    title: 'Find a Unique Pair with Target Sum',
    difficulty: 'Easy',
    shortDescription: 'Find two distinct numbers in an array whose sum equals a given target.',
    fullDescription: 'Given an array of integers and a target sum, write a function that finds a pair of distinct numbers whose sum equals the target. The function should return the pair as an array of two numbers. If multiple pairs exist, return the first one found. Optimize the function to avoid unnecessary calculations.',
    example: 'Input: [2, 4, 5, 1, 8, 9], Target: 10  Output: [2, 8]',
    suggestedSolutions: [
      {
        firstName: 'Shira',
        lastName: 'Ytzkowits',
        code: `
def find_pair_with_sum(arr, target):
    seen = set()
    for num in arr:
        complement = target - num
        if complement in seen:
            return [complement, num]
        seen.add(num)
    return []  # Return an empty list if no pair is found

# Example Usage
arr = [4, 7, 1, -3, 2]
target = 5
print(find_pair_with_sum(arr, target))  # Output: [4, 1]
        `
      },
      {
        firstName: 'Rebeka',
        lastName: 'Tolidano',
        code: `
def return_pair_to_target(target, array):
    dict = {}
    for num in array:
        complement = target - num
        if complement in dict:
            return [complement, num]
        dict[num] = 1
        `
      }
    ]
  },
  {
    id: 2,
    title: 'Is a Rotated Palindrome?',
    difficulty: 'Medium',
    shortDescription: 'Check if a string can become a palindrome by rotating it.',
    fullDescription: 'A rotated palindrome is a string that can be rearranged through rotation to form a palindrome. Write a function that checks whether a given string can become a palindrome by rotating its characters. The function should ignore spaces and be case-insensitive.',
    example: 'Input: "aab"  Output: true (because "aba" is a palindrome)',
    suggestedSolutions: []
  },
  {
    id: 3,
    title: 'Rearrange Words Alphabetically',
    difficulty: 'Medium',
    shortDescription: 'Sort words in a sentence alphabetically.',
    fullDescription: 'Write a function that takes a sentence and returns the words sorted alphabetically while keeping punctuation intact. Spaces between words should be normalized, and the order of words should be case-insensitive.',
    example: 'Input: "Banana apple! cherry"  Output: "apple Banana cherry!"',
    suggestedSolutions: []
  },
  {
    id: 4,
    title: 'Find the Missing Number',
    difficulty: 'Medium',
    shortDescription: 'Find the missing number in a sequence.',
    fullDescription: 'Given an array of unique numbers from 1 to N with one number missing, write a function to find the missing number. The function should be efficient and handle large values of N without iterating over the entire range.',
    example: 'Input: [1, 2, 3, 5]  Output: 4',
    suggestedSolutions: []
  },
  {
    id: 5,
    title: 'Matrix Spiral Traversal',
    difficulty: 'Hard',
    shortDescription: 'Traverse a matrix in a spiral order.',
    fullDescription: 'Given an NxM matrix, write a function that returns its elements in spiral order, starting from the top-left corner and moving clockwise. The function should handle rectangular and square matrices of different sizes.',
    example: 'Input: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]  Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]',
    suggestedSolutions: []
  },
  {
    id: 6,
    title: 'Smart Date Formatter',
    difficulty: 'Hard',
    shortDescription: 'Convert a date to a natural language format with custom rules.',
    fullDescription: 'Write a function that converts a date from "YYYY-MM-DD" format into a more readable version, considering edge cases like today, yesterday, or future dates. For example, if the input is today’s date, return "Today"; if it was yesterday, return "Yesterday"; otherwise, return a formatted date like "15th of February, 2022".',
    example: 'Input: "2024-02-15" (assuming today is 2024-02-16)  Output: "Yesterday"',
    suggestedSolutions: [
      {
        firstName: 'S',
        lastName: 'K',
        code: `
from datetime import date, timedelta

def format_date(date_str):
    today = date.today()
    input_date = date.fromisoformat(date_str)
    
    if input_date == today:
        return "Today"
    elif input_date == today - timedelta(days=1):
        return "Yesterday"
    
    day, month, year = input_date.day, input_date.strftime("%B"), input_date.year
    suffix = "th" if 10 <= day % 100 <= 20 else {1: "st", 2: "nd", 3: "rd"}.get(day % 10, "th")
    
    return f"{day}{suffix} of {month}, {year}"

# Example Usage
print(format_date("2024-02-15"))  # Output: "Yesterday"
        `
      }
    ]
  }
];

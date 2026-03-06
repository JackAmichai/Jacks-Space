import re
import sys

# Define target files
target_files = ['chatbot.js', 'index.html', 'projects-data.js', 'script.js']

emoji_pattern = re.compile(
    u"(\ud83d[\ude00-\ude4f])|"  # emoticons
    u"(\ud83c[\udf00-\uffff])|"  # symbols & pictographs (1 of 2)
    u"(\ud83d[\u0000-\uddff])|"  # symbols & pictographs (2 of 2)
    u"(\ud83d[\ude80-\udeff])|"  # transport & map symbols
    u"(\ud83c[\udde0-\uddff])"  # flags (iOS)
    "+", flags=re.UNICODE)

# Basic regex for common emojis
basic_emoji = re.compile(r'[🤖🛡️🔬📊🚀🎯⚡📈🏛️📚🔧✅😊💻💬☁️]', flags=re.UNICODE)

for file in target_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove basic string matching emojis
    content = basic_emoji.sub('', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print("Emojis removed.")

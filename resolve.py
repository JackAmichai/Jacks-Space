import sys

for filepath in ['projects-data.js', 'script.js', 'styles.css']:
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    out = []
    in_conflict = False
    in_ours = False
    in_theirs = False
    
    for line in lines:
        if line.startswith('<<<<<<< HEAD'):
            in_conflict = True
            in_ours = True
            continue
        if line.startswith('======='):
            in_ours = False
            in_theirs = True
            continue
        if line.startswith('>>>>>>> origin/enhance-projects-visuals'):
            in_conflict = False
            in_theirs = False
            continue
            
        if in_conflict:
            if in_theirs:
                out.append(line)
        else:
            out.append(line)
            
    with open(filepath, 'w') as f:
        f.writelines(out)

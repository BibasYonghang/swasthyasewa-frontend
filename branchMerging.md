
# Git Branching Cheat Sheet

## 1️⃣ Check Current Branch
```bash
git branch
Shows the current branch you are on (marked with *).

2️⃣ Switch to an Existing Branch
bash
Copy code
git checkout <branch-name>
Example: switch to main

bash
Copy code
git checkout main
3️⃣ Create a New Branch
bash
Copy code
git checkout -b <branch-name>
Creates a new branch and switches to it automatically.

Example: create a staging branch

bash
Copy code
git checkout -b staging
4️⃣ Push New Branch to GitHub and Set Upstream
bash
Copy code
git push --set-upstream origin <branch-name>
Example:

bash
Copy code
git push --set-upstream origin staging
After this, future pushes are simple:

bash
Copy code
git push
git pull
5️⃣ Add and Commit Changes
bash
Copy code
git add .
git commit -m "Your commit message"
Stage and save your changes locally.

6️⃣ Push Changes to Remote Branch
bash
Copy code
git push
Works automatically if upstream is set.

7️⃣ Merge Branch into Another
bash
Copy code
git checkout <target-branch>
git merge <source-branch>
Example: merge staging into main

bash
Copy code
git checkout main
git merge staging
git push
8️⃣ Recommended Workflow (Main & Staging)
Work and commit frequently on staging.

Push to staging and test on staging server (Render, etc.).

When fully tested, merge staging → main.

Push main → production.

9️⃣ Optional: Delete Branch After Merge
bash
Copy code
git branch -d <branch-name>      # delete local branch
git push origin --delete <branch-name>  # delete remote branch



Recommended professional workflow (best practice)
git checkout -b feature-name
git add .
git commit -m "Meaningful message"
git push -u origin feature-name
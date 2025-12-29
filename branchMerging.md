1️⃣ Concept

Merging a branch means:

“Take all the commits from one branch (staging) and integrate them into another branch (main).”

So after merging:

main will now include all the code and changes that were in staging.

staging still exists (it’s not deleted unless you choose to delete it).

Your production branch (main) is now up-to-date with tested code.

2️⃣ How It Works in Practice

Assume this:

main:        A — B — C
staging:     A — B — C — D — E


Commits D and E are new changes you tested on staging.

After merging staging → main:

main:        A — B — C — D — E
staging:     A — B — C — D — E


main now has D and E.

Your production-ready code is updated.

3️⃣ Commands to Merge

Switch to main branch:

git checkout main


Merge staging into main:

git merge staging


Push main to GitHub:

git push origin main

4️⃣ After Merging

Code in main is production-ready

GitHub contribution graph will now count commits from staging

Staging branch can continue to be used for future testing

Optional: delete staging if you want to start fresh later:

git branch -d staging          # delete locally
git push origin --delete staging  # delete remote branch

5️⃣ Important Notes

If changes conflict with main (someone else changed main in the meantime), Git will ask you to resolve merge conflicts before completing the merge.

For solo projects, conflicts are rare unless multiple branches are being edited in parallel.


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
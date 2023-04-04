# SDC-Snake
System Design Capston Repository

## GitHub workflow

### pull from group github main branch to local machine<br />
git checkout main<br />
git fetch origin <br />
git reset --hard origin/main<br />

### pull a branch that does not yet exist on your machine<br />
git fetch origin [branchName]:[branchName]

### create a new branch<br />
git checkout -b <branch_name>

### push the new branch to the group github.<br />
git push -u origin <branch_name>

### create a pull request to merge to "main" branch<br />
we do it on github

## to update your feature branch with up-to-date main
// Current branch : feature1 <br />
git switch main <br />
git pull origin main <br />
<br />
//now main branch in your local machine is up to date<br />
git switch feature 1<br />
git merge main<br />

// resolve conflict if any<br />
// commit changes

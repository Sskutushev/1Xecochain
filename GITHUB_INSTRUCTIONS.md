# GitHub Repository Setup Instructions

## 📋 Steps to Upload to GitHub

1. **Clean the existing repository:**
   - Go to https://github.com/Sskutushev/1Xecochain-web3
   - Delete all existing branches except main/master
   - Delete all existing files in the main branch

2. **Upload the new project:**

```bash
# Navigate to the project root
cd C:\Users\sskut\Desktop\1xecochain

# Initialize git repository (if not already)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: EcoChain Token Creation Platform"

# Add remote origin (replace with your repo URL)
git remote add origin https://github.com/Sskutushev/1Xecochain-web3.git

# Push to main branch (force push to overwrite existing)
git branch -M main
git push -u origin main --force
```

## 📁 Files to Include

The repository should contain:
- `ecochain-frontend/` - Complete React frontend application
- `prompt.md` - Project requirements and specifications
- `assets/` - Design assets and resources
- `README.md` - Repository overview

## 🔧 Branch Management

After initial upload:
1. Keep only the `main` branch
2. Delete any other branches (`develop`, `feature/*`, etc.)
3. Set `main` as the default branch

## 🔄 Post-Upload Verification

1. Verify all files are uploaded correctly
2. Check that the frontend builds successfully:
   ```bash
   cd ecochain-frontend
   npm install
   npm run build
   ```
3. Ensure all assets are accessible
4. Verify README files are properly formatted
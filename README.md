zip -r source.zip . \
  -x "node_modules/*" \
     ".next/*" \
     "dist/*" \
     "build/*" \
     ".git/*" \
     ".DS_Store" \
     ".env" \
     ".env*" \
     ".env.prod" \
     ".idea" \
     "*.log"

rm -rf dist

npm run build

zip -r release-v2.0.0.zip dist

git tag v2.0.0

git push origin v2.0.0

gh release create v2.0.0 release-v2.0.0.zip \
  --title "v2.0.0" \
  --notes "Release v2.0.0"

rm -rf dist
rm -rf *.zip
npm run build

zip -r release-v2.0.1.zip dist

git tag v2.0.1

git push origin v2.0.1

gh release create v2.0.1 release-v2.0.1.zip \
  --title "v2.0.1" \
  --notes "Release v2.0.1"
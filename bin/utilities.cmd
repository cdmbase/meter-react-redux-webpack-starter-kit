

Rename extension
--------
for i in *.import.jsx; do mv "$i" "ren-$i.mp4"; done
find . -depth -name "*.import.jsx" -exec sh -c 'mv "$1" "${1%.import.jsx}.jsx"' _ {} \;

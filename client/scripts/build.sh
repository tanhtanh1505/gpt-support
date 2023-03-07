yarn run build
if [ -f gpt-support.zip ]; then
    rm gpt-support.zip
fi
zip -r gpt-support.zip build/
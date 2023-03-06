cd ../client
npm run build

cp -r build ../server/

cd ../server

docker compose up -d

if [ -f gpt-support-server-prod.tar ]; then
    rm gpt-support-server-prod.tar
fi

docker save gpt-support-server-prod > gpt-support-server-prod.tar
if [ -f gpt-support-server-prod.tar ]; then
    bash scripts/remove.sh
fi

cd ../client
yarn run build

cp -r build ../server/

cd ../server

docker compose up -d

docker save gpt-support-server-prod > gpt-support-server-prod.tar
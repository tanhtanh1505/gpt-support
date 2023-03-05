docker stop gpt_support_server_prod
docker rm -f gpt_support_server_prod

docker rmi -f gpt-support-server-prod:1.0.0

if [ -f gpt-support-server-prod.tar ]; then
    rm gpt-support-server-prod.tar
fi
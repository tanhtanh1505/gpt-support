cd ~/gpt-support

docker load -i gpt-support-server-prod.tar

docker image frune -f

docker compose up -d

docker logs -f gpt_support_server_prod
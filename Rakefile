desc "Deploy everything to the app/ folder on the server"
task :deploy do
    raise unless system("rsync -e \"/usr/bin/ssh -v -p 21098\" -av --delete build/ burmat@burmat-it.com:~/www/story/app/")
end

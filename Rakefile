

desc "Build the front-end site"
task :build do
	raise unless system("grunt build")
end


desc "Deploy everything to the app/ folder on the server"
task :deploy => [
	:build
] do
    raise unless system("rsync -e \"/usr/bin/ssh -p 21098\" -av --delete build/ burmat@burmat-it.com:~/www/story/app/")
end

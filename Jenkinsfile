pipeline {
	agent none
	options { skipDefaultCheckout(false) }
	stages {
		stage('git pull') {
			agent any
			steps {
				checkout scm
			}
		}
		stage('Docker build') {
			agent any
			steps {
				sh 'docker build -t client:latest /var/jenkins_home/workspace/coderun/client'
				sh 'docker build -t mainserver:latest /var/jenkins_home/workspace/coderun/server/main'
			}
		}
		stage('Docker run') {
			agent any
			steps {
				sh 'docker ps -f name=client -q \
        | xargs --no-run-if-empty docker container stop'
				sh 'docker ps -f name=mainserver -q \
				| xargs --no-run-if-empty docker container stop'

				sh 'docker container ls -a -f name=client -q \
        | xargs -r docker container rm'
				sh 'docker container ls -a -f name=mainserver -q \
        | xargs -r docker container rm'

				sh 'docker images -f dangling=true && \
				docker rmi $(docker images -f dangling=true -q)'

				sh 'docker run -d --name client \
				-p 80:80 \
				-p 443:443 \
				-v /home/ubuntu/sslkey/:/var/jenkins_home/workspace/coderun/sslkey/ \
				-v /etc/localtime:/etc/localtime:ro \
				--network coderunnet \
				client:latest'
				sh 'docker run -d --name mainserver \
				-v /etc/localtime:/etc/localtime:ro \
				--network coderunnet mainserver:latest'
			}
		}
	}
}
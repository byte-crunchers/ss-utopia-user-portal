pipeline {
    agent any

     options
    {
      buildDiscarder(logRotator(numToKeepStr: '3'))
    }

    environment {
      AWS_DEFAULT_REGION="us-east-1" 
    }

    stages {    

      stage('Code analysis') {
        steps {
          echo "code analysis"
        }
      }   

      stage('Build') {
            steps {
              nodejs("Node-17") {
                sh "npm install"
                sh "npm run build"
              }
              
            }
        }
      
      stage('Push to S3') {
            steps {
              sh "ansible-galaxy collection install community.aws"
              sh "ansible-playbook ./playbooks/uploadS3.yaml -e BRANCH=ansible -e REGION=us-east-1"
            }
        }
      
    }

    post {
        always {
            cleanWs()
        }
    }

}
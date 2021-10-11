pipeline {
    agent any

     options
    {
      buildDiscarder(logRotator(numToKeepStr: '3'))
    }

    environment {
      AWS_DEFAULT_REGION="us-east-1" 
      IMAGE_REPO_NAME="ss-utopia-account"
      IMAGE_TAG="latest"
      REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
    }

    stages {       
      
      stage('checkout') {
        steps {
          git branch: 'feature_kubernetes', credentialsId: 'git_login', url: 'https://github.com/byte-crunchers/ss-utopia-user-portal.git'
        }
      }
      stage('get_commit_msg') {
        steps {
            script {
                env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=format:"%H"', returnStdout: true).trim()
            }
        }
      }
        
        stage(" SonarQube analysis") {
            steps {
              withSonarQubeEnv('SonarQube') {
                sh 'npm install' 
                sh 'npm install sonarqube-scanner --save-dev'
                sh 'npm run sonar'
              }
            }
          }
          stage('Build') {
            steps {
                  
                   sh 'docker build . -t ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/ss-utopia-user-portal:${GIT_COMMIT_MSG}'

                 
            }
        }
          stage('log into ecr') {
        steps {
            script{
                sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com'
            }
        }
      }
        stage('Deploy') {
            steps {
                sh 'docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/ss-utopia-user-portal:${GIT_COMMIT_MSG}'
            }
        }
         stage('Cleaning up') {
        steps{
            sh "docker rmi ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/ss-utopia-user-portal:${GIT_COMMIT_MSG}"
        }
        }
    }

}
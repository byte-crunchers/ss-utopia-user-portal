pipeline {
    agent any

    stages {
      stage('checkout') {
        steps {
          git branch: 'feature/feature_branch', credentialsId: 'git_login', url: 'https://github.com/byte-crunchers/ss-utopia-user-portal.git'
        }
      }
        
        stage(" SonarQube analysis") {
            agent any
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
                  
                    sh 'docker build . -t jbnilles/ss-utopia-user_portal:latest'

                 
            }
        }
          
        stage('Deploy') {
            steps {
                sh 'docker push jbnilles/ss-utopia-user_portal:latest'
            }
        }
    }

}
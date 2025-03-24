pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/wafaHajMabrouk/developpement.git'
            }
        }
        stage('Test') {
            steps {
                script {
                    sh './mvnw clean test'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t mon-image-backend .'
                }
            }
        }
    }
}

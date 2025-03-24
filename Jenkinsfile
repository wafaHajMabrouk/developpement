pipeline {
    agent any
    environment {
        DOCKER_IMAGE_BACKEND = "username/backend-app"
        DOCKER_IMAGE_FRONTEND = "username/frontend-app"
        DOCKER_REGISTRY = "docker.io"
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/wafaHajMabrouk/developpement.git'
            }
        }
        stage('Install Backend Dependencies') {
            steps {
                script {
                    dir('backend') {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Install Frontend Dependencies') {
            steps {
                script {
                    dir('frontend') {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Run Backend Tests') {
            steps {
                script {
                    dir('backend') {
                        sh 'npm test' // Exécuter les tests backend avec Mocha
                    }
                }
            }
        }
        stage('Run Frontend Tests') {
            steps {
                script {
                    dir('frontend') {
                        sh 'npm run test' // Exécuter les tests frontend si nécessaire (par exemple, avec Jest)
                    }
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    // Build the backend image
                    dir('backend') {
                        sh 'docker build -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE_BACKEND}:latest .'
                    }
                    // Build the frontend image
                    dir('frontend') {
                        sh 'docker build -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE_FRONTEND}:latest .'
                    }
                }
            }
        }
        stage('Push Docker Images to DockerHub') {
            steps {
                script {
                    // Push the backend image to DockerHub
                    sh 'docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_BACKEND}:latest'
                    // Push the frontend image to DockerHub
                    sh 'docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_FRONTEND}:latest'
                }
            }
        }
        stage('Deploy to Production') {
            steps {
                sshagent(['id-ssh']) {
                    script {
                        sh 'ssh user@server "docker pull ${DOCKER_REGISTRY}/${DOCKER_IMAGE_BACKEND}:latest && docker pull ${DOCKER_REGISTRY}/${DOCKER_IMAGE_FRONTEND}:latest && docker-compose up -d"'
                    }
                }
            }
        }
    }
}

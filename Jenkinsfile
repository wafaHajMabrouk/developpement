pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'  // Pour le frontend (React)
                sh 'cd backend && npm install'  // Pour le backend (Node.js)
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'  // Exécute les tests unitaires (frontend)
                sh 'cd backend && npm test'  // Tests backend
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t frontend-image ./frontend'
                sh 'docker build -t backend-image ./backend'
            }
        }
    }
}
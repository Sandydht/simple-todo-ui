pipeline {
  agent { label 'agent-ec2-1' }

  environment {
    NODE_ENV = "production"
    PATH = "./node_modules/"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

  }

  post {
    always {
      echo 'Pipeline completed.'
    }
  }
}

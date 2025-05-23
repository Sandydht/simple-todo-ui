pipeline {
  agent { label 'agent-ec2-1' }

  environment {
    NODE_ENV = "production"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Commit Lint') {
      steps {
        echo 'Running commitlint...'
        sh '''
          git fetch --unshallow || true
          npx commitlint --from=origin/master --to=HEAD --verbose
        '''
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lint Code') {
      steps {
        sh 'npm run lint'
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

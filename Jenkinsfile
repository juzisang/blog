pipeline {
    agent any

    tools { 
        nodejs "nodejs-12.19.0" 
    }

    environment {
        TYPE = ""
    }
    
    stages {
        stage("Build Server") { 
            when {
                changeset "**/server/*.*"
            }
            steps {
                script {
                    env.TYPE = "Server"
                }

                dir("/server") {
                    sh "yarn install" 
                    sh "yarn build" 
                }
            }
        }
        stage("Build Client") { 
            when {
                changeset "**/client/*.*"
            }
            steps {
                script {
                    env.TYPE = "Client"
                }

                dir("/client") {
                    sh "yarn install" 
                    sh "yarn build"
                }
            }
        }
    }
    post {
        always {
            echo "Build ${env.TYPE} finish"
        }
    }
}
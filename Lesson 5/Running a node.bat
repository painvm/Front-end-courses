java -jar selenium-server-standalone-3.0.1.jar -role node -hub http://188.209.253.201:4444/grid/register -browser "browserName=chrome,version=latest,platform=7,maxInstances=5" ^
    -browser "browserName=firefox,version=latest,platform=7,maxInstances=5"
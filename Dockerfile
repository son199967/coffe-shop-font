FROM openjdk:8u141-jre
ADD target/web-seller-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
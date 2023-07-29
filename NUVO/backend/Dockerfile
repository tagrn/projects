FROM gradle:6.8-jdk8 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM openjdk:8-jdk-alpine
VOLUME /build
COPY --from=build /home/gradle/src/build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["java", "-jar", "app.jar", "--server.servlet.context-path=/apis"]  
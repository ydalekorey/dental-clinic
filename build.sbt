name := "dental-clinic"

version := "1.0-SNAPSHOT"

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  cache,

  "org.mindrot" % "jbcrypt" % "0.3m",

  "org.scalatestplus" %% "play" % "1.4.0-M3" % "test",
  "org.scalamock" %% "scalamock-scalatest-support" % "3.2" % "test",

  "jp.t2v" %% "play2-auth"        % "0.14.0",
  "jp.t2v" %% "play2-auth-social" % "0.14.0",
  "jp.t2v" %% "play2-auth-test"   % "0.14.0" % "test",
  play.sbt.Play.autoImport.cache,

  "com.typesafe.play" %% "play-slick" % "1.0.1",
  "com.typesafe.play" %% "play-slick-evolutions" % "1.0.1",
  "mysql" % "mysql-connector-java" % "5.1.36",
  "com.h2database" % "h2" % "1.4.187" % "test"

)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

pipelineStages := Seq(rjs, digest, gzip)

routesGenerator := InjectedRoutesGenerator

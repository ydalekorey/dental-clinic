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
  "com.h2database" % "h2" % "1.4.187" % "test",

  "org.webjars" %% "webjars-play" % "2.4.0-1",
  "org.webjars.bower" % "angularjs" % "1.4.4",
  "org.webjars" % "angular-ui-router" % "0.2.15",
  "org.webjars" % "angular-ui-bootstrap" % "0.13.3",
  "org.webjars.bower" % "angular-resource" % "1.4.4",
  "org.webjars.bower" % "angular-cookies" % "1.4.4",
  "org.webjars.bower" % "angular-sanitize" % "1.4.4",
  "org.webjars.bower" % "angular-animate" % "1.4.4",
  "org.webjars.bower" % "angular-touch" % "1.4.4",
  "org.webjars.bower" % "angular-route" % "1.4.4",
  "org.webjars.bower" % "angular-loading-bar" % "0.8.0",
  "org.webjars.bower" % "angular-toggle-switch" % "1.3.0",
  "org.webjars.bower" % "metisMenu" % "2.1.0",
  "org.webjars.bower" % "json3" % "3.3.2",
  "org.webjars" % "requirejs" % "2.1.20",
  "org.webjars" % "font-awesome" % "4.3.0",
  "org.webjars" % "bootstrap" % "3.3.4",
  "org.webjars" % "jquery" % "2.1.4"
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

pipelineStages := Seq(rjs, digest, gzip)

routesGenerator := InjectedRoutesGenerator

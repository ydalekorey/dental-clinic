name := "dental-clinic"

version := "1.0-SNAPSHOT"

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  cache,

  "org.mindrot" % "jbcrypt" % "0.3m",

  "org.scalatestplus" %% "play" % "1.4.0-M4" % "test" ,
  "org.scalamock" %% "scalamock-scalatest-support" % "3.2" % "test",
  //imported latest selenium version that support newest firefox
  "org.seleniumhq.selenium" % "selenium-java" % "2.48.2" % "test",


  "jp.t2v" %% "play2-auth"        % "0.14.1",
  "jp.t2v" %% "play2-auth-social" % "0.14.1",
  "jp.t2v" %% "play2-auth-test"   % "0.14.1" % "test",
  play.sbt.Play.autoImport.cache,

  "com.typesafe.play" %% "play-slick" % "1.1.1",
  "com.typesafe.play" %% "play-slick-evolutions" % "1.1.1",
  "mysql" % "mysql-connector-java" % "5.1.36",
  "com.h2database" % "h2" % "1.4.187" % "test",

  "com.github.nscala-time" %% "nscala-time" % "2.6.0"

)

javaOptions in Test += "-Dwebdriver.chrome.driver=/home/yuriy/browserdrivers/chromedriver"
unmanagedResourceDirectories in Test <+= baseDirectory ( _ /"target/web/public/test" )

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

pipelineStages := Seq(rjs, digest, gzip)

routesGenerator := InjectedRoutesGenerator

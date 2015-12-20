package test


trait TestDb {
  /**
    * Constructs a in-memory (h2) database configuration to add to a FakeApplication.
    */
  def inMemorySlickDatabase(): Map[String, String] = {
    Map(
      "slick.dbs.default.db.driver" -> "org.h2.Driver",
      "slick.dbs.default.db.url" -> ("jdbc:h2:mem:play-test-" + scala.util.Random.nextInt+";MODE=MYSQL")
    )
  }
}

object Helpers extends TestDb

package mixins

import org.scalatest.{TestData, Suite}
import org.scalatestplus.play.OneAppPerTest
import play.api.test.FakeApplication

trait InMemoryDBPerTest extends OneAppPerTest {
  this: Suite =>
  implicit override def newAppForTest(td: TestData): FakeApplication =
    FakeApplication(
      additionalConfiguration = Map(
        "slick.dbs.default.db.driver" -> "org.h2.Driver",
        "slick.dbs.default.db.url" -> ("jdbc:h2:mem:play-test-" + scala.util.Random.nextInt+";MODE=MYSQL")
      )
    )
}

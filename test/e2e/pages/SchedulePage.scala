package e2e.pages

import org.scalatest.selenium.Page
import play.api.test.Helpers._

class SchedulePage extends Page {
  lazy val port = testServerPort
  override val url: String = s"http://localhost:$port/#/schedule"
}

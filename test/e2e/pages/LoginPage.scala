package e2e.pages

import org.scalatest.selenium.Page
import play.api.test.Helpers._


class LoginPage extends Page {

  lazy val port = testServerPort
  override val url: String = s"http://localhost:$port/#/login"

  val email = "email"

  val password = "password"

  val loginButton = "login-button"

}

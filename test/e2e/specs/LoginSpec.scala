package e2e.specs

import e2e.pages.LoginPage
import org.scalatestplus.play._
import play.api.test.FakeApplication
import play.api.mvc.Action
import play.api.mvc.Results._


class LoginSpec extends PlaySpec with OneServerPerSuite with OneBrowserPerSuite with ChromeFactory {

  val loginPage = new LoginPage

  implicit override lazy val app: FakeApplication =
    FakeApplication(
      additionalConfiguration = Map("ehcacheplugin" -> "disabled")
    )

  "Login button on Login page" when {

    "email is invalid" must {
      "be disabled" in {
        go to loginPage

        eventually {
          click on loginPage.email
        }
        enter("email@")

        click on loginPage.password
        enter("somepassword")

        find(loginPage.loginButton).get must not be 'enabled
      }
    }

    "password is empty" must {
      "be disabled" in {
        go to loginPage

        eventually {
          click on loginPage.email
        }
        enter("correctemail@mail.com")

        click on loginPage.password
        enter("")

        find(loginPage.loginButton).get must not be 'enabled
      }
    }

    "email is valid and password is not empty" must {
      "be enabled" in {
        go to loginPage

        eventually {
          click on loginPage.email
        }
        enter("correctemail@mail.com")

        click on loginPage.password
        enter("some password")

        find(loginPage.loginButton).get must be ('enabled)
      }
    }
  }

}

package e2e.specs

import dao.AccountDAO
import e2e.pages.LoginPage
import generators._
import org.scalatest.TestData
import org.scalatestplus.play._
import play.api.Application
import play.api.test.FakeApplication
import security.bcrypt._
import test.Helpers._

class LoginSpec extends PlaySpec with OneServerPerTest with OneBrowserPerTest with ChromeFactory {


  "Login button on Login page" when {
    "email is invalid" must {
      "be disabled" in {

        enterCredentialsOnLoginPage(email = "email@", password = "somepassword")

        find(loginPage.loginButton).get must not be 'enabled
      }
    }

    "password is empty" must {
      "be disabled" in {

        enterCredentialsOnLoginPage(email = "correctemail@mail.com", password = "")

        find(loginPage.loginButton).get must not be 'enabled
      }
    }

    "email is valid and password is not empty" must {
      "be enabled" in {

        enterCredentialsOnLoginPage(email = "correctemail@mail.com", password = "some password")

        find(loginPage.loginButton).get must be ('enabled)
      }
    }
  }

  "Home page" must {
    "be shown" when  {
      "correct credentials are submitted" in {

        val email = "user@email.com"
        val password = "userpassword"
        val account = generate.copy(email = email, password = hashed(password))
        accountDao.insert(account)

        enterCredentialsOnLoginPage(email = email, password = password)

        click on loginPage.loginButton

        eventually {
          pageTitle must be ("Dental Clinic - Home")
        }

      }
    }
  }

  val loginPage = new LoginPage

  override def newAppForTest(testData: TestData): Application =
    FakeApplication(additionalConfiguration = inMemorySlickDatabase())

  def accountDao(implicit app: Application) = {
    val app2AccountDAO = Application.instanceCache[AccountDAO]
    app2AccountDAO(app)
  }

  private def enterCredentialsOnLoginPage(email: String, password: String): Unit = {
    go to loginPage

    eventually {
      click on loginPage.email
    }
    enter(email)

    click on loginPage.password
    enter(password)
  }

}

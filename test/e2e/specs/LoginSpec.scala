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

class LoginSpec extends PlaySpec with OneServerPerTest with AllBrowsersPerTest {

  override def sharedTests(browser: BrowserInfo): Unit = {

    "Login button on Login page" when {
      "email is invalid" must {
        "be disabled" + browser.name in {

          enterCredentialsOnLoginPage(email = "email@", password = "somepassword")

          find(loginPage.loginButton).get must not be 'enabled
        }
      }

      "password is empty" must {
        "be disabled" + browser.name in {

          enterCredentialsOnLoginPage(email = "correctemail@mail.com", password = "")

          find(loginPage.loginButton).get must not be 'enabled
        }
      }

      "email is valid and password is not empty" must {
        "be enabled" + browser.name in {

          enterCredentialsOnLoginPage(email = "correctemail@mail.com", password = "some password")

          find(loginPage.loginButton).get must be('enabled)
        }
      }
    }

    "Login page" must {
      "contain wrong credentials error message" when {
        "submitted credentials are wrong" + browser.name in {
          enterCredentialsOnLoginPage(email = "some@mail.com", password = "somepassword")

          click on loginPage.loginButton

          eventually {
            val loginErrorAlert = find(loginPage.wrongCredentialsAlert).get
            loginErrorAlert must be('displayed)
            loginErrorAlert.text must equal("Неправильний E-mail або пароль")
          }
        }
      }
      "not contain wrong credentials error message" when {
        "login form is not touched" + browser.name in {

          go to loginPage

          eventually {
            find(loginPage.wrongCredentialsAlert).get must not be 'displayed
          }
        }
      }
    }

    "Home page" must {
      "be shown" when {
        "correct credentials are submitted" + browser.name in {

          val email = "user@email.com"
          val password = "userpassword"
          val account = generate.copy(email = email, password = hashed(password))
          accountDao.insert(account)

          enterCredentialsOnLoginPage(email = email, password = password)

          click on loginPage.loginButton

          eventually {
            pageTitle must be("Dental Clinic - Home")
          }

        }
      }
    }

  }

  val loginPage = new LoginPage


  override lazy val browsers = Vector(FirefoxInfo(firefoxProfile), ChromeInfo)

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

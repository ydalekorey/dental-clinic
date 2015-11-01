package security

import dao.AccountDAO
import org.scalamock.scalatest.MockFactory
import org.scalatest._
import Matchers._
import org.mindrot.jbcrypt.BCrypt
import org.scalatestplus.play.PlaySpec
import scala.concurrent.duration.Duration
import generators._

import scala.concurrent.{Await, Future}

class AccountServiceSpec extends PlaySpec with MockFactory {

  private val accountDAO: AccountDAO = mock[AccountDAO]

  private val accountService: AccountService = new AccountService(accountDAO = accountDAO)

  "AccountService" should {

    "return account if email and password are correct" in {
      val email = "some@email.com"
      val password = "somepassword"

      val storedAccount = generate.copy(email = email, password = BCrypt.hashpw(password, BCrypt.gensalt()))

      (accountDAO.findByEmail _).expects(email).returning(Future.successful(Some(storedAccount)))

      val actualAccount = Await.result(accountService.authenticate(email,password), Duration.Inf).get

      actualAccount should equal(storedAccount)
    }

    "return None if there is no account with specified email" in {
      val email = "some@email.com"
      val password = "somepassword"

      (accountDAO.findByEmail _).expects(email).returning(Future.successful(None))

      val actualAccount = Await.result(accountService.authenticate(email,password), Duration.Inf)

      actualAccount should be(None)
    }

    "return None if password is wrong" in {
      val email = "some@email.com"
      val password = "somepassword"

      val storedAccount = generate.copy(email = email, password = BCrypt.hashpw(password, BCrypt.gensalt()))

      (accountDAO.findByEmail _).expects(email).returning(Future.successful(Some(storedAccount)))

      val actualAccount = Await.result(accountService.authenticate(email,"wrongpass"), Duration.Inf)

      actualAccount should be(None)
    }

  }
}

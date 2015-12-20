package dao.impl

import dao.AccountDAO
import generators._
import test.Helpers._
import org.scalatest.Matchers._
import org.scalatest.TestData
import org.scalatestplus.play._
import play.api.Application
import play.api.test.FakeApplication

import scala.concurrent.Await
import scala.concurrent.duration.Duration

class AccountSlickDAOSpec extends PlaySpec with OneAppPerTest {

  override def newAppForTest(testData: TestData): Application = FakeApplication(additionalConfiguration = inMemorySlickDatabase())

  def accountDao(implicit app: Application) = {
    val app2AccountDAO = Application.instanceCache[AccountDAO]
    app2AccountDAO(app)
  }

  "AccountDAO" must {

    "find account by email" in {

      val expectedAccount = generate

      val accountId = Await.result(accountDao.insert(expectedAccount), Duration.Inf)

      val actualAccount = Await.result(accountDao.findByEmail(expectedAccount.email), Duration.Inf).get

      expectedAccount.copy(id = Some(accountId)) should equal(actualAccount)
    }

    "find account by id" in {

      val expectedAccount = generate

      val accountId = Await.result(accountDao.insert(expectedAccount), Duration.Inf)

      val actualAccount = Await.result(accountDao.findById(accountId), Duration.Inf).get

      expectedAccount.copy(id = Some(accountId)) should equal(actualAccount)
    }

  }

}

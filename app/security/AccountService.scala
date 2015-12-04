package security

import javax.inject.Inject
import dao.AccountDAO
import models.Account
import org.mindrot.jbcrypt.BCrypt
import play.api.libs.concurrent.Execution.Implicits.defaultContext

import scala.concurrent.Future

class AccountService @Inject() (private val accountDAO: AccountDAO) {

  def authenticate(email: String, password: String): Future[Option[Account]] =
    accountDAO.findByEmail(email).map(_.filter(account => BCrypt.checkpw(password, account.password)))

}

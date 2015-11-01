package dao.impl

import dao.AccountDAO
import models.Account
import play.api.Play
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfig}
import slick.driver.JdbcProfile
import scala.concurrent.Future

class AccountSlickDAO extends AccountDAO with HasDatabaseConfig[JdbcProfile] {
  protected val dbConfig = DatabaseConfigProvider.get[JdbcProfile](Play.current)

  import driver.api._

  private class AccountsTable(tag: Tag) extends Table[Account](tag, "account") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def email = column[String]("email")

    def password = column[String]("password")

    def name = column[String]("name")

    def role = column[String]("role")

    def * = (id.?, email, password, name, role) <> (Account.tupled, Account.unapply)
  }

  private val Accounts = TableQuery[AccountsTable]

  def findByEmail(email: String): Future[Option[Account]] =
    db.run(Accounts.filter(_.email === email).result.headOption)

  def findById(id: Long): Future[Option[Account]] =
    db.run(Accounts.filter(_.id === id).result.headOption)

  def insert(account: Account): Future[Long] = db.run(Accounts returning Accounts.map(_.id) += account)

}
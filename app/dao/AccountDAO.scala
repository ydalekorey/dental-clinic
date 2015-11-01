package dao

import com.google.inject.ImplementedBy
import dao.impl.AccountSlickDAO
import models.Account

import scala.concurrent.Future

@ImplementedBy(classOf[AccountSlickDAO])
trait AccountDAO {
  def findByEmail(email: String): Future[Option[Account]]

  def findById(id: Long): Future[Option[Account]]

  def insert(account: Account): Future[Long]
}

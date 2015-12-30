import models.{Appointment, Role, Account}
import com.github.nscala_time.time.Imports._

package object generators {
  def generate[T](implicit generateT: () => T): T = {
    generateT()
  }

  implicit def generateAccount() =
    new Account(
      id = None,
      email = "implicit@email.com",
      password = "Password",
      name = "Name",
      role = Role.NormalUser.toString
    )

  implicit def generateAppointment =
    new Appointment(
      id = None,
      accountId = None,
      startTime = DateTime.now.hour(10).minute(45),
      duration = Duration.standardMinutes(45),
      name = "Examination"
    )
}

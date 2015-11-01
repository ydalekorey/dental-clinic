import models.{Role, Account}

package object generators {
  def generate[T](implicit generateT: () => T): T = {
    generateT()
  }

  implicit def generateAccount() = {
    new Account(
      id = None,
      email = "implicit@email.com",
      password = "Password",
      name = "Name",
      role = Role.NormalUser.toString
    )
  }
}
